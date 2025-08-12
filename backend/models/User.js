const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  linkId: { 
    type: String, 
    default: uuidv4,
    unique: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;