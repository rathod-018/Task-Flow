import React from "react";
import { useOutletContext } from "react-router-dom";
import WorkFlowCard from "./WorkFlowCard";

function WorkFlow() {
  const { project } = useOutletContext();
  // console.log(project);

  return (
    <div className="flex justify-evenly mt-10">
      <WorkFlowCard type="To do" />
      <WorkFlowCard type="In progress" />
      <WorkFlowCard type="Done" />
    </div>
  );
}

export default WorkFlow;
