const { addShippingInfo, addPaymentInfo } = require('../models/shippingModel');

const confirmOrderDetails = async (req, res) => {
  const { order_id } = req.params;
  const { shippingInfo, paymentInfo } = req.body;
  try {
    const shippingData = await addShippingInfo(order_id, shippingInfo);
    const paymentData = await addPaymentInfo(order_id, paymentInfo);
    res.status(200).json({ message: 'Order confirmed', shippingData, paymentData });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  confirmOrderDetails,
};
