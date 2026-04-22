import { useState, useEffect } from 'react';
import { apiCall } from '../api.js';

export default function AgentDashboard() {
    const [data, setData] = useState({ profile: null, clients: [], properties: [], deals: [], activities: [], notifications: [] });
    const [activeForm, setActiveForm] = useState(null); // 'activity', 'property', 'deal', null

    const loadData = async () => {
        try {
            const [profile, clients, properties, deals, activities, notifications] = await Promise.all([
                apiCall('/agents/get-my-profile'),
                apiCall('/clients/get-clients'),
                apiCall('/properties/get-properties'),
                apiCall('/deals/get-deals'),
                apiCall('/activities/get-my-activities'),
                apiCall('/agents/get-notifications')
            ]);
            setData({ profile, clients, properties, deals, activities, notifications });
        } catch (error) {
            alert('Error loading dashboard: ' + error.message);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleFormSubmit = async (e, endpoint) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        try {
            await apiCall(endpoint, 'POST', Object.fromEntries(fd.entries()));
            setActiveForm(null);
            loadData();
        } catch (err) { alert(err.message); }
    };

    const markRead = async (id) => {
        try {
            await apiCall(`/agents/mark-notification-read/${id}`, 'PATCH');
            loadData();
        } catch (err) { alert(err.message); }
    };

    return (
        <div>
            <h1>🏢 Agent Dashboard</h1>
            <div className="dashboard">
                <div className="section">
                    <h2>👤 My Profile</h2>
                    {data.profile && (
                        <>
                            <p>Name: {data.profile.name}</p>
                            <p>Email: {data.profile.email}</p>
                            <p>Location: {data.profile.location}</p>
                        </>
                    )}
                </div>

                <div className="section">
                    <h2>👥 My Clients</h2>
                    <table>
                        <thead><tr><th>Name</th><th>Email</th><th>Status</th></tr></thead>
                        <tbody>
                            {data.clients.map(c => <tr key={c._id}><td>{c.name}</td><td>{c.email}</td><td>{c.status}</td></tr>)}
                        </tbody>
                    </table>
                </div>

                {/* Properties Section */}
                <div className="section">
                    <h2>🏠 My Properties</h2>
                    <button className="create-activity-btn" onClick={() => setActiveForm('property')}>➕ Create</button>
                    {activeForm === 'property' && (
                        <form onSubmit={(e) => handleFormSubmit(e, '/properties/create-property')} style={{marginBottom: '15px'}}>
                            <input type="text" name="title" placeholder="Title" required />
                            <input type="text" name="location" placeholder="Location" required />
                            <input type="number" name="price" placeholder="Price" required />
                            <div style={{display: 'flex', gap: '10px'}}>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setActiveForm(null)}>Cancel</button>
                            </div>
                        </form>
                    )}
                    <table>
                        <thead><tr><th>Title</th><th>Location</th><th>Price</th></tr></thead>
                        <tbody>
                            {data.properties.map(p => <tr key={p._id}><td>{p.title}</td><td>{p.location}</td><td>{p.price}</td></tr>)}
                        </tbody>
                    </table>
                </div>

                 {/* Deals Section */}
                 <div className="section">
                    <h2>🤝 My Deals</h2>
                    <button className="create-activity-btn" onClick={() => setActiveForm('deal')}>➕ Create</button>
                    {activeForm === 'deal' && (
                        <form onSubmit={(e) => handleFormSubmit(e, '/deals/create-deal')} style={{marginBottom: '15px'}}>
                            <select name="clientId" required>
                                <option value="">Select Client</option>
                                {data.clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>
                            <select name="propertyId" required>
                                <option value="">Select Property</option>
                                {data.properties.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
                            </select>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setActiveForm(null)}>Cancel</button>
                            </div>
                        </form>
                    )}
                    <table>
                        <thead><tr><th>Client</th><th>Property</th><th>Status</th></tr></thead>
                        <tbody>
                            {data.deals.map(d => <tr key={d._id}><td>{d.client.name}</td><td>{d.property.title}</td><td>{d.status}</td></tr>)}
                        </tbody>
                    </table>
                </div>

                {/* Notifications */}
                <div className="section">
                    <h2>🔔 Notifications</h2>
                    {data.notifications.map(n => (
                        <div key={n._id} className="notification-item">
                            <span>{n.message}</span>
                            <button className="mark-read-btn" onClick={() => markRead(n._id)}>Mark Read</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}