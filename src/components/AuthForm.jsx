import { useState } from 'react';
import { apiCall } from '../api.js';
import { Mail, Lock, User, MapPin, Shield, LogIn, UserPlus } from 'lucide-react';

export default function AuthForm({ onAuthSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRole, setSelectedRole] = useState('AGENT');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        const endpoint = isLogin ? '/users/login' : '/users/register';
        
        try {
            const res = await apiCall(endpoint, 'POST', data);
            localStorage.setItem('token', res.accessToken);
            localStorage.setItem('role', res.user.role);
            if (onAuthSuccess) onAuthSuccess();
            else window.location.reload(); 
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <div className="container" style={{ maxWidth: '450px', padding: '40px', marginTop: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '50%', color: 'var(--primary)' }}>
                        {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
                    </div>
                </div>
                
                <h1 style={{ marginBottom: '8px' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                <p style={{ marginBottom: '24px' }}>{isLogin ? 'Enter your credentials to access your dashboard' : 'Join the platform as an Agent or Admin'}</p>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    {!isLogin && (
                        <>
                            {/* Formal Demonstration Notice */}
                            <div style={{ backgroundColor: '#f8fafc', color: '#475569', padding: '14px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', border: '1px solid #e2e8f0', lineHeight: '1.5', textAlign: 'left' }}>
                                <strong>Demonstration Notice:</strong> As this is a mock environment, open registration is currently enabled for all roles. In a production system, Agent and Administrator access would be strictly provisioned by company management.
                            </div>

                            <div style={{ position: 'relative', marginBottom: '16px' }}>
                                <User size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                                <input type="text" name="name" placeholder="Full Name" required style={{ width: '100%', paddingLeft: '40px', boxSizing: 'border-box' }} />
                            </div>
                        </>
                    )}
                    
                    <div style={{ position: 'relative', marginBottom: isLogin ? '16px' : '0' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                        <input type="email" name="email" placeholder="Email Address" required style={{ width: '100%', paddingLeft: '40px', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                        <input type="password" name="password" placeholder="Password" required style={{ width: '100%', paddingLeft: '40px', boxSizing: 'border-box' }} />
                    </div>

                    {!isLogin && (
                        <>
                            <div style={{ position: 'relative' }}>
                                <Shield size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                                <select 
                                    name="role" 
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    required 
                                    style={{ width: '100%', paddingLeft: '40px', boxSizing: 'border-box' }}
                                >
                                    <option value="AGENT">Real Estate Agent</option>
                                    <option value="ADMIN">System Administrator</option>
                                </select>
                            </div>
                            
                            {/* Location is strictly for Agents */}
                            {selectedRole === 'AGENT' && (
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                                    <input type="text" name="location" placeholder="Base Location (e.g., Mumbai)" required style={{ width: '100%', paddingLeft: '40px', boxSizing: 'border-box' }} />
                                </div>
                            )}
                        </>
                    )}

                    {error && <div className="error-message" style={{ margin: '0' }}>{error}</div>}

                    <button type="submit" style={{ width: '100%', padding: '14px', fontSize: '16px', marginTop: '10px' }}>
                        {isLogin ? 'Sign In' : 'Register Now'}
                    </button>
                </form>

                <p style={{ marginTop: '24px', fontSize: '14px' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span onClick={() => setIsLogin(!isLogin)} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </span>
                </p>
            </div>
        </div>
    );
}