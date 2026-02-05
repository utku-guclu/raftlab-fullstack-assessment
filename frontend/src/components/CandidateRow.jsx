/**
 * CandidateRow Component
 * Displays a single candidate's information
 * Provides action buttons to change status
 */

function CandidateRow({ candidate, onStatusChange }) {
  // format the date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // get status badge class based on status
  const getStatusClass = (status) => {
    const classes = {
      pending: 'status-pending',
      selected: 'status-selected',
      rejected: 'status-rejected'
    };
    return classes[status] || 'status-pending';
  };

  return (
    <tr className="candidate-row">
      <td className="email">{candidate.email}</td>
      <td className="domain">{candidate.domain}</td>
      <td className="date">{formatDate(candidate.appliedAt)}</td>
      <td>
        <span className={`status-badge ${getStatusClass(candidate.status)}`}>
          {candidate.status}
        </span>
      </td>
      <td className="actions">
        {/* select button - only show if not already selected */}
        {candidate.status !== 'selected' && (
          <button
            onClick={() => onStatusChange(candidate.id, 'selected')}
            className="btn btn-select"
          >
            Select
          </button>
        )}

        {/* reject button - only show if not already rejected */}
        {candidate.status !== 'rejected' && (
          <button
            onClick={() => onStatusChange(candidate.id, 'rejected')}
            className="btn btn-reject"
          >
            Reject
          </button>
        )}

        {/* reset button - show for selected or rejected */}
        {candidate.status !== 'pending' && (
          <button
            onClick={() => onStatusChange(candidate.id, 'pending')}
            className="btn btn-reset"
          >
            Reset
          </button>
        )}
      </td>
    </tr>
  );
}

export default CandidateRow;
