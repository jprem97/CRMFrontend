export default function Home({ onNavigate }) {
  return (
    <div className="container">
      <h1>🏠 Welcome to Real Estate Dashboard</h1>

      <div className="options">
        <button onClick={() => onNavigate("client")}>👤 Client</button>
        <button onClick={() => onNavigate("user")}>👔 User</button>
      </div>
    </div>
  );
}