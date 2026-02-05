/**
 * Stats Component
 * Displays candidate statistics in a card layout
 * Shows counts by status and top domains
 */

function Stats({ stats }) {
  // don't render if no stats available
  if (!stats) return null;

  return (
    <div className="stats-container">
      {/* total candidates card */}
      <div className="stat-card total">
        <h3>Total Candidates</h3>
        <span className="stat-number">{stats.total}</span>
      </div>

      {/* status breakdown cards */}
      <div className="stat-card pending">
        <h3>Pending</h3>
        <span className="stat-number">{stats.byStatus.pending || 0}</span>
      </div>

      <div className="stat-card selected">
        <h3>Selected</h3>
        <span className="stat-number">{stats.byStatus.selected || 0}</span>
      </div>

      <div className="stat-card rejected">
        <h3>Rejected</h3>
        <span className="stat-number">{stats.byStatus.rejected || 0}</span>
      </div>
    </div>
  );
}

export default Stats;
