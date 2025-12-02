import React, { useEffect, useState } from "react";
import WorkFlowCard from "./WorkFlowCard";
import { useTaskContext } from "../../context/TaskContext";

function WorkFlow() {
  const [tasks, setTasks] = useState([]);
  const { taskData } = useTaskContext();

  useEffect(() => {
    setTasks(taskData);
  }, [taskData]);

  const todo = tasks
    .filter((t) => t.status === "todo")
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  const inProgress = tasks
    .filter((t) => t.status === "in_progress")
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  const done = tasks
    .filter((t) => t.status === "done")
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="flex justify-evenly mt-10">
      <WorkFlowCard type="To do" tasks={todo} />
      <WorkFlowCard type="In progress" tasks={inProgress} />
      <WorkFlowCard type="Done" tasks={done} />
    </div>
  );
}

export default WorkFlow;
