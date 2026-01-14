const pool = require("../config/db");

// ADD TO FAVOURITES
exports.addFavourite = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { jobId } = req.params;

    const result = await pool.query(
      `INSERT INTO favourites (user_id, job_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, job_id) DO NOTHING
       RETURNING *`,
      [userId, jobId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Job already saved" });
    }

    res.status(201).json({ message: "Job saved to favourites" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REMOVE FROM FAVOURITES
exports.removeFavourite = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { jobId } = req.params;

    await pool.query(
      "DELETE FROM favourites WHERE user_id = $1 AND job_id = $2",
      [userId, jobId]
    );

    res.json({ message: "Removed from favourites" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET MY FAVOURITES (JOIN)
exports.getMyFavourites = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT jobs.*
       FROM favourites
       JOIN jobs ON favourites.job_id = jobs.job_id
       WHERE favourites.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
