import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import Card from "./Card";
import api from "../../api/axios";
import { useMembersByStatus } from "../../hooks/useFetchMembershipBoard";
import { useBoardContext } from "../../context/BoardContext";

function AddMember() {
  const { user } = useUserContext();
  const [text, setText] = useState("");
  const [results, setResult] = useState([]);
  const { activeBoardId } = useBoardContext();
  const members = useMembersByStatus("pending");

  const searchUser = async () => {
    if (!text || !text.trim()) return setResult([]);

    try {
      const { data } = await api.get(`/board-member/search?q=${text}`);
      setResult(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  //debouncing
  useEffect(() => {
    const delay = setTimeout(() => {
      searchUser();
    }, 1000);

    return () => clearTimeout(delay);
  }, [text]);

  return (
    <div
      className="m-4 md:m-10 w-full md:w-[45rem] bg-[#18181b] rounded-2xl 
             shadow-[0_0_20px_rgba(0,0,0,0.4)] p-6 space-y-6 border border-white/5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-1">
        <input
          type="search"
          placeholder="Search user by username or email"
          className="bg-[#232327] w-full px-5 py-3 rounded-xl text-gray-200 
                 outline-none border border-white/10 focus:border-blue-500 
                 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 
                  overflow-y-auto pr-2 custom-scroll 
                  max-h-[28rem]"
      >
        {results.length > 0 ? (
          results
            .filter((r) => r._id !== user?._id)
            .map((result) => (
              <Card
                key={result?._id}
                result={result}
                members={members}
                boardId={activeBoardId}
              />
            ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center min-h-[10rem] text-gray-400">
            <span className="text-lg font-medium">User not found</span>
            <p className="text-sm text-gray-500 mt-1">
              Try searching with full email or username
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddMember;
