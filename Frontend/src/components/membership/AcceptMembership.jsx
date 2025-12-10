import React from "react";
import api from "../../api/axios";
import check from "../../assets/check.svg";
import close from "../../assets/close.svg";
import { toast } from "react-toastify";
import { useBoardContext } from "../../context/BoardContext";

function AcceptMembership({ data, refresh }) {
  const { fetchBoards } = useBoardContext();

  const handleResponse = async (memberId, inviteStatus) => {
    if (!memberId) return;
    if (!inviteStatus) return;
    try {
      const { data } = await api.patch("/board-member/update", {
        memberId,
        inviteStatus,
      });
      
      if (data?.statusCode === 200) {
        refresh();
        fetchBoards();
        toast.success(`Invite request ${inviteStatus}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {data.length > 0 ? (
        <div>
          {data?.map((item) => {
            const imgUrl = item?.invitedBy?.avatar?.url;
            const boardName = item?.boardId?.name;
            const name = item?.invitedBy?.name;
            const email = item?.invitedBy?.email;
            const memberId = item._id;
            return (
              <div
                key={item?._id}
                className="flex items-center justify-between w-full p-2 bg-zinc-900 rounded-md border border-white/10 hover:border-zinc-600 transition"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <img
                    src={imgUrl}
                    alt="profile-img"
                    className="w-9 h-9 rounded-full"
                  />

                  <div className="text-xs text-white/80 leading-tight truncate">
                    <div className="font-medium text-white truncate">
                      Board: {boardName}
                    </div>
                    <div className="truncate">Invited by: {name}</div>
                    <div className="text-white/60 truncate">{email}</div>
                  </div>
                </div>
                <div className="flex gap-2 pl-3 shrink-0">
                  <button
                    className="p-1.5 text-xs rounded-md bg-red-500 hover:bg-red-700 transition"
                    onClick={() => handleResponse(memberId, "rejected")}
                  >
                    <img src={close} alt="close" className="w-3.5 invert" />
                  </button>

                  <button
                    className="p-1.5 text-xs rounded-md bg-green-600 hover:bg-green-700 transition"
                    onClick={() => handleResponse(memberId, "accepted")}
                  >
                    <img src={check} alt="check" className="w-3.5 invert" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-2">No notification found!</div>
      )}
    </div>
  );
}

export default AcceptMembership;
