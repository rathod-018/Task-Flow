import React, { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import { useUserContext } from "../../context/UserContext";
import { usePageHistory } from "../../hooks/usePageHisrory";
import { toast } from "react-toastify";
import { useUIContext } from "../../context/UIContext";

function ProjectForm() {
  const { projectForm, closeProjectForm } = useUIContext();
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateLastOpened } = usePageHistory();
  const cardRef = useRef();

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
        closeProjectForm();
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
  // to close when we click on ouside of project card
  useEffect(() => {
    const close = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        closeProjectForm();
      }
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [projectForm.open, closeProjectForm]);

  return (
    <div
      className="bg-[#18181b] w-[45rem] h-[30rem]  rounded-2xl shadow-xl p-6 flex flex-col gap-6 border border-[#2e2e32]"
      ref={cardRef}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-semibold text-white">Create New Project</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">Title</label>
          <input
            type="text"
            placeholder="Enter project title"
            disabled={loading}
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
            disabled={loading}
            className="resize-none p-2 bg-[#232327] border border-[#3a3a4e] rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => closeProjectForm()}
          disabled={loading}
          className="px-4 py-2 rounded-lg border border-[#3a3a40] text-gray-300 hover:bg-[#2b2b31] transition"
        >
          Cancel
        </button>
        <button
          onClick={createProject}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {loading ? "Createing.." : "Create"}
        </button>
      </div>
    </div>
  );
}

export default ProjectForm;
