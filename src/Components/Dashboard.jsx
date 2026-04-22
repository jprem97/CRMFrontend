import { useEffect, useState } from "react";
import { apiCall } from "../api";
import ClientsTable from "./ClientsTable";
import DealsTable from "./DealsTable";
import PropertiesTable from "./PropertiesTable";

export default function Dashboard({ role }) {
  const [clients, setClients] = useState([]);
  const [deals, setDeals] = useState([]);
  const [properties, setProperties] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      if (role === "AGENT") {
        const profile = await apiCall("/agents/get-my-profile");
        setProfile(profile);

        const clients = await apiCall("/clients/get-clients");
        setClients(clients);

        const deals = await apiCall("/deals/get-deals").catch(() => []);
        setDeals(deals);

        const properties = await apiCall("/properties/get-properties").catch(() => []);
        setProperties(properties);
      } else if (role === "CLIENT") {
        const profile = await apiCall("/clients/get-my-profile");
        setProfile(profile);

        const properties = await apiCall("/properties/get-my-properties").catch(() => []);
        setProperties(properties);
      } else if (role === "ADMIN") {
        const allClients = await apiCall("/admin/get-all-clients");
        setClients(allClients);

        const allDeals = await apiCall("/admin/get-all-deals").catch(() => []);
        setDeals(allDeals);
      }
    } catch (err) {
      alert("Error loading dashboard: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  }

  if (loading) return <div className="dashboard"><h2>Loading...</h2></div>;

  return (
    <div className="dashboard">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{role} Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: "10px 20px", cursor: "pointer" }}>Logout</button>
      </div>

      {profile && (
        <div className="section">
          <h2>Profile</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      )}

      {(role === "AGENT" || role === "ADMIN") && clients.length > 0 && (
        <div className="section">
          <h2>Clients</h2>
          <ClientsTable clients={clients} />
        </div>
      )}

      {(role === "AGENT" || role === "ADMIN") && deals.length > 0 && (
        <div className="section">
          <h2>Deals</h2>
          <DealsTable deals={deals} />
        </div>
      )}

      {(role === "AGENT" || role === "CLIENT" || role === "ADMIN") && properties.length > 0 && (
        <div className="section">
          <h2>Properties</h2>
          <PropertiesTable properties={properties} />
        </div>
      )}
    </div>
  );
}
