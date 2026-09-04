import data from "../../data/portfolioData.js";
export default function Experience() {
  const item = data.experience;
  return (
    <section className="section" id="experience">
      <div className="section-label">03 / EXPERIENCE</div>
      <h2 className="section-title">
        Learning by building with a <span>real development team.</span>
      </h2>
      <article className="experience-card">
        <div className="timeline-dot"></div>
        <div className="experience-top">
          <div>
            <p className="role">{item.role}</p>
            <h3>{item.company}</h3>
          </div>
          <div className="experience-meta">
            <span>{item.duration}</span>
            <span>{item.location}</span>
          </div>
        </div>
        <ul>
          {item.responsibilities.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
