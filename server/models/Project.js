import mongoose from "mongoose";

/**
 * ============================================================================
 * PROJECT SCHEMA & MODEL (MongoDB / Mongoose)
 * ============================================================================
 * What this file does:
 * Defines the structure for projects displayed on the portfolio.
 *
 * How to explain in an interview:
 * "Instead of hardcoding projects in frontend files, storing them in MongoDB
 * makes the portfolio dynamic. We can query projects, filter them by tags or
 * categories, and update or add new projects without rebuilding the frontend."
 */

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    kind: {
      type: String,
      required: true,
      enum: ["mern", "luxe", "dashboard", "calculator", "todo", "generic"],
      default: "generic",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    points: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ["all", "mern", "react", "javascript"],
      default: "react",
    },
    featured: {
      type: Boolean,
      default: true,
    },
    githubUrl: {
      type: String,
      default: "https://github.com/nitin-rajput7",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
