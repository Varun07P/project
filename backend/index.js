// server.js
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
// const connectDB = require('./config/db');
const cors = require('cors')

// Create an Express app
const app = express();
const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();  // Test the connection
    console.log('Database connection is active.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
const authRoutes = require('./routes/auth');
const AdminRoutes = require('./routes/admin');
const sequelize = require('./config/sqlDB');

// Middleware
app.use(express.json()); 
app.use(cors()); 
app.use('/api/products', productRoutes);
app.use('/api/user', authRoutes);
app.use('/api/admin', AdminRoutes);



// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:3000');
});
