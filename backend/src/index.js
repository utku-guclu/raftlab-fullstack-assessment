/**
 * Main entry point for the Candidate Selection API
 * This server handles all candidate-related operations
 * including fetching, filtering, and managing candidate data
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// load environment variables from .env file
dotenv.config();

// import route handlers
const candidateRoutes = require('./routes/candidateRoutes');

// initialize express application
const app = express();

// define the port - use env variable or default to 5000
const PORT = process.env.PORT || 5000;

/**
 * Middleware Configuration
 * - cors: enables cross-origin requests from frontend
 * - json: parses incoming JSON payloads
 */
app.use(cors());
app.use(express.json());

// health check endpoint - useful for monitoring
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// mount candidate routes under /api/candidates
app.use('/api/candidates', candidateRoutes);

// global error handler - catches any unhandled errors
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

// start the server and listen on specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
