import { Link } from "react-router-dom";

// Q3: reusable footer
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>FITLIFE TRAINING</h3>
          <p>Strength · Cardio · Flexibility</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/register">Register</Link>
        </div>
        <p className="copy">
          © {new Date().getFullYear()} FitLife Training Center. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
