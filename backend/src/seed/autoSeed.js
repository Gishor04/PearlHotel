import Category from '../models/Category.js';
import Food from '../models/Food.js';
import { sampleCategories, sampleFoods } from './seedData.js';

export const autoSeedDatabase = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    const foodCount = await Food.countDocuments();

    if (categoryCount === 0) {
      console.log('[Auto-Seed]: Seeding Categories...');
      await Category.insertMany(sampleCategories);
      console.log(`[Auto-Seed]: Successfully inserted ${sampleCategories.length} categories.`);
    } else {
      console.log(`[Auto-Seed]: Categories collection already populated (${categoryCount} items).`);
    }

    if (foodCount === 0) {
      console.log('[Auto-Seed]: Seeding Foods...');
      await Food.insertMany(sampleFoods);
      console.log(`[Auto-Seed]: Successfully inserted ${sampleFoods.length} foods.`);
    } else {
      console.log(`[Auto-Seed]: Foods collection already populated (${foodCount} items).`);
    }
  } catch (error) {
    console.error('[Auto-Seed Error]:', error.message);
  }
};
