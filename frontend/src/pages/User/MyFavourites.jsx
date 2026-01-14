import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import JobCard from "../../components/JobCard";

const MyFavourites = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [favRes, appRes] = await Promise.all([
        axiosInstance.get("/favourites/my"),
        axiosInstance.get("/applications/my").catch(() => ({ data: [] })),
      ]);

      setJobs(favRes.data);
      setAppliedJobs(appRes.data.map((job) => job.job_id));
    } catch (err) {
      setError("Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };

  const removeFavourite = async (jobId) => {
    try {
      await axiosInstance.delete(`/favourites/${jobId}`);
      setJobs(jobs.filter((job) => job.job_id !== jobId));
    } catch (err) {
      alert("Failed to remove favourite");
    }
  };

  const applyJob = async (jobId) => {
    try {
      await axiosInstance.post(`/applications/${jobId}`);
      setAppliedJobs([...appliedJobs, jobId]);
    } catch (err) {
      alert("Failed to apply");
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-6xl ml-8">
      <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {jobs.length === 0 ? (
        <div className="text-center">
          <p>No saved jobs</p>
          <Link
            to="/jobs"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {jobs.map((job) => (
            <JobCard
              key={job.job_id}
              job={job}
              onApply={applyJob}
              onRemoveSave={removeFavourite}
              isApplied={appliedJobs.includes(job.job_id)}
              isSaved={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavourites;
