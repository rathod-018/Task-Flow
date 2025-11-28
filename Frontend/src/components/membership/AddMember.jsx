import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import Card from "./Card";
import api from "../../api/axios";

function AddMember() {
  const { user } = useUserContext();
  const [text, setText] = useState("");
  const [results, setResult] = useState([]);

  const searchUser = async () => {
    if (!text || !text.trim()) return setResult([]);

    try {
      const { data } = await api.get(`/board-member/search?q=${text}`);
      setResult(data?.data);
    } catch (error) {
      console.log(error);
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
      className="bg-[#18181b] md:w-[60rem]  p-5 rounded-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="pb-4 mt-3 mx-5 ">
        <input
          type="search"
          placeholder="Search user by username or email"
          className="bg-[#232327] w-full px-5 py-3 rounded-lg text-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 overflow-y-auto  max-h-[calc(100%-5rem)] pr-2 custom-scroll">
        {results
          ?.filter((result) => result._id !== user?._id)
          .map((result) => (
            <Card result={result} key={result?._id} />
          ))}
      </div>
    </div>
  );
}

export default AddMember;
