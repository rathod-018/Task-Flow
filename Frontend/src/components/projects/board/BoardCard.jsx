// src/components/projects/board/BoardCard.jsx
import React, { useEffect, useState } from "react";
import { useFetchBoard } from "../../../hooks/useFetchBoard";
import { usePageHistory } from "../../../hooks/usePageHisrory";

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
    <div className="border border-[#2e2e32] rounded-2xl p-4 bg-[#0f1113] text-gray-200">
      <div className="mb-4">
        <h2 className="text-lg font-semibold px-1">Created Boards</h2>
      </div>

      {createdLoading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <>
          {created && created.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
              {created.map((board) => (
                <div
                  key={board._id}
                  className="relative group bg-[#121214] border border-[#252528] rounded-lg p-4 min-w-[180px]"
                >
                  <h3 className="font-semibold text-white text-lg">
                    {board.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mt-2">
                    {board.description}
                  </p>

                  <div className="absolute bottom-3 right-3">
                    <button
                      onClick={() => updateLastOpened(board._id)}
                      className="hidden group-hover:inline-flex px-3 py-1 text-sm rounded-md bg-[#1f2937] hover:bg-[#111827] text-white"
                    >
                      Switch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No created Boards</p>
          )}
        </>
      )}

      {createdError && <div className="text-red-500 mt-3">{createdError}</div>}

      <hr className="my-4 border-[#262628]" />

      <div>
        <h2 className="text-lg font-semibold mb-3">Joined Boards</h2>
        {joined && joined.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            {joined.map((board) => (
              <div
                key={board._id}
                className="relative group bg-[#121214] border border-[#252528] rounded-lg p-4 min-w-[180px]"
              >
                <h3 className="font-semibold text-white text-lg">
                  {board.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mt-2">
                  {board.description}
                </p>

                <div className="absolute bottom-3 right-3">
                  <button className="hidden group-hover:inline-flex px-3 py-1 text-sm rounded-md bg-[#1f2937] hover:bg-[#111827] text-white">
                    Switch
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No Joined Boards</p>
        )}
      </div>
    </div>
  );
}

export default BoardCard;
