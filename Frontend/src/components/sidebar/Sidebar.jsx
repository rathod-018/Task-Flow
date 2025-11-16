import React from "react";

function Sidebar() {
  return (
    <aside className="w-56 h-full bg-slate-800 text-white p-4 ">
      <div className="flex flex-col gap-3">
        <button className="text-left hover:bg-slate-700 p-2 rounded">
          Dashboard
        </button>
        <button className="text-left hover:bg-slate-700 p-2 rounded">
          Tasks
        </button>
        <button className="text-left hover:bg-slate-700 p-2 rounded">
          Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
