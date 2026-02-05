/**
 * Main App Component
 * Entry point for the candidate selection interface
 * Manages global state and renders main layout
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import CandidateList from './components/CandidateList';
import Stats from './components/Stats';
import SearchBar from './components/SearchBar';
import { fetchCandidates, fetchStats, updateStatus, searchCandidates } from './services/api';

function App() {
  // state for candidates data
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // filter state
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Fetch candidates on mount and when filters change
   * Handles loading states and errors
   */
  useEffect(() => {
    loadCandidates();
    loadStats();
  }, [currentPage, statusFilter]);

  // load candidates from API
  const loadCandidates = async () => {
    try {
      setLoading(true);
      const response = await fetchCandidates(currentPage, 10, statusFilter);
      setCandidates(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to load candidates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // load statistics from API
  const loadStats = async () => {
    try {
      const response = await fetchStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  /**
   * Handle status update for a candidate
   * Updates local state after successful API call
   */
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus(id, newStatus);

      // update local state
      setCandidates(prev =>
        prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
      );

      // refresh stats
      loadStats();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  /**
   * Handle search functionality
   * Fetches filtered results from API
   */
  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.length < 2) {
      loadCandidates();
      return;
    }

    try {
      setLoading(true);
      const response = await searchCandidates(query);
      setCandidates(response.data);
      setPagination(null); // disable pagination for search results
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // render loading state
  if (loading && candidates.length === 0) {
    return <div className="loading">Loading candidates...</div>;
  }

  // render error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        {/* statistics section */}
        {stats && <Stats stats={stats} />}

        {/* search and filter section */}
        <div className="filters">
          <SearchBar onSearch={handleSearch} />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="status-filter"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* candidates list */}
        <CandidateList
          candidates={candidates}
          onStatusChange={handleStatusChange}
          loading={loading}
        />

        {/* pagination controls */}
        {pagination && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={!pagination.hasPrevPage}
            >
              Previous
            </button>

            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
