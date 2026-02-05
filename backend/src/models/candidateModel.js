/**
 * Candidate Model
 * Handles all data operations for candidates
 * Uses in-memory storage with initial data from CSV
 */

const { v4: uuidv4 } = require('uuid');

/**
 * Helper function to extract domain from email
 * Used for grouping and filtering candidates
 */
const extractDomain = (email) => {
  return email.split('@')[1] || 'unknown';
};

/**
 * Initial candidate data loaded from CSV
 * Each candidate has: id, email, domain, appliedAt, status
 */
const initialCandidates = [
  { email: '20actalentaccommodation@actalentservices.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'accommodations-ext@meta.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'accommodations@applovin.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'ada@bugcrowd.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'aisourcing@telusinternational.ai', appliedAt: '2026-02-05 01:36:15' },
  { email: 'apply@sciente.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'cagdas@jrcs.co.jp', appliedAt: '2026-02-05 01:36:15' },
  { email: 'careers@australianisb.ac.th', appliedAt: '2026-02-05 01:36:15' },
  { email: 'careers@givedirectly.org', appliedAt: '2026-02-05 01:36:15' },
  { email: 'careers@glenveagh.ie', appliedAt: '2026-02-05 01:36:15' },
  { email: 'careers@goconfluent.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'cooljobs@eventeny.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'demisg@wwf.or.th', appliedAt: '2026-02-05 01:36:15' },
  { email: 'denis@nedzo.ai', appliedAt: '2026-02-05 01:36:15' },
  { email: 'durga.yadav@apolisrises.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'eunhyechoi@uchon.es.kr', appliedAt: '2026-02-05 01:36:15' },
  { email: 'henrico.hunter@bys.ac.th', appliedAt: '2026-02-05 01:36:15' },
  { email: 'hilda@bvteck.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'hr.ta@ondemand.in.th', appliedAt: '2026-02-05 01:36:15' },
  { email: 'hr@pundix.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'hsengteam@gmail.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'info@braingnosis.ai', appliedAt: '2026-02-05 01:36:15' },
  { email: 'info@dbotsoftware.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'infosec@eliassen.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'isteacherthailand@gmail.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'jackie@hmihr.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'jobs.vn@mesoneer.io', appliedAt: '2026-02-05 01:36:15' },
  { email: 'jobs@bellweather.agency', appliedAt: '2026-02-05 01:36:15' },
  { email: 'jobs@blackpool.ac.uk', appliedAt: '2026-02-05 01:36:15' },
  { email: 'karun.k@cpf.co.th', appliedAt: '2026-02-05 01:36:15' },
  { email: 'katiemeechan97@gmail.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'kushiyama.t@jrcs.co.jp', appliedAt: '2026-02-05 01:36:15' },
  { email: 'kwseducator@gmail.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'lifelearners.th@gmail.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'markh@amnuaysilpa.ac.th', appliedAt: '2026-02-05 01:36:15' },
  { email: 'marut@anantayaprimaryschool.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'michael.morris@lhh.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'minakshi.sangwan@aequor.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'mmclaughlin@talener.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'muslimlensinstitute@consultant.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'mycareer@naditech.io', appliedAt: '2026-02-05 01:36:15' },
  { email: 'ngoccb1@vmogroup.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'nhunlq2@fpt.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'nick@symbiotic.fi', appliedAt: '2026-02-05 01:36:15' },
  { email: 'nithyag@panasiagroup.net', appliedAt: '2026-02-05 01:36:15' },
  { email: 'noreply@eliassen.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'outsidelessons@gmail.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'preeti.gupta@aven-sys.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'privacy@concentrate.ai', appliedAt: '2026-02-05 01:36:15' },
  { email: 'procurement@wwf.or.th', appliedAt: '2026-02-05 01:36:15' },
  { email: 'pug8773@gmail.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'ricohunter17@gmail.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'rudikitshoff@byis.info', appliedAt: '2026-02-05 01:36:15' },
  { email: 'rudikitshoff@gmail.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'sawanya@littlebeaverlab.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'seeyourself@cigna.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'shravya.p@precisiontechcorp.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'srealon@creativecircle.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'talent@far.ai', appliedAt: '2026-02-05 01:36:15' },
  { email: 'talent@seoulrobotics.org', appliedAt: '2026-02-05 01:36:15' },
  { email: 'tasha.stevens@happyhormonehealthllc.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'teerasomurt@gmail.com', appliedAt: '2026-02-05 01:36:15' },
  { email: 'tuyendung@gem-corp.tech', appliedAt: '2026-02-05 01:36:15' },
  { email: 'waranyac2531@hotmail.com', appliedAt: '2026-02-05 01:36:15' }
];

/**
 * Transform raw data into candidate objects
 * Add unique ID, domain extraction, and default status
 */
const candidates = initialCandidates.map((c, index) => ({
  id: uuidv4(),
  email: c.email,
  domain: extractDomain(c.email),
  appliedAt: c.appliedAt,
  status: 'pending', // default status for new candidates
  createdAt: new Date().toISOString()
}));

/**
 * Get all candidates
 * Returns a copy to prevent direct mutation
 */
const getAll = () => {
  return [...candidates];
};

/**
 * Find candidate by ID
 * Returns undefined if not found
 */
const getById = (id) => {
  return candidates.find(c => c.id === id);
};

/**
 * Update candidate status by ID
 * Returns updated candidate or null if not found
 */
const updateStatus = (id, status) => {
  const index = candidates.findIndex(c => c.id === id);

  // candidate not found
  if (index === -1) {
    return null;
  }

  // update the status and return updated candidate
  candidates[index].status = status;
  candidates[index].updatedAt = new Date().toISOString();

  return candidates[index];
};

/**
 * Get statistics about candidates
 * Groups by status and provides domain breakdown
 */
const getStats = () => {
  // count candidates by status
  const statusCounts = candidates.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});

  // count candidates by domain
  const domainCounts = candidates.reduce((acc, c) => {
    acc[c.domain] = (acc[c.domain] || 0) + 1;
    return acc;
  }, {});

  // sort domains by count (descending)
  const topDomains = Object.entries(domainCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([domain, count]) => ({ domain, count }));

  return {
    total: candidates.length,
    byStatus: statusCounts,
    topDomains
  };
};

/**
 * Search candidates by email or domain
 * Returns matching candidates
 */
const search = (query) => {
  return candidates.filter(c =>
    c.email.toLowerCase().includes(query) ||
    c.domain.toLowerCase().includes(query)
  );
};

module.exports = {
  getAll,
  getById,
  updateStatus,
  getStats,
  search
};
