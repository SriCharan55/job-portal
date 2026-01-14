const express = require("express");
const {
  addFavourite,
  removeFavourite,
  getMyFavourites
} = require("../controllers/favouriteController");

const { checkAuth } = require("../middleware/authMiddleware");
const { checkCandidate } = require("../middleware/roleMiddleware");

const router = express.Router();

// Save job to favourites
router.post("/:jobId", checkAuth, checkCandidate, addFavourite);

// Remove job from favourites
router.delete("/:jobId", checkAuth, checkCandidate, removeFavourite);

// Get my saved jobs
router.get("/my", checkAuth, checkCandidate, getMyFavourites);

module.exports = router;
