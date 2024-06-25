const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const shippingRoutes = require('./routes/shippingRoutes');

const app = express();
const port = process.env.PORT || 4040;

app.use(cors());
app.use(express.json());

// Sajikan file statis dari direktori 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api/shipping', shippingRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
