const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: false // Make user field optional for adding tasks without login
  },
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String, 
    default: '' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
