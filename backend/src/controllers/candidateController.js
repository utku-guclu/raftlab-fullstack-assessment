/**
 * Candidate Controller
 * Contains all the business logic for candidate operations
 * Handles data processing and response formatting
 */

const { v4: uuidv4 } = require('uuid');
const candidateModel = require('../models/candidateModel');

/**
 * Get all candidates with pagination support
 * Supports filtering by status and domain
 * Returns paginated results with metadata
 */
const getAllCandidates = (req, res) => {
  try {
    // extract query parameters with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || null;
    const domain = req.query.domain || null;

    // fetch candidates from model
    let candidates = candidateModel.getAll();

    // apply status filter if provided
    if (status) {
      candidates = candidates.filter(c => c.status === status);
    }

    // apply domain filter if provided
    if (domain) {
      candidates = candidates.filter(c => c.domain === domain);
    }

    // calculate pagination
    const totalCandidates = candidates.length;
    const totalPages = Math.ceil(totalCandidates / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // slice the data for current page
    const paginatedCandidates = candidates.slice(startIndex, endIndex);

    // send response with pagination metadata
    res.json({
      data: paginatedCandidates,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCandidates,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
};

/**
 * Get a single candidate by ID
 * Returns 404 if candidate not found
 */
const getCandidateById = (req, res) => {
  try {
    const { id } = req.params;
    const candidate = candidateModel.getById(id);

    // check if candidate exists
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json({ data: candidate });
  } catch (error) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({ error: 'Failed to fetch candidate' });
  }
};

/**
 * Update candidate selection status
 * Valid statuses: pending, selected, rejected
 */
const updateCandidateStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // validate status value
    const validStatuses = ['pending', 'selected', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status. Must be: pending, selected, or rejected'
      });
    }

    // update the candidate status
    const updatedCandidate = candidateModel.updateStatus(id, status);

    // check if candidate was found and updated
    if (!updatedCandidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json({
      message: 'Status updated successfully',
      data: updatedCandidate
    });
  } catch (error) {
    console.error('Error updating candidate status:', error);
    res.status(500).json({ error: 'Failed to update candidate status' });
  }
};

/**
 * Get candidate statistics
 * Returns counts grouped by status and domain breakdown
 */
const getCandidateStats = (req, res) => {
  try {
    const stats = candidateModel.getStats();
    res.json({ data: stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

/**
 * Search candidates by email or domain
 * Case-insensitive search
 */
const searchCandidates = (req, res) => {
  try {
    const { q } = req.query;

    // validate search query
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        error: 'Search query must be at least 2 characters'
      });
    }

    const results = candidateModel.search(q.toLowerCase());
    res.json({ data: results, count: results.length });
  } catch (error) {
    console.error('Error searching candidates:', error);
    res.status(500).json({ error: 'Failed to search candidates' });
  }
};

module.exports = {
  getAllCandidates,
  getCandidateById,
  updateCandidateStatus,
  getCandidateStats,
  searchCandidates
};
