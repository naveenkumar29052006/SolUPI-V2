import express from 'express';
import { prisma } from '../services/prisma';
import { hashPassword, verifyPassword, generateToken } from '../services/auth';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be 6 characters long" });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase()
            }
        });

        if (existingUser) {
            return res.status(409).json({ error: "User with this email already exists" });
        }

        const hashedPassword = await hashPassword(password);

        // Generate a base username from email (e.g., "john.doe" from "john.doe@example.com")
        let baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        let username = baseUsername;
        let counter = 1;

        // Ensure username uniqueness
        while (await prisma.user.findUnique({ where: { username } })) {
            username = `${baseUsername}${counter}`;
            counter++;
        }

        const user = await prisma.user.create({
            data: {
                name: `${firstName} ${lastName}`,
                firstName,
                lastName,
                username,
                email: email.toLowerCase(),
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                isVerified: true,
                createdAt: true
            }
        });

        const token = generateToken(user.id);

        res.cookie("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user,
            token
        });

    } catch (err) {
        console.error("Signup error", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase()
            }
        });

        if (!user) {
            return res.status(401).json({ error: "User not Found" });
        }

        const isValidPassword = await verifyPassword(password, user.password ?? '');

        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = generateToken(user.id);

        const userData = {
            id: user.id,
            name: user.name,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            walletAddr: user.walletAddr,
            createdAt: user.createdAt
        };

        res.cookie("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        return res.status(200).json({
            success: true,
            message: "login successful",
            user: userData,
            token
        });

    } catch (err) {
        console.error("login error", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/logout', (req, res) => {
    res.cookie("auth-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0
    });

    return res.json({
        success: true,
        message: "logged out successfully"
    });
});

export default router;
