import { Link } from "react-router-dom";
import { useState } from "react";

const JobCard = ({
  job,
  onApply,
  onSave,
  onRemoveSave,
  isApplied,
  isSaved,
  showActions = true,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div
      className="
        group
        bg-white
        border border-green-200
        ring-1 ring-green-50
        rounded-2xl
        p-5
        shadow-sm
        hover:shadow-lg
        hover:border-green-300
        hover:ring-2
        hover:ring-green-100
        transition-transform
        transform hover:-translate-y-1
        max-w-md
      "
    >
      {/* Title */}
      <Link to={`/jobs/${job.job_id}`}>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
          {job.title}
        </h3>
      </Link>

      {/* Meta info */}
      <div className="flex gap-3 mt-2 items-center">
        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-100 text-black rounded-full">
          {job.location}
        </span>
        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-200 text-black rounded-full">
          {job.job_type}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-black mt-3 line-clamp-3 min-h-[48px]">
        {job.description}
      </p>

      {/* Actions */}
      {showActions && (
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-200">
          <Link
            to={`/jobs/${job.job_id}`}
            className="w-full h-11 flex items-center justify-center text-sm font-medium border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition"
          >
            View Details
          </Link>

          {!isApplied ? (
            <button
              onClick={() => setConfirmOpen(true)}
              className="w-full h-11 flex items-center justify-center text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-md transition"
            >
              Apply
            </button>
          ) : (
            <span className="w-full h-11 flex items-center justify-center text-sm font-medium bg-green-100 text-green-700 rounded-lg">
              Applied
            </span>
          )}

          {!isSaved && onSave && (
            <button
              onClick={() => onSave(job.job_id)}
              className="w-full h-11 flex items-center justify-center text-sm font-medium border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white hover:shadow-sm transition"
            >
              Save
            </button>
          )}

          {isSaved && onRemoveSave && (
            <button
              onClick={() => onRemoveSave(job.job_id)}
              className="w-full h-11 flex items-center justify-center text-sm font-medium bg-blue-600 text-white rounded-lg hover:shadow-md transition"
            >
              Saved
            </button>
          )}
        </div>
      )}

      {/* Confirm Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setConfirmOpen(false)}
          />

          <div className="relative bg-white rounded-lg p-6 w-full max-w-sm shadow-lg z-10">
            <h3 className="text-lg font-semibold mb-2">
              Confirm Application
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to apply for this job?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                onClick={() => {
                  if (onApply) onApply(job.job_id);
                  setConfirmOpen(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
