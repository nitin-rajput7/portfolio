import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

// Load environment variables from server/.env
dotenv.config();

/**
 * ============================================================================
 * MAIN SERVER FILE (Express.js + Node.js)
 * ============================================================================
 * What this file does:
 * Initializes the Express application, configures middlewares (CORS, JSON parsing),
 * connects to MongoDB, and registers the API endpoints.
 *
 * How to explain in an interview:
 * "server.js is the entry point of our backend. We configure Express, apply
 * essential middlewares like express.json() to parse incoming JSON bodies and
 * CORS to allow requests from our React frontend. Then we connect to MongoDB and
 * mount our modular route handlers under the '/api' prefix."
 */

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// ---------------------------------------------------------------------------
// MIDDLEWARES
// ---------------------------------------------------------------------------

// 1. Enable CORS so our React frontend can communicate with this API
app.use(cors());

// 2. Parse incoming JSON payloads in request bodies (req.body)
app.use(express.json());

// 3. Simple logger to trace incoming API requests in console
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// ---------------------------------------------------------------------------
// API ROUTES
// ---------------------------------------------------------------------------

// Health check endpoint (easy way to verify server status)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "MERN Portfolio Backend API is up and running!",
    timestamp: new Date().toISOString(),
  });
});

// Mount contact and project routes
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);

// ---------------------------------------------------------------------------
// 404 & ERROR HANDLING MIDDLEWARES
// ---------------------------------------------------------------------------

// Fallback for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.originalUrl}`,
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ---------------------------------------------------------------------------
// START SERVER
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 MERN Server running in ${process.env.NODE_ENV || "development"} mode`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📩 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`💼 Projects API: http://localhost:${PORT}/api/projects`);
  console.log(`====================================================`);
});
