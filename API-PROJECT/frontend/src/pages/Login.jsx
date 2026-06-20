import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-950 flex items-center justify-center py-12 px-6 relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Login to explore your soundscape</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 outline-none transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 outline-none transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md shadow-purple-500/10 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          New to MusicHub?{" "}
          <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Register Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
