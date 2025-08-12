const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: { 
    type: String, 
    required: true 
  },
  originalName: { 
    type: String 
  },
  caption: { 
    type: String, 
    default: '' 
  },
  receiverId: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;