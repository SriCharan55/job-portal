exports.checkAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

exports.checkCandidate = (req, res, next) => {
  if (req.user.role !== "candidate") {
    return res.status(403).json({ message: "Candidate access only" });
  }
  next();
};
