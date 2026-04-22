import { useState } from 'react';
import { apiCall } from '../api.js';

export default function AuthForm({ onLoginSuccess }) {
    const [userRole, setUserRole] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        data.role = userRole;

        try {
            const endpoint = isLogin ? '/users/login' : '/users/register';
            const result = await apiCall(endpoint, 'POST', data);
            
            localStorage.setItem('token', result.accessToken);
            localStorage.setItem('role', result.user.role);
            onLoginSuccess(result.accessToken, result.user.role);
        } catch (err) {
            setError(err.message);
        }
    };

    if (!userRole) {
        return (
            <div className="container">
                <h1>👔 User Portal</h1>
                <h2>Select Your Role</h2>
                <button onClick={() => setUserRole('AGENT')} style={{marginRight: '10px'}}>🏢 Agent</button>
                <button onClick={() => setUserRole('ADMIN')}>👑 Admin</button>
            </div>
        );
    }

    return (
        <div className="container">
            <h2>{isLogin ? 'Login' : `Register as ${userRole}`}</h2>
            <button type="button" onClick={() => setUserRole('')} style={{ marginBottom: '10px' }}>← Change Role</button>
            
            <form onSubmit={handleSubmit}>
                {!isLogin && <input type="text" name="name" placeholder="Name" required />}
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                {!isLogin && userRole === 'AGENT' && (
                    <input type="text" name="location" placeholder="Location (where you operate)" required />
                )}
                
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            
            {error && <div className="error-message">{error}</div>}
            
            <p style={{marginTop: '20px', cursor: 'pointer', color: '#007bff'}} onClick={() => { setIsLogin(!isLogin); setError(null); }}>
                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </p>
        </div>
    );
}