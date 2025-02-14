const request = require('supertest');
const express = require('express');
const Product = require('../models/product');
const productRoutes = require('../routes/product');
const sequelize = require('../config/sqlDB');

const app = express();
app.use(express.json());
app.use('/products', productRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset database before tests
});

afterAll(async () => {
  await sequelize.close(); // Close DB connection after tests
});

describe("Product API Tests", () => {

  test("POST /products/add - Should create a new product", async () => {
    const productData = {
      name: "Test Product",
      category: "Electronics",
      price: 100.0,
      originalPrice: 150.0,
      rating: 4,
      isNew: true,
      discount: 30,
      image: "https://example.com/product.jpg",
      description: "A sample product",
    };

    const res = await request(app).post("/products/add").send(productData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Product created successfully");
    expect(res.body.product).toHaveProperty("name", "Test Product");
  });

  test("GET /products - Should fetch all products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /products/:id - Should fetch a product by ID", async () => {
    const product = await Product.create({
      name: "Test Product 2",
      category: "Furniture",
      price: 200.0,
      originalPrice: 250.0,
      rating: 5,
      isNew: false,
      discount: 20,
      image: "https://example.com/product2.jpg",
      description: "A second sample product",
    });

    const res = await request(app).get(`/products/${product.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "Test Product 2");
  });

//   test("PUT /products/:id - Should update a product", async () => {
//     const product = await Product.create({
//       name: "Test Product 3",
//       category: "Home Decor",
//       price: 300.0,
//       originalPrice: 350.0,
//       rating: 3,
//       isNew: true,
//       discount: 10,
//       image: "https://example.com/product3.jpg",
//       description: "A third sample product",
//     });

//     const updatedData = { price: 250.0 };

//     const res = await request(app).put(`/products/${product.id}`).send(updatedData);
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("message", "Product updated successfully");
//     expect(res.body.product).toHaveProperty("price", 250.0);
//   });

  test("DELETE /products/:id - Should delete a product", async () => {
    const product = await Product.create({
      name: "Test Product 4",
      category: "Office",
      price: 400.0,
      originalPrice: 450.0,
      rating: 5,
      isNew: false,
      discount: 15,
      image: "https://example.com/product4.jpg",
      description: "A fourth sample product",
    });

    const res = await request(app).delete(`/products/${product.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Product deleted successfully");

    const notFoundRes = await request(app).get(`/products/${product.id}`);
    expect(notFoundRes.statusCode).toBe(404);
  });

});
