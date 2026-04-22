import { useState } from "react";
import { apiCall } from "../api";

export default function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Validation
    if (!name) {
      setError("Name is required");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const data = { name, email, password };
      await apiCall("/users/register", "POST", data);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return <h2 style={{ color: "green" }}>✅ Registration Successful! Please log in.</h2>;
  }

  return (
    <form onSubmit={handleRegister} className="form">
      <h2>User Registration</h2>
      {error && <div className="error" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <input name="name" type="text" placeholder="Full Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" required />
      <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
    </form>
  );
}