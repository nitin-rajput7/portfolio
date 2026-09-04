import data from '../../data/portfolioData.js';
export default function Education() { return <section className="section" id="education"><div className="section-label">05 / EDUCATION</div><h2 className="section-title">A foundation for <span>continuous learning.</span></h2><div className="education-list">{data.education.map(([degree, field, school, dates]) => <article key={degree} className="education-card"><div className="edu-mark">✦</div><div><h3>{degree}</h3>{field && <p>{field}</p>}<span>{school}</span></div>{dates && <time>{dates}</time>}</article>)}</div></section>; }

