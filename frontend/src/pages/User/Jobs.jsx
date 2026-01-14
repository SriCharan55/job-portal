import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import JobCard from "../../components/JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  // filters
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    fetchJobs();        // load all jobs initially
    fetchUserData();
  }, []);

  // 🔹 MODIFIED: accepts params
  const fetchJobs = async (params = {}) => {
    try {
      const res = await axiosInstance.get("/jobs", { params });
      setJobs(res.data);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const [apps, favs] = await Promise.all([
        axiosInstance.get("/applications/my"),
        axiosInstance.get("/favourites/my"),
      ]);

      setAppliedJobs(apps.data.map((j) => j.job_id));
      setSavedJobs(favs.data.map((j) => j.job_id));
    } catch {
      // ignore if not logged in
    }
  };

  // 🔹 NEW: search handler
  const handleSearch = () => {
    fetchJobs({
      search,
      location,
      job_type: jobType,
    });
  };

  // 🔹 NEW: clear handler (ONE click fix)
  const handleClear = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    fetchJobs(); // immediately load all jobs
  };

  const handleApply = async (jobId) => {
    try {
      await axiosInstance.post(`/applications/${jobId}`);
      setAppliedJobs([...appliedJobs, jobId]);
    } catch (err) {
      alert(err.response?.data?.message || "Already applied");
    }
  };

  const handleSave = async (jobId) => {
    try {
      await axiosInstance.post(`/favourites/${jobId}`);
      setSavedJobs([...savedJobs, jobId]);
    } catch (err) {
      alert(err.response?.data?.message || "Already saved");
    }
  };

  if (loading) {
    return <div className="p-8">Loading jobs...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl ml-8">
        <h1 className="text-2xl font-bold mb-6">Browse Jobs</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white text-black"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white text-black"
          />

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
            <option value="Part-time">Part-time</option>
          </select>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleSearch}
              className="py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700"
            >
              Search
            </button>

            <button
              onClick={handleClear}
              className="py-2 rounded-lg font-medium border border-blue-600 text-blue-600 bg-white hover:bg-blue-50"
            >
              Clear
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {jobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.job_id}
                job={job}
                onApply={handleApply}
                onSave={handleSave}
                isApplied={appliedJobs.includes(job.job_id)}
                isSaved={savedJobs.includes(job.job_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
