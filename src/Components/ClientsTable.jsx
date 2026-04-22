// src/components/ClientsTable.jsx
export default function ClientsTable({ clients }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {clients.map(c => (
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}