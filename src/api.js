export const API_BASE = 'http://localhost:5000/api';

export async function apiCall(endpoint, method = 'GET', body = null, headers = {}) {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    };
    if (body) config.body = JSON.stringify(body);
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function logout() {
    try {
        // Tell the backend to clear the cookies
        await apiCall('/users/logout', 'POST');
    } catch (e) {
        console.error("Logout backend call failed", e);
    }
    
    // Clear the frontend state
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
}