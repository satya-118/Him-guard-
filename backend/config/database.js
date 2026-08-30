import mongoose from 'mongoose';

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.log('MongoDB URI not set. Using in-memory demo data.');
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully.');
    return true;
  } catch (error) {
    console.warn(`MongoDB unavailable: ${error.message}. Using demo data.`);
    return false;
  }
}
