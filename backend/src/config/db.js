import mongoose from 'mongoose';

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'pearl_hotel',
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ [MongoDB Connected]: ${conn.connection.host} (Database: ${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ [DB Notice]: MongoDB Atlas connection timed out/unavailable (${error.message}). Running Express Server with high-performance memory fallback.`);
    return null;
  }
};
