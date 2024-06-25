const { addToCart, getCartItems, updateCartItem, removeCartItem, clearCart } = require('../models/cartModel');

const addCartItem = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  try {
    const cartItem = await addToCart(user_id, product_id, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getCart = async (req, res) => {
  const { user_id } = req.params;
  try {
    const cartItems = await getCartItems(user_id);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const updateCart = async (req, res) => {
  const { cart_id } = req.params;
  const { quantity } = req.body;
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }
  try {
    const cartItem = await updateCartItem(cart_id, quantity);
    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const deleteCartItem = async (req, res) => {
  const { cart_id } = req.params;
  try {
    await removeCartItem(cart_id);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const emptyCart = async (req, res) => {
  const { user_id } = req.params;
  try {
    await clearCart(user_id);
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  addCartItem,
  getCart,
  updateCart,
  deleteCartItem,
  emptyCart
};
