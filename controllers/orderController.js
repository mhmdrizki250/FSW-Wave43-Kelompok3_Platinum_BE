const { 
  getUserOrders, 
  getOrderDetails, 
  getOrderConfirmation, 
  createOrderInDb, 
  createOrderConfirmationInDb, 
  deleteOrderById, 
  addShippingInfo, 
  addPaymentInfo,
  getShippingInfo,
  getPaymentInfo
} = require('../models/orderModel');

const PDFDocument = require('pdfkit');

// Function to create a new order
const createOrder = async (req, res) => {
  const { user_id, total_price, order_items } = req.body;
  try {
    const order = await createOrderInDb(user_id, total_price, order_items);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Function to get all orders for a specific user
const getUserOrdersController = async (req, res) => {
  const { user_id } = req.params;
  try {
    const orders = await getUserOrders(user_id);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Function to get details of a specific order
const getOrderDetailsController = async (req, res) => {
  const { order_id } = req.params;
  try {
    const orderDetails = await getOrderDetails(order_id);
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Function to get the confirmation status of a specific order
const getOrderConfirmationController = async (req, res) => {
  const { order_id } = req.params;
  try {
    const orderConfirmation = await getOrderConfirmation(order_id);
    res.status(200).json(orderConfirmation);
  } catch (error) {
    console.error('Error fetching order confirmation:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Function to confirm an order
const confirmOrder = async (req, res) => {
  const { order_id } = req.params;
  try {
    await createOrderConfirmationInDb(order_id);
    res.status(200).json({ message: 'Order confirmed successfully' });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Function to confirm order details including shipping and payment information
const confirmOrderDetails = async (req, res) => {
  const { order_id } = req.params;
  const { shippingInfo, paymentInfo } = req.body;
  try {
    await addShippingInfo(order_id, shippingInfo);
    await addPaymentInfo(order_id, paymentInfo);
    await createOrderConfirmationInDb(order_id);
    res.status(200).json({ message: 'Order confirmed successfully' });
  } catch (error) {
    console.error('Error confirming order details:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Function to delete an order
const deleteOrder = async (req, res) => {
  const { order_id } = req.params;
  try {
    await deleteOrderById(order_id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Fungsi untuk menghasilkan resi PDF
const generateReceiptPDF = async (req, res) => {
  const { order_id } = req.params;

  try {
    const orderDetails = await getOrderDetails(order_id);
    const shippingInfo = await getShippingInfo(order_id);
    const paymentInfo = await getPaymentInfo(order_id);

    const doc = new PDFDocument();

    // Siapkan respons sebagai PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=receipt-${order_id}.pdf`);

    // Tulis konten PDF
    doc.text('Transaction Receipt', { align: 'center', underline: true });
    doc.moveDown();

    doc.text(`Order ID: ${orderDetails.order_id}`);
    doc.text(`Total Price: $${orderDetails.total_price}`);
    doc.text(`Order Status: ${orderDetails.order_status}`);
    doc.moveDown();

    doc.text('Shipping Information', { underline: true });
    doc.text(`Address: ${shippingInfo.address}`);
    doc.text(`City: ${shippingInfo.city}`);
    doc.text(`Postal Code: ${shippingInfo.postal_code}`);
    doc.text(`Country: ${shippingInfo.country}`);
    doc.moveDown();

    doc.text('Payment Information', { underline: true });
    doc.text(`Card Number: ${paymentInfo.card_number}`);
    doc.text(`Card Name: ${paymentInfo.card_name}`);
    doc.text(`Expiry Date: ${paymentInfo.expiry_date}`);
    doc.text(`CVV: ${paymentInfo.cvv}`);
    doc.moveDown();

    // Akhiri dan kirim PDF
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error('Error generating receipt PDF:', error);
    res.status(500).json({ error: 'Failed to generate receipt PDF' });
  }
};

module.exports = {
  createOrder,
  getUserOrders: getUserOrdersController,
  getOrderDetails: getOrderDetailsController,
  getOrderConfirmation: getOrderConfirmationController,
  confirmOrder,
  confirmOrderDetails,
  deleteOrder,
  generateReceiptPDF
};
