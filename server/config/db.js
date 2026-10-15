import mongoose from "mongoose";

/**
 * ============================================================================
 * DATABASE CONNECTION (MongoDB + Mongoose)
 * ============================================================================
 * What this file does:
 * Connects our Node.js/Express server to MongoDB using the Mongoose ODM.
 *
 * How to explain in an interview:
 * "We use Mongoose as an ODM (Object Data Modeling) library to establish a
 * connection to MongoDB. We encapsulate this logic in an async function so we
 * can handle any connection errors gracefully before starting our server."
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nitin_portfolio";
    
    // Connect to MongoDB
    const conn = await mongoose.connect(mongoUri);

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log(`📦 Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit process with failure so we know DB connection failed
    process.exit(1);
  }
};

export default connectDB;
