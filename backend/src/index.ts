import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Added import for cookie-parser
import authRoutes from './routes/auth';
import orderRoutes from './routes/orders';
import webhookRoutes from './routes/webhooks';
import userRoutes from './routes/users'; // Added import for user routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Added cookieParser middleware

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/users', userRoutes); // Added user routes

app.get('/', (req, res) => {
    res.send('SolUPI Backend is running');
});

import { startEmailWatcher } from './services/emailWatcher';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Start the email watcher
    startEmailWatcher();
});
// Restart trigger 2
