import express from 'express';
import { prisma } from '../services/prisma';

const router = express.Router();

// GET /api/users/:id - Read User
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
                username: true,
                mobile: true,
                email: true,
                walletAddr: true,
                isVerified: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (error: any) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

// PUT /api/users/:id - Update User
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, firstName, lastName, username, mobile, walletAddr } = req.body;

        // Basic validation
        if (!name && !firstName && !lastName && !username && !mobile && !walletAddr) {
            return res.status(400).json({ success: false, message: "No fields to update provided" });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
                ...(username && { username }),
                ...(mobile && { mobile }),
                ...(walletAddr && { walletAddr })
            },
            select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
                username: true,
                mobile: true,
                email: true,
                walletAddr: true,
                isVerified: true,
                createdAt: true
            }
        });

        return res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser });
    } catch (error: any) {
        console.error("Error updating user:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

// DELETE /api/users/:id - Delete User
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Optional: Check if user has active orders before deleting? 
        // For now, we'll assume a hard delete is what's requested for the requirement.
        // Prisma might throw foreign key constraint errors if we don't cascade or handle orders.
        // Let's check if we need to delete orders first.

        // Delete related orders first (simple approach for this requirement)
        await prisma.order.deleteMany({
            where: { userId: id }
        });

        await prisma.user.delete({
            where: { id }
        });

        return res.status(200).json({ success: true, message: "User account deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting user:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});

export default router;
