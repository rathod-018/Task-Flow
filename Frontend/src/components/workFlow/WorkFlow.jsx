import React, { useEffect, useState } from "react";
import WorkFlowCard from "./WorkFlowCard";
import { useTaskContext } from "../../context/TaskContext";

function WorkFlow() {
  const [tasks, setTasks] = useState([]);
  const { taskData} = useTaskContext();

  useEffect(() => {
    setTasks(taskData);
  }, [taskData]);

  const todo = tasks.filter((t) => t.status === "todo");
  const inProgress = tasks.filter((t) => t.status === "in_progress");
  const done = tasks.filter((t) => t.status === "done");



  return (
    <div className="flex justify-evenly mt-10">
      <WorkFlowCard type="To do" tasks={todo} />
      <WorkFlowCard type="In progress" tasks={inProgress} />
      <WorkFlowCard type="Done" tasks={done} />
    </div>
  );
}

export default WorkFlow;
