const express = require('express');
const { confirmOrderDetails } = require('../controllers/shippingController');

const router = express.Router();

router.post('/:order_id/confirm', confirmOrderDetails);

module.exports = router;
