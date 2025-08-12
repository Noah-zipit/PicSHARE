const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace with your MongoDB Atlas connection string
    const conn = await mongoose.connect('mongodb+srv://noahext994:k2YQDIHvaKTXSs7w@cluster0.zeheek9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;