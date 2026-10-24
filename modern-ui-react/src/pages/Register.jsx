import RegistrationForm from "../components/RegistrationForm.jsx";

// Q1: User Registration Form page (reuses the RegistrationForm component)
export default function Register() {
  return (
    <section className="container section narrow">
      <p className="eyebrow">Sign Up</p>
      <h1 className="section-title">Fitness Training Registration</h1>
      <RegistrationForm />
    </section>
  );
}
