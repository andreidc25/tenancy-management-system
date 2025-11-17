// API Configuration
// Uses environment variable VITE_API_URL in production, falls back to localhost in development

export const API_URL = import.meta.env.VITE_API_URL || 'https://mrabaajr.pythonanywhere.com/api';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};
