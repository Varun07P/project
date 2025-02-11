const express = require('express');
const { register, login } = require('../controlls/authControlls');
const User = require('../models/auth');
const {protect} = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      const user = await User.create({
          name,
          username,
          email,
          password
      });

      res.status(201).json({
          message: 'User registered successfully',
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: 'Server error',
      });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find user by email
      const user = await User.findOne({ where: { email } });

      if (!user || !(await user.matchPassword(password))) {
          return res.status(401).json({
              message: 'Invalid credentials',
          });
      }

      // Create JWT token
      const token = jwt.sign({ id: user.id }, '133a889e51573dae5d1f527089e91a3c3c4d547490c4e762bd6a3416905a11c811e8c93bdf9a2cac853ae8c6ed89890deff99826d67b469d758667bc26d9df45', {
          expiresIn: '1d', // Token expires in 1 day
      });

      res.json({
          token,
          user: {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
          },
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          error,
          message: 'Server error',
      });
  }
});

router.get('/verify', protect, async (req, res) => {
  try {
      // Fetch the user by ID from the database using Sequelize's `findOne`
      const user = await User.findOne({
          where: { id: req.user.id }  // Use the user ID from the token (attached by `protect` middleware)
      });

      // If user is not found
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Send user details (excluding the password)
      res.json({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email
      });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;