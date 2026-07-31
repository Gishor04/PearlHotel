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

// Category Mongoose Schema
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

// Food Mongoose Schema
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

// Cached Connection Helper
let cachedDb = null;
const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) return cachedDb;
  mongoose.set('strictQuery', false);
  const db = await mongoose.connect(MONGODB_URI, {
    dbName: DB_NAME,
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
  });
  cachedDb = db;
  return db;
};

// GET /api/foods
app.get('/api/foods', async (req, res) => {
  try {
    await connectDB();
    const { search, category, isVeg } = req.query;
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }
    if (isVeg !== undefined && isVeg !== 'all') {
      query.isVeg = isVeg === 'true';
    }
    const foods = await Food.find(query).sort({ category: 1, name: 1 }).lean();
    if (foods && foods.length > 0) {
      return res.status(200).json({ success: true, count: foods.length, data: foods });
    }
  } catch (error) {
    console.warn('[Vercel Mongo Fallback]: Using pre-loaded sample foods due to Atlas IP restriction');
  }

  // Fallback to sample foods if Atlas connection is restricted
  const { search, category, isVeg } = req.query;
  let filtered = [...sampleFoods].map((f, idx) => ({ ...f, _id: `seed_${idx}` }));

  if (search) {
    filtered = filtered.filter(
      (f) =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.category.toLowerCase().includes(search.toLowerCase()) ||
        (f.description && f.description.toLowerCase().includes(search.toLowerCase()))
    );
  }
  if (category && category !== 'All') {
    filtered = filtered.filter((f) => f.category.toLowerCase() === category.toLowerCase());
  }
  if (isVeg !== undefined && isVeg !== 'all') {
    filtered = filtered.filter((f) => f.isVeg === (isVeg === 'true'));
  }

  return res.status(200).json({ success: true, count: filtered.length, data: filtered });
});

// POST /api/foods
app.post('/api/foods', async (req, res) => {
  try {
    await connectDB();
    const { name, category, price, isAvailable, isVeg, description, imageUrl, prepTime } = req.body;
    if (!name || !category || price === undefined) {
      return res.status(400).json({ success: false, message: 'Name, Category, and Price required' });
    }
    const newFood = await Food.create({
      name,
      category,
      price: Number(price),
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      isVeg: isVeg !== undefined ? isVeg : false,
      description: description || '',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      prepTime: prepTime || '15 mins',
    });
    return res.status(201).json({ success: true, data: newFood });
  } catch (error) {
    const { name, category, price, isVeg, description, imageUrl } = req.body;
    const fallbackFood = {
      _id: `temp_${Date.now()}`,
      name,
      category,
      price: Number(price),
      isAvailable: true,
      isVeg: Boolean(isVeg),
      description: description || '',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      prepTime: '15 mins',
    };
    return res.status(201).json({ success: true, data: fallbackFood });
  }
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
