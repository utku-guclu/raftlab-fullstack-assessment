/**
 * Candidate Routes
 * Defines all API endpoints related to candidate operations
 * These routes handle CRUD operations for candidate data
 */

const express = require('express');
const router = express.Router();

// import controller functions
const {
  getAllCandidates,
  getCandidateById,
  updateCandidateStatus,
  getCandidateStats,
  searchCandidates
} = require('../controllers/candidateController');

/**
 * GET /api/candidates
 * Fetches all candidates with optional pagination and filtering
 * Query params: page, limit, status, domain
 */
router.get('/', getAllCandidates);

/**
 * GET /api/candidates/stats
 * Returns statistics about candidates
 * Includes counts by status and domain breakdown
 */
router.get('/stats', getCandidateStats);

/**
 * GET /api/candidates/search
 * Search candidates by email or domain
 * Query params: q (search query)
 */
router.get('/search', searchCandidates);

/**
 * GET /api/candidates/:id
 * Fetches a single candidate by their unique ID
 */
router.get('/:id', getCandidateById);

/**
 * PATCH /api/candidates/:id/status
 * Updates the selection status of a candidate
 * Body: { status: 'pending' | 'selected' | 'rejected' }
 */
router.patch('/:id/status', updateCandidateStatus);

module.exports = router;
