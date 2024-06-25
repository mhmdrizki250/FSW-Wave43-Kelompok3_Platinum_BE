const pool = require('../config/db');

// Function to get user orders
const getUserOrders = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM orders WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};

// Function to get order details
const getOrderDetails = async (order_id) => {
  const result = await pool.query(
    'SELECT * FROM orders WHERE order_id = $1',
    [order_id]
  );
  return result.rows[0];
};

const getShippingInfo = async (order_id) => {
  const result = await pool.query(
    'SELECT * FROM shipping_info WHERE order_id = $1',
    [order_id]
  );
  return result.rows[0];
};

const getPaymentInfo = async (order_id) => {
  const result = await pool.query(
    'SELECT * FROM payment_info WHERE order_id = $1',
    [order_id]
  );
  return result.rows[0];
};

// Function to get order confirmation
const getOrderConfirmation = async (order_id) => {
  const result = await pool.query(
    `SELECT * FROM order_confirmations WHERE order_id = $1`,
    [order_id]
  );
  return result.rows[0];
};

// Function to create order in database
const createOrderInDb = async (user_id, total_price, order_items) => {
  const orderResult = await pool.query(
    `INSERT INTO orders (user_id, total_price, order_status) VALUES ($1, $2, 'Pending') RETURNING *`,
    [user_id, total_price]
  );

  const orderId = orderResult.rows[0].order_id;

  for (const item of order_items) {
    await pool.query(
      `INSERT INTO order_details (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)`,
      [orderId, item.product_id, item.quantity, item.price]
    );
  }

  return orderResult.rows[0];
};

// Function to create order confirmation in database
const createOrderConfirmationInDb = async (order_id) => {
  const result = await pool.query(
    `INSERT INTO order_confirmations (order_id, confirmation_status, confirmed_at) VALUES ($1, 'Confirmed', NOW()) RETURNING *`,
    [order_id]
  );
  return result.rows[0];
};

// Function to delete order by ID
const deleteOrderById = async (order_id) => {
  await pool.query(`DELETE FROM orders WHERE order_id = $1`, [order_id]);
};

// Function to add shipping info
const addShippingInfo = async (order_id, shippingInfo) => {
  const { address, city, postal_code, country } = shippingInfo;
  const result = await pool.query(
    `INSERT INTO shipping_info (order_id, address, city, postal_code, country) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [order_id, address, city, postal_code, country]
  );
  return result.rows[0];
};

// Function to add payment info
const addPaymentInfo = async (order_id, paymentInfo) => {
  const { card_number, card_name, expiry_date, cvv } = paymentInfo;
  const result = await pool.query(
    `INSERT INTO payment_info (order_id, card_number, card_name, expiry_date, cvv) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [order_id, card_number, card_name, expiry_date, cvv]
  );
  return result.rows[0];
};


module.exports = {
  getUserOrders,
  getOrderDetails,
  getOrderConfirmation,
  createOrderInDb,
  createOrderConfirmationInDb,
  deleteOrderById,
  addShippingInfo,
  addPaymentInfo,
  getShippingInfo,
  getPaymentInfo,
  getShippingInfo,
  getPaymentInfo
};
