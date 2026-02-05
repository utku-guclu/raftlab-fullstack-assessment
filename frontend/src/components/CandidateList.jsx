/**
 * CandidateList Component
 * Renders the list of candidates in a table format
 * Each row shows candidate info and action buttons
 */

import CandidateRow from './CandidateRow';

function CandidateList({ candidates, onStatusChange, loading }) {
  // show loading indicator
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // handle empty state
  if (candidates.length === 0) {
    return <div className="empty-state">No candidates found</div>;
  }

  return (
    <div className="candidate-list">
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Domain</th>
            <th>Applied At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <CandidateRow
              key={candidate.id}
              candidate={candidate}
              onStatusChange={onStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateList;
