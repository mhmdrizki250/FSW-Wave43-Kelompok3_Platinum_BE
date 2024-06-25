const request = require('supertest');
const express = require('express');
const orderRoutes = require('../routes/orderRoutes');
const {
  createOrder,
  getUserOrders,
  getOrderDetails,
  getOrderConfirmation,
  confirmOrder,
  confirmOrderDetails,
  deleteOrder,
  generateReceiptPDF
} = require('../controllers/orderController');

const app = express();
app.use(express.json());
app.use('/api', orderRoutes);

// Mock controller functions
jest.mock('../controllers/orderController');

describe('Order Routes', () => {
  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      createOrder.mockImplementation((req, res) => {
        res.status(201).json({ message: 'Order created successfully' });
      });

      const response = await request(app)
        .post('/api/orders')
        .send({ user_id: 1, total_price: 100, order_items: [{ product_id: 1, quantity: 2, price: 50 }] });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Order created successfully');
    });
  });

  describe('GET /api/orders/user/:user_id', () => {
    it('should get orders for a user', async () => {
      const mockOrders = [
        { order_id: 1, user_id: 1, total_price: 100 },
        { order_id: 2, user_id: 1, total_price: 200 }
      ];

      getUserOrders.mockImplementation((req, res) => {
        res.status(200).json(mockOrders);
      });

      const response = await request(app).get('/api/orders/user/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrders);
    });
  });

  describe('GET /api/orders/:order_id', () => {
    it('should get order details by ID', async () => {
      const mockOrder = { order_id: 1, user_id: 1, total_price: 100 };

      getOrderDetails.mockImplementation((req, res) => {
        res.status(200).json(mockOrder);
      });

      const response = await request(app).get('/api/orders/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrder);
    });
  });

  describe('GET /api/order-confirmation/:order_id', () => {
    it('should get order confirmation by ID', async () => {
      const mockConfirmation = { order_id: 1, confirmation_status: 'Confirmed', confirmed_at: '2024-06-30T12:34:56Z' };

      getOrderConfirmation.mockImplementation((req, res) => {
        res.status(200).json(mockConfirmation);
      });

      const response = await request(app).get('/api/order-confirmation/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockConfirmation);
    });
  });

  describe('POST /api/orders/:order_id/confirm-order', () => {
    it('should confirm an order', async () => {
      confirmOrder.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Order confirmed successfully' });
      });

      const response = await request(app).post('/api/orders/1/confirm-order');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Order confirmed successfully');
    });
  });

  describe('POST /api/orders/:order_id/confirm', () => {
    it('should confirm order details', async () => {
      confirmOrderDetails.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Order details confirmed successfully' });
      });

      const response = await request(app)
        .post('/api/orders/1/confirm')
        .send({ address: '123 Main St', city: 'Anytown', postal_code: '12345', country: 'USA', card_number: '1234567890123456', card_name: 'John Doe', expiry_date: '12/25', cvv: '123' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Order details confirmed successfully');
    });
  });

  describe('DELETE /api/orders/:order_id', () => {
    it('should delete an order', async () => {
      deleteOrder.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Order deleted successfully' });
      });

      const response = await request(app).delete('/api/orders/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Order deleted successfully');
    });
  });

  describe('GET /api/orders/:order_id/receipt-pdf', () => {
    it('should generate a receipt PDF', async () => {
      generateReceiptPDF.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Receipt PDF generated successfully' });
      });

      const response = await request(app).get('/api/orders/1/receipt-pdf');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Receipt PDF generated successfully');
    });
  });
});
