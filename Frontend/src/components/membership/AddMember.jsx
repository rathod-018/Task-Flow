import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import Card from "./Card";
import api from "../../api/axios";
import { useMembersByStatus } from "../../hooks/useFetchMembershipBoard";

function AddMember() {
  const { user } = useUserContext();
  const [text, setText] = useState("");
  const [results, setResult] = useState([]);

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
      className="bg-[#1c1c20] w-full md:w-[60rem] p-6 rounded-2xl max-h-[85vh] min-h-80 flex flex-col overflow-hidden mt-16 mx-10 shadow-xl border border-white/10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="pb-4 mt-2 mx-2">
        <input
          type="search"
          placeholder="Search user by username or email"
          className="bg-[#232327] w-full px-5 py-3 rounded-xl text-gray-200 outline-none border border-white/10 focus:ring-2 focus:ring-blue-500 transition-all"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pr-3 custom-scroll max-h-[calc(100%-6rem)]">
        {results.length > 0 ? (
          results
            .filter((result) => result._id !== user?._id)
            .map((result) => (
              <Card result={result} members={members} key={result?._id} />
            ))
        ) : (
          <div className="col-span-full text-center text-gray-400 mt-10">
            User not found
          </div>
        )}
      </div>
    </div>
  );
}

export default AddMember;
