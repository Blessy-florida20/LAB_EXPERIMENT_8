import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setSent(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="container section">
      <p className="eyebrow">Get In Touch</p>
      <h1 className="section-title">Contact Us</h1>

      <div className="two-col">
        <div className="card">
          <h3>Visit or call</h3>
          <p>📧 info@fitlifetraining.com</p>
          <p>📞 +1 234 567 890</p>
          <p>📍 FitLife Training Center, Main Street</p>
        </div>

        <form className="card form" onSubmit={handleSubmit}>
          <h3>Send a message</h3>
          {sent && <div className="alert success">Thanks! We will get back to you soon.</div>}
          <div className="field">
            <label htmlFor="c-name">Name</label>
            <input id="c-name" name="name" required value={form.name} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="c-email">Email</label>
            <input
              id="c-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="c-msg">Message</label>
            <textarea
              id="c-msg"
              name="message"
              rows="4"
              required
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-block" type="submit">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
