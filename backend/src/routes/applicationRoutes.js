const express = require("express");
const {
  applyJob,
  getMyApplications
} = require("../controllers/applicationController");

const { checkAuth } = require("../middleware/authMiddleware");
const { checkCandidate } = require("../middleware/roleMiddleware");

const router = express.Router();

// apply to job
router.post("/:jobId", checkAuth, checkCandidate, applyJob);

// get my applications
router.get("/my", checkAuth, checkCandidate, getMyApplications);

module.exports = router;
