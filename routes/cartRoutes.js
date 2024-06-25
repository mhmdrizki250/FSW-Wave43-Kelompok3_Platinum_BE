const express = require('express');
const {
    addCartItem,
    getCart,
    updateCart,
    deleteCartItem,
    emptyCart
} = require('../controllers/cartController');

const router = express.Router();

router.post('/cart', addCartItem);
router.get('/cart/:user_id', getCart);
router.put('/cart/:cart_id', updateCart);
router.delete('/cart/:cart_id', deleteCartItem);
router.delete('/cart/user/:user_id', emptyCart);

module.exports = router;
