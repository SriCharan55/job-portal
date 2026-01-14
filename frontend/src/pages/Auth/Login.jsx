import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);

      if (user.role === "admin") {
        navigate("/admin/jobs");
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Sign in to your account
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
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="
                w-full px-4 py-2
                border rounded-lg
                focus:outline-none
                focus:ring-2 focus:ring-primary
                focus:border-primary
              "
              style={{ backgroundColor: "#ffffff", color: "#000000", borderColor: "#cbd5e1" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="
                w-full px-4 py-2
                border rounded-lg
                focus:outline-none
                focus:ring-2 focus:ring-primary
                focus:border-primary
              "
              style={{ backgroundColor: "#ffffff", color: "#000000", borderColor: "#cbd5e1" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium underline underline-offset-4"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
