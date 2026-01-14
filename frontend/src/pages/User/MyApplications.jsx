import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "../../components/JobCard";
import axiosInstance from "../../api/axiosInstance";

const MyApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axiosInstance.get("/applications/my");
      setJobs(res.data);
    } catch (err) {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-6xl ml-8">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {jobs.length === 0 ? (
        <div className="text-center">
          <p>No applications yet</p>
          <Link
            to="/jobs"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        // 🔹 GRID instead of vertical list
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.job_id}
              job={job}
              isApplied={true}
              isSaved={false}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
