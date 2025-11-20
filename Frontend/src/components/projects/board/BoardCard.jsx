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
    <div className="border-2 p-6 rounded-2xl">
      <div className="p-4">
        <h2 className="p-4">Created Boards</h2>
        {createdLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {created ? (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
                {created.map((board) => (
                  <div
                    className="relative group flex flex-col gap-3 border-2 border-zinc-700 rounded-lg p-4 bg-zinc-900 min-w-[180px] overflow-hidden"
                    key={board._id}
                  >
                    <h3 className="font-bold text-xl text-white">
                      {board.title}
                    </h3>
                    <p className="text-zinc-300">{board.description}</p>

                    <button
                      className="hidden group-hover:flex absolute bottom-3 right-3 px-3 py-1 text-sm rounded-md bg-zinc-700 hover:bg-zinc-600 text-white"
                      onClick={() => {
                        updateLastOpened(board._id);
                      }}
                    >
                      Switch
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No created Boards</p>
            )}
          </>
        )}
        {createdError ? (
          <div className="text-red-500">{createdError}</div>
        ) : null}
      </div>

      <hr />
      <div className="p-4">
        <h2 className="p-4">Joined Boards</h2>

        {joined ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
            {joined.map((board) => (
              <div
                className="relative group flex flex-col gap-3 border-2 border-zinc-700 rounded-lg p-4 bg-zinc-900 min-w-[180px] overflow-hidden"
                key={board._id}
              >
                <h3 className="font-bold text-xl text-white">{board.title}</h3>
                <p className="text-zinc-300">{board.description}</p>

                <button className="hidden group-hover:flex absolute bottom-3 right-3 px-3 py-1 text-sm rounded-md bg-zinc-700 hover:bg-zinc-600 text-white">
                  Switch
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No Joined Boards</p>
        )}
      </div>
    </div>
  );
}

export default BoardCard;
