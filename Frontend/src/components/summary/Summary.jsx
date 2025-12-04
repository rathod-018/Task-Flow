import React from "react";
import BarChart from "./chart/BarChart";
import DoughnutChart from "./chart/DoughnutChart";
import { useTaskContext } from "../../context/TaskContext";
import { useFetchTaskByStatus } from "../../hooks/useFetchTaskByStatus";

function SummaryStats() {
  const { taskData } = useTaskContext();
  const todo = useFetchTaskByStatus("todo");
  const inProgress = useFetchTaskByStatus("in_progress");
  const done = useFetchTaskByStatus("done");

  const Overdue = taskData.filter((task) => {
    const currentDate = new Date();
    const dueDate = new Date(task.dueDate);

    return task.status !== "done" && dueDate < currentDate;
  });

  return (
    <div className="flex flex-col gap-10 p-6">
      <div className="flex flex-col lg:flex-row gap-8 w-full lg:h-[28rem]">
        <div
          className="flex-1 bg-[#18181b] border border-white/10 rounded-2xl 
                    p-6 shadow-xl flex flex-col"
        >
          <h3 className="text-white/80 text-lg font-semibold mb-4">
            Tasks Created (By Year)
          </h3>

          <div className="flex-1 min-h-[16rem] flex items-center justify-center">
            <BarChart />
          </div>
        </div>
        <div
          className="flex-1 bg-[#18181b] border border-white/10 rounded-2xl 
                    p-6 shadow-xl flex flex-col"
        >
          <h3 className="text-white/80 text-lg font-semibold mb-4">
            Tasks Status Overview
          </h3>

          <div className="flex-1 min-h-[16rem] flex items-center justify-center">
            <DoughnutChart />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className="w-full md:w-3/4 lg:w-1/2 bg-[#18181b] border border-white/10 
                    rounded-2xl p-6 shadow-xl flex flex-col gap-6"
        >
          <h3 className="text-xl font-semibold text-white/90">
            Total Tasks:{" "}
            <span className="text-rose-400 font-bold">
              {taskData.length || 0}
            </span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              className="border border-white/10 bg-[#252529] rounded-xl p-4 
                        flex flex-col items-center justify-between hover:bg-[#2d2d30]
                        transition cursor-default shadow-inner"
            >
              <span className="text-white/60 text-sm font-medium">Todo</span>
              <span className="text-blue-400 text-3xl sm:text-4xl font-bold tracking-wide">
                {todo?.length || 0}
              </span>
            </div>

            <div
              className="border border-white/10 bg-[#252529] rounded-xl p-4 
                        flex flex-col items-center justify-between hover:bg-[#2d2d30]
                        transition cursor-default shadow-inner"
            >
              <span className="text-white/60 text-sm font-medium">
                In Progress
              </span>
              <span className="text-yellow-400 text-3xl sm:text-4xl font-bold tracking-wide">
                {inProgress?.length || 0}
              </span>
            </div>
            <div
              className="border border-white/10 bg-[#252529] rounded-xl p-4 
                        flex flex-col items-center justify-between hover:bg-[#2d2d30]
                        transition cursor-default shadow-inner"
            >
              <span className="text-white/60 text-sm font-medium">Done</span>
              <span className="text-green-400 text-3xl sm:text-4xl font-bold tracking-wide">
                {done?.length || 0}
              </span>
            </div>
            <div
              className="border border-white/10 bg-[#252529] rounded-xl p-4 
                        flex flex-col items-center justify-between hover:bg-[#2d2d30]
                        transition cursor-default shadow-inner"
            >
              <span className="text-white/60 text-sm font-medium">Overdue</span>
              <span className="text-red-500 text-3xl sm:text-4xl font-bold tracking-wide">
                {Overdue.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryStats;
