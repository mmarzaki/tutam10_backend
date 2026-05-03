const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Hapus useNewUrlParser dan useUnifiedTopology karena sudah tidak didukung di versi baru
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notesapp');
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;