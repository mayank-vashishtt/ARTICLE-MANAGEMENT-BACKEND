require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Use CORS middleware and specify origin as localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL
  credentials: true,  // Allow credentials (if needed)
}));

app.use(express.json());  // Parse incoming JSON requests

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/articles', require('./routes/articles'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));