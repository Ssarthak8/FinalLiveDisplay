import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB(): Promise<void> {
  const uri = env.MONGODB_URI;

  try {
    console.log(`📡 Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('\n❌ =================================================================');
    console.error(`❌ CRITICAL ERROR: Could not connect to MongoDB at ${uri}`);
    console.error('❌ Ensure the database service is running and accessible.');
    console.error('❌ =================================================================\n');
    console.error(error);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB runtime error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
  });
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('🛑 MongoDB connection closed');
}

