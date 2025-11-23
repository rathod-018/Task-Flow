import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useUserContext } from "../../context/UserContext";
import { usePageHistory } from "../../hooks/usePageHisrory";
import { toast } from "react-toastify";

function CreateProject({ close }) {
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateLastOpened } = usePageHistory();

  const boardId = user?.userPageHistory?.boardId;

  const createProject = async () => {
    if (!title || !title.trim()) {
      setTitle("");
      setError("Please enter title");
      return;
    }
    if (!description || !description.trim()) {
      setDescription("");
      setError("Please enter description");
    }

    try {
      const { data } = await api.post(`/project/create/${boardId}`, {
        title,
        description,
      });
      if (data.statusCode === 201) {
        toast.success("Project created ✅");
        updateLastOpened(boardId, data.data?._id);
        close();
      }
    } catch (error) {
      setError(
        error.response.data.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!boardId) {
      toast.error("Please create board first");
      close();
    }
  }, [boardId]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-[9999]"
      onClick={close}
    >
      <div
        className="bg-[#1f1f23] w-full max-w-md rounded-2xl shadow-xl p-6 flex flex-col gap-6 border border-[#2e2e32]"
        onClick={(e) => e.stopPropagation()}
      >
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
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            className="px-4 py-2 rounded-lg border border-[#3a3a40] text-gray-300 hover:bg-[#2b2b31] transition"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={createProject}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
