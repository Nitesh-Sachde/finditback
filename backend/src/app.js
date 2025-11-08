const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./config/database");
const { initializeFirebase } = require("./config/firebase");
const errorHandler = require("./middlewares/errorHandler");

// Import routes
const userRoutes = require("./routes/userRoutes");
const lostItemRoutes = require("./routes/lostItemRoutes");
const foundItemRoutes = require("./routes/foundItemRoutes");
const matchRoutes = require("./routes/matchRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase
initializeFirebase();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(morgan("dev")); // Logging

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "FindItBack API is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
const API_PREFIX = process.env.API_PREFIX || "/api/v1";
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/lost-items`, lostItemRoutes);
app.use(`${API_PREFIX}/found-items`, foundItemRoutes);
app.use(`${API_PREFIX}/matches`, matchRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 API Base: ${API_PREFIX}`);
});

module.exports = app;
