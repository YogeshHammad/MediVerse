const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We use 127.0.0.1 instead of localhost to avoid common Node.js errors
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;