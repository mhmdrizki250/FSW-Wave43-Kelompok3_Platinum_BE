const pool = require('../config/db');

const addToCart = async (user_id, product_id, quantity) => {
  const result = await pool.query(
    `INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`,
    [user_id, product_id, quantity]
  );
  return result.rows[0];
};

const getCartItems = async (user_id) => {
  const result = await pool.query(
    `SELECT c.cart_id, c.quantity, p.product_id, p.name, p.description, p.price, p.image_url 
     FROM carts c 
     JOIN products p ON c.product_id = p.product_id 
     WHERE c.user_id = $1`,
    [user_id]
  );
  return result.rows;
};

const updateCartItem = async (cart_id, quantity) => {
  const result = await pool.query(
    `UPDATE carts SET quantity = $1 WHERE cart_id = $2 RETURNING *`,
    [quantity, cart_id]
  );
  return result.rows[0];
};

const removeCartItem = async (cart_id) => {
  await pool.query(`DELETE FROM carts WHERE cart_id = $1`, [cart_id]);
};

const clearCart = async (user_id) => {
  await pool.query(`DELETE FROM carts WHERE user_id = $1`, [user_id]);
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart
};
