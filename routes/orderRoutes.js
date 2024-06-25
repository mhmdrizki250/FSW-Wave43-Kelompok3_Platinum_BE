const express = require('express');
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

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders/user/:user_id', getUserOrders);
router.get('/orders/:order_id', getOrderDetails);
router.get('/order-confirmation/:order_id', getOrderConfirmation);
router.post('/orders/:order_id/confirm-order', confirmOrder);
router.post('/orders/:order_id/confirm', confirmOrderDetails);
router.delete('/orders/:order_id', deleteOrder);
router.get('/orders/:order_id/receipt-pdf', generateReceiptPDF); 

module.exports = router;
