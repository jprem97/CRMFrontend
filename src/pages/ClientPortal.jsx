import { useState } from 'react';
import { apiCall } from '../api.js';

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
                <div className="success-message">
                    <h2>✅ Submission Successful!</h2>
                    <p>Thank you! An agent has been assigned to you.</p>
                    <p><strong>Client ID:</strong> {result.client._id}</p>
                </div>
                <button style={{marginTop: '15px'}} onClick={() => { setResult(null); setRole(null); }}>Submit Another</button>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Client Portal</h1>
            {!role ? (
                <div>
                    <h2>Are you a Seller or Buyer?</h2>
                    <button onClick={() => setRole('seller')} style={{marginRight: '10px'}}>Seller</button>
                    <button onClick={() => setRole('buyer')}>Buyer</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>{role === 'seller' ? 'Seller Details' : 'Buyer Details'}</h2>
                    <input type="text" name="name" placeholder="Name" required />
                    <input type="tel" name="phone" placeholder="Phone" required />
                    <input type="text" name="preferredLocation" placeholder="Preferred Location" required />
                    
                    {role === 'seller' && (
                        <>
                            <input type="text" name="propertyTitle" placeholder="Property Title" required />
                            <input type="number" name="price" placeholder="Expected Price" required />
                        </>
                    )}
                    {role === 'buyer' && (
                        <input type="number" name="budget" placeholder="Budget (optional)" />
                    )}
                    
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setRole(null)}>Back</button>
                    
                    {error && <div className="error-message">{error}</div>}
                </form>
            )}
        </div>
    );
}