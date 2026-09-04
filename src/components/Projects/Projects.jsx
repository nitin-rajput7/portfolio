import data from "../../data/portfolioData.js";
function ProjectVisual({ kind }) {
  return (
    <div className={`project-visual visual--${kind}`} aria-hidden="true">
      <div className="visual-bar"></div>
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
      </div>
    </article>
  );
}
export default function Projects() {
  return (
    <section className="section section--tint" id="projects">
      <div className="section-label">04 / PROJECTS</div>
      <div className="title-row">
        <h2 className="section-title">
          Selected work and <span>practice projects.</span>
        </h2>
        <p>
          Each project highlights frontend development, responsive UI, and
          component-focused thinking.
        </p>
      </div>
      <div className="project-grid">
        {data.projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
