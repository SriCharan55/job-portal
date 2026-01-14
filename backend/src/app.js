const express = require("express");
const cors = require("cors");

// initialize database connection
require("./config/db");

// routes
const authRoutes = require("./routes/authRoutes");
const { checkAuth } = require("./middleware/authMiddleware");
const { checkAdmin } = require("./middleware/roleMiddleware");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");








const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend API is running successfully");
});

// auth routes
app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/favourites", favouriteRoutes);


// admin test route
app.get("/admin-test", checkAuth, checkAdmin, (req, res) => {
  res.send("Admin access granted");
});

module.exports = app;
