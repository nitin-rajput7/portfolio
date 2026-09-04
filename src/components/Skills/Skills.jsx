import data from "../../data/portfolioData.js";
const icons = [
  "⌘",
  "◈",
  "◌",
  "◇",
  "✦",
  "✧",
  "✪",
  "✩",
  "✫",
  "✬",
  "✭",
  "✮",
  "✯",
  "✰",
  "★",
  "☆",
];
export default function Skills() {
  return (
    <section className="section section--tint" id="skills">
      <div className="section-label">02 / SKILLS</div>
      <h2 className="section-title">
        The tools I use to <span>build on the web.</span>
      </h2>
      <div className="skill-grid">
        {Object.entries(data.skills).map(([group, skills], index) => (
          <article className="skill-card" key={group}>
            <div className="skill-icon">{icons[index]}</div>
            <h3>{group}</h3>
            <div className="badges">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
