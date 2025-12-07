import { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import { usePageHistory } from "../../hooks/usePageHisrory";
import { toast } from "react-toastify";
import { useUIContext } from "../../context/UIContext";

const BoardForm = () => {
  const { boardForm, closeBoardForm } = useUIContext();
  const { updateLastOpened } = usePageHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [boardName, setBoardName] = useState("");
  const [description, setDescription] = useState("");

  const cardRef = useRef();
  

  const createBoard = async () => {
    if (!boardName) {
      setError("Board name is required");
      return;
    }
    if (!description) {
      setError("description is required");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post("/board/create", {
        name: boardName,
        description,
      });
      const boardId = data.data._id;
      updateLastOpened(boardId);
      console.log(data);
      if (data.statusCode === 201) {
        toast.success("Board created successfully");
        closeBoardForm();
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // to close when we click on ouside of board card
  useEffect(() => {
    const handleClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        closeBoardForm();
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [boardForm.open, closeBoardForm]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={cardRef}
      className="m-10 w-full md:w-[45rem] bg-[#18181b] rounded-xl shadow-2xl p-6 space-y-5 border border-[#2a2a2d]"
    >
      <h2 className="text-2xl font-semibold text-gray-200">Create New Board</h2>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Name</label>
        <input
          type="text"
          placeholder="Enter board name"
          className="bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 
                 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          onChange={(e) => setBoardName(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Description</label>
        <textarea
          rows="4"
          placeholder="Enter board description"
          className="resize-none bg-[#232327] text-gray-200 border border-[#3a3a3e] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex justify-end gap-3 pt-2">
        <button
          className="px-4 py-2 rounded-lg border border-[#3a3a3e] text-gray-300 
                 hover:bg-[#2a2a2d] transition"
          onClick={() => {
            closeBoardForm();
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={createBoard}
        >
          {loading ? "Createing..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default BoardForm;
