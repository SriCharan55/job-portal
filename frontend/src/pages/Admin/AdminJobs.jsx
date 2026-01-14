import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axiosInstance.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job.job_id !== jobId));
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  const viewApplicants = async (job) => {
    setSelectedJob(job);
    try {
      const res = await axiosInstance.get(
        `/jobs/${job.job_id}/applications`
      );
      setApplicants(res.data);
    } catch (err) {
      setApplicants([]);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setApplicants([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl ml-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Jobs</h1>
          <Link to="/admin/jobs/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            + Create Job
          </Link>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {jobs.length === 0 ? (
          <p>No jobs created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-start items-start">
            {jobs.map((job) => (
              <div
                key={job.job_id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-green-300 hover:ring-2 hover:ring-green-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                    <div className="flex gap-2 items-center mb-3">
                      <span className="px-3 py-1 text-sm bg-gray-100 text-black rounded-full">{job.location}</span>
                      <span className="px-3 py-1 text-sm bg-gray-100 text-black rounded-full">{job.job_type}</span>
                    </div>
                    {job.description && (
                      <p className="text-sm text-black mb-4 line-clamp-2">{job.description}</p>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col gap-2">
                    <button
                      onClick={() => viewApplicants(job)}
                      className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Applicants
                    </button>
                    <Link
                      to={`/admin/jobs/edit/${job.job_id}`}
                      className="px-3 py-2 text-sm rounded-lg bg-green-600 text-white text-center hover:bg-green-700 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(job.job_id)}
                      className="px-3 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Applicants Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Applicants for {selectedJob.title}</h2>
                <button onClick={closeModal} className="text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-full p-2">✖</button>
              </div>

              {applicants.length === 0 ? (
                <p className="text-gray-600">No applicants yet.</p>
              ) : (
                <ul className="space-y-3">
                  {applicants.map((user, index) => (
                    <li key={index} className="border p-3 rounded-lg flex items-center justify-between bg-gray-50">
                      <div>
                        <p className="font-medium text-black">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <a href={`mailto:${user.email}`} className="text-blue-600 font-medium">Email</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
