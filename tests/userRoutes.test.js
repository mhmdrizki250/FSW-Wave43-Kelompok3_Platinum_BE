const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const { registerUser, loginUser } = require('../controllers/userController');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

// Mock controller functions
jest.mock('../controllers/userController');

describe('User Routes', () => {
  describe('POST /api/users/register', () => {
    it('should register a user', async () => {
      const mockUser = {
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com',
        role: 'user',
      };

      registerUser.mockImplementation((req, res) => {
        res.status(201).json({ message: 'User registered successfully' });
      });

      const response = await request(app)
        .post('/api/users/register')
        .send(mockUser);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login a user', async () => {
      const mockLogin = {
        username: 'testuser',
        password: 'password123',
      };

      loginUser.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Login successful', role: 'user' });
      });

      const response = await request(app)
        .post('/api/users/login')
        .send(mockLogin);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.role).toBe('user');
    });
  });
});
