import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Category from '../models/Category.js';
import Food from '../models/Food.js';
import { sampleCategories, sampleFoods } from './seedData.js';

dotenv.config();

const forceSeed = async () => {
  try {
    await connectDB();
    console.log('Clearing existing categories and foods...');
    await Category.deleteMany({});
    await Food.deleteMany({});

    console.log('Inserting seed categories...');
    await Category.insertMany(sampleCategories);

    console.log('Inserting seed food items...');
    await Food.insertMany(sampleFoods);

    console.log('✅ Database force seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Force seed failed:', error);
    process.exit(1);
  }
};

forceSeed();
