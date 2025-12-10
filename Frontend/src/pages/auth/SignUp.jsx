import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useUserContext } from "../../context/UserContext";

function SignUp() {
  const { user, setUserEmail } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home/work-flow");
    }
  }, [user, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name.trim();
    const cleanUsername = username.trim();

    if (!cleanName) return setError("Please enter name");
    if (!cleanUsername) return setError("Please enter username");
    if (!cleanEmail.includes("@")) return setError("Invalid email address");
    if (!password) return setError("Please enter password");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");

    try {
      setLoading(true);
      const response = await api.post("user/register", {
        name: cleanName,
        username: cleanUsername,
        email: cleanEmail,
        password,
      });

      console.log(response);
      setUserEmail(cleanEmail);
      navigate("/verify-otp");
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
      <div className="w-full max-w-lg bg-[#0f1720] border border-[#20232a] rounded-2xl p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Create your account
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Join TaskFlow — quick setup, start organizing.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 gap-4"
        >
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Full name
            </label>
            <input
              className="w-full p-3 rounded-lg bg-[#0b1220] border border-[#262b33] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 block">Username</label>
            <input
              className="w-full p-3 rounded-lg bg-[#0b1220] border border-[#262b33] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              type="text"
              autoComplete="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 block">Email</label>
            <input
              className="w-full p-3 rounded-lg bg-[#0b1220] border border-[#262b33] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 block">Password</label>
            <input
              className="w-full p-3 rounded-lg bg-[#0b1220] border border-[#262b33] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full mt-2 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <p className="text-sm text-gray-400 mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
