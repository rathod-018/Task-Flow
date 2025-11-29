import React, { useState } from "react";
import { useUIContext } from "../../context/UIContext";
import { useMembersByStatus } from "../../hooks/useFetchMembershipBoard";
import api from "../../api/axios";
import { useUserContext } from "../../context/UserContext";

function CreateTaskCard() {
  const { user } = useUserContext();
  const { setIsCreateTaskCardOpen } = useUIContext();
  const members = useMembersByStatus("accepted");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [assigneeId, setAssigneeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handdleSubmit = async () => {
    if (!title || !title.trim()) {
      return setError("Title is required");
    }
    if (!description || !description.trim()) {
      return setError("Description is required");
    }

    try {
      setLoading(true);
      setError("");
      const { data } = await api.post("/task/create", {
        projectId: user?.userPageHistory?.projectId,
        title,
        description,
        date,
        assigneeId,
      });
      console.log(data);
    } catch (error) {
      setError(
        error.response.data.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

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
          className="bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Description</label>
        <textarea
          rows="4"
          placeholder="Enter task description"
          className="bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Due date</label>
        <div className="relative">
          <input
            type="date"
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            className="bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            onChange={(e) => setDate(e.target.value)}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            📅
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Assigned to</label>
        <select
          className="bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setAssigneeId(e.target.value)}
        >
          {members.length === 0 ? (
            <option>no user found</option>
          ) : (
            <>
              <option value="">Select user</option>
              {members.map((user) => (
                <option value={user?.userId?._id} key={user?.userId?._id}>
                  {user?.userId?.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <p className="text-red-600 text-sm">{error}</p>
      <div className="flex justify-end gap-3 pt-2">
        <button
          className="px-4 py-2 rounded-lg border border-[#3a3a3e] text-gray-300 hover:bg-[#2a2a2d] transition"
          onClick={() => {
            setIsCreateTaskCardOpen(false);
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={handdleSubmit}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateTaskCard;
