import { useState } from "react";
import Home from "./pages/Home";
import UserPortal from "./pages/UserPortal";
import ClientPortal from "./pages/ClientPortal";

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "user") return <UserPortal />;
  if (page === "client") return <ClientPortal />;

  return <Home onNavigate={setPage} />;
}