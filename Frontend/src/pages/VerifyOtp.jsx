import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import api from "../api/axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { userEmail, setUser } = useUserContext();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    console.log(userEmail);
    if (!otp) {
      setError("Plese enter otp");
      return;
    }
    if (otp.length < 5) {
      setError("Invalid otp");
      return;
    }
    if (!/^\d+$/.test(otp)) {
      setError("OTP must contain only numbers");
      return;
    }

    try {
      const { data } = await api.post("/user/verify-otp", {
        otp,
        email: userEmail,
      });
      console.log("LoggedIn successfully");

      console.log(data);

      if (data.statusCode === 200) {
        setUser(data.data);
        navigate("/home");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      setError(msg);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-3 items-center border-2 p-6 max-w-4xl">
        <h2>Check your email</h2>
        <p>enter the verification code sent to</p>
        <p>example@gmail.com</p>
        <div>
          <input
            className="text-black"
            type="number"
            placeholder="Enter Otp"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        </div>
        <div>
          Didn't get code?{" "}
          <span>
            <Link>resend</Link>
          </span>
        </div>
        <div className="bg-slate-300">
          <button className="text-black" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        {error ? <div className="text-red-500">{error}</div> : null}
      </div>
    </div>
  );
};

export default VerifyOtp;
