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
    <div className="max-h-[35rem] overflow-y-auto custom-scroll border border-[#3f3e3e] rounded-lg transition">
      <table className="w-full text-left text-[15px] font-medium text-gray-300">
        <thead className="sticky top-0 z-20 border-b border-[#2e2e32] bg-[#393939] text-gray-400 uppercase text-sm font-semibold">
          <tr>
            <th className="px-5 py-4">S.No</th>
            <th className="px-5 py-4">Title</th>
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
                onClick={() => {
                  const data = todo;
                  openTaskForm("read", data);
                }}
                className="border-b border-[#2e2e32] hover:bg-[#3f3e3e0d] transition"
              >
                <td className=" px-5 py-4">{index + 1}</td>
                <td className=" px-5 py-4">{todo?.title}</td>
                <td className=" px-5 py-4">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-sm
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
                <td className=" px-5 py-4">
                  {todo?.assigneeId ? todo?.assigneeId?.name : "None"}
                </td>
                <td className="px-5 py-4">
                  {new Date(todo?.dueDate).toLocaleDateString("en-GB")}
                </td>
                <td className="px-5 py-4">
                  {new Date(todo?.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="px-1 py-2">
                  <button
                    className="px-4 py-2  bg-[#333336] text-sm rounded-lg hover:bg-[#3f3f43] hover:scale-105 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      const data = todo;
                      openTaskForm("edit", data);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="text-center py-4 text-gray-400 border-[#393939]"
                colSpan="7"
              >
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
