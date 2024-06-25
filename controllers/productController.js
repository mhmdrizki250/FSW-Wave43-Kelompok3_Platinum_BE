const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../models/productModel');
const multer = require('multer');
const path = require('path');

// Konfigurasi Multer untuk menyimpan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        const product = await createProduct(name, description, price, stock, image_url);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Fungsi lain tetap sama, tetapi tambahkan middleware upload di rute yang memerlukan pengunggahan file
module.exports = {
    addProduct,
    getAllProducts: async (req, res) => {
        try {
            const products = await getProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    },
    getProduct: async (req, res) => {
        const { product_id } = req.params;
        try {
            const product = await getProductById(product_id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    },
    modifyProduct: async (req, res) => {
        const { product_id } = req.params;
        const { name, description, price, stock } = req.body;
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;
        try {
            const product = await updateProduct(product_id, name, description, price, stock, image_url);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    },
    removeProduct: async (req, res) => {
        const { product_id } = req.params;
        try {
            await deleteProduct(product_id);
            res.status(204).json();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    },
    upload
};
