import React, { useEffect, useState } from "react";
import { useFetchBoard } from "../../hooks/useFetchBoard";
import { usePageHistory } from "../../hooks/usePageHisrory";

function BoardCard() {
  const { updateLastOpened } = usePageHistory();
  const [created, setCreated] = useState(null);
  const [joined, setJoined] = useState(null);

  const {
    data: createdData,
    loading: createdLoading,
    error: createdError,
  } = useFetchBoard("/board/created");

  const {
    data: joinedData,
    loading: joinedLoading,
    error: joinedError,
  } = useFetchBoard("/board/joined");

  useEffect(() => {
    setCreated(createdData);
  }, [createdData]);

  useEffect(() => {
    setJoined(joinedData);
  }, [joinedData]);

  return (
    <div
      className="border border-white/10 rounded-xl bg-[#0f0f11]/90 backdrop-blur-xl 
      text-gray-200 max-h-[calc(100vh-20rem)] flex flex-col shadow-xl shadow-black/40"
    >
      <div className="p-4 border-b border-white/10 flex-shrink-0">
        <h2 className="text-base font-semibold tracking-wide">
          Created Boards
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6">
        {createdError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
            {createdError}
          </div>
        )}
        {createdLoading ? (
          <div className="text-gray-400 animate-pulse">Loading...</div>
        ) : created && created.length > 0 ? (
          <div className="space-y-3">
            {created.map((board) => (
              <div
                key={board._id}
                className="flex items-center justify-between bg-[#141417] 
                border border-white/10 rounded-lg px-4 py-3 
                hover:border-blue-500/40 transition-all duration-200"
              >
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {board.name}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-1">
                    {board.description}
                  </p>
                </div>

                <button
                  onClick={() => updateLastOpened(board._id)}
                  className="px-3 py-1.5 text-xs rounded-md bg-blue-600 
                  hover:bg-blue-700 text-white font-medium shadow-sm"
                >
                  Switch
                </button>
              </div>
            ))}
          </div>
        ) : !createdError ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500 text-sm">No created boards yet</p>
          </div>
        ) : null}

        <hr className="my-4 border-white/10" />
        <div>
          <h2 className="text-base font-semibold mb-3">Joined Boards</h2>
          {joinedError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm mb-3">
              {joinedError}
            </div>
          )}
          {joinedLoading ? (
            <div className="text-gray-400 animate-pulse">Loading...</div>
          ) : joined && joined.length > 0 ? (
            <div className="space-y-3">
              {joined.map((board) => (
                <div
                  key={board._id}
                  className="flex items-center justify-between bg-[#141417] 
                  border border-white/10 rounded-lg px-4 py-3 
                  hover:border-blue-500/40 transition-all duration-200"
                >
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      {board.name}
                    </h3>
                    <p className="text-gray-400 text-xs line-clamp-1">
                      {board.description}
                    </p>
                  </div>

                  <button
                    onClick={() => updateLastOpened(board._id)}
                    className="px-3 py-1.5 text-xs rounded-md bg-blue-600 
                    hover:bg-blue-700 text-white font-medium shadow-sm"
                  >
                    Switch
                  </button>
                </div>
              ))}
            </div>
          ) : !joinedError ? (
            <div className="flex items-center justify-center py-10">
              <p className="text-gray-500 text-sm">No joined boards yet</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
