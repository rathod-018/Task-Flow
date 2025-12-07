import React from "react";
import WorkFlowCard from "./WorkFlowCard";
import { useFetchTaskByStatus } from "../../hooks/useFetchTaskByStatus";

function WorkFlow() {
  const todo = useFetchTaskByStatus("todo");
  const inProgress = useFetchTaskByStatus("in_progress");
  const done = useFetchTaskByStatus("done");

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div
        className="flex flex-col gap-8 md:flex-row md:gap-14 justify-center  md:max-w-[80rem] w-full
    "
      >
        <div className="w-full md:w-1/3">
          <WorkFlowCard type="To do" tasks={todo} />
        </div>

        <div className="w-full md:w-1/3">
          <WorkFlowCard type="In progress" tasks={inProgress} />
        </div>

        <div className="w-full md:w-1/3">
          <WorkFlowCard type="Done" tasks={done} />
        </div>
      </div>
    </div>
  );
}

export default WorkFlow;
