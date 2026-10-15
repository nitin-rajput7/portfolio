import { useState, useEffect } from "react";
import fallbackData from "../../data/portfolioData.js";

/**
 * ============================================================================
 * PROJECT VISUAL COMPONENT
 * ============================================================================
 * Generates custom visual artwork/icons corresponding to project kind.
 */
function ProjectVisual({ kind }) {
  return (
    <div className={`project-visual visual--${kind}`} aria-hidden="true">
      <div className="visual-bar"></div>
      {kind === "mern" && (
        <div className="mern-visual-grid">
          <div className="mern-chip">MongoDB</div>
          <div className="mern-chip">Express</div>
          <div className="mern-chip">React</div>
          <div className="mern-chip">Node.js</div>
          <div className="mern-api-line">
            <span>REST API</span>
            <i></i>
            <span>DATABASE</span>
          </div>
        </div>
      )}
      {kind === "luxe" && (
        <>
          <b>LUXE</b>
          <div className="product-row">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </>
      )}
      {kind === "dashboard" && (
        <>
          <div className="dash-side"></div>
          <div className="dash-main">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </>
      )}
      {kind === "calculator" && (
        <div className="calc">
          <b>0</b>
          <span>÷</span>
          <span>×</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
      )}
      {kind === "todo" && (
        <div className="todo-lines">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      )}
    </div>
  );
}

/**
 * ============================================================================
 * PROJECT CARD COMPONENT
 * ============================================================================
 */
function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <ProjectVisual kind={project.kind} />
      <div className="project-content">
        <div className="project-count">
          0{index + 1} / {project.type}
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="badges">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <ul className="project-points">
          {project.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="project-links">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="button button--secondary button--small"
            >
              GitHub Code ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="button button--primary button--small"
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * ============================================================================
 * MAIN PROJECTS COMPONENT
 * ============================================================================
 * What this component does:
 * Fetches dynamic projects from Express backend (GET /api/projects) and allows
 * interactive filtering by category.
 *
 * How to explain in an interview:
 * "Instead of hardcoding projects in the client, we use useEffect to make an
 * asynchronous GET call to '/api/projects'. If the backend is running, it
 * fetches documents from MongoDB. We also implemented category filtering using
 * React state so visitors can filter by MERN, React, or JavaScript."
 */
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isFromBackend, setIsFromBackend] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setProjects(json.data);
          setIsFromBackend(true);
        } else {
          // Fallback to local data
          setProjects(fallbackData.projects);
        }
      } catch (err) {
        console.log("Using local projects fallback:", err.message);
        setProjects(fallbackData.projects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "mern", label: "MERN Stack" },
    { id: "react", label: "React.js" },
    { id: "javascript", label: "JavaScript" },
  ];

  // Filter projects by category or tags
  const filteredProjects = projects.filter((item) => {
    if (activeCategory === "all") return true;
    if (item.category === activeCategory) return true;
    if (
      activeCategory === "mern" &&
      (item.kind === "mern" || item.tags.some((t) => t.toLowerCase().includes("node") || t.toLowerCase().includes("mongo")))
    ) {
      return true;
    }
    if (
      activeCategory === "react" &&
      item.tags.some((t) => t.toLowerCase().includes("react"))
    ) {
      return true;
    }
    if (
      activeCategory === "javascript" &&
      item.tags.some((t) => t.toLowerCase().includes("javascript") && !t.toLowerCase().includes("react"))
    ) {
      return true;
    }
    return false;
  });

  return (
    <section className="section section--tint" id="projects">
      <div className="section-label">04 / PROJECTS & PORTFOLIO WORK</div>
      <div className="title-row">
        <div>
          <h2 className="section-title">
            Selected work and <span>full-stack projects.</span>
          </h2>
          <p>
            Each project demonstrates full-stack architecture, API design, responsive UI, and clean code principles.
          </p>
        </div>

        {isFromBackend && (
          <div className="db-live-indicator">
            <span className="pulse-dot"></span> Dynamic Data from MongoDB
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="category-tabs" role="tablist" aria-label="Project categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`tab-btn ${activeCategory === cat.id ? "tab-btn--active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="projects-loading">
          <div className="spinner"></div>
          <p>Loading projects from API...</p>
        </div>
      ) : (
        <div className="project-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project._id || project.name} project={project} index={index} />
            ))
          ) : (
            <p className="no-projects-text">No projects found in this category.</p>
          )}
        </div>
      )}
    </section>
  );
}
