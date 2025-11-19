import React from "react";
import { useBoardContext } from "../../context/BoardContext";

function Sidebar() {
  const { createdBoard } = useBoardContext();
  return (
    <aside className="w-56 h-full fixed left-0 bg-slate-800 text-white p-4 ">
      <div className="flex flex-col gap-3">
        {createdBoard.length > 0 ? (
          <>
            {createdBoard.map((board) => (
              <span key={board._id}>{board.title}</span>
            ))}
          </>
        ) : (
          "empty"
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
