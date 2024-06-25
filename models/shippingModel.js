const pool = require('../config/db');

const addShippingInfo = async (order_id, shippingInfo) => {
  const result = await pool.query(
    `INSERT INTO shipping_info (order_id, address, city, postal_code, country) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [order_id, shippingInfo.address, shippingInfo.city, shippingInfo.postalCode, shippingInfo.country]
  );
  return result.rows[0];
};

const addPaymentInfo = async (order_id, paymentInfo) => {
  const result = await pool.query(
    `INSERT INTO payment_info (order_id, card_number, card_name, expiry_date, cvv) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [order_id, paymentInfo.cardNumber, paymentInfo.cardName, paymentInfo.expiryDate, paymentInfo.cvv]
  );
  return result.rows[0];
};

module.exports = {
  addShippingInfo,
  addPaymentInfo,
};
