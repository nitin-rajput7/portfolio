import mongoose from "mongoose";

/**
 * ============================================================================
 * MESSAGE SCHEMA & MODEL (MongoDB / Mongoose)
 * ============================================================================
 * What this file does:
 * Defines the structure (schema) for contact messages submitted by visitors
 * on the portfolio website.
 *
 * How to explain in an interview:
 * "In MongoDB, data is stored as flexible JSON-like documents. We use a
 * Mongoose Schema to enforce data validation at the application level—ensuring
 * that every inquiry has a valid name, email, subject, and message before it is
 * saved into the 'messages' collection."
 */

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [80, "Name cannot exceed 80 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [140, "Subject cannot exceed 140 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
  },
  {
    // Automatically creates and manages 'createdAt' and 'updatedAt' timestamps
    timestamps: true,
  }
);

// Create the Mongoose Model from the schema
const Message = mongoose.model("Message", messageSchema);

export default Message;
