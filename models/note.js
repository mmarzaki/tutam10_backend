const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Note title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  content: {
    type: String,
    default: '',
    maxlength: [50000, 'Content too long'],
  },
  color: {
    type: String,
    default: '#f5f0e8',
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Max 10 notes per user enforced in service layer
module.exports = mongoose.model('Note', noteSchema);