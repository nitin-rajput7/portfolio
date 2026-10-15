import Project from "../models/Project.js";
import { defaultProjects } from "../data/seedProjects.js";

/**
 * ============================================================================
 * PROJECT CONTROLLER
 * ============================================================================
 * What this file does:
 * Manages operations for projects (fetching, filtering, and auto-seeding).
 *
 * How to explain in an interview:
 * "When the frontend requests projects via GET /api/projects, this controller
 * checks MongoDB. To ensure the application is zero-config and always works on
 * first boot, if the database is empty, it automatically populates default
 * projects using Mongoose's insertMany method."
 */

// @desc    Get all portfolio projects (with optional category filter)
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { category } = req.query;

    // Check if the projects collection has any documents
    const count = await Project.countDocuments();
    if (count === 0) {
      console.log("🌱 Projects collection is empty. Auto-seeding default projects...");
      await Project.insertMany(defaultProjects);
    }

    // Build filter query
    const filter = {};
    if (category && category.toLowerCase() !== "all") {
      filter.category = category.toLowerCase();
    }

    // Fetch projects sorted by order
    const projects = await Project.find(filter).sort({ order: 1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Error in getProjects controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve projects.",
      error: error.message,
    });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public / Admin
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Project created successfully!",
      data: project,
    });
  } catch (error) {
    console.error("Error in createProject controller:", error);
    return res.status(400).json({
      success: false,
      message: "Failed to create project.",
      error: error.message,
    });
  }
};
