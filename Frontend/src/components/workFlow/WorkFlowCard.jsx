import React from "react";
import edit from "../../../assets/edit.svg";

function WorkFlowCard({ type }) {
  return (
    <div className="border border-gray-400 w-96 max-h-fit p-1 rounded-md bg-[#363256]">
      <div className="m-3 rounded-md">
        <p className="text-center p-2 font-bold text-3xl">{type}</p>
      </div>
      <div className="bg-[#343436] border border-gray-500 hover:border-cyan-700 m-5 rounded-lg p-4 flex justify-between transition">
        <div className="text-xl font-medium">Content</div>
        <img
          className="w-5 invert opacity-50 hover:opacity-100 transition cursor-pointer"
          src={edit}
        />
      </div>
      {type === "To do" ? (
        <div className=" flex justify-center">
          <button className="bg-[#283858] text-lg py-2 px-10 m-5 border border-[#6e6d6d] hover:brightness-95 active:w-36 active:transition rounded-xl">
            Create
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default WorkFlowCard;
