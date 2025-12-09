import React, { useEffect, useRef, useState } from "react";
import { useUIContext } from "../../context/UIContext";
import { useMembersByStatus } from "../../hooks/useFetchMembershipBoard";
import api from "../../api/axios";
import { useUserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { useTaskContext } from "../../context/TaskContext";

function TaskForm() {
  const { user } = useUserContext();
  const { taskForm, closeTaskForm } = useUIContext();
  const prevData = taskForm?.data;
  const members = useMembersByStatus("accepted");
  const [taskName, setTaskName] = useState(prevData?.name || "");
  const [description, setDescription] = useState(prevData?.description || "");
  const [date, setDate] = useState(prevData?.dueDate.split("T")[0] || "");
  const [assigneeId, setAssigneeId] = useState(prevData?.assigneeId || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cardRef = useRef();
  const { fetchTasks } = useTaskContext();

  const handdleSubmit = async () => {
    if (!taskName || !taskName.trim()) {
      return setError("Task Name is required");
    }
    if (!description || !description.trim()) {
      return setError("Description is required");
    }

    if (!date || !date.trim()) {
      return setError("Due date is required");
    }

    try {
      setLoading(true);
      setError("");
      const fields = {
        name: taskName,
        description,
        date,
        assigneeId,
      };
      let res;
      if (taskForm?.mode === "create") {
        const { data } = await api.post("/task/create", {
          projectId: user?.userPageHistory?.projectId,
          ...fields,
        });
        res = data;
      }
      if (taskForm?.mode == "edit") {
        const taskId = prevData?._id;
        console.log(taskId);
        const { data } = await api.patch(`/task/update/${taskId}`, fields);
        res = data;
      }
      if (res.statusCode === 201) {
        toast.success(res.message);
        closeTaskForm();
        fetchTasks();
      }
      if (res.statusCode === 200) {
        toast.success(res.message);
        closeTaskForm();
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      if (!taskId) return;
      const { data } = await api.delete(`/task/delete/${taskId}`);
      if (data?.statusCode === 200) {
        toast.success(data?.message);
        closeTaskForm();
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // to close task form by clicking window
  useEffect(() => {
    if (taskForm?.mode === "read") {
      setLoading(true);
    }
    const close = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        closeTaskForm();
      }
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [taskForm, closeTaskForm]);

  return (
    <div
      ref={cardRef}
      onClick={(e) => e.stopPropagation()}
      className="md:w-[45rem] w-full m-10 bg-[#18181b] rounded-xl shadow-2xl p-6 space-y-5 border border-[#2a2a2d]"
    >
      <h2 className="text-2xl font-semibold text-gray-200">
        {taskForm?.mode === "read"
          ? "Read Task"
          : taskForm?.mode === "edit"
          ? "Update Task"
          : "Create New Task"}
      </h2>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Name</label>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          className="bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          onChange={(e) => setTaskName(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Description</label>
        <textarea
          rows="4"
          placeholder="Enter task description"
          value={description}
          className="resize-none bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Due date</label>
        <div className="relative">
          <input
            type="date"
            value={date}
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            className="bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            onChange={(e) => setDate(e.target.value)}
            disabled={loading}
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
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
          disabled={loading}
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
          onClick={() => closeTaskForm(false)}
        >
          Cancel
        </button>
        {taskForm?.mode === "read" && (
          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            onClick={() => deleteTask(prevData?._id)}
          >
            Delete
          </button>
        )}
        {taskForm?.mode !== "read" && (
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={handdleSubmit}
            disabled={loading}
          >
            {taskForm?.mode === "edit"
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

export default TaskForm;
