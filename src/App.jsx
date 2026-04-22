import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClientPortal from './pages/ClientPortal';
import UserPortal from './pages/UserPortal';
import './styles.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client" element={<ClientPortal />} />
        <Route path="/user" element={<UserPortal />} />
      </Routes>
    </Router>
  );
}