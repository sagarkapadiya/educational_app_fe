export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('API base URL is not defined in environment variables');
}

export const API_ENDPOINTS = {
  ask: `${API_BASE_URL}/api/ask/`,
  history: `${API_BASE_URL}/api/history`,
};