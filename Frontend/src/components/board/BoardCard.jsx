import React, { useEffect, useState } from "react";
import { useFetchBoard } from "../../hooks/useFetchBoard";
import { usePageHistory } from "../../hooks/usePageHisrory";

function BoardCard() {
  const { updateLastOpened } = usePageHistory();
  const {
    data: createdData,
    loading: createdLoading,
    error: createdError,
  } = useFetchBoard("/board/created");
  const [created, setCreated] = useState(null);
  const [joined, setJoined] = useState(null);

  // console.log(created);

  useEffect(() => {
    setCreated(createdData);
  }, [createdLoading]);

  // TODO: have to still work on joined boards
  // useEffect(() => {
  //   setJoined(joinedBoard);
  // }, [joinedBoard]);

  return (
    <div
      className="border border-white/10 rounded-xl bg-[#0f0f11]/90 backdrop-blur-xl 
    text-gray-200 max-h-[calc(100vh-20rem)] flex flex-col shadow-xl shadow-black/40"
    >
      {/* Header - Fixed */}
      <div className="p-4 border-b border-white/10 flex-shrink-0">
        <h2 className="text-base font-semibold tracking-wide">
          Created Boards
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-10">
        {createdLoading ? (
          <div className="text-gray-400 animate-pulse">Loading...</div>
        ) : (
          <>
            {created && created.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {created.map((board) => (
                  <div
                    key={board._id}
                    className="relative group bg-[#141417] border border-white/10 
                    rounded-lg p-4 hover:border-blue-500/30 transition-all duration-200 
                    hover:shadow-md hover:shadow-blue-500/10"
                  >
                    <h3 className="font-semibold text-white text-base mb-1">
                      {board.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3 mb-10">
                      {board.description}
                    </p>

                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={() => updateLastOpened(board._id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity 
                        duration-200 px-3 py-1.5 text-xs rounded-md bg-blue-600 
                        hover:bg-blue-700 text-white font-medium shadow-sm"
                      >
                        Switch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500 text-sm">No created boards yet</p>
              </div>
            )}
          </>
        )}
        {/* Divider */}
        <hr className="my-4 border-white/10" />

        {/* Joined Boards Section */}
        <div>
          <h2 className="text-base font-semibold mb-3">Joined Boards</h2>

          {joined && joined.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {joined.map((board) => (
                <div
                  key={board._id}
                  className="relative group bg-[#141417] border border-white/10 
                  rounded-lg p-4 hover:border-blue-500/30 transition-all duration-200 
                  hover:shadow-md hover:shadow-blue-500/10"
                >
                  <h3 className="font-semibold text-white text-base mb-1">
                    {board.title}
                  </h3>

                  <p className="text-gray-400 text-sm line-clamp-3 mb-10">
                    {board.description}
                  </p>

                  <div className="absolute bottom-3 right-3">
                    <button
                      onClick={() => updateLastOpened(board._id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity 
                      duration-200 px-3 py-1.5 text-xs rounded-md bg-blue-600 
                      hover:bg-blue-700 text-white font-medium shadow-sm"
                    >
                      Switch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-10">
              <p className="text-gray-500 text-sm">No joined boards yet</p>
            </div>
          )}
        </div>
      </div>
      {createdError && (
        <div
          className="bg-red-500/10 border border-red-500/20 rounded-lg 
          p-3 m-5 text-red-400 text-sm"
        >
          {createdError}
        </div>
      )}
    </div>
  );
}

export default BoardCard;
