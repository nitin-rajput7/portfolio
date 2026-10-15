import Message from "../models/Message.js";

/**
 * ============================================================================
 * CONTACT CONTROLLER
 * ============================================================================
 * What this file does:
 * Contains the business logic for handling contact form inquiries.
 *
 * How to explain in an interview:
 * "In MVC architecture, the controller acts as the coordinator between the
 * incoming HTTP request, the Mongoose Model (database operations), and the
 * HTTP response. By separating our controllers from our routes, our code
 * remains modular, readable, and easy to unit-test."
 */

// @desc    Save a new contact message to MongoDB
// @route   POST /api/contact
// @access  Public
export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Basic server-side validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, subject, message) are required.",
      });
    }

    // 2. Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // 3. Create and save new message document in MongoDB
    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    console.log(`📩 New message saved from: ${newMessage.name} (${newMessage.email})`);

    // 4. Return HTTP 201 Created response
    return res.status(201).json({
      success: true,
      message: "Your message has been sent and saved successfully!",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while saving your message.",
      error: error.message,
    });
  }
};

// @desc    Get all contact messages (for Interviewer Demo / Admin View)
// @route   GET /api/contact
// @access  Public (Interviewer Showcase)
export const getMessages = async (req, res) => {
  try {
    // Fetch all messages, sorted with newest first (-1 on createdAt)
    const messages = await Message.find({}).sort({ createdAt: -1 }).limit(50);

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error in getMessages controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve messages.",
      error: error.message,
    });
  }
};

// @desc    Delete a message by ID (for demo cleanup)
// @route   DELETE /api/contact/:id
// @access  Public (Demo)
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
      data: deletedMessage,
    });
  } catch (error) {
    console.error("Error in deleteMessage controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete message.",
      error: error.message,
    });
  }
};
