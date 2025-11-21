import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useUserContext } from "../../context/UserContext";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { userEmail, setUser } = useUserContext();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!otp) {
      setError("Please enter otp");
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
      setLoading(true);
      const { data } = await api.post("/user/verify-otp", {
        otp,
        email: userEmail,
      });

      if (data.statusCode === 200) {
        setUser(data.data);
        navigate("/home/work-flow");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      setError(msg);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-slate-900 px-4">
      <div className="w-full max-w-md bg-[#0f1720] border border-[#20232a] rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-white">
            Verify your email
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Enter the code we sent to
          </p>
          <p className="text-sm text-gray-300 mt-1 font-medium">
            {userEmail || "your email"}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            className="p-3 rounded-lg bg-[#0b1220] border border-[#262b33] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
            type="text"
            inputMode="numeric"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Submit"}
          </button>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <div>
              Didn't get a code?{" "}
              <button className="text-blue-400 hover:underline">Resend</button>
            </div>
            <Link to="/login" className="text-blue-400 hover:underline">
              Use different account
            </Link>
          </div>

          {error ? (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
