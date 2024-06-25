const express = require('express');
const { addProduct, getAllProducts, getProduct, modifyProduct, removeProduct, upload } = require('../controllers/productController');

const router = express.Router();

router.post('/products', upload.single('image'), addProduct);
router.get('/products', getAllProducts);
router.get('/products/:product_id', getProduct);
router.put('/products/:product_id', upload.single('image'), modifyProduct);
router.delete('/products/:product_id', removeProduct);

module.exports = router;
