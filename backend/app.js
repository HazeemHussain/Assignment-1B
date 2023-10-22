const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const articles = require('./routes/api/article');

const app = express();

// Connect Database
connectDB();

// CORS Configuration
app.use(cors({
  origin: 'https://assignment-1-b-amber.vercel.app/', // Replace with your Vercel frontend URL
  credentials: true
}));

// Middleware for logging each request
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Init Middleware
app.use(express.json({ extended: false }));

// Use Routes
app.use('/api/article', articles);

// General error handler
app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).send('Server Error');
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
