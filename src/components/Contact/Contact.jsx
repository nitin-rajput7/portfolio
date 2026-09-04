import { useState } from "react";
import data from "../../data/portfolioData.js";
const initial = { name: "", email: "", subject: "", message: "" };
export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [ready, setReady] = useState(false);
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Please enter a valid email.";
    if (!form.subject.trim()) next.subject = "Please enter a subject.";
    if (!form.message.trim()) next.message = "Please enter your message.";
    if (form.name.length > 80)
      next.name = "Please keep your name under 80 characters.";
    if (form.subject.length > 140)
      next.subject = "Please keep the subject under 140 characters.";
    if (form.message.length > 2000)
      next.message = "Please keep your message under 2000 characters.";
    return next;
  };
  function submit(event) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    setReady(Object.keys(next).length === 0);
  }
  const mailto = `mailto:${data.personal.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Hello Nitin,\n\n${form.message}\n\nFrom: ${form.name} (${form.email})`)}`;
  return (
    <section className="section contact-section" id="contact">
      <div className="section-label">06 / CONTACT</div>
      <div className="contact-layout">
        <div>
          <h2 className="section-title">
            Let's work <span>together.</span>
          </h2>
          <p className="contact-lead">
            Have a project, opportunity or question? Feel free to reach out.
          </p>
          <div className="contact-links">
            <a href={`mailto:${data.personal.email}`}>
              <small>EMAIL</small>
              {data.personal.email}
            </a>
            <a href={data.personal.github} target="_blank" rel="noreferrer">
              <small>GITHUB</small>github.com/nitin-rajput7 ↗
            </a>
            {data.personal.phone !== "[YOUR MOBILE NUMBER]" && (
              <p>
                <small>PHONE</small>
                {data.personal.phone}
              </p>
            )}
          </div>
        </div>
        <form className="contact-form" onSubmit={submit} noValidate>
          <label>
            Name
            <input
              value={form.name}
              maxLength="80"
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                setReady(false);
              }}
              aria-invalid={!!errors.name}
            />
            {errors.name && <em>{errors.name}</em>}
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              maxLength="254"
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setReady(false);
              }}
              aria-invalid={!!errors.email}
            />
            {errors.email && <em>{errors.email}</em>}
          </label>
          <label>
            Subject
            <input
              value={form.subject}
              maxLength="140"
              onChange={(e) => {
                setForm({ ...form, subject: e.target.value });
                setReady(false);
              }}
              aria-invalid={!!errors.subject}
            />
            {errors.subject && <em>{errors.subject}</em>}
          </label>
          <label>
            Message
            <textarea
              rows="5"
              value={form.message}
              maxLength="2000"
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
                setReady(false);
              }}
              aria-invalid={!!errors.message}
            />
            {errors.message && <em>{errors.message}</em>}
          </label>
          {ready ? (
            <a className="button button--primary form-send" href={mailto}>
              Open Email App <b>↗</b>
            </a>
          ) : (
            <button className="button button--primary" type="submit">
              Prepare Email <b>→</b>
            </button>
          )}
          {ready && (
            <p className="form-note">
              Your email app will open with this message prepared. Review it and
              press Send there.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
