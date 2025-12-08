// Authentication utility functions for managing tokens and user session

const AUTH_TOKEN_KEY = 'career_setu_auth_token';
const USER_DATA_KEY = 'career_setu_user';

/**
 * Get stored authentication token
 * @returns {string|null} Auth token or null if not found
 */
export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Store authentication token
 * @param {string} token - JWT token from backend
 */
export const setAuthToken = (token) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * Remove authentication token (logout)
 */
export const removeAuthToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has valid token
 */
export const isAuthenticated = () => {
    const token = getAuthToken();
    return !!token;
};

/**
 * Get stored user data
 * @returns {object|null} User data object or null
 */
export const getUserData = () => {
    const data = localStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
};

/**
 * Store user data
 * @param {object} userData - User information from backend
 */
export const setUserData = (userData) => {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
};

/**
 * Remove user data
 */
export const removeUserData = () => {
    localStorage.removeItem(USER_DATA_KEY);
};

/**
 * Complete logout - remove all auth data
 */
export const logout = () => {
    removeAuthToken();
    removeUserData();
};

/**
 * Get authorization header for API requests
 * @returns {object} Headers object with Authorization
 */
export const getAuthHeaders = () => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};
