import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "../models/Project.js";
import connectDB from "../config/db.js";

dotenv.config();

/**
 * ============================================================================
 * SEED PROJECTS DATA
 * ============================================================================
 * Default project list populated into MongoDB.
 */
export const defaultProjects = [
  {
    name: "MERN Stack Portfolio & API Engine",
    type: "Full Stack Application",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "REST API"],
    kind: "mern",
    category: "mern",
    description:
      "A complete full-stack MERN portfolio platform with an Express REST API, MongoDB database persistence for inquiries, automated seeding, and real-time database viewer.",
    points: [
      "RESTful API with Express & Node.js",
      "MongoDB & Mongoose data modeling",
      "Interactive React frontend with live database inquiry feed",
    ],
    featured: true,
    githubUrl: "https://github.com/nitin-rajput7/portfolio",
    liveUrl: "http://localhost:5173",
    order: 1,
  },
  {
    name: "LUXE",
    type: "E-commerce Website",
    tags: ["React.js", "React Router", "JavaScript", "HTML", "CSS"],
    kind: "luxe",
    category: "react",
    description:
      "A modern e-commerce frontend demonstrating component-based architecture, responsive design, product-focused UI, and client-side navigation.",
    points: [
      "Product-focused UI",
      "Reusable React components",
      "Responsive layout across devices",
    ],
    featured: true,
    githubUrl: "https://github.com/nitin-rajput7",
    liveUrl: "",
    order: 2,
  },
  {
    name: "Analytics Dashboard",
    type: "Frontend Interface",
    tags: ["React.js", "JavaScript", "CSS"],
    kind: "dashboard",
    category: "react",
    description:
      "A modern dashboard interface focused on data presentation, responsive layouts, and reusable frontend components.",
    points: ["Data presentation", "Responsive layout", "Reusable components"],
    featured: true,
    githubUrl: "https://github.com/nitin-rajput7",
    liveUrl: "",
    order: 3,
  },
  {
    name: "Interactive Calculator",
    type: "Interactive Application",
    tags: ["JavaScript", "HTML", "CSS"],
    kind: "calculator",
    category: "javascript",
    description:
      "An interactive calculator interface that handles user input and calculation functionality with an intuitive responsive UI.",
    points: ["User input validation", "Arithmetic logic engine", "Responsive UI"],
    featured: false,
    githubUrl: "https://github.com/nitin-rajput7",
    liveUrl: "",
    order: 4,
  },
  {
    name: "Task Planner (Todo App)",
    type: "Interactive Application",
    tags: ["JavaScript", "HTML", "CSS"],
    kind: "todo",
    category: "javascript",
    description:
      "A task-management interface for adding, tracking, and managing daily tasks through a clear, responsive interactive UI.",
    points: ["Adding & filtering tasks", "Component state handling", "Clean responsive layout"],
    featured: false,
    githubUrl: "https://github.com/nitin-rajput7",
    liveUrl: "",
    order: 5,
  },
];

// If run directly via `npm run seed`
const seedDB = async () => {
  try {
    await connectDB();
    await Project.deleteMany({});
    console.log("🗑️ Cleared existing projects from MongoDB.");

    await Project.insertMany(defaultProjects);
    console.log(`🌱 Successfully seeded ${defaultProjects.length} projects into MongoDB!`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

// Check if this script was executed directly from CLI: `node server/data/seedProjects.js`
if (process.argv[1] && process.argv[1].endsWith("seedProjects.js")) {
  seedDB();
}
