/**
 * API Service
 * Handles all HTTP requests to the backend
 * Centralizes API logic for easier maintenance
 */

// base URL for API requests
const API_BASE = '/api';

/**
 * Fetch all candidates with pagination and filtering
 * @param {number} page - current page number
 * @param {number} limit - items per page
 * @param {string} status - filter by status (optional)
 */
export const fetchCandidates = async (page = 1, limit = 10, status = '') => {
  // build query params
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });

  // add status filter if provided
  if (status) {
    params.append('status', status);
  }

  const response = await fetch(`${API_BASE}/candidates?${params}`);

  // handle error response
  if (!response.ok) {
    throw new Error('Failed to fetch candidates');
  }

  return response.json();
};

/**
 * Fetch candidate statistics
 * Returns counts by status and domain breakdown
 */
export const fetchStats = async () => {
  const response = await fetch(`${API_BASE}/candidates/stats`);

  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }

  return response.json();
};

/**
 * Update candidate status
 * @param {string} id - candidate id
 * @param {string} status - new status (pending/selected/rejected)
 */
export const updateStatus = async (id, status) => {
  const response = await fetch(`${API_BASE}/candidates/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw new Error('Failed to update status');
  }

  return response.json();
};

/**
 * Search candidates by query
 * @param {string} query - search term (email or domain)
 */
export const searchCandidates = async (query) => {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`${API_BASE}/candidates/search?${params}`);

  if (!response.ok) {
    throw new Error('Search failed');
  }

  return response.json();
};

/**
 * Fetch a single candidate by ID
 * @param {string} id - candidate id
 */
export const fetchCandidateById = async (id) => {
  const response = await fetch(`${API_BASE}/candidates/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch candidate');
  }

  return response.json();
};
