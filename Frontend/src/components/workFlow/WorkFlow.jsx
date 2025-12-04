import React from "react";
import WorkFlowCard from "./WorkFlowCard";
import { useFetchTaskByStatus } from "../../hooks/useFetchTaskByStatus";

function WorkFlow() {
  const todo = useFetchTaskByStatus("todo");
  const inProgress = useFetchTaskByStatus("in_progress");
  const done = useFetchTaskByStatus("done");

  return (
    <div className="flex justify-evenly mt-10">
      <WorkFlowCard type="To do" tasks={todo} />
      <WorkFlowCard type="In progress" tasks={inProgress} />
      <WorkFlowCard type="Done" tasks={done} />
    </div>
  );
}

export default WorkFlow;
