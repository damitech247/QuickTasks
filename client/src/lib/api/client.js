// client\src\lib\api\client.js
// import { PUBLIC_API_BASE_URL } from '$env/static/public';

const PUBLIC_API_BASE_URL = 'https://api.damitech.xyz/';

export async function apiFetch(path, method = 'GET', body = null) {
    const token = typeof localStorage !== 'undefined'
        ? localStorage.getItem('token')
        : null;

    const res = await fetch(`${PUBLIC_API_BASE_URL}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...(body && { body: JSON.stringify(body) })
    });

    const data = await res.json().catch(() => ({}));

    // 🔐 Intercept 401 or invalid token errors
    if (res.status === 401 || data?.error?.code === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth/admin'; // or '/auth/user'
        throw new Error('Session expired. Please log in again.');
    }

    if (!res.ok || data.success === false) {
        const message = data?.error?.message || 'Request failed';
        throw new Error(message);
    }

    return data;
}
