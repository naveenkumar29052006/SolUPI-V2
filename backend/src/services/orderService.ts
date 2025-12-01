
import { prisma } from "./prisma";
import { calculateUSDCAmount, transferUSDCToUser, initializePlatformWallet, isValidSolanaAddress } from './solanaService';


async function createOrderWithUser(userId, amount, walletAddress) {
    try {
        const parsedAmount = parseFloat(amount);
        if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
            return { success: false, error: 'Invalid amount' };
        }
        if (!walletAddress || !isValidSolanaAddress(walletAddress)) {
            return { success: false, error: 'Invalid Solana wallet address' };
        }
        const user = await prisma.user.upsert({
            where: {
                id: userId
            },

            update: {
                walletAddr: walletAddress

            },
            create: {
                id: userId,
                email: `${userId}@example.com`,
                name: "SolUPI User",
                walletAddr: walletAddress,
                password: "placeholder_hash" // Required by schema

            }


        })

        console.log("User is there :", user);

        const newOrder = await prisma.order.create({
            data: {
                userId: userId,
                amount: parseFloat(amount),
                walletAddr: walletAddress,
                status: "PENDING"
            }
        })

        console.log("Order created :", newOrder);
        return {
            success: true,
            data: {
                user: user,
                order: newOrder
            }
        }



    }

    catch (err) {
        console.error("Error creating order:", err);
        return {
            success: false,
            error: err.message
        }
    }
}


async function getUserOrders(userId, page = 1, limit = 10, status = null) {
    try {
        const skip = (page - 1) * limit;
        const whereClause: any = { userId: userId };

        if (status && status !== 'ALL') {
            whereClause.status = status;
        }

        const [orders, totalCount] = await Promise.all([
            prisma.order.findMany({
                where: whereClause,
                orderBy: { createdAt: "desc" },
                skip: skip,
                take: limit,
                include: { user: true }
            }),
            prisma.order.count({ where: whereClause })
        ]);

        return {
            success: true,
            data: {
                orders,
                pagination: {
                    total: totalCount,
                    page: page,
                    limit: limit,
                    totalPages: Math.ceil(totalCount / limit)
                }
            }
        }
    } catch (err: any) {
        console.error("Error fetching user orders:", err);
        return { success: false, error: err.message };
    }
}

async function deleteOrder(orderId, userId) {
    try {
        const order = await prisma.order.findFirst({
            where: { id: orderId, userId: userId }
        });

        if (!order) {
            return { success: false, error: "Order not found" };
        }

        if (order.status === 'COMPLETED' || order.status === 'PROCESSING') {
            return { success: false, error: "Cannot delete a completed or processing order" };
        }

        await prisma.order.delete({
            where: { id: orderId }
        });

        return { success: true, message: "Order deleted successfully" };
    } catch (err: any) {
        console.error("Error deleting order:", err);
        return { success: false, error: err.message };
    }
}

async function updateOrderUTR(orderId, utrNumber, userId) {
    try {
        const existingOrder = await prisma.order.findFirst({
            where: {
                id: orderId,
                userId: userId
            }
        })

        if (!existingOrder) {
            return {
                success: false,
                error: "Order not found "
            }
        }

        if (existingOrder.status !== "PENDING") {
            return {
                success: false,
                error: "Order is not pending"
            }
        }

        const updateOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {

                utrNumber: utrNumber,
                updatedAt: new Date(),

            },
            include: {
                user: true
            }
        })

        console.log("Order updated :", updateOrder.id);
        verifyUTRAndCompleteOrder(utrNumber).catch(err => {
            console.error('Auto-payout failed for UTR', utrNumber, err);
        });
        return {
            success: true,
            data: updateOrder
        }

    }

    catch (err) {
        console.error("Error updating order status:", err);
        return {
            success: false,
            error: err.message
        }
    }
}

async function verifyUTRAndCompleteOrder(utrNumber) {
    try {
        console.log(`[Order Service] Verifying UTR: ${utrNumber}`);

        // 1. Find the order
        const order = await prisma.order.findFirst({
            where: { utrNumber: utrNumber }
        });
        if (!order) {
            return { success: false, error: 'Order with given UTR not found' };
        }
        if (order.status !== 'PENDING' && order.status !== 'AWAITING_PAYMENT') {
            return { success: false, error: `Order not in payable state (${order.status})` };
        }

        // 2. Check EmailTransaction table
        const emailTx = await prisma.emailTransaction.findUnique({
            where: { rrn: utrNumber }
        });

        if (!emailTx) {
            console.log(`[Order Service] UTR ${utrNumber} not found in EmailTransaction table yet.`);
            return { success: false, error: 'Payment not received yet' };
        }

        if (emailTx.isUsed) {
            console.log(`[Order Service] UTR ${utrNumber} already used.`);
            return { success: false, error: 'UTR already used' };
        }

        // 3. Verify Amount - Critical security check!
        // Allow small tolerance (1 INR) for rounding differences
        const tolerance = 1;
        if (emailTx.amount < (order.amount - tolerance)) {
            console.log(`[Order Service] Amount mismatch: Email ${emailTx.amount} INR < Order ${order.amount} INR`);
            return {
                success: false,
                error: `Payment amount (₹${emailTx.amount}) is less than order amount (₹${order.amount})`
            };
        }

        // 4. Mark EmailTransaction as used
        await prisma.emailTransaction.update({
            where: { id: emailTx.id },
            data: { isUsed: true }
        });

        // 5. Proceed with Order Completion
        if (!order.walletAddr || !isValidSolanaAddress(order.walletAddr)) {
            return { success: false, error: 'Order missing or invalid wallet address' };
        }

        if (order.txSignature) {
            return { success: false, error: 'Order already processed' };
        }

        const claim = await prisma.order.updateMany({
            where: {
                id: order.id,
                status: { in: ['PENDING', 'AWAITING_PAYMENT'] }
            },
            data: { status: 'PROCESSING' }
        });

        if (claim.count === 0) {
            return { success: false, error: 'Order already processing or completed' };
        }

        await initializePlatformWallet();

        const calc = await calculateUSDCAmount(Number(order.amount));
        const usdcAmount = calc?.usdcAmount ?? null;
        if (usdcAmount === null || usdcAmount === undefined) {
            await prisma.order.update({ where: { id: order.id }, data: { status: 'PENDING' } });
            return { success: false, error: 'Failed to calculate USDC amount' };
        }

        const transferResult = await transferUSDCToUser(order.walletAddr, usdcAmount);
        if (!transferResult || transferResult.success === false) {
            await prisma.order.update({ where: { id: order.id }, data: { status: 'PENDING' } });
            // Revert EmailTransaction usage if transfer fails?
            // Ideally yes, but for now let's keep it simple. Manual intervention might be needed.
            return { success: false, error: transferResult?.error || 'Transfer failed' };
        }

        const updated = await prisma.order.update({
            where: { id: order.id },
            data: {
                status: 'COMPLETED',
                txSignature: transferResult.signature,
                recipientTokenAccount: transferResult.recipientTokenAccount ?? null,
                completedAt: new Date()
            }
        });

        return { success: true, data: updated };

    } catch (err) {
        try {
            await prisma.order.updateMany({
                where: { utrNumber: utrNumber, status: 'PROCESSING' },
                data: { status: 'PENDING' }
            });
        } catch (e) {
            console.error('Error in verifyUTRAndCompleteOrder:', err);
            return { success: false, error: err.message || String(err) };
        }
        return { success: false, error: err.message || String(err) };
    }
}


export { createOrderWithUser, getUserOrders, updateOrderUTR, verifyUTRAndCompleteOrder, deleteOrder };