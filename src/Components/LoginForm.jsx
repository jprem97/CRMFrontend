import { useState } from "react";
import { apiCall } from "../api";

export default function LoginForm({ onSuccess }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Validation
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const data = { email, password };
      const res = await apiCall("/users/login", "POST", data);

      if (!res.accessToken || !res.user || !res.user.role) {
        throw new Error("Invalid response from server");
      }

      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("role", res.user.role);

      onSuccess(res.user.role);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="form">
      <h2>User Login</h2>
      {error && <div className="error" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
    </form>
  );
}