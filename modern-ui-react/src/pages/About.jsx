const stats = [
  { n: "500+", label: "Members trained since 2016" },
  { n: "15", label: "Group classes every week" },
  { n: "3", label: "Certified specialists on staff" },
];

export default function About() {
  return (
    <section className="container section">
      <p className="eyebrow">About Us</p>
      <h1 className="section-title">10+ years building stronger people</h1>
      <p className="lead dark">
        We offer personal training, group classes, and nutrition guidance to help you live a
        healthier life. Every program is designed around real progress, not guesswork.
      </p>

      <div className="cards">
        {stats.map((s) => (
          <div className="card stat" key={s.label}>
            <h3>{s.n}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title small">Steps to Join</h2>
      <ol className="steps">
        <li>Sign up on our website</li>
        <li>Attend a free trial class</li>
        <li>Start your fitness journey!</li>
      </ol>
    </section>
  );
}
