import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useUserContext } from "../../context/UserContext";

function LogIn() {
  const { user, setUserEmail } = useUserContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/home/work-flow");
    }
  }, [user, navigate]);

  // 2. Prevent rendering the form while redirecting
  if (user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Clean inputs before sending
    const cleanEmail = email.toLowerCase().trim();

    if (!cleanEmail) return setError("Please enter email");
    if (!cleanEmail.includes("@")) return setError("Invalid email");
    if (!password) return setError("Please enter password");

    try {
      setLoading(true);
      const { data } = await api.post("/user/login", {
        email: cleanEmail,
        password, // Don't trim password (some passwords might contain intentional spaces)
      });

      if (data.statusCode === 200) {
        setUserEmail(cleanEmail);
        navigate("/verify-otp");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-slate-900 px-4">
      <div className="w-full max-w-md bg-[#0f1720] border border-[#20232a] rounded-2xl p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Sign in to TaskFlow
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back — please enter your details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-2">Email</label>
            <input
              className="p-3 rounded-lg bg-[#0b1220] border border-[#262b33] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-2">Password</label>
            <input
              className="p-3 rounded-lg bg-[#0b1220] border border-[#262b33] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full mt-2 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Log In"}
          </button>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <p className="text-sm text-gray-400 mt-3 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
