import React, { useEffect, useState } from "react";
import { usePageHistory } from "../../hooks/usePageHisrory";
import { useUIContext } from "../../context/UIContext";
import { useUserContext } from "../../context/UserContext";
import { useBoardContext } from "../../context/BoardContext";

import menuDots from "../../assets/menu-dots.svg";
import eye from "../../assets/eye.svg";
import edit from "../../assets/edit.svg";

function BoardCard() {
  const { user } = useUserContext();
  const { updateLastOpened } = usePageHistory();
  const { openBoardForm } = useUIContext();

  const { createdBoards, joinedBoards, error } = useBoardContext();

  const [openMenu, setOpenMenu] = useState(null);

  // close menu on ouside click
  useEffect(() => {
    const close = () => setOpenMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div
      className="border border-white/10 rounded-xl bg-[#0f0f11]/90 
      backdrop-blur-xl text-gray-200 max-h-[calc(100vh-20rem)] 
      flex flex-col shadow-xl shadow-black/40 overflow-y-auto custom-scroll"
    >
      <div className="p-4 border-b border-white/10 flex-shrink-0">
        <h2 className="text-base font-semibold tracking-wide">
          Created Boards
        </h2>
      </div>

      <div className="flex-1 overflow-visible p-4 space-y-4">
        {/* created boards */}
        {createdBoards.length > 0 ? (
          <div className="space-y-2">
            {createdBoards.map((board) => (
              <div
                key={board._id}
                className="relative flex items-center justify-between bg-[#141417] 
                border border-white/10 rounded-lg px-4 py-3 
                hover:border-blue-500/40 transition-all"
              >
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {board.name}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-1">
                    {board.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateLastOpened(board._id)}
                    className="px-3 py-1.5 text-xs rounded-md bg-blue-600 
                    hover:bg-blue-700 text-white"
                  >
                    Switch
                  </button>

                  <img
                    src={menuDots}
                    alt="dots"
                    className="w-4 invert opacity-80 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (user?._id === board.ownerId)
                        setOpenMenu(openMenu === board._id ? null : board._id);
                    }}
                  />
                </div>
                {openMenu === board._id && (
                  <div
                    className="absolute right-[-0.5rem] top-[3.5rem] 
                    bg-[#161b22] w-32 py-2 rounded-md border border-white/10 
                    shadow-xl z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 
                      hover:bg-white/10 text-gray-300 w-full text-sm"
                      onClick={() => openBoardForm("read", board)}
                    >
                      <img src={eye} alt="eye" className="w-4 invert" /> View
                    </button>

                    <button
                      className="flex items-center gap-2 px-3 py-1.5 
                      hover:bg-white/10 text-gray-300 w-full text-sm"
                      onClick={() => openBoardForm("edit", board)}
                    >
                      <img src={edit} alt="edit" className="w-4 invert" /> Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-6">
            No created boards yet
          </div>
        )}

        <hr className="my-4 border-white/10" />

        {/* joined boards */}
        <h2 className="text-base font-semibold mb-3">Joined Boards</h2>

        {joinedBoards.length > 0 ? (
          <div className="space-y-3">
            {joinedBoards.map((board) => (
              <div
                key={board._id}
                className="flex items-center justify-between bg-[#141417] 
                border border-white/10 rounded-lg px-4 py-3 
                hover:border-blue-500/40 transition-all"
              >
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {board.name}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-1">
                    {board.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateLastOpened(board._id)}
                    className="px-3 py-1.5 mr-6 text-xs rounded-md bg-blue-600 
                    hover:bg-blue-700 text-white"
                  >
                    Switch
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-6">
            No joined boards yet
          </div>
        )}
        {/* display error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default BoardCard;
