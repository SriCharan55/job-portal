import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    job_type: "Full-time",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing) {
      fetchJob();
    }
    // eslint-disable-next-line
  }, []);

  const fetchJob = async () => {
    try {
      const res = await axiosInstance.get(`/jobs/${id}`);
      setFormData({
        title: res.data.title || "",
        description: res.data.description || "",
        location: res.data.location || "",
        job_type: res.data.job_type || "Full-time",
      });
    } catch (err) {
      setError("Failed to fetch job details");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isEditing) {
        await axiosInstance.put(`/jobs/${id}`, formData);
      } else {
        await axiosInstance.post("/jobs", formData);
      }
      navigate("/admin/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 bg-gray-50">
      <div className="w-full max-w-xl px-4">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="text-sm text-green-600 mb-4 inline-block"
        >
          ← Back to Jobs
        </button>

        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-4">
            {isEditing ? "Edit Job" : "Create Job"}
          </h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4" style={{maxHeight: '75vh', overflow: 'auto'}}>
            <div>
              <label className="block mb-1 font-medium">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-green-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-green-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Job Type</label>
              <select
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                className="w-full border border-green-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full border border-green-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/jobs")}
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
              >
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Update Job"
                  : "Create Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
