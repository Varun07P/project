// routes/product.js
const express = require('express');
const Product = require('../models/Product');  // Sequelize model
const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, category, price, originalPrice, rating, isNew, discount, image, description } = req.body;

  try {
    // Use Sequelize's create method to insert a new product into the database
    const newProduct = await Product.create({
      name,
      category,
      price,
      originalPrice,
      rating,
      isNew,
      discount,
      image,
      description,
    });

    // Respond with a success message and the newly created product
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct, // The newly created product is returned
    });
  } catch (err) {
    // If there is any error, send a 400 status and the error message
    res.status(400).json({
      error: err.message, // Send the error message to the client
    });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    // Use Sequelize's findAll method to get all products
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Use Sequelize's findByPk (find by primary key) method
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Use Sequelize's update method and pass the updated data
    const [updatedRowsCount, updatedProducts] = await Product.update(updatedData, {
      where: { id },
      returning: true,  // This option ensures that the updated records are returned
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProducts[0],  // the updated product
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Use Sequelize's destroy method to delete the product by ID
    const deletedRowsCount = await Product.destroy({
      where: { id },
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
