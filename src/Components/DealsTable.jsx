export default function DealsTable({ deals }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Property</th>
          <th>Status</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {deals && deals.length > 0 ? (
          deals.map(d => (
            <tr key={d._id}>
              <td>{d.title || "N/A"}</td>
              <td>{d.property || "N/A"}</td>
              <td>{d.status || "Pending"}</td>
              <td>${d.amount || "0"}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>No deals found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}