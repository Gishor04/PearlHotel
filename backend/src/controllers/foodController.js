import Food from '../models/Food.js';

// Get all foods with search & category query filters
export const getFoods = async (req, res) => {
  try {
    const { search, category, isVeg, isAvailable } = req.query;
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
    res.status(200).json({ success: true, count: foods.length, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single food item
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food item not found' });
    }
    res.status(200).json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

    res.status(201).json({ success: true, message: 'Food product added successfully', data: newFood });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update food
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ success: false, message: 'Food item not found' });
    }

    const updatedFood = await Food.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Food item updated successfully', data: updatedFood });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete food
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);

    if (!food) {
      return res.status(404).json({ success: false, message: 'Food item not found' });
    }

    res.status(200).json({ success: true, message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Food Availability
export const toggleAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ success: false, message: 'Food item not found' });
    }

    food.isAvailable = !food.isAvailable;
    await food.save();

    res.status(200).json({
      success: true,
      message: `Food availability updated to ${food.isAvailable ? 'Available' : 'Out of Stock'}`,
      data: food,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
