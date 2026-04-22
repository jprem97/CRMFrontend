import { useState, useEffect } from 'react';
import { apiCall } from '../api.js';

export default function AdminDashboard() {
    const [performance, setPerformance] = useState([]);
    const [agents, setAgents] = useState([]);
    const [searchLocation, setSearchLocation] = useState('');
    const [error, setError] = useState(null);

    const loadPerformance = async () => {
        try {
            const data = await apiCall('/admin/agent-performance');
            setPerformance(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => { loadPerformance(); }, []);

    const handleSearch = async () => {
        if (!searchLocation.trim()) return;
        try {
            const result = await apiCall(`/admin/agents-by-location?location=${encodeURIComponent(searchLocation)}`);
            setAgents(result);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>👑 Admin Dashboard</h1>
            {error && <div className="error-message">{error}</div>}
            
            <div className="dashboard">
                <div className="section">
                    <h2>📊 All Agent Performance</h2>
                    <button className="create-activity-btn" onClick={loadPerformance}>🔄 Refresh</button>
                    {performance.length === 0 ? <p>No agents found.</p> : (
                        <table>
                            <thead><tr><th>Agent</th><th>Location</th><th>Score</th><th>Load</th></tr></thead>
                            <tbody>
                                {performance.map((p, i) => (
                                    <tr key={i}>
                                        <td>{p.name || 'N/A'}</td>
                                        <td>{p.location || 'N/A'}</td>
                                        <td>{p.performanceScore}</td>
                                        <td>{p.currentLoad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="section">
                    <h2>🔍 Filter Agents by Location</h2>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <input 
                            type="text" 
                            placeholder="Enter location" 
                            style={{ flex: 1 }}
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    {agents.length > 0 && (
                        <table>
                            <thead><tr><th>Name</th><th>Email</th><th>Score</th></tr></thead>
                            <tbody>
                                {agents.map(a => (
                                    <tr key={a._id}>
                                        <td>{a.user.name}</td>
                                        <td>{a.user.email}</td>
                                        <td>{a.performanceScore}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}