import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { sampleCategories, sampleFoods } from '../backend/src/seed/seedData.js';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://gishor14_db_user:2000227@cluster0.go8u2pz.mongodb.net/?appName=Cluster0';
const DB_NAME = process.env.DB_NAME || 'pearl_hotel';

// Category Schema
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: String,
    icon: { type: String, default: 'Utensils' },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

// Food Schema
const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    isVeg: { type: Boolean, default: false },
    description: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    prepTime: { type: String, default: '15 mins' },
  },
  { timestamps: true }
);

const Food = mongoose.models.Food || mongoose.model('Food', foodSchema);

// Memory fallback store for Vercel lambdas
let memoryFoodsStore = [];

// Cached Mongoose Connection
let cachedDb = null;
const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) return cachedDb;
  mongoose.set('strictQuery', false);
  const db = await mongoose.connect(MONGODB_URI, {
    dbName: DB_NAME,
    serverSelectionTimeoutMS: 2500,
    connectTimeoutMS: 2500,
  });
  cachedDb = db;
  return db;
};

// GET /api/foods
app.get('/api/foods', async (req, res) => {
  let dbFoods = [];

  try {
    await connectDB();
    dbFoods = await Food.find({}).sort({ createdAt: -1, name: 1 }).lean();
  } catch (error) {
    console.warn('[Vercel Mongo Warning]: Using memory fallback store');
  }

  // Base list
  let baseList = dbFoods.length > 0
    ? dbFoods
    : sampleFoods.map((f, idx) => ({ ...f, _id: `seed_${idx}` }));

  // Combine baseList + memoryFoodsStore
  const combinedMap = new Map();
  baseList.forEach((item) => combinedMap.set(item.name.toLowerCase().trim(), item));
  memoryFoodsStore.forEach((item) => combinedMap.set(item.name.toLowerCase().trim(), item));

  let finalFoods = Array.from(combinedMap.values());

  // Filter search, category, isVeg
  const { search, category, isVeg } = req.query;
  if (search) {
    finalFoods = finalFoods.filter(
      (f) =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.category.toLowerCase().includes(search.toLowerCase()) ||
        (f.description && f.description.toLowerCase().includes(search.toLowerCase()))
    );
  }
  if (category && category !== 'All') {
    finalFoods = finalFoods.filter((f) => f.category.toLowerCase() === category.toLowerCase());
  }
  if (isVeg !== undefined && isVeg !== 'all') {
    finalFoods = finalFoods.filter((f) => f.isVeg === (isVeg === 'true'));
  }

  return res.status(200).json({ success: true, count: finalFoods.length, data: finalFoods });
});

// POST /api/foods
app.post('/api/foods', async (req, res) => {
  const { name, category, price, isAvailable, isVeg, description, imageUrl, prepTime } = req.body;
  if (!name || !category || price === undefined) {
    return res.status(400).json({ success: false, message: 'Name, Category, and Price required' });
  }

  const newDish = {
    _id: `dish_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name,
    category,
    price: Number(price),
    isAvailable: isAvailable !== undefined ? isAvailable : true,
    isVeg: Boolean(isVeg),
    description: description || '',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    prepTime: prepTime || '15 mins',
    createdAt: new Date().toISOString(),
  };

  // 1. Keep in runtime store
  memoryFoodsStore.unshift(newDish);

  // 2. Persist to Atlas if connected
  try {
    await connectDB();
    const createdDoc = await Food.create({
      name: newDish.name,
      category: newDish.category,
      price: newDish.price,
      isAvailable: newDish.isAvailable,
      isVeg: newDish.isVeg,
      description: newDish.description,
      imageUrl: newDish.imageUrl,
      rating: newDish.rating,
      prepTime: newDish.prepTime,
    });
    newDish._id = createdDoc._id.toString();
  } catch (error) {
    console.warn('[Vercel Mongo Save Warning]: Saved locally in runtime memory:', error.message);
  }

  return res.status(201).json({
    success: true,
    message: 'Food product added successfully',
    data: newDish,
  });
});

// GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    await connectDB();
    const categories = await Category.find().sort({ name: 1 }).lean();
    if (categories && categories.length > 0) {
      return res.status(200).json({ success: true, count: categories.length, data: categories });
    }
  } catch (error) {
    console.warn('[Vercel Mongo Fallback]: Using pre-loaded categories');
  }

  const fallbackCategories = sampleCategories.map((c, idx) => ({ ...c, _id: `cat_${idx}` }));
  return res.status(200).json({ success: true, count: fallbackCategories.length, data: fallbackCategories });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'online', restaurant: 'Pearl Hotel Jaffna' });
});

export default app;
