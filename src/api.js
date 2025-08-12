import axios from 'axios';
const BASE = import.meta.env.VITE_BACKEND_URL || '';
export const api = axios.create({
  baseURL: BASE + '/api',
  headers: { 'Content-Type': 'application/json' }
});
