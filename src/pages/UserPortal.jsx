import { useState } from "react";
import LoginForm from "../Components/LoginForm";
import Dashboard from "../Components/Dashboard";

export default function UserPortal() {
  const [role, setRole] = useState(null);

  if (!role) {
    return <LoginForm onSuccess={setRole} />;
  }

  return <Dashboard role={role} />;
}