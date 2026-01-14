const pool = require("../config/db");

// APPLY JOB
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.user_id;

    const result = await pool.query(
      `INSERT INTO applications (user_id, job_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, job_id) DO NOTHING
       RETURNING *`,
      [userId, jobId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    res.status(201).json({ message: "Job applied successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET MY APPLICATIONS (JOIN)
exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT jobs.*
       FROM applications
       JOIN jobs ON applications.job_id = jobs.job_id
       WHERE applications.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
