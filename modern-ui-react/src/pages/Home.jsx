import { Link } from "react-router-dom";

const programs = [
  { title: "Strength Training", text: "Build muscle and increase overall body strength.", icon: "🏋️" },
  { title: "Cardio Fitness", text: "Improve your heart health and stamina.", icon: "🏃" },
  { title: "Flexibility", text: "Move better and recover faster.", icon: "🧘" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">Strength · Cardio · Flexibility</p>
          <h1>GET FIT. STAY STRONG.</h1>
          <p className="lead">
            FitLife Training Center has helped everyday people build real strength for over 10
            years, through personal training, group classes, and nutrition guidance.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn">
              Join Now
            </Link>
            <Link to="/about" className="btn btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <p className="eyebrow">Our Training Programs</p>
        <h2 className="section-title">Programs built around your goal</h2>
        <div className="cards">
          {programs.map((p) => (
            <article className="card program" key={p.title}>
              <div className="icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
