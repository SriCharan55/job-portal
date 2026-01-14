import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, isAdmin, isCandidate, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl font-extrabold text-primary tracking-tight"
        >
          JobPortal
        </Link>

        {/* CENTER LINKS */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-6">
            {isAdmin && (
              <Link
                to="/admin/jobs"
                className="font-medium text-muted-foreground hover:text-primary transition"
              >
                Manage Jobs
              </Link>
            )}

            {isCandidate && (
              <>
                <Link
                  to="/jobs"
                  className="font-medium text-muted-foreground hover:text-primary transition"
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/my-applications"
                  className="font-medium text-muted-foreground hover:text-primary transition"
                >
                  My Applications
                </Link>
                <Link
                  to="/my-favourites"
                  className="font-medium text-muted-foreground hover:text-primary transition"
                >
                  Saved Jobs
                </Link>
              </>
            )}
          </div>
        )}

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* USER */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex flex-col items-end mr-6">
                  <span className="text-base md:text-lg font-bold" style={{ color: '#0f172a' }}>
                    {user?.name}
                  </span>
                  <span
                    className="text-xs mt-1 px-2 py-0.5 rounded-full inline-block font-medium"
                    style={{
                      backgroundColor: user?.role === 'candidate' ? '#1d4ed8' : '#6b7280',
                      color: '#ffffff',
                      textTransform: 'capitalize'
                    }}
                  >
                    {user?.role}
                  </span>
                </div>
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold rounded-xl transition shadow-md flex items-center justify-center"
                style={{ backgroundColor: '#1d4ed8', color: '#ffffff', boxShadow: '0 6px 14px rgba(29,78,216,0.18)' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN – OUTLINE BUTTON */}
              <Link
                to="/login"
                className="
                  px-4 py-2
                  border border-primary
                  text-primary
                  text-sm font-semibold
                  rounded-lg
                  hover:bg-primary
                  hover:text-white
                  transition
                "
                style={{ borderColor: "#1d4ed8", color: "#1d4ed8" }}
              >
                Login
              </Link>

              {/* REGISTER – SOLID BUTTON */}
              <Link
                to="/register"
                className="
                  px-4 py-2
                  bg-primary text-white
                  text-sm font-semibold
                  rounded-lg
                  hover:bg-primary/90
                  transition
                "
                style={{ backgroundColor: "#1d4ed8", color: "#ffffff" }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
