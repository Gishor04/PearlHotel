import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { autoSeedDatabase } from './seed/autoSeed.js';
import foodRoutes from './routes/foodRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5010;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Non-blocking DB initialization
(async () => {
  try {
    const conn = await connectDB();
    if (conn) {
      await autoSeedDatabase();
    }
  } catch (err) {
    console.warn('[Server Startup Notice]: DB Connection skipped, using high-performance memory dataset.');
  }
})();

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
  res.send('👑 Pearl Hotel Fine Restaurant API is Live!');
});

// Start listening if run locally
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Pearl Hotel Backend Server running on http://localhost:${PORT}`);
  });
}

export default app;
