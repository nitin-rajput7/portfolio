import { useEffect, useState } from "react";

/**
 * ============================================================================
 * LIVE MESSAGES MODAL (Interviewer Showcase)
 * ============================================================================
 * What this component does:
 * Connects directly to the Express backend (GET /api/contact) to fetch and
 * display all inquiries saved in MongoDB.
 *
 * How to explain in an interview:
 * "This component demonstrates the full MERN roundtrip. When an inquiry is
 * submitted from the Contact form, this modal queries our Express REST API
 * (GET /api/contact), which reads the documents from MongoDB and renders them
 * in real-time. It also provides a DELETE operation to showcase complete CRUD."
 */
export default function LiveMessagesModal({ isOpen, onClose, onRefreshRequired }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data || []);
      } else {
        setError(data.message || "Failed to load inquiries.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to connect to the backend server. Ensure Express is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen, onRefreshRequired]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this test message from MongoDB?")) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      } else {
        alert(data.message || "Delete failed.");
      }
    } catch (err) {
      alert("Error connecting to server for deletion.");
    } finally {
      setDeletingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-badge">
              <span className="pulse-dot"></span> LIVE MONGODB DATABASE
            </div>
            <h2>Interviewer Demo: Contact Inquiries</h2>
            <p className="modal-subtitle">
              These records are retrieved directly from our MongoDB <code>messages</code> collection via Express <code>GET /api/contact</code>.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-actions-bar">
          <button className="button button--secondary button--small" onClick={fetchMessages} disabled={loading}>
            {loading ? "Refreshing..." : "↻ Refresh List"}
          </button>
          <span className="inquiries-count">
            Total Inquiries in DB: <strong>{messages.length}</strong>
          </span>
        </div>

        <div className="modal-body">
          {loading && messages.length === 0 && (
            <div className="modal-loading-state">
              <div className="spinner"></div>
              <p>Fetching documents from MongoDB...</p>
            </div>
          )}

          {error && (
            <div className="modal-error-alert">
              <strong>Connection Warning:</strong> {error}
            </div>
          )}

          {!loading && messages.length === 0 && !error && (
            <div className="modal-empty-state">
              <div className="empty-icon">📭</div>
              <h3>No inquiries in database yet</h3>
              <p>Submit a message using the Contact form and it will appear here instantly!</p>
            </div>
          )}

          <div className="messages-list">
            {messages.map((msg) => (
              <article key={msg._id} className="message-item-card">
                <div className="message-item-top">
                  <div>
                    <h4 className="message-sender-name">{msg.name}</h4>
                    <span className="message-sender-email">{msg.email}</span>
                  </div>
                  <div className="message-meta-right">
                    <time className="message-time">
                      {new Date(msg.createdAt).toLocaleString()}
                    </time>
                    <button
                      className="delete-msg-btn"
                      onClick={() => handleDelete(msg._id)}
                      disabled={deletingId === msg._id}
                      title="Delete from MongoDB"
                    >
                      {deletingId === msg._id ? "..." : "🗑️ Delete"}
                    </button>
                  </div>
                </div>
                <div className="message-subject">
                  <strong>Subject:</strong> {msg.subject}
                </div>
                <p className="message-body-text">{msg.message}</p>
                <div className="message-footer-meta">
                  <span className="db-id-tag">MongoDB ID: {msg._id}</span>
                  <span className="db-status-pill">{msg.status || "unread"}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <p className="modal-footer-tip">
            💡 <strong>Interview Tip:</strong> Point out the <code>_id</code> field—it is automatically generated by MongoDB as a unique 12-byte ObjectId (timestamp + machine ID + process ID + counter).
          </p>
          <button className="button button--secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
