const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const pool = require("../config/db");
const { checkAuth } = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

/* =========================
   ADMIN JOB CRUD ROUTES
   ========================= */

// Create job
router.post("/", checkAuth, checkAdmin, createJob);

// Update job
router.put("/:id", checkAuth, checkAdmin, updateJob);

// Delete job
router.delete("/:id", checkAuth, checkAdmin, deleteJob);

/* =========================
   PUBLIC JOB ROUTES
   ========================= */

// Get all jobs
router.get("/", getAllJobs);

// Get job by ID
router.get("/:id", getJobById);

/* =========================
   ADMIN – VIEW APPLICANTS
   ========================= */

// View applicants for a job
router.get(
  "/:jobId/applications",
  checkAuth,
  checkAdmin,
  async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT users.user_id, users.name, users.email
         FROM applications
         JOIN users ON applications.user_id = users.user_id
         WHERE applications.job_id = $1`,
        [req.params.jobId]
      );

      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
