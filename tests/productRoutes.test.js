const request = require('supertest');
const express = require('express');
const productRoutes = require('../routes/productRoutes');
const {
  addProduct,
  getAllProducts,
  getProduct,
  modifyProduct,
  removeProduct,
  upload,
} = require('../controllers/productController');

const app = express();
app.use(express.json());
app.use('/api', productRoutes);

// Mock controller functions
jest.mock('../controllers/productController');

describe('Product Routes', () => {
  describe('POST /api/products', () => {
    it('should add a new product', async () => {
      const mockProduct = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
      };

      addProduct.mockImplementation((req, res) => {
        res.status(201).json({ message: 'Product added successfully' });
      });

      const response = await request(app)
        .post('/api/products')
        .field('name', mockProduct.name)
        .field('description', mockProduct.description)
        .field('price', mockProduct.price)
        .field('stock', mockProduct.stock);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Product added successfully');
    });
  });

  describe('GET /api/products', () => {
    it('should get all products', async () => {
      const mockProducts = [
        { product_id: 1, name: 'Product 1', price: 50 },
        { product_id: 2, name: 'Product 2', price: 100 },
      ];

      getAllProducts.mockImplementation((req, res) => {
        res.status(200).json(mockProducts);
      });

      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProducts);
    });
  });

  describe('GET /api/products/:product_id', () => {
    it('should get a single product by ID', async () => {
      const mockProduct = { product_id: 1, name: 'Product 1', price: 50 };

      getProduct.mockImplementation((req, res) => {
        res.status(200).json(mockProduct);
      });

      const response = await request(app).get('/api/products/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProduct);
    });
  });

  describe('PUT /api/products/:product_id', () => {
    it('should modify an existing product', async () => {
      const mockProduct = {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 150,
        stock: 5,
      };

      modifyProduct.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Product modified successfully' });
      });

      const response = await request(app)
        .put('/api/products/1')
        .field('name', mockProduct.name)
        .field('description', mockProduct.description)
        .field('price', mockProduct.price)
        .field('stock', mockProduct.stock);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product modified successfully');
    });
  });

  describe('DELETE /api/products/:product_id', () => {
    it('should remove a product', async () => {
      removeProduct.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Product removed successfully' });
      });

      const response = await request(app).delete('/api/products/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product removed successfully');
    });
  });
});
