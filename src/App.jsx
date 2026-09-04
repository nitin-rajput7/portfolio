import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Skills from './components/Skills/Skills.jsx';
import Experience from './components/Experience/Experience.jsx';
import Projects from './components/Projects/Projects.jsx';
import Education from './components/Education/Education.jsx';
import Resume from './components/Resume/Resume.jsx';
import Contact from './components/Contact/Contact.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
  return <>
  <Navbar /><main><Hero /><About /><Skills /><Experience /><Projects /><Education /><Resume /><Contact /></main><Footer />
  </>;
}