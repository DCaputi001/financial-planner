/**
 * @file server.js
 * @description Entry point for the Financial Planner backend server.
 * Sets up the Express application, middleware, database connection, and routes.
 */

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import investmentRoutes from './routes/investmentRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables from the .env file
dotenv.config();

// Initialize Express Application
const app = express();

// Middleware Configuration
app.use(express.json()); // Parse incoming JSON payloads
app.use(cors());         // Enable Cross-Origin Resource Sharing for Angular frontend
app.use('/api/goals', goalRoutes); // Goal-related API Routes
app.use('/api/auth', authRoutes);   // Authentication API Routes

// MongoDB Connection (Optional for now, included for later database integration)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err.message));

// Base Route — Used for health check and API status verification
app.get('/', (req, res) => {
  res.send('Financial Planner API Running...');
});

// Investment API Routes
app.use('/api/investments', investmentRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));