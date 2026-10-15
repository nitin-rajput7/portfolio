import express from "express";
import {
  getProjects,
  createProject,
} from "../controllers/projectController.js";

/**
 * ============================================================================
 * PROJECT ROUTES
 * ============================================================================
 * What this file does:
 * Maps HTTP URL paths to project controller functions.
 */

const router = express.Router();

// GET /api/projects  -> Fetch all projects
// POST /api/projects -> Create a new project
router.route("/").get(getProjects).post(createProject);

export default router;
