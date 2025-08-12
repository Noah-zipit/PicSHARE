const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const imageRoutes = require('./routes/images');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files - IMPORTANT for uploads
app.use(express.static(path.join(__dirname, 'public')));

// Explicitly serve the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);

// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));