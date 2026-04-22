import { useState } from "react";
import { apiCall } from "../api";

export default function ClientPortal() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const name = e.target.name.value.trim();
    const phone = e.target.phone.value.trim();
    const preferredLocation = e.target.preferredLocation.value.trim();

    // Validation
    if (!name) {
      setError("Name is required");
      return;
    }
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    if (!preferredLocation) {
      setError("Preferred location is required");
      return;
    }

    try {
      setLoading(true);
      const data = { name, phone, preferredLocation };
      await apiCall("/clients/create-client", "POST", data);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) return <h2 style={{ color: "green" }}>✅ Submitted Successfully</h2>;

  return (
    <div className="container">
      <h1>Client Portal</h1>
      {error && <div className="error" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <input name="name" type="text" placeholder="Name" required />
        <input name="phone" type="tel" placeholder="Phone" required />
        <input name="preferredLocation" type="text" placeholder="Preferred Location" required />
        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  );
}