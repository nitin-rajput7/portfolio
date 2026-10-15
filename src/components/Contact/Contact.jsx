import { useState } from "react";
import data from "../../data/portfolioData.js";
import LiveMessagesModal from "./LiveMessagesModal.jsx";

const initialForm = { name: "", email: "", subject: "", message: "" };

/**
 * ============================================================================
 * CONTACT COMPONENT (Full-Stack MERN Integration)
 * ============================================================================
 * What this component does:
 * Provides an interactive contact form that sends inquiry data to the Express
 * backend (POST /api/contact), which validates and saves it in MongoDB.
 *
 * How to explain in an interview:
 * "When the user fills out this form, client-side validation runs first to ensure
 * all fields meet requirements. Then, the handleSubmit function sends an
 * asynchronous POST request to '/api/contact' via fetch API with a JSON payload.
 * While waiting for the server, a loading state disables inputs to prevent duplicate
 * submissions. On a successful 201 response, we display feedback and allow the user
 * to view their saved message in the live database viewer modal."
 */
export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Client-side validation logic
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus(null);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      // Send POST request to our Express backend API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message: "Message received! Saved directly into MongoDB database.",
          savedData: result.data,
        });
        // Clear form inputs
        setForm(initialForm);
        setRefreshTrigger((prev) => prev + 1);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Failed to send message. Please check backend connection.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Cannot reach the backend server (http://localhost:5000). Please make sure the server is running with 'npm run dev'.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Mailto fallback
  const mailto = `mailto:${data.personal.email}?subject=${encodeURIComponent(
    form.subject || "Portfolio Inquiry"
  )}&body=${encodeURIComponent(
    `Hello Nitin,\n\n${form.message}\n\nFrom: ${form.name} (${form.email})`
  )}`;

  return (
    <section className="section contact-section" id="contact">
      <div className="section-label">06 / CONTACT & LIVE MERN DEMO</div>
      <div className="contact-layout">
        <div>
          <h2 className="section-title">
            Let's work <span>together.</span>
          </h2>
          <p className="contact-lead">
            Have a project, opportunity or question? Feel free to reach out. This form is connected to a live <strong>Express REST API + MongoDB</strong> backend!
          </p>

          <div className="contact-links">
            <a href={`mailto:${data.personal.email}`}>
              <small>EMAIL</small>
              {data.personal.email}
            </a>
            <a href={data.personal.github} target="_blank" rel="noreferrer">
              <small>GITHUB</small>github.com/nitin-rajput7 ↗
            </a>
            {data.personal.phone && (
              <p>
                <small>PHONE</small>
                {data.personal.phone}
              </p>
            )}
          </div>

          {/* Interviewer Demo Quick Access Box */}
          <div className="demo-highlight-box">
            <div className="demo-highlight-badge">
              <span className="pulse-dot"></span> MERN STACK DEMO
            </div>
            <h4>Live Database Showcase</h4>
            <p>
              Inspect real inquiries saved in the MongoDB collection in real-time.
            </p>
            <button
              type="button"
              className="button button--secondary button--small"
              onClick={() => setShowLiveModal(true)}
            >
              ⚡ View MongoDB Inquiries Feed ↗
            </button>
          </div>
        </div>

        <div>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Status alerts */}
            {submitStatus && submitStatus.type === "success" && (
              <div className="form-status-alert form-status--success">
                <div className="status-icon">✓</div>
                <div>
                  <strong>Success!</strong> {submitStatus.message}
                  <div className="status-subtext">
                    Stored in MongoDB collection <code>messages</code> with ID:{" "}
                    <code>{submitStatus.savedData?._id}</code>
                  </div>
                  <button
                    type="button"
                    className="status-view-link"
                    onClick={() => setShowLiveModal(true)}
                  >
                    View in Database Feed →
                  </button>
                </div>
              </div>
            )}

            {submitStatus && submitStatus.type === "error" && (
              <div className="form-status-alert form-status--error">
                <div className="status-icon">⚠</div>
                <div>
                  <strong>Error:</strong> {submitStatus.message}
                  <div className="status-subtext">
                    You can also email directly using the link below.
                  </div>
                </div>
              </div>
            )}

            <label>
              Name
              <input
                value={form.name}
                maxLength="80"
                disabled={submitting}
                placeholder="e.g. John Doe / Interviewer"
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: null });
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
                disabled={submitting}
                placeholder="e.g. recruiter@company.com"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: null });
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
                disabled={submitting}
                placeholder="e.g. Frontend / MERN Developer Role"
                onChange={(e) => {
                  setForm({ ...form, subject: e.target.value });
                  if (errors.subject) setErrors({ ...errors, subject: null });
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
                disabled={submitting}
                placeholder="Type your message or interview note here..."
                onChange={(e) => {
                  setForm({ ...form, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: null });
                }}
                aria-invalid={!!errors.message}
              />
              {errors.message && <em>{errors.message}</em>}
            </label>

            <div className="form-buttons-row">
              <button
                className="button button--primary"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Saving to MongoDB..." : "Send to Database (POST /api/contact) →"}
              </button>

              <a
                className="text-link mailto-fallback-link"
                href={mailto}
                target="_blank"
                rel="noreferrer"
              >
                Or send via Email Client ↗
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Live MongoDB Inquiries Modal */}
      <LiveMessagesModal
        isOpen={showLiveModal}
        onClose={() => setShowLiveModal(false)}
        onRefreshRequired={refreshTrigger}
      />
    </section>
  );
}
