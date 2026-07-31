import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { autoSeedDatabase } from './seed/autoSeed.js';
import foodRoutes from './routes/foodRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/foods', foodRoutes);
app.use('/api/categories', categoryRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    restaurant: 'Pearl Hotel',
    message: 'Pearl Hotel Restaurant API Server is running smoothly.',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('👑 Pearl Hotel 2026 Luxury Restaurant API is Live!');
});

// Start Server & Connect Database
const startServer = async () => {
  try {
    await connectDB();
    await autoSeedDatabase();

    app.listen(PORT, () => {
      console.log(`\n🚀 Pearl Hotel Backend Server running on http://localhost:${PORT}`);
      console.log(`🍔 API Base URL: http://localhost:${PORT}/api/foods\n`);
    });
  } catch (error) {
    console.error('Failed to launch server:', error);
  }
};

startServer();
