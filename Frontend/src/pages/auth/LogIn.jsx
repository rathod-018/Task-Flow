import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

function LogIn() {
  const { setUserEmail } = useUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter email");
      return;
    } else if (!email.includes("@")) {
      setError("Invalid email");
      return;
    } else if (!password) {
      setError("Please enter password");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post("/user/login", { email, password });
      // console.log(data);

      if (data.statusCode === 200) {
        setUserEmail(email);
        navigate("/verify-otp");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      setError(msg);
      return;
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
              value={email}
              disabled={loading}
              onChange={(e) => {
                setEmail(e.target.value.toLowerCase().trim());
              }}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-2">Password</label>
            <input
              className="p-3 rounded-lg bg-[#0b1220] border border-[#262b33] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              type="password"
              placeholder="Password"
              value={password}
              disabled={loading}
              onChange={(e) => {
                setPassword(e.target.value.trim());
              }}
            />
          </div>

          <button
            className="w-full mt-2 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Log In"}
          </button>

          {error ? (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          ) : null}

          <p className="text-sm text-gray-400 mt-3">
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
