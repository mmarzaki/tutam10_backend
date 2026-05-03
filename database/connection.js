const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // BERSIHKAN: Hapus useNewUrlParser dan useUnifiedTopology
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notesapp');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// EKSPOR LANGSUNG
module.exports = connectDB;