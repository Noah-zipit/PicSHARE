import { token } from '../stores/user';

// Base API URL - use environment variable if available, otherwise fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
console.log('API URL:', API_URL); // Helpful for debugging

// Get the current token value
let currentToken;
token.subscribe(value => {
  currentToken = value;
});

// Generic fetch function with auth
async function fetchWithAuth(endpoint, options = {}) {
  try {
    // Set headers with auth token if available
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (currentToken) {
      headers['x-auth-token'] = currentToken;
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    // Handle non-200 responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// API functions
export default {
  // Auth endpoints
  auth: {
    register: async (userData) => {
      const response = await fetchWithAuth('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      return response.json();
    },
    
    login: async (credentials) => {
      const response = await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      return response.json();
    }
  },
  
  // Users endpoints
  users: {
    getCurrent: async () => {
      const response = await fetchWithAuth('/users/me');
      return response.json();
    },
    
    getByLink: async (linkId) => {
      const response = await fetchWithAuth(`/users/link/${linkId}`);
      return response.json();
    }
  },
  
  // Images endpoints
  images: {
    getReceived: async () => {
      const response = await fetchWithAuth('/images/received');
      return response.json();
    },
    
    upload: async (linkId, formData) => {
      // For file uploads, don't use JSON
      const options = {
        method: 'POST',
        body: formData,
        headers: {} // Let browser set correct Content-Type with boundary
      };
      
      if (currentToken) {
        options.headers['x-auth-token'] = currentToken;
      }
      
      try {
        const response = await fetch(`${API_URL}/images/upload/${linkId}`, options);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
        
        return response.json();
      } catch (error) {
        console.error(`Image upload failed for linkId: ${linkId}`, error);
        throw error;
      }
    }
  },
  
  // Utility to check connection
  status: async () => {
    try {
      const response = await fetch(`${API_URL}/test`);
      return response.ok;
    } catch (error) {
      console.error('API connection test failed', error);
      return false;
    }
  }
};