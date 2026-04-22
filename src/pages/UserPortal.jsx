import { useState, useEffect } from 'react';
import AuthForm from '../components/AuthForm.jsx';
import AgentDashboard from '../components/AgentDashboard.jsx';
import AdminDashboard from '../components/AdminDashboard.jsx';
import { logout } from '../api.js';

export default function UserPortal() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));

    const handleLoginSuccess = (newToken, newRole) => {
        setToken(newToken);
        setRole(newRole);
    };

    if (!token) {
        return <AuthForm onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="container" style={{ maxWidth: '1200px', width: '95%' }}>
            <button className="logout-btn" onClick={logout}>🚪 Logout</button>
            {role === 'AGENT' ? <AgentDashboard /> : <AdminDashboard />}
        </div>
    );
}