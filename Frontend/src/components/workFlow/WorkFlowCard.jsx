import React, { useState, useEffect } from "react";
import edit from "../../assets/edit.svg";
import { useUIContext } from "../../context/UIContext";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useTaskContext } from "../../context/TaskContext";

const stageLabels = ["todo", "in_progress", "done"];

function WorkFlowCard({ type, tasks = [] }) {
  const { setIsCreateTaskCardOpen } = useUIContext();
  const { fetchTasks } = useTaskContext();

  const colors = {
    todo: "bg-blue-500/20 text-blue-400",
    in_progress: "bg-amber-500/20 text-amber-400",
    done: "bg-green-500/20 text-green-400",
  };

  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const close = () => setOpenId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const updateState = async (taskId, status) => {
    if (!taskId) {
      return toast.error("error while updateing todo");
    }
    if (!status) {
      return toast.error("error while updateing todo");
    }
    const selectedTask = tasks.find((item) => item._id === taskId);
    if (selectedTask.status === status) return;

    try {
      const { data } = await api.patch("/task/status", { taskId, status });
      if (data?.statusCode === 200) {
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
      toast.error("error while updateing todo");
    }
  };

  return (
    <div className="w-80 h-fit min-h-40 rounded-lg bg-[#1d1d1f] border border-[#2a2a2d] flex flex-col relative">
      <div className="flex justify-between items-center px-4 py-3 border-b border-[#2a2a2d]">
        <p className="text-base font-medium text-gray-300">{type}</p>
        <span className="text-xs text-gray-400">{tasks.length}</span>
      </div>

      <div className="flex flex-col min-h-40 max-h-72 overflow-y-auto custom-scroll">
        {tasks.length ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="px-4 py-3 flex justify-between items-center hover:bg-[#232326] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm text-gray-300">{task.title}</span>

              <div className="flex items-center gap-2">
                <div
                  className={`px-2 py-0.5 text-xs rounded-md cursor-pointer border border-[#333] ${
                    colors[task.status]
                  }`}
                  onClick={() =>
                    setOpenId(openId === task._id ? null : task._id)
                  }
                >
                  {task.status}
                </div>

                <img src={edit} className="w-4 invert opacity-50" />
              </div>
              {openId === task._id && (
                <div
                  className="absolute right-10 top-9 w-36 bg-[#2b2b2f] border border-[#3a3a3d] rounded-md shadow-xl z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {stageLabels.map((status) => (
                    <p
                      key={status}
                      className="px-3 py-2 text-sm text-gray-300 hover:bg-[#333335] cursor-pointer"
                      onClick={() => {
                        updateState(task._id, status);
                        setOpenId(null);
                      }}
                    >
                      {status}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-500">No tasks</div>
        )}
      </div>

      {type === "To do" && (
        <div className="px-4 pt-2 pb-3">
          <button
            onClick={() => setIsCreateTaskCardOpen(true)}
            className="w-full text-sm py-2 rounded-md bg-[#2a2a2d] text-gray-300 hover:bg-[#323236] border border-[#3a3a3d]"
          >
            + Create Task
          </button>
        </div>
      )}
    </div>
  );
}
export default WorkFlowCard;
