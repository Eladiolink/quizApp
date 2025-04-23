import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export async function get<T>(url: string): Promise<T> {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const response = await api.get<T>(url, {
    headers
  });

  return response.data;
}

export async function post<T, R>(url: string, data: T): Promise<R> {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const response = await api.post<R>(url, data, {
    headers
  });

  return response.data;
}

export async function del(url: string): Promise<void> {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  await api.delete(url, {
    headers,
  });
}


export default api;
