const request = require('supertest');
const express = require('express');
const shippingRoutes = require('../routes/shippingRoutes');
const { confirmOrderDetails } = require('../controllers/shippingController');

const app = express();
app.use(express.json());
app.use('/api/shipping', shippingRoutes);

// Mock controller function
jest.mock('../controllers/shippingController');

describe('Shipping Routes', () => {
  describe('POST /api/shipping/:order_id/confirm', () => {
    it('should confirm order details', async () => {
      const mockOrderDetails = {
        order_id: '123',
        shippingInfo: {
          address: '123 Main St',
          city: 'Anytown',
          postal_code: '12345',
          country: 'USA',
        },
        paymentInfo: {
          card_number: '4111111111111111',
          card_name: 'John Doe',
          expiry_date: '12/25',
          cvv: '123',
        },
      };

      confirmOrderDetails.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Order confirmed successfully' });
      });

      const response = await request(app)
        .post('/api/shipping/123/confirm')
        .send(mockOrderDetails);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Order confirmed successfully');
    });
  });
});
