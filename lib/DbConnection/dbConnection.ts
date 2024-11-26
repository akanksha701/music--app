import mongoose from 'mongoose';
const connectToDatabase = async() => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/music-app';
    
    await mongoose.connect(uri, {
      // serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      // socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectToDatabase;