const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Configure storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function(req, file, cb) {
    // Create unique filename
    crypto.randomBytes(16, (err, buf) => {
      if (err) return cb(err);
      
      const uniqueSuffix = Date.now() + '-' + buf.toString('hex');
      cb(null, uniqueSuffix + path.extname(file.originalname));
    });
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept only images
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

// Setup upload
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

module.exports = upload;