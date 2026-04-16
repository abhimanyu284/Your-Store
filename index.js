const express = require('express');
const cors = require('cors');
const client = require('prom-client');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
client.collectDefaultMetrics();

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: "UP", service: "quickcommerce-api" });
});

// Prometheus Metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Products
app.get('/products', (req, res) => {
  res.json([
    { id: 1,  name: "Classic Hoodie",     price: 799,  store: "TrendZone",  eta: "8 mins",  category: "Men" },
    { id: 2,  name: "Floral Kurti",       price: 499,  store: "FabFashion", eta: "12 mins", category: "Women" },
    { id: 3,  name: "Cargo Pants",        price: 999,  store: "UrbanWear",  eta: "10 mins", category: "Men" },
    { id: 4,  name: "Floral Midi Dress",  price: 699,  store: "FabFashion", eta: "15 mins", category: "Women" },
    { id: 5,  name: "Graphic Tee",        price: 349,  store: "TrendZone",  eta: "8 mins",  category: "Unisex" },
    { id: 6,  name: "Denim Jacket",       price: 1299, store: "UrbanWear",  eta: "11 mins", category: "Unisex" },
    { id: 7,  name: "Kids Dungaree",      price: 449,  store: "FabFashion", eta: "13 mins", category: "Kids" },
    { id: 8,  name: "Silk Saree",         price: 2499, store: "FabFashion", eta: "14 mins", category: "Ethnic" },
    { id: 9,  name: "Jogger Pants",       price: 599,  store: "UrbanWear",  eta: "9 mins",  category: "Unisex" },
    { id: 10, name: "Formal Blazer",      price: 1899, store: "TrendZone",  eta: "12 mins", category: "Men" },
    { id: 11, name: "Crop Top",           price: 299,  store: "TrendZone",  eta: "8 mins",  category: "Women" },
    { id: 12, name: "Kurta Pajama Set",   price: 1099, store: "FabFashion", eta: "13 mins", category: "Ethnic" },
    { id: 13, name: "Summer Shorts",      price: 399,  store: "UrbanWear",  eta: "9 mins",  category: "Men" },
    { id: 14, name: "Printed Lehenga",    price: 1799, store: "FabFashion", eta: "15 mins", category: "Ethnic" },
    { id: 15, name: "Bomber Jacket",      price: 1499, store: "TrendZone",  eta: "11 mins", category: "Unisex" }
  ]);
});

// Categories
app.get('/categories', (req, res) => {
  res.json([
    { id: 1, name: "Men",    itemCount: 4 },
    { id: 2, name: "Women",  itemCount: 3 },
    { id: 3, name: "Unisex", itemCount: 4 },
    { id: 4, name: "Kids",   itemCount: 1 },
    { id: 5, name: "Ethnic", itemCount: 3 },
    { id: 6, name: "Sale",   itemCount: 3 }
  ]);
});

// Cart
let cart = [];
app.get('/cart', (req, res) => res.json(cart));
app.post('/cart', (req, res) => {
  cart.push(req.body);
  res.json({ success: true, message: "Item added!", cart });
});
app.delete('/cart', (req, res) => {
  cart = [];
  res.json({ success: true, message: "Cart cleared" });
});

// Orders
app.get('/orders', (req, res) => {
  res.json([
    { id: "ORD001", item: "Classic Hoodie",    store: "TrendZone",  status: "Delivered",        eta: "Done",    steps: [1,1,1,1] },
    { id: "ORD002", item: "Floral Midi Dress", store: "FabFashion", status: "Out for Delivery", eta: "5 mins",  steps: [1,1,1,0] },
    { id: "ORD003", item: "Graphic Tee",       store: "TrendZone",  status: "Processing",       eta: "20 mins", steps: [1,0,0,0] }
  ]);
});

app.use(express.static('.'));

app.listen(PORT, () => console.log(`✅ QuickThreads API running on http://localhost:${PORT}`));