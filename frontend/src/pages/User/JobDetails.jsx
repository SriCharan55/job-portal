import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const JobDetails = () => {
  const { id } = useParams(); // job_id
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [jobRes, appsRes, favsRes] = await Promise.all([
        axiosInstance.get(`/jobs/${id}`),
        axiosInstance.get("/applications/my"),
        axiosInstance.get("/favourites/my"),
      ]);

      setJob(jobRes.data);

      setIsApplied(
        appsRes.data.some((j) => j.job_id === Number(id))
      );

      setIsSaved(
        favsRes.data.some((j) => j.job_id === Number(id))
      );
    } catch (err) {
      setError("Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      await axiosInstance.post(`/applications/${id}`);
      setIsApplied(true);
    } catch (err) {
      alert(err.response?.data?.message || "Already applied");
    }
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        await axiosInstance.delete(`/favourites/${id}`);
        setIsSaved(false);
      } else {
        await axiosInstance.post(`/favourites/${id}`);
        setIsSaved(true);
      }
    } catch (err) {
      alert("Action failed");
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;

  if (error || !job)
    return (
      <div className="p-8 text-center">
        <p>{error || "Job not found"}</p>
        <button
          onClick={() => navigate("/jobs")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Jobs
        </button>
      </div>
    );

return (
  <div className="p-8 bg-gray-50 min-h-screen">
    <div className="max-w-md ml-8">

      {/* Back button (OUTSIDE card) */}
      <button
        onClick={() => navigate("/jobs")}
        className="
          mb-4
          inline-flex
          items-center
          text-blue-600
          font-medium
          hover:underline
        "
      >
        ← Back to Jobs
      </button>

      {/* Job Card */}
      <div
        className="
          bg-white
          border-2 border-green-200
          rounded-xl
          p-5
          shadow-sm
          hover:shadow-md
          transition
        "
      >
        {/* Job Title */}
        <h1 className="text-xl font-bold text-black mb-3">
          {job.title}
        </h1>

        {/* Location + Job Type */}
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium bg-green-100 text-black rounded-full">
            {job.location}
          </span>
          <span className="px-3 py-1 text-xs font-medium bg-green-100 text-black rounded-full">
            {job.job_type}
          </span>
        </div>

        {/* Description styled like tag */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-green-50 text-black rounded-full border border-green-200">
            {job.description}
          </span>
        </div>

        {/* Actions (ONLY job actions) */}
        <div className="grid grid-cols-2 gap-3">
          {isApplied ? (
            <div className="text-center py-2 rounded-lg bg-green-100 text-green-700 font-medium">
              Applied
            </div>
          ) : (
            <button
              onClick={handleApply}
              className="py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Apply
            </button>
          )}

          <button
            onClick={handleSave}
            className={
              isSaved
                ? "py-2 rounded-lg bg-blue-600 text-white"
                : "py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
            }
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default JobDetails;
