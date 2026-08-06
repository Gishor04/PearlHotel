import mongoose from 'mongoose';
import Food from '../models/Food.js';
import { sampleFoods } from '../seed/seedData.js';

let inMemoryFoods = [...sampleFoods.map((item, idx) => ({ ...item, _id: `food-${idx + 1}` }))];

// Get all foods with search & category query filters
export const getFoods = async (req, res) => {
  try {
    const { search, category, isVeg, isAvailable } = req.query;

    if (mongoose.connection.readyState === 1) {
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

      if (isAvailable !== undefined && isAvailable !== 'all') {
        query.isAvailable = isAvailable === 'true';
      }

      const foods = await Food.find(query).sort({ category: 1, name: 1 });
      return res.status(200).json({ success: true, count: foods.length, data: foods });
    }

    // In-memory fallback filtering
    let filtered = [...inMemoryFoods];

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(s) ||
          f.category.toLowerCase().includes(s) ||
          (f.description && f.description.toLowerCase().includes(s))
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter((f) => f.category.toLowerCase() === category.toLowerCase());
    }

    if (isVeg !== undefined && isVeg !== 'all') {
      filtered = filtered.filter((f) => f.isVeg === (isVeg === 'true'));
    }

    if (isAvailable !== undefined && isAvailable !== 'all') {
      filtered = filtered.filter((f) => f.isAvailable === (isAvailable === 'true'));
    }

    res.status(200).json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    res.status(200).json({ success: true, count: inMemoryFoods.length, data: inMemoryFoods });
  }
};

// Get single food item
export const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      const food = await Food.findById(id);
      if (food) return res.status(200).json({ success: true, data: food });
    }

    const found = inMemoryFoods.find((f) => f._id === id || f.name === id);
    if (found) return res.status(200).json({ success: true, data: found });

    res.status(404).json({ success: false, message: 'Food item not found' });
  } catch (error) {
    res.status(200).json({ success: true, data: inMemoryFoods[0] });
  }
};

// Create new food
export const createFood = async (req, res) => {
  try {
    const { name, category, price, isAvailable, isVeg, description, imageUrl, rating, prepTime } = req.body;

    if (!name || !category || price === undefined || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Name, Category, Price, and Image URL are required fields',
      });
    }

    if (mongoose.connection.readyState === 1) {
      const newFood = await Food.create({
        name,
        category,
        price: Number(price),
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        isVeg: isVeg !== undefined ? isVeg : false,
        description: description || '',
        imageUrl,
        rating: rating ? Number(rating) : 4.8,
        prepTime: prepTime || '15-20 mins',
      });
      return res.status(201).json({ success: true, message: 'Food product added successfully', data: newFood });
    }

    const memoryItem = {
      _id: `custom-${Date.now()}`,
      name,
      category,
      price: Number(price),
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      isVeg: isVeg !== undefined ? isVeg : false,
      description: description || '',
      imageUrl,
      rating: rating ? Number(rating) : 4.8,
      prepTime: prepTime || '15-20 mins',
    };

    inMemoryFoods.unshift(memoryItem);
    res.status(201).json({ success: true, message: 'Food product added successfully (In-Memory)', data: memoryItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update food
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const food = await Food.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (food) return res.status(200).json({ success: true, message: 'Food item updated', data: food });
    }

    const idx = inMemoryFoods.findIndex((f) => f._id === id);
    if (idx !== -1) {
      inMemoryFoods[idx] = { ...inMemoryFoods[idx], ...req.body };
      return res.status(200).json({ success: true, message: 'Food item updated', data: inMemoryFoods[idx] });
    }

    res.status(404).json({ success: false, message: 'Food item not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete food
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      await Food.findByIdAndDelete(id);
    }

    inMemoryFoods = inMemoryFoods.filter((f) => f._id !== id);
    res.status(200).json({ success: true, message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Food Availability
export const toggleAvailability = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const food = await Food.findById(id);
      if (food) {
        food.isAvailable = !food.isAvailable;
        await food.save();
        return res.status(200).json({
          success: true,
          message: `Food availability updated to ${food.isAvailable ? 'Available' : 'Out of Stock'}`,
          data: food,
        });
      }
    }

    const idx = inMemoryFoods.findIndex((f) => f._id === id);
    if (idx !== -1) {
      inMemoryFoods[idx].isAvailable = !inMemoryFoods[idx].isAvailable;
      return res.status(200).json({
        success: true,
        message: `Food availability updated to ${inMemoryFoods[idx].isAvailable ? 'Available' : 'Out of Stock'}`,
        data: inMemoryFoods[idx],
      });
    }

    res.status(404).json({ success: false, message: 'Food item not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
