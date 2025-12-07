import React, { useEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { useUIContext } from "../../context/UIContext";

function List() {
  const [data, setData] = useState([]);
  const { taskData } = useTaskContext();
  const { openTaskForm } = useUIContext();

  useEffect(() => {
    setData(taskData);
  }, [taskData]);
  return (
    <div className="max-h-[36rem] min-w-[60rem] md:mx-10 mt-10 overflow-y-auto custom-scroll border border-white/5 rounded-xl shadow-xl transition">
      <table className="w-full text-left text-[15px] font-medium text-zinc-300">
        <thead className="sticky top-0 z-20 bg-[#18181b] border-b border-white/10 text-zinc-400 uppercase text-xs tracking-wide">
          <tr>
            <th className="px-5 py-4">S.No</th>
            <th className="px-5 py-4">Task Name</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Assigned to</th>
            <th className="px-5 py-4">Due date</th>
            <th className="px-5 py-4">Created At</th>
            <th className="px-5 py-4">More</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((todo, index) => (
              <tr
                key={todo?._id}
                onClick={() => openTaskForm("read", todo)}
                className="border-b border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer"
              >
                <td className="px-5 py-4">{index + 1}</td>
                <td className="px-5 py-4 text-zinc-200">{todo?.name}</td>
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize
                  ${
                    todo.status === "todo"
                      ? "bg-blue-500/20 text-blue-400"
                      : todo.status !== "done"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-green-500/20 text-green-400"
                  }
                `}
                  >
                    {todo?.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-zinc-400">
                  {todo?.assigneeId ? todo?.assigneeId?.name : "None"}
                </td>

                <td className="px-5 py-4 text-zinc-400">
                  {new Date(todo?.dueDate).toLocaleDateString("en-GB")}
                </td>

                <td className="px-5 py-4 text-zinc-400">
                  {new Date(todo?.createdAt).toLocaleDateString("en-GB")}
                </td>

                <td className="px-1 py-2">
                  <button
                    className="px-4 py-2 bg-[#2a2a2e] text-sm rounded-lg hover:bg-[#323236] hover:scale-105 active:scale-95 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      openTaskForm("edit", todo);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center py-6 text-zinc-500" colSpan="7">
                No todos found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
