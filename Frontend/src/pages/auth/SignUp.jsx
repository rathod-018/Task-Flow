import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useUserContext } from "../../context/UserContext";

function SignUp() {
  const { setUserEmail } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // original logic preserved
    setError("");
    if (!name) {
      setError("Please enter name");
      return;
    }
    if (!email.includes("@")) {
      setError("Invalid email address");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }
    if (!username) {
      setError("Please enter username");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("user/register", {
        name,
        username,
        email,
        password,
      });

      console.log(response);
      setUserEmail(email);
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
              id="name"
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
              id="username"
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
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-1 block">Password</label>
            <input
              className="w-full p-3 rounded-lg bg-[#0b1220] border border-[#262b33] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              type="password"
              id="pass"
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

          {error ? (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          ) : null}

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
