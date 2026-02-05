/**
 * SearchBar Component
 * Provides search input for filtering candidates
 * Debounces input to avoid excessive API calls
 */

import { useState, useEffect, useRef } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const onSearchRef = useRef(onSearch);

  // Keep ref updated with latest callback
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  /**
   * Debounce search to avoid too many API calls
   * Waits 300ms after user stops typing
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchRef.current(query);
    }, 300);

    // cleanup timer on unmount or query change
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by email or domain..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
