import { useState, useEffect } from 'react';
import { apiCall } from '../api.js';
import { 
    User, MapPin, Activity, Home, Users, Briefcase, 
    Bell, CheckCircle, Plus, Map, TrendingUp, IndianRupee, Star
} from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

export default function AgentDashboard() {
    const [data, setData] = useState({ profile: null, clients: [], properties: [], allProperties: [], deals: [], activities: [], notifications: [] });
    const [activeForm, setActiveForm] = useState(null);

    const loadData = async () => {
        try {
            const [profile, clients, properties, allProperties, deals, activities, notifications] = await Promise.all([
                apiCall('/agents/get-my-profile'), apiCall('/clients/get-clients'), apiCall('/properties/get-properties'),
                apiCall('/properties/search'), apiCall('/deals/get-deals'), apiCall('/activities/get-my-activities'), apiCall('/agents/get-notifications')
            ]);
            setData({ profile, clients, properties, allProperties, deals, activities, notifications });
        } catch (error) { console.error('Load error', error); }
    };

    useEffect(() => { loadData(); }, []);

    const handleFormSubmit = async (e, endpoint) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        try {
            await apiCall(endpoint, 'POST', Object.fromEntries(fd.entries()));
            setActiveForm(null); loadData();
        } catch (err) { alert(err.message); }
    };

    const markRead = async (id) => {
        try {
            await apiCall(`/agents/mark-notification-read/${id}`, 'PATCH');
            loadData();
        } catch (err) { alert(err.message); }
    };

    // ==========================================
    // FAKE PROPERTIES LOGIC (For Demo Purposes)
    // ==========================================
    const fakeProperties = [
        { _id: 'fake1', title: 'The Platinum Penthouse', location: data.profile?.location || 'Premium District', price: 85000000, isFake: true },
        { _id: 'fake2', title: 'Sea-Facing Luxury Villa', location: data.profile?.location || 'Coastal Area', price: 120000000, isFake: true },
        { _id: 'fake3', title: 'Modern Tech Duplex', location: data.profile?.location || 'IT Corridor', price: 45000000, isFake: true }
    ];

    const displayProperties = data.properties.length > 0 ? data.properties : fakeProperties;

    // Mock Trajectory Data for Chart
    const performanceData = [
        { month: 'Jan', score: 10 }, { month: 'Feb', score: 25 }, { month: 'Mar', score: 40 },
        { month: 'Apr', score: 65 }, { month: 'May', score: data.profile?.performanceScore || 80 }
    ];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ margin: 0 }}>Agent Workspace</h1>
                    <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)' }}>Welcome back, {data.profile?.name || 'Agent'}! Here is what's happening today.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#eff6ff', padding: '10px 20px', borderRadius: '30px', color: '#1d4ed8', fontWeight: '600' }}>
                    <MapPin size={18} /> {data.profile?.location || 'Loading...'}
                </div>
            </div>

            {/* Top KPI Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div className="section" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ backgroundColor: '#e0e7ff', padding: '16px', borderRadius: '16px', color: 'var(--primary)' }}><Star size={28} /></div>
                    <div>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Performance Score</p>
                        <h2 style={{ margin: '4px 0 0 0', fontSize: '28px' }}>{data.profile?.performanceScore || 0} <span style={{fontSize: '14px', color: 'var(--success)'}}>+12%</span></h2>
                    </div>
                </div>
                <div className="section" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ backgroundColor: '#dcfce7', padding: '16px', borderRadius: '16px', color: 'var(--success)' }}><Briefcase size={28} /></div>
                    <div>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Active Deals</p>
                        <h2 style={{ margin: '4px 0 0 0', fontSize: '28px' }}>{data.deals.length}</h2>
                    </div>
                </div>
                <div className="section" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ backgroundColor: '#fef3c7', padding: '16px', borderRadius: '16px', color: 'var(--warning)' }}><Users size={28} /></div>
                    <div>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Active Clients</p>
                        <h2 style={{ margin: '4px 0 0 0', fontSize: '28px' }}>{data.clients.length}</h2>
                    </div>
                </div>
            </div>

            <div className="dashboard" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {/* Score Chart */}
                <div className="section" style={{ gridColumn: 'span 2' }}>
                    <h2><TrendingUp size={24} color="var(--primary)"/> Performance Trajectory</h2>
                    <div style={{ height: '250px', width: '100%', marginTop: '20px' }}>
                        <ResponsiveContainer>
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                                <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Notifications */}
                <div className="section" style={{ gridColumn: 'span 1' }}>
                    <h2><Bell size={24} color="var(--warning)"/> Action Items</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '250px', overflowY: 'auto' }}>
                        {data.notifications.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>Inbox zero! You're all caught up.</p> : 
                            data.notifications.map(n => (
                                <div key={n._id} style={{ backgroundColor: '#f8fafc', borderLeft: '4px solid var(--warning)', padding: '16px', borderRadius: '8px' }}>
                                    <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.4' }}>{n.message}</p>
                                    <button onClick={() => markRead(n._id)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <CheckCircle size={14} /> Mark Resolved
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Listed Properties Grid */}
                <div className="section" style={{ gridColumn: '1 / -1', backgroundColor: 'transparent', boxShadow: 'none', border: 'none', padding: '0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 style={{ margin: 0 }}><Home size={24} color="var(--accent)"/> Listed Properties</h2>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setActiveForm('property')}>
                            <Plus size={18} /> New Listing
                        </button>
                    </div>

                    {data.properties.length === 0 && (
                        <div style={{ backgroundColor: '#fffbeb', color: '#b45309', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Bell size={16}/> <strong>Demo Mode:</strong> You haven't added any properties yet. Showing sample portfolio data.
                        </div>
                    )}
                    
                    {activeForm === 'property' && (
                        <form onSubmit={(e) => handleFormSubmit(e, '/properties/create-property')} style={{marginBottom: '30px', padding: '24px', backgroundColor: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)'}}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <input type="text" name="title" placeholder="Property Title (e.g., Luxury Villa)" required style={{ gridColumn: '1 / -1' }} />
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                                    <input type="text" name="location" placeholder="Location" required style={{ paddingLeft: '40px' }} />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <IndianRupee size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                                    <input type="number" name="price" placeholder="Price" required style={{ paddingLeft: '40px' }} />
                                </div>
                            </div>
                            <div style={{display: 'flex', gap: '12px', marginTop: '20px'}}>
                                <button type="submit">Publish Listing</button>
                                <button type="button" className="btn-secondary" onClick={() => setActiveForm(null)}>Cancel</button>
                            </div>
                        </form>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {displayProperties.map((p, index) => (
                            <div key={p._id} className="property-card">
                                <img src={`https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&w=600&q=80&sig=${index}`} alt="Property" />
                                <div className="property-card-body">
                                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{p.title}</h3>
                                    <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <MapPin size={16} /> {p.location}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                                        <strong style={{ fontSize: '20px', color: 'var(--text-main)' }}>₹ {p.price.toLocaleString()}</strong>
                                        <span style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '20px', fontWeight: '600' }}>
                                            {p.isFake ? 'SAMPLE' : 'ACTIVE'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Collaborative Deals Section */}
                <div className="section" style={{ gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 style={{ margin: 0 }}><Briefcase size={24} color="var(--success)"/> Active Deals</h2>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => setActiveForm('deal')}>
                            <Plus size={18} /> Initiate Deal
                        </button>
                    </div>

                    {activeForm === 'deal' && (
                        <form onSubmit={(e) => handleFormSubmit(e, '/deals/create-deal')} style={{marginBottom: '20px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)'}}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <select name="clientId" required>
                                    <option value="">Select Your Client (Buyer)</option>
                                    {data.clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                </select>
                                <select name="propertyId" required>
                                    <option value="">Select Property to Bid On</option>
                                    {data.allProperties.map(p => <option key={p._id} value={p._id}>{p.title} (₹{p.price})</option>)}
                                </select>
                            </div>
                            <div style={{display: 'flex', gap: '12px', marginTop: '20px'}}>
                                <button type="submit">Submit Deal</button>
                                <button type="button" className="btn-secondary" onClick={() => setActiveForm(null)}>Cancel</button>
                            </div>
                        </form>
                    )}

                    <table>
                        <thead><tr><th>Client</th><th>Property</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            {data.deals.length === 0 ? <tr><td colSpan="4" style={{textAlign: 'center', color: 'var(--text-muted)'}}>No active deals. Initiate one above!</td></tr> : 
                                data.deals.map(d => (
                                    <tr key={d._id}>
                                        <td style={{ fontWeight: '500' }}>{d.client?.name || 'Unknown'}</td>
                                        <td>{d.property?.title || 'Unknown'}</td>
                                        <td>
                                            <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', backgroundColor: d.status === 'CLOSED' ? '#dcfce7' : '#eff6ff', color: d.status === 'CLOSED' ? '#166534' : '#1e40af' }}>
                                                {d.status}
                                            </span>
                                        </td>
                                        <td>
                                            {d.status !== 'CLOSED' && (
                                                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => apiCall(`/deals/${d._id}/status`, 'PATCH', {status: 'CLOSED'}).then(loadData)}>Mark Won</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* NEW: Activities Pipeline & Feed */}
                <div className="section" style={{ gridColumn: 'span 1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 style={{ margin: 0 }}><Activity size={24} color="var(--primary)"/> Activity Log</h2>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveForm('activity')}>
                            <Plus size={16} /> Log New
                        </button>
                    </div>

                    {activeForm === 'activity' && (
                        <form onSubmit={(e) => handleFormSubmit(e, '/activities/create-activity')} style={{marginBottom: '20px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)'}}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <select name="type" required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                                    <option value="">Select Interaction Type</option>
                                    <option value="CALL">📞 Call</option>
                                    <option value="EMAIL">✉️ Email</option>
                                    <option value="MEETING">🤝 Meeting</option>
                                </select>
                                <textarea name="description" placeholder="Notes/Description..." required rows="2" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', resize: 'vertical' }}></textarea>
                                
                                <select name="client" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                                    <option value="">Related Client (Optional)</option>
                                    {data.clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                </select>
                                <select name="deal" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                                    <option value="">Related Deal (Optional)</option>
                                    {data.deals.map(d => <option key={d._id} value={d._id}>{d.property?.title} ({d.client?.name})</option>)}
                                </select>
                                
                                {/* Hidden mode input ensuring manual logs get marked properly */}
                                <input type="hidden" name="mode" value="MANUAL" />
                            </div>
                            <div style={{display: 'flex', gap: '8px', marginTop: '16px'}}>
                                <button type="submit" style={{ padding: '6px 12px', fontSize: '12px' }}>Save Log</button>
                                <button type="button" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setActiveForm(null)}>Cancel</button>
                            </div>
                        </form>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '350px', overflowY: 'auto', paddingRight: '4px' }}>
                        {data.activities.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No activities logged yet.</p> :
                            data.activities.map(act => (
                                <div key={act._id} style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'white', position: 'relative' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ 
                                                backgroundColor: act.type === 'CALL' ? '#dbeafe' : act.type === 'EMAIL' ? '#f3e8ff' : act.type === 'MEETING' ? '#fef3c7' : '#e0e7ff', 
                                                color: act.type === 'CALL' ? '#1d4ed8' : act.type === 'EMAIL' ? '#7e22ce' : act.type === 'MEETING' ? '#b45309' : '#4338ca', 
                                                padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' 
                                            }}>
                                                {act.type}
                                            </span>
                                            {act.mode === 'AUTO' && <span style={{ fontSize: '10px', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '10px'}}>AUTO</span>}
                                        </div>
                                    </div>
                                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.4' }}>{act.description}</p>
                                    
                                    {/* Show relations if populated from backend */}
                                    {(act.client || act.deal) && (
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '8px' }}>
                                            {act.client && <span>👤 Client ref attached</span>}
                                            {act.deal && <span>💼 Deal ref attached</span>}
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}