import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useUserContext } from "../../context/UserContext";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { user, userEmail, setUser } = useUserContext();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (user) {
      navigate("/home/work-flow");
    } else if (!userEmail) {
      navigate("/login");
    }
  }, [user, userEmail, navigate]);

  useEffect(() => {
    if (time <= 0) return;

    const timerId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [time]);

  if (user || !userEmail) return null;

  const handleOtpChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setOtp(val);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) return setError("Please enter OTP");
    if (otp.length < 4) return setError("Invalid OTP length");

    try {
      setLoading(true);
      const { data } = await api.post("/user/verify-otp", {
        otp,
        email: userEmail,
      });

      if (data.statusCode === 200) {
        setUser(data.data);
        toast.success("Email verified successfully");
        navigate("/home/work-flow");
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

  const handleResendOtp = async () => {
    if (!userEmail) return;

    try {
      setError("");
      const { data } = await api.post("/user/resend-otp", { email: userEmail });
      if (data.statusCode === 200) {
        toast.success("OTP sent to your email");
        setTime(30);
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-slate-900 px-4">
      <div className="w-full max-w-md bg-[#0f1720] border border-[#20232a] rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Verify your email
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Enter the code we sent to
          </p>
          <p className="text-sm text-blue-400 mt-1 font-medium tracking-wide">
            {userEmail}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="w-full p-3 rounded-lg bg-[#0b1220] border border-[#262b33] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none text-center tracking-[0.5em] text-lg"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={5}
            placeholder="• • • • •"
            value={otp}
            onChange={handleOtpChange}
            disabled={loading}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
            <div>
              Didn't get a code?{" "}
              {time === 0 ? (
                <button
                  type="button"
                  className="text-blue-400 hover:underline font-medium"
                  onClick={handleResendOtp}
                >
                  Resend
                </button>
              ) : (
                <span className="text-blue-400 font-medium">{time}s</span>
              )}
            </div>
            <Link
              to="/login"
              className="text-gray-500 hover:text-gray-300 hover:underline"
            >
              Change account
            </Link>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
