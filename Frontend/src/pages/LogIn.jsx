import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    navigate("/verify-otp");

    if (!email) {
      setError("Plese enter email");
      return;
    } else if (!email.includes("@")) {
      setError("Invalid email");
      return;
    } else if (!password) {
      setError("Plese enter password");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/user/login", { email, password });
      console.log(response.data.message);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      setError(msg);
      console.log(error);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  justify-center items-center min-h-screen  px-4">
      <div className="flex flex-col bg-white/10 backdrop-blur-md shadow-lg p-10 gap-12 max-w-4xl">
        <div>
          <h2>Task Flow</h2>
          <p>Sign In</p>
        </div>
        <div>
          <form
            noValidate
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="flex flex-col gap-5"
          >
            <div>
              <label htmlFor="email">Email</label>
              <input
                className="text-black"
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                disabled={loading}
                onChange={(e) => {
                  setEmail(e.target.value.toLowerCase().trim());
                }}
              />
            </div>
            <div>
              <label htmlFor="pass">Password</label>
              <input
                className="text-black"
                type="password"
                id="pass"
                placeholder="Password"
                value={password}
                disabled={loading}
                onChange={(e) => {
                  setPassword(e.target.value.trim());
                }}
              />
            </div>
            <div className="p-1">
              <button
                className="border-none  bg-green-500"
                type="submit"
                disabled={loading}
              >
                Log In
              </button>
            </div>
            {error ? <div className="text-red-700">{error}</div> : null}
            <p>
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
