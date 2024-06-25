const pool = require('../config/db');

const createProduct = async (name, description, price, stock, image_url) => {
    const result = await pool.query(
        `INSERT INTO products (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, description, price, stock, image_url]
    );
    return result.rows[0];
};

const getProducts = async () => {
    const result = await pool.query(`SELECT * FROM products`);
    return result.rows;
};

const getProductById = async (product_id) => {
    const result = await pool.query(`SELECT * FROM products WHERE product_id = $1`, [product_id]);
    return result.rows[0];
};

const updateProduct = async (product_id, name, description, price, stock, image_url) => {
    const result = await pool.query(
        `UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image_url = $5 WHERE product_id = $6 RETURNING *`,
        [name, description, price, stock, image_url, product_id]
    );
    return result.rows[0];
};

const deleteProduct = async (product_id) => {
    await pool.query(`DELETE FROM products WHERE product_id = $1`, [product_id]);
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
