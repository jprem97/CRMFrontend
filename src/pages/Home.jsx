import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="container">
            <h1>🏠 Welcome to Real Estate Dashboard</h1>
            <p>Choose your role to get started</p>
            <div className="options">
                <button onClick={() => navigate('/client')}>👤 Client</button>
                <button onClick={() => navigate('/user')}>👔 User</button>
            </div>
        </div>
    );
}