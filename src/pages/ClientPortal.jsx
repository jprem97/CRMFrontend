import { useState } from 'react';
import { apiCall } from '../api.js';
import { Home, Key, User, Phone, MapPin, IndianRupee } from 'lucide-react';

export default function ClientPortal() {
    const [role, setRole] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        
        const data = {
            name: fd.get('name'),
            phone: fd.get('phone'),
            preferredLocation: fd.get('preferredLocation'),
            type: role.toUpperCase(),
            price: role === 'seller' ? parseFloat(fd.get('price')) : (fd.get('budget') ? parseFloat(fd.get('budget')) : null)
        };

        try {
            const res = await apiCall('/clients/create-client', 'POST', data);
            setResult(res);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    if (result) {
        return (
            <div className="container">
                <div className="success-message" style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <div style={{ backgroundColor: '#d1fae5', padding: '20px', borderRadius: '50%', color: '#059669' }}>
                            <Key size={48} />
                        </div>
                    </div>
                    <h2>✅ Request Received!</h2>
                    <p style={{ fontSize: '16px' }}>Thank you! The best agent in your area has been assigned to you.</p>
                    <p style={{ color: 'var(--text-muted)' }}>Reference ID: {result.client._id}</p>
                    <button style={{marginTop: '25px'}} onClick={() => { setResult(null); setRole(null); }}>Submit Another</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            
            {!role ? (
                <div>
                    <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Welcome to RealEstate Pro</h1>
                    <p style={{ textAlign: 'center', marginBottom: '40px' }}>How can we help you today?</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {/* Interactive Selection Cards */}
                        <div 
                            onClick={() => setRole('seller')}
                            style={{ border: '2px solid var(--border-color)', borderRadius: '12px', padding: '30px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.backgroundColor = '#eff6ff'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            <Home size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
                            <h2 style={{ margin: '0 0 8px 0' }}>I want to Sell</h2>
                            <p style={{ margin: 0, fontSize: '14px' }}>List your property and get the best market value.</p>
                        </div>

                        <div 
                            onClick={() => setRole('buyer')}
                            style={{ border: '2px solid var(--border-color)', borderRadius: '12px', padding: '30px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.backgroundColor = '#eff6ff'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            <Key size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
                            <h2 style={{ margin: '0 0 8px 0' }}>I want to Buy</h2>
                            <p style={{ margin: 0, fontSize: '14px' }}>Find your dream home with our expert agents.</p>
                        </div>
                    </div>

                    {/* MOCK API & IMAGE SHOWCASE SECTION */}
                    <div className="mock-showcase" style={{ marginTop: '50px', textAlign: 'left', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>
                        <div className="disclaimer-banner" style={{ backgroundColor: '#fffbeb', color: '#b45309', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '24px', border: '1px solid #fef3c7' }}>
                            ⚠️ <strong>Note:</strong> This is for show. Map data and property imagery are placeholders. Live third-party APIs will be integrated for future purposes.
                        </div>
                        
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={20} /> Featured Properties in your area</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&w=400&q=80" alt="House" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                                <div style={{ padding: '16px' }}>
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Modern Villa</h4>
                                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>₹ 3.5 Cr • Koramangala</p>
                                </div>
                            </div>
                            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=400&q=80" alt="House" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                                <div style={{ padding: '16px' }}>
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Luxury Penthouse</h4>
                                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>₹ 5.2 Cr • Bandra West</p>
                                </div>
                            </div>
                        </div>

                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={20} /> Interactive Area Map</h3>
                        <iframe 
                            title="Mock Map" width="100%" height="350" 
                            src="https://www.openstreetmap.org/export/embed.html?bbox=77.58,12.92,77.65,12.98&layer=mapnik" 
                            style={{ border: '1px solid var(--border-color)', borderRadius: '12px', filter: 'contrast(1.1)' }}>
                        </iframe>
                    </div>
                </div>
            ) : (
                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div onClick={() => setRole(null)} style={{ cursor: 'pointer', color: 'var(--text-muted)', padding: '8px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>← Back</div>
                        <h2 style={{ margin: 0 }}>{role === 'seller' ? 'Seller Registration' : 'Buyer Registration'}</h2>
                    </div>

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="text" name="name" placeholder="Full Name" required style={{ width: '100%', paddingLeft: '40px', boxSizing: 'border-box' }} />
                        </div>
                        
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="tel" name="phone" placeholder="Phone Number" required style={{ width: '100%', paddingLeft: '40px', boxSizing: 'border-box' }} />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="text" name="preferredLocation" placeholder="Preferred Location / Area" required style={{ width: '100%', paddingLeft: '40px', boxSizing: 'border-box' }} />
                        </div>
                        
                        {role === 'seller' && (
                            <div style={{ position: 'relative' }}>
                                <IndianRupee size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                                <input type="number" name="price" placeholder="Expected Selling Price (₹)" required style={{ width: '100%', paddingLeft: '40px', boxSizing: 'border-box' }} />
                            </div>
                        )}
                        {role === 'buyer' && (
                            <div style={{ position: 'relative' }}>
                                <IndianRupee size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                                <input type="number" name="budget" placeholder="Estimated Budget (Optional)" style={{ width: '100%', paddingLeft: '40px', boxSizing: 'border-box' }} />
                            </div>
                        )}
                        
                        <button type="submit" style={{ width: '100%', padding: '14px', fontSize: '16px', marginTop: '10px' }}>
                            Find My Agent
                        </button>
                        
                        {error && <div className="error-message" style={{ margin: '15px 0 0 0' }}>{error}</div>}
                    </form>
                </div>
            )}
        </div>
    );
}