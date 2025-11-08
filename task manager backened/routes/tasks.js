const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Update path if needed

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Fetch tasks error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    console.log('Task create request body:', req.body); // debug log
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    console.error('Task update error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Task delete error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
