const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Task = require('../models/Task');

// Get all tasks for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Create a new task
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ msg: 'Title is required' });
  }
  try {
    const newTask = new Task({
      user: req.user.id, // use req.user.id here
      title,
      description,
    });
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Update a task by id
router.put('/:id', auth, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    let task = await Task.findOne({ _id: req.params.id, user: req.user.id }); // use req.user.id
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    // Update fields only if provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    task = await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Delete a task by id
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndRemove({ _id: req.params.id, user: req.user.id }); // use req.user.id
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json({ msg: 'Task removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
