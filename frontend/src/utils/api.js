const BASE_URL = 'https://localhost:61506';

function getHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

async function getErrorMessage(res) {
    try {
        const body = await res.json();
        return body.message || `Error: ${res.status}`;
    } catch {
        return `Error: ${res.status}`;
    }
}

export async function apiGet(path) {
    const res = await fetch(`${BASE_URL}${path}`, { headers: getHeaders() });
    if (!res.ok) throw new Error(await getErrorMessage(res));
    return res.json();
}

export async function apiPost(path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(await getErrorMessage(res));
    return res.json();
}

export async function apiPut(path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(await getErrorMessage(res));
    return res.json();
}

export async function apiDelete(path) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    if (!res.ok) throw new Error(await getErrorMessage(res));
    return res.json();
}
