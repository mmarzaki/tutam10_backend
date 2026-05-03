const Note = require('../models/note');

const MAX_NOTES = 10;

// GET /api/notes
const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ isPinned: -1, updatedAt: -1 });
    res.json({ success: true, data: notes });
  } catch (err) { next(err); }
};

// POST /api/notes
const createNote = async (req, res, next) => {
  try {
    const count = await Note.countDocuments({ user: req.user._id });
    if (count >= MAX_NOTES) {
      return res.status(400).json({ success: false, message: `Maximum ${MAX_NOTES} notes allowed` });
    }
    const note = await Note.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: note });
  } catch (err) { next(err); }
};

// PUT /api/notes/:id
const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
    res.json({ success: true, data: note });
  } catch (err) { next(err); }
};

// DELETE /api/notes/:id
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
    res.json({ success: true, message: 'Note deleted' });
  } catch (err) { next(err); }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };