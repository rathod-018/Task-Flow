import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useUserContext } from "../../context/UserContext";

function Card({ result, members }) {
  const { user } = useUserContext();
  const [invited, setInvited] = useState(false);

  useEffect(() => {
    const alredyInvited = members.some(
      (ele) => ele?.userId?._id === result?._id
    );
    if (alredyInvited) {
      setInvited(true);
    }
  }, [result?._id, members]);

  const handleInvite = async () => {
    try {
      const { data } = await api.post("/board-member/invite", {
        boardId: user?.userPageHistory?.boardId,
        userId: result?._id,
      });

      if (data?.statusCode === 201) {
        setInvited(true);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className=" relative flex items-center gap-4 p-4 m-3 rounded-lg 
      bg-[#232327] border border-[#2e2e32]
      hover:border-[#3d3d42] hover:bg-[#26262b]
      transition-all cursor-pointer"
    >
      <div>
        <img
          src={result?.avatar?.url}
          alt=""
          className="w-14 h-14 rounded-full border border-gray-600"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-gray-100 font-semibold text-lg leading-tight">
          {result?.name}
        </h3>
        <p className="text-gray-400 text-sm">@ {result.username}</p>
        <p className="text-gray-400 text-sm">{result.email}</p>
      </div>
      <button
        onClick={handleInvite}
        className={`absolute right-4 top-1/2 -translate-y-1/2 
          px-4 py-1.5 rounded-3xl text-base font-medium transition-all border border-[#454545]
                    ${
                      invited
                        ? "opacity-100 bg-[#212121] text-white"
                        : " bg-gray-200 text-gray-900"
                    }`}
      >
        {invited ? "Invited" : "Invite"}
      </button>
    </div>
  );
}

export default Card;
