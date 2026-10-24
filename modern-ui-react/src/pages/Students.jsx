import { useState } from "react";

const DEPARTMENTS = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"];

const emptyStudent = {
  name: "",
  roll: "",
  department: "CSE",
  m1: "",
  m2: "",
  m3: "",
};

// Work out total, percentage and grade from the three marks
function calculate(s) {
  const marks = [s.m1, s.m2, s.m3].map((m) => Number(m) || 0);
  const total = marks.reduce((a, b) => a + b, 0);
  const percent = total / 3;
  let grade = "F";
  if (percent >= 90) grade = "A+";
  else if (percent >= 80) grade = "A";
  else if (percent >= 70) grade = "B";
  else if (percent >= 60) grade = "C";
  else if (percent >= 50) grade = "D";
  return { total, percent: percent.toFixed(1), grade };
}

// Q5: Dynamic UI. The preview card and the student list are re-rendered by
// React automatically every time the state changes.
export default function Students() {
  const [student, setStudent] = useState(emptyStudent);
  const [list, setList] = useState([
    { id: 1, name: "Arun Kumar", roll: "CS101", department: "CSE", m1: 88, m2: 92, m3: 79 },
    { id: 2, name: "Meena Priya", roll: "IT102", department: "IT", m1: 75, m2: 68, m3: 81 },
  ]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // marks must stay between 0 and 100
    if (["m1", "m2", "m3"].includes(name) && value !== "") {
      const n = Number(value);
      if (n < 0 || n > 100) return;
    }
    setStudent({ ...student, [name]: value });
  };

  const addStudent = (e) => {
    e.preventDefault();
    if (!student.name.trim() || !student.roll.trim()) return;
    setList([...list, { ...student, id: Date.now() }]);
    setStudent(emptyStudent);
  };

  const removeStudent = (id) => setList(list.filter((s) => s.id !== id));

  const result = calculate(student);
  const filtered = list.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container section">
      <p className="eyebrow">Dynamic UI</p>
      <h1 className="section-title">Student Details</h1>

      <div className="two-col">
        {/* ---------- input form ---------- */}
        <form className="card form" onSubmit={addStudent}>
          <h3>Enter student details</h3>

          <div className="field">
            <label htmlFor="s-name">Name</label>
            <input id="s-name" name="name" value={student.name} onChange={handleChange} />
          </div>
          <div className="grid-2">
            <div className="field">
              <label htmlFor="s-roll">Roll No</label>
              <input id="s-roll" name="roll" value={student.roll} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="s-dept">Department</label>
              <select
                id="s-dept"
                name="department"
                value={student.department}
                onChange={handleChange}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid-3">
            {["m1", "m2", "m3"].map((k, i) => (
              <div className="field" key={k}>
                <label htmlFor={`s-${k}`}>Subject {i + 1}</label>
                <input
                  id={`s-${k}`}
                  name={k}
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0-100"
                  value={student[k]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <button className="btn btn-block" type="submit">
            Add Student
          </button>
        </form>

        {/* ---------- live preview ---------- */}
        <div className="card preview">
          <h3>Live Preview</h3>
          <div className="avatar">{(student.name.trim()[0] || "?").toUpperCase()}</div>
          <h2>{student.name || "Student name"}</h2>
          <p className="muted">
            {student.roll || "Roll No"} · {student.department}
          </p>
          <div className="result-row">
            <div>
              <span>Total</span>
              <strong>{result.total}/300</strong>
            </div>
            <div>
              <span>Percentage</span>
              <strong>{result.percent}%</strong>
            </div>
            <div>
              <span>Grade</span>
              <strong>{result.grade}</strong>
            </div>
          </div>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${result.percent}%` }} />
          </div>
        </div>
      </div>

      {/* ---------- student list ---------- */}
      <div className="card list-card">
        <div className="list-head">
          <h3>Students ({filtered.length})</h3>
          <input
            className="search"
            placeholder="Search by name or roll no"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Dept</th>
                <th>Total</th>
                <th>%</th>
                <th>Grade</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="muted center">
                    No students found.
                  </td>
                </tr>
              )}
              {filtered.map((s) => {
                const r = calculate(s);
                return (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.roll}</td>
                    <td>{s.department}</td>
                    <td>{r.total}</td>
                    <td>{r.percent}</td>
                    <td>
                      <span className={`badge ${r.grade === "F" ? "bad" : ""}`}>{r.grade}</span>
                    </td>
                    <td>
                      <button className="link-btn" onClick={() => removeStudent(s.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
