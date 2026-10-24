import { useState } from "react";

const STATES = [
  "Andhra Pradesh",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Delhi",
  "West Bengal",
];

const GENDERS = ["Male", "Female", "Other"];

const initialValues = {
  name: "",
  email: "",
  password: "",
  age: "",
  mobile: "",
  gender: "",
  state: "",
};

// Returns an error message for one field, or "" if the value is valid.
function validateField(field, value) {
  const v = String(value).trim();

  // (a) every field is required
  if (v === "") {
    const labels = {
      name: "Name",
      email: "Email",
      password: "Password",
      age: "Age",
      mobile: "Mobile number",
      gender: "Gender",
      state: "State",
    };
    return `${labels[field]} is required.`;
  }

  switch (field) {
    case "name": // (b) letters and spaces only
      if (!/^[A-Za-z ]+$/.test(value)) return "Name can contain only letters and spaces.";
      return "";

    case "email": // (f) valid email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email address.";
      return "";

    case "password": // (c) 1 upper, 1 lower, 1 digit, min 8 chars
      if (value.length < 8) return "Password must be at least 8 characters.";
      if (!/[A-Z]/.test(value)) return "Password needs at least one uppercase letter.";
      if (!/[a-z]/.test(value)) return "Password needs at least one lowercase letter.";
      if (!/[0-9]/.test(value)) return "Password needs at least one number.";
      return "";

    case "age": {
      // (d) age between 18 and 30
      const n = Number(v);
      if (!Number.isInteger(n)) return "Age must be a whole number.";
      if (n < 18 || n > 30) return "Age must be between 18 and 30.";
      return "";
    }

    case "mobile": // (e) exactly 10 digits
      if (!/^\d{10}$/.test(v)) return "Mobile number must contain exactly 10 digits.";
      return "";

    default:
      return "";
  }
}

function validateAll(values) {
  const errors = {};
  Object.keys(values).forEach((f) => {
    errors[f] = validateField(f, values[f]);
  });
  return errors;
}

// Q1 + Q3: reusable registration form with live validation
export default function RegistrationForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);

  const errors = validateAll(values);
  // (h) Submit enabled only when every field is valid
  const isValid = Object.values(errors).every((e) => e === "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuccess(false);
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      // show every error if somehow submitted while invalid
      setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
      return;
    }
    setSuccess(true); // (i) success message
    setValues(initialValues);
    setTouched({});
  };

  // small helper so each field is written once
  const showError = (f) => touched[f] && errors[f];
  const cls = (f) => (showError(f) ? "invalid" : touched[f] && !errors[f] ? "valid" : "");

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2>Create Your Account</h2>
      <p className="sub">Join FitLife Training Center in a minute.</p>

      {success && (
        <div className="alert success" role="status">
          🎉 Registration successful! Welcome to FitLife Training Center.
        </div>
      )}

      <div className="grid-2">
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Blessy Florida"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cls("name")}
          />
          {showError("name") && <small className="error">{errors.name}</small>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cls("email")}
          />
          {showError("email") && <small className="error">{errors.email}</small>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Min 8 chars, Aa, 1-9"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cls("password")}
          />
          {showError("password") && <small className="error">{errors.password}</small>}
        </div>

        <div className="field">
          <label htmlFor="age">Age (18 – 30)</label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="e.g. 21"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cls("age")}
          />
          {showError("age") && <small className="error">{errors.age}</small>}
        </div>

        <div className="field">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit number"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cls("mobile")}
          />
          {showError("mobile") && <small className="error">{errors.mobile}</small>}
        </div>

        <div className="field">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cls("gender")}
          >
            <option value="">-- Select gender --</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {showError("gender") && <small className="error">{errors.gender}</small>}
        </div>

        <div className="field full">
          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={values.state}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cls("state")}
          >
            <option value="">-- Select state --</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {showError("state") && <small className="error">{errors.state}</small>}
        </div>
      </div>

      <button type="submit" className="btn btn-block" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
