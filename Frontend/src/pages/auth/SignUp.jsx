import React, { useId, useState } from "react";
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
    console.log(email, name, pass);
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
      setError("Plese enter password");
      return;
    }
    if (!username) {
      setError("plese enter username");
    }

    try {
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
              <label htmlFor="name">Full name</label>
              <input
                className="text-black"
                type="text"
                id="name"
                placeholder="Full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="username">Full name</label>
              <input
                className="text-black"
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                className="text-black"
                type="email"
                id="email"
                placeholder="Email"
                value={email}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="p-1">
              <button className="border-none  bg-slate-500" type="submit">
                Sign Up
              </button>
            </div>
            {error ? <div className="text-red-500">{error}</div> : null}
            <p>
              Alredy have an account? <Link to="/login">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
