export default function PropertiesTable({ properties }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Address</th>
          <th>Type</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {properties && properties.length > 0 ? (
          properties.map(p => (
            <tr key={p._id}>
              <td>{p.address || "N/A"}</td>
              <td>{p.type || "N/A"}</td>
              <td>${p.price || "0"}</td>
              <td>{p.status || "Available"}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>No properties found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}