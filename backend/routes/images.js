const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Image = require('../models/Image');
const upload = require('../middleware/upload');

const JWT_SECRET = 'your_jwt_secret'; // In production, use environment variable

// Middleware to authenticate JWT token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Upload image to a user by linkId (public route)
router.post('/upload/:linkId', upload.single('image'), async (req, res) => {
  try {
    const { linkId } = req.params;
    const { caption } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ linkId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Create image record
    const image = new Image({
      filename: req.file.filename,
      originalName: req.file.originalname,
      caption: caption || '',
      receiverId: linkId
    });
    
    await image.save();
    
    res.status(201).json({ message: 'Image sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Get user's received images
router.get('/received', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const images = await Image.find({ receiverId: user.linkId })
      .sort({ createdAt: -1 });
    
    // Use absolute URLs for the images
    const backendUrl = 'http://localhost:5001'; // Your backend URL
    
    res.json(images.map(image => ({
      id: image._id,
      filename: image.filename,
      caption: image.caption,
      url: `${backendUrl}/uploads/${image.filename}`,
      createdAt: image.createdAt
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;