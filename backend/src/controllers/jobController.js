const pool = require("../config/db");

// CREATE JOB (ADMIN)
exports.createJob = async (req, res) => {
  try {
    const { title, description, location, job_type } = req.body;

    const result = await pool.query(
      `INSERT INTO jobs (title, description, location, job_type, created_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, location, job_type, req.user.user_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL JOBS (PUBLIC + FILTERS)
exports.getAllJobs = async (req, res) => {
  try {
    const { search, location, job_type } = req.query;

    let query = "SELECT * FROM jobs WHERE 1=1";
    const values = [];

    if (search) {
      values.push(`%${search}%`);
      query += ` AND title ILIKE $${values.length}`;
    }

    if (location) {
      values.push(location);
      query += ` AND location = $${values.length}`;
    }

    if (job_type) {
      values.push(job_type);
      query += ` AND job_type = $${values.length}`;
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET JOB BY ID (PUBLIC)
exports.getJobById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM jobs WHERE job_id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE JOB (ADMIN)
exports.updateJob = async (req, res) => {
  try {
    const { title, description, location, job_type } = req.body;

    const result = await pool.query(
      `UPDATE jobs
       SET title=$1, description=$2, location=$3, job_type=$4
       WHERE job_id=$5
       RETURNING *`,
      [title, description, location, job_type, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE JOB (ADMIN)
exports.deleteJob = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM jobs WHERE job_id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
