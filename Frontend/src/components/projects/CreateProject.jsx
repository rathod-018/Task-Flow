import React from "react";

function CreateProject({ close }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-[9999]">
      <div className="bg-[#1f1f23] w-full max-w-md rounded-2xl shadow-xl p-6 flex flex-col gap-6 border border-[#2e2e32]">
        <h2 className="text-2xl font-semibold text-white">
          Create New Project
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              placeholder="Enter project title"
              className="p-2 bg-[#2b2b31] border border-[#3a3a40] rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter project description"
              className="p-2 bg-[#2b2b31] border border-[#3a3a40] rounded-lg resize-none text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            className="px-4 py-2 rounded-lg border border-[#3a3a40] text-gray-300 hover:bg-[#2b2b31] transition"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
