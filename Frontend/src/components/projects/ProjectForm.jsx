import React, { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import { useUserContext } from "../../context/UserContext";
import { usePageHistory } from "../../hooks/usePageHisrory";
import { toast } from "react-toastify";
import { useUIContext } from "../../context/UIContext";
import { useProjectContext } from "../../context/ProjectContext";

function ProjectForm() {
  const { projectForm, closeProjectForm } = useUIContext();
  const { fetchAllProjects } = useProjectContext();
  const prevData = projectForm?.data;
  const { user } = useUserContext();
  const [projectName, setProjectName] = useState(prevData?.name || "");
  const [description, setDescription] = useState(prevData?.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateLastOpened } = usePageHistory();
  const cardRef = useRef();

  const boardId = user?.userPageHistory?.boardId;

  const handdleSubmit = async () => {
    if (!projectName || !projectName.trim()) {
      setError("Please enter Project name");
      return;
    }
    if (!description || !description.trim()) {
      setDescription("");
      setError("Please enter description");
    }

    try {
      setLoading(true);
      const fields = {
        name: projectName,
        description,
      };
      let res;
      if (projectForm.mode === "create") {
        const { data } = await api.post(`/project/create/${boardId}`, fields);
        res = data;
      }
      if (projectForm.mode === "edit") {
        const projectId = prevData?._id;
        const { data } = await api.patch(
          `/project/update/${projectId}`,
          fields
        );
        res = data;
      }

      console.log(res);
      console.log(projectForm);

      if (res.statusCode === 201) {
        toast.success("Project created");
        updateLastOpened(boardId, res.data?._id);
        closeProjectForm();
        fetchAllProjects();
      }

      if (res.statusCode === 200) {
        toast.success(res.message);
        closeProjectForm();
        fetchAllProjects();
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response.data.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const projectId = prevData?._id;
      const { data } = await api.delete(`/project/delete/${projectId}`);
      if (data.statusCode) {
        toast.success("Project deleted");
        closeProjectForm();
        fetchAllProjects();
        updateLastOpened(boardId, null);
      }
    } catch (err) {
      console.log(err);
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
      className="bg-[#18181b] p-6 m-10 w-full  md:w-[45rem] rounded-2xl shadow-xl flex flex-col gap-6 border border-[#2e2e32]"
      ref={cardRef}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-semibold text-white">
        {projectForm.mode === "read"
          ? "Read project"
          : projectForm.mode === "edit"
          ? "Edit Project"
          : "Create new project"}
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            disabled={loading}
            className="p-2 bg-[#2b2b31] border border-[#3a3a40] rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            rows="4"
            placeholder="Enter project description"
            value={description}
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
        {projectForm.mode === "read" && (
          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}

        {projectForm.mode !== "read" && (
          <button
            onClick={handdleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {projectForm?.mode === "edit"
              ? loading
                ? "Updating.."
                : "Update"
              : loading
              ? "Creating.."
              : "Create"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProjectForm;
