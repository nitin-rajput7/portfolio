import express from "express";
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controllers/contactController.js";

/**
 * ============================================================================
 * CONTACT ROUTES
 * ============================================================================
 * What this file does:
 * Maps HTTP URL paths to specific controller functions for contact operations.
 *
 * How to explain in an interview:
 * "We use express.Router() to create modular, mountable route handlers.
 * Any request sent to '/api/contact' is routed through this file."
 */

const router = express.Router();

// POST /api/contact -> Submit inquiry
// GET /api/contact  -> Retrieve inquiries (interviewer demo)
router.route("/").post(sendMessage).get(getMessages);

// DELETE /api/contact/:id -> Delete a demo message
router.route("/:id").delete(deleteMessage);

export default router;
