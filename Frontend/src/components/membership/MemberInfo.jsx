import React, { useEffect, useState } from "react";
import { useUIContext } from "../../context/UIContext";
import { useUserContext } from "../../context/UserContext";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useBoardContext } from "../../context/BoardContext";

function MemberInfo() {
  const { user } = useUserContext();
  const { memberInfo, setMemberInfo } = useUIContext();
  const { fetchBoardData, activeBoardId, board } = useBoardContext();

  const [isAdmin, setIsAdmin] = useState(false);

  const imgUrl = memberInfo?.userId?.avatar?.url;
  const name = memberInfo?.userId?.name;
  const email = memberInfo?.userId?.email;
  const invitedBy = memberInfo?.invitedBy?.name;

  const boardOwnerId = board?.ownerId;
  const currentUserId = user?._id;

  useEffect(() => {
    if (!boardOwnerId || !currentUserId) return;
    setIsAdmin(currentUserId === boardOwnerId);
  }, [boardOwnerId, currentUserId]);

  const handleRemoveMember = async (memberId) => {
    try {
      const { data } = await api.delete(`/board-member/${memberId}`);
      if (data.statusCode === 200) {
        toast.success("Member removed successfully");
        fetchBoardData(activeBoardId);
        setMemberInfo(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-[32rem] md:max-w-[45rem] m-5 bg-[#141416] border border-[#2a2a2d] rounded-2xl shadow-xl p-6 md:p-10">
      <div
        className="flex flex-col md:flex-row md:gap-12 gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imgUrl}
          className="
        w-40 h-40
        md:w-52 md:h-80
        object-cover rounded-2xl shadow-lg border border-[#2a2a2d]
      "
        />

        <div className="flex-1 flex flex-col">
          <div className="space-y-1.5">
            <p className="text-2xl md:text-3xl font-semibold text-gray-200 capitalize">
              {name}
            </p>
            <p className="text-gray-400 text-sm tracking-wide">{email}</p>
          </div>

          <div className="my-6 md:my-8 border-t border-[#2a2a2d]"></div>

          <div className="space-y-6 text-gray-300">
            <div>
              <p className="text-blue-400 text-xs uppercase tracking-wide">
                Invited By
              </p>
              <p className="text-lg font-medium mt-1 text-gray-200 capitalize">
                {invitedBy}
              </p>
            </div>

            <div>
              <p className="text-blue-400 text-xs uppercase tracking-wide">
                Role
              </p>
              <p className="text-lg font-medium mt-1 text-gray-200">
                {memberInfo?.role}
              </p>
            </div>
          </div>

          {isAdmin && (
            <div
              className="mt-6 md:mt-auto"
              onClick={() => handleRemoveMember(memberInfo?._id)}
            >
              <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white border rounded-lg font-medium transition">
                Remove Member
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberInfo;
