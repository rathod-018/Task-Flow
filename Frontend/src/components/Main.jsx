import React from "react";
import { Outlet, NavLink } from "react-router-dom";
function Main() {
  return (
    <div className="flex flex-col w-full h-full  max-w-[110rem] mx-auto">
      <div className=" px-4 py-5 flex flex-col gap-5">
        <h2 className="px-6 py-3 w-fit bg-amber-700 rounded-xl text-2xl font-bold">
          Project name
        </h2>
        <div className="w-full">
          <ul className="flex gap-10 ml-[15%] items-center font-medium bg-slate-400 rounded-xl px-6 py-1 w-fit">
            <li>
              <NavLink
                to="work-flow"
                className={({ isActive }) =>
                  `hover:text-orange-700 text-lg font-medium px-2 ${
                    isActive ? "text-orange-700" : "text-slate-800"
                  }`
                }
              >
                Work-flow
              </NavLink>
            </li>
            <li>
              <NavLink
                to="list"
                className={({ isActive }) =>
                  `hover:text-orange-700 text-lg font-medium px-2 ${
                    isActive ? "text-orange-700" : "text-slate-800"
                  }`
                }
              >
                List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="summary"
                className={({ isActive }) =>
                  `hover:text-orange-700 text-lg font-medium px-2 ${
                    isActive ? "text-orange-700" : "text-slate-800"
                  }`
                }
              >
                Summary
              </NavLink>
            </li>
            <li>
              <NavLink
                to="boards"
                className={({ isActive }) =>
                  `hover:text-orange-700 text-lg font-medium px-2 ${
                    isActive ? "text-orange-700" : "text-slate-800"
                  }`
                }
              >
                All-Boards
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
