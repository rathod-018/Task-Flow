import React from "react";

function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-900 px-4">
      {/* Logo */}
      <h1 className="text-4xl font-bold text-gray-900">TaskFlow</h1>

      {/* Main Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-4 text-center">
        Organize your work. Achieve your goals.
      </h2>

      {/* Subtext */}
      <p className="text-gray-600 mt-2 text-center max-w-md">
        A simple and powerful workspace to manage tasks, track progress, and
        stay productive every day.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <a
          href="/signup"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </a>

        <a
          href="/login"
          className="px-6 py-3 bg-white text-gray-800 rounded-lg font-medium shadow hover:shadow-md transition"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}

export default Welcome;
