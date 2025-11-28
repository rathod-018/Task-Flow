import React from "react";
import { useUIContext } from "../../context/UIContext";

function CreateTaskCard() {
  const { setIsCreateTaskCardOpen } = useUIContext();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[45rem] bg-[#18181b] rounded-xl shadow-2xl p-6 space-y-5 border border-[#2a2a2d]"
    >
      <h2 className="text-2xl font-semibold text-gray-200">Create New Task</h2>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          className="bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 
                 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Description</label>
        <textarea
          rows="4"
          placeholder="Enter task description"
          className="bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 
                 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Due date</label>
        <div className="relative">
          <input
            type="date"
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            className="bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 w-full
                   outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            📅
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Assigned to</label>
        <select
          className="bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2
                 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select user</option>
          <option value="user1">user1</option>
          <option value="user2">user2</option>
          <option value="user3">user3</option>
          <option value="user4">user4</option>
        </select>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          className="px-4 py-2 rounded-lg border border-[#3a3a3e] text-gray-300 
                 hover:bg-[#2a2a2d] transition"
          onClick={() => {
            setIsCreateTaskCardOpen(false);
          }}
        >
          Cancel
        </button>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateTaskCard;
