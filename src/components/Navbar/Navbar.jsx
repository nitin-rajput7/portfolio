import { useEffect, useState } from 'react';
import data from '../../data/portfolioData.js';
const links = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 18); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
    <a className="brand" href="#home" onClick={() => setOpen(false)} aria-label="Nitin Rajput home"><span>N</span> Nitin Rajput</a>
    <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}><i></i><i></i><i></i></button>
    <nav className={open ? 'nav-links nav-links--open' : 'nav-links'}>{links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}<a className="github-mini" href={data.personal.github} target="_blank" rel="noreferrer" aria-label="Open Nitin's GitHub">⌘ <span>GitHub</span></a></nav>
  </header>;
}

