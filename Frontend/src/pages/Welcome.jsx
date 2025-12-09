import React from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-slate-900 to-indigo-950 px-4">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            TaskFlow
          </h1>
          <p className="mt-4 text-gray-300 text-lg max-w-xl">
            Organize your work, collaborate with your team, and ship faster. A
            simple, powerful workspace for planning and tracking your projects.
          </p>

          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <a
              onClick={() => {
                if (user) {
                  navigate("/home/work-flow");
                } else {
                  navigate("/signup");
                }
              }}
              className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
            >
              Get Started
            </a>

            <a
              onClick={() => {
                if (user) {
                  navigate("/home/work-flow");
                } else {
                  navigate("/login");
                }
              }}
              className="inline-block px-6 py-3 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition"
            >
              Sign In
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center px-6">
          <div className="w-full max-w-md bg-gradient-to-b from-white/3 to-white/2 border border-white/6 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              Quick tour
            </h3>
            <ul className="text-gray-300 space-y-3">
              <li>{"->"} Create boards, project and task.</li>
              <li>{"->"} Track progress with simple workflows.</li>
              <li>{"->"} Keep everything in one place.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
