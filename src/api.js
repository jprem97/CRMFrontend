export const API_BASE = "http://localhost:5000/api";

export async function apiCall(endpoint, method = "GET", body = null) {
  const config = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) config.body = JSON.stringify(body);

  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  const res = await fetch(API_BASE + endpoint, config);

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Error" }));
    throw new Error(err.message);
  }

  return res.json();
}