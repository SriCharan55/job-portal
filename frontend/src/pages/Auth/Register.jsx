import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );

      // After successful registration, navigate to login (do not auto-login)
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center">
          Create Account
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Join JobPortal and start your journey
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="
                w-full px-4 py-2
                border rounded-lg
                focus:outline-none
                focus:ring-2 focus:ring-primary
                focus:border-primary
              "
              style={{ backgroundColor: "#ffffff", color: "#000000", borderColor: "#cbd5e1" }}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="
                w-full px-4 py-2
                border rounded-lg
                focus:outline-none
                focus:ring-2 focus:ring-primary
                focus:border-primary
              "
              style={{ backgroundColor: "#ffffff", color: "#000000", borderColor: "#cbd5e1" }}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="
                w-full px-4 py-2
                border rounded-lg
                focus:outline-none
                focus:ring-2 focus:ring-primary
                focus:border-primary
              "
              style={{ backgroundColor: "#ffffff", color: "#000000", borderColor: "#cbd5e1" }}
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Register as
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center justify-center gap-2 h-12 px-4 border rounded-lg cursor-pointer text-center font-medium transform transition-all duration-150
    ${formData.role === "candidate"
                    ? "bg-primary text-black-500 border-primary scale-105 shadow-md"
                    : "text-gray-700 bg-white border-gray-300 hover:border-primary hover:scale-105"
                  }`}
                role="button"
              >
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={formData.role === "candidate"}
                  onChange={handleChange}
                  className="hidden"
                />
                {formData.role === "candidate" && (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 103.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="block w-full text-center">Candidate</span>
              </label>

             <label
  className={`flex items-center justify-center gap-2 h-12 px-4 border rounded-lg cursor-pointer text-center font-medium transform transition-all duration-150
    ${formData.role === "admin"
      ? "bg-primary text-black-500 border-primary scale-105 shadow-md"
      : "text-gray-700 bg-white border-gray-300 hover:border-primary hover:scale-105"
    }`}
  role="button"
>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                  className="hidden"
                />
                {formData.role === "admin" && (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 103.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="block w-full text-center">Recruiter</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3
              bg-primary text-white
              font-semibold rounded-lg
              hover:bg-primary/90
              transition
              disabled:opacity-50
            "
            style={{ backgroundColor: '#1d4ed8', color: '#ffffff' }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;  