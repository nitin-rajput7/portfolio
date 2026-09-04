import data from "../../data/portfolioData.js";
export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy reveal">
        <p className="eyebrow">AVAILABLE FOR OPPORTUNITIES</p>
        <h1>
          Hi, I'm <span>Nitin Tanwar</span>
        </h1>
        <h2>{data.personal.title}</h2>
        <p className="hero-text">
          I build modern, responsive and user-friendly web applications using
          React.js and modern web technologies.
        </p>
        <div className="hero-actions">
          <a className="button button--primary" href="#projects">
            View Projects <b>→</b>
          </a>
          <a className="button button--secondary" href="#contact">
            Contact Me
          </a>
        </div>
        <a
          className="text-link"
          target="_blank"
          rel="noreferrer"
          href={data.personal.github}
        >
          View GitHub profile ↗
        </a>
      </div>
      <div className="hero-art" aria-label="Abstract developer visual">
        <div className="orbit orbit--one"></div>
        <div className="orbit orbit--two"></div>
        <div className="code-card">
          <div>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <code>
            <em>const</em> developer = {"{"}
            <br /> &nbsp;name: <strong>'Nitin Tanwar'</strong>,<br />{" "}
            &nbsp;focus: <strong>'MERN'</strong>,<br /> &nbsp;build: () =&gt;{" "}
            <mark>impact</mark>
            <br />
            {"}"};
          </code>
        </div>
        <div className="spark">✦</div>
      </div>
    </section>
  );
}
