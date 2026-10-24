import { useState } from "react";
import { Link } from "react-router-dom";

// Q4: Responsive login page. Layout changes via CSS media queries (see index.css):
//   desktop  -> two panels side by side
//   tablet   -> narrower, stacked panels
//   mobile   -> single full-width card, banner hidden
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMsg("error:Please enter both email and password.");
      return;
    }
    setMsg(`ok:Welcome back, ${email}!`);
  };

  const [type, text] = msg.split(":");

  return (
    <section className="container section">
      <div className="login-wrap">
        <div className="login-banner">
          <h2>Welcome back</h2>
          <p>Log in to track your workouts, book classes and manage your plan.</p>
          <ul>
            <li>✔ Personal training</li>
            <li>✔ Group classes</li>
            <li>✔ Nutrition guidance</li>
          </ul>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {msg && <div className={`alert ${type === "ok" ? "success" : "danger"}`}>{text}</div>}

          <div className="field">
            <label htmlFor="l-email">Email</label>
            <input
              id="l-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="l-pass">Password</label>
            <input
              id="l-pass"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-block" type="submit">
            Login
          </button>
          <p className="switch">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
