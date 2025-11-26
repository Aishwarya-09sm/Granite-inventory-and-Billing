// axeyo-backend/server.js

require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Using port 5000

// Middleware
// Use CORS to allow the frontend (running on a different origin) to connect
app.use(cors()); 
app.use(express.json()); // Body parser for JSON data

// --- Database Connection ---
const mongoURI = process.env.MONGO_URI; 

if (!mongoURI) {
    console.error("FATAL ERROR: MONGO_URI is not defined in the .env file.");
    process.exit(1); 
}

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB Atlas connected successfully!'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));


// --- API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes')); 
app.use('/api/reports', require('./routes/reportRoutes')); 

// Basic default route
app.get('/', (req, res) => {
    res.send('Axeyo Enterprises Backend API is running!');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});