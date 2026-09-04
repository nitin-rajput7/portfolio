import data from '../../data/portfolioData.js';
export default function Footer() { return <footer><div><strong>{data.personal.name}</strong><span>{data.personal.title}</span></div><nav><a href={data.personal.github} target="_blank" rel="noreferrer">GitHub</a><a href={`mailto:${data.personal.email}`}>Email</a>{data.personal.phone !== '[YOUR MOBILE NUMBER]' && <span>Phone</span>}</nav><p>© 2026 Nitin Rajput. All rights reserved.</p></footer>; }

