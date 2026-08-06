import mongoose from 'mongoose';
import Category from '../models/Category.js';
import { sampleCategories } from '../seed/seedData.js';

let inMemoryCategories = [...sampleCategories.map((item, idx) => ({ ...item, _id: `cat-${idx + 1}` }))];

// Get all categories
export const getCategories = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const categories = await Category.find().sort({ name: 1 });
      return res.status(200).json({ success: true, count: categories.length, data: categories });
    }

    res.status(200).json({ success: true, count: inMemoryCategories.length, data: inMemoryCategories });
  } catch (error) {
    res.status(200).json({ success: true, count: inMemoryCategories.length, data: inMemoryCategories });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, icon, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    if (mongoose.connection.readyState === 1) {
      const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Category already exists' });
      }

      const category = await Category.create({ name, slug, icon: icon || 'Utensils', description: description || '' });
      return res.status(201).json({ success: true, message: 'Category created successfully', data: category });
    }

    const memoryCat = {
      _id: `cat-${Date.now()}`,
      name,
      slug,
      icon: icon || 'Utensils',
      description: description || '',
    };

    inMemoryCategories.push(memoryCat);
    res.status(201).json({ success: true, message: 'Category created successfully (In-Memory)', data: memoryCat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      await Category.findByIdAndDelete(id);
    }

    inMemoryCategories = inMemoryCategories.filter((c) => c._id !== id);
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
