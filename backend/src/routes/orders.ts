import express from 'express';
import { createOrderWithUser, getUserOrders } from '../services/orderService';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, amount, walletAddress } = req.body;

        console.log("Received order request:", { userId, amount, walletAddress });

        if (!userId) {
            return res.status(400).json({ success: false, message: "Missing required field: userId", received: { userId, amount, walletAddress } });
        }
        if (!amount) {
            return res.status(400).json({ success: false, message: "Missing required field: amount", received: { userId, amount, walletAddress } });
        }
        if (!walletAddress) {
            return res.status(400).json({ success: false, message: "Missing required field: walletAddress", received: { userId, amount, walletAddress } });
        }

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be a positive number"
            });
        }

        const result = await createOrderWithUser(userId, amount, walletAddress);

        if (result.success) {
            return res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: result.data
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed to create order: " + (result.error || "Unknown error"),
                error: result.error
            });
        }

    } catch (err: any) {
        console.error("Error creating order:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to create order , server error",
            error: err.message
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const { userId, page, limit, status } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Missing required query parameter: userId"
            });
        }

        const pageNum = parseInt(page as string) || 1;
        const limitNum = parseInt(limit as string) || 10;

        const result = await getUserOrders(userId, pageNum, limitNum, status);

        if (result.success) {
            return res.status(200).json({
                success: true,
                data: result.data
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed to fetch orders",
                error: result.error
            });
        }

    } catch (err: any) {
        console.error("Error fetching orders:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders, server error",
            error: err.message
        });
    }
});

router.delete('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { userId } = req.body; // We need userId to verify ownership

        if (!orderId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: orderId, userId"
            });
        }

        const { deleteOrder } = require('../services/orderService');
        const result = await deleteOrder(orderId, userId);

        if (result.success) {
            return res.status(200).json({
                success: true,
                message: "Order deleted successfully"
            });
        } else {
            return res.status(400).json({
                success: false,
                message: result.error
            });
        }
    } catch (err: any) {
        console.error("Error deleting order:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete order",
            error: err.message
        });
    }
});

router.put('/:orderId/utr', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { utrNumber, userId } = req.body;

        if (!orderId || !utrNumber || !userId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: orderId, utrNumber, userId"
            });
        }

        // Import updateOrderUTR dynamically or ensure it is exported from orderService
        const { updateOrderUTR } = require('../services/orderService');
        const result = await updateOrderUTR(orderId, utrNumber, userId);

        if (result.success) {
            return res.status(200).json({
                success: true,
                message: "UTR updated successfully",
                data: result.data
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed to update UTR",
                error: result.error
            });
        }

    } catch (err: any) {
        console.error("Error updating UTR:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to update UTR, server error",
            error: err.message
        });
    }
});

router.get('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        // Import prisma dynamically or ensure it is available
        const { prisma } = require('../services/prisma');

        let order;
        try {
            order = await prisma.order.findUnique({
                where: { id: orderId }
            });
        } catch (error: any) {
            if (error.code === 'P1017') {
                console.log("⚠️ Database connection closed (P1017), retrying...");
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s
                order = await prisma.order.findUnique({
                    where: { id: orderId }
                });
            } else {
                throw error;
            }
        }

        if (order) {
            return res.status(200).json({
                success: true,
                data: order
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

    } catch (err: any) {
        console.error("Error fetching order:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch order",
            error: err.message
        });
    }
});

export default router;
