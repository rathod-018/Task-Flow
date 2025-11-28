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

  // useEffect(() => {
  //   setJoined(joinedBoard);
  // }, [joinedBoard]);

  return (
    <div className="border border-[#2e2e32] rounded-2xl bg-[#0f1113] text-gray-200 max-h-[calc(100vh-20rem)] flex flex-col">
      {/* Header - Fixed */}
      <div className="p-4 border-b border-[#262628] flex-shrink-0">
        <h2 className="text-lg font-semibold">Created Boards</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
        {createdLoading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <>
            {created && created.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {created.map((board) => (
                  <div
                    key={board._id}
                    className="relative group bg-[#121214] border border-[#252528] rounded-lg p-4 hover:border-[#3a3a3f] transition-colors duration-200"
                  >
                    <h3 className="font-semibold text-white text-lg mb-2">
                      {board.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-8">
                      {board.description}
                    </p>

                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={() => updateLastOpened(board._id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1.5 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
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

        {createdError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm mb-6">
            {createdError}
          </div>
        )}

        {/* Divider */}
        <hr className="my-6 border-[#262628]" />

        {/* Joined Boards Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Joined Boards</h2>
          {joined && joined.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {joined.map((board) => (
                <div
                  key={board._id}
                  className="relative group bg-[#121214] border border-[#252528] rounded-lg p-4 hover:border-[#3a3a3f] transition-colors duration-200"
                >
                  <h3 className="font-semibold text-white text-lg mb-2">
                    {board.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-8">
                    {board.description}
                  </p>

                  <div className="absolute bottom-3 right-3">
                    <button
                      onClick={() => updateLastOpened(board._id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1.5 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      Switch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500 text-sm">No joined boards yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
