import { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import { usePageHistory } from "../../hooks/usePageHisrory";
import { toast } from "react-toastify";
import { useUIContext } from "../../context/UIContext";
import { useBoardContext } from "../../context/BoardContext";

const BoardForm = () => {
  const { boardForm, closeBoardForm } = useUIContext();
  const { fetchBoards } = useBoardContext();
  const { updateLastOpened } = usePageHistory();
  const prevData = boardForm?.data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [boardName, setBoardName] = useState(prevData?.name || "");
  const [description, setDescription] = useState(prevData?.description || "");
  const { activeBoardId } = useBoardContext();

  const cardRef = useRef();

  const handleSubmit = async () => {
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
      const fields = {
        name: boardName,
        description,
      };
      let res;

      if (boardForm?.mode === "create") {
        const { data } = await api.post("/board/create", fields);
        res = data;
      }

      if (boardForm?.mode === "edit") {
        const { data } = await api.patch(`/board/${prevData?._id}`, fields);
        res = data;
      }
      const boardId = res?.data._id;
      updateLastOpened(boardId);

      if (res?.statusCode === 201) {
        toast.success("Board created successfully");
        closeBoardForm();
      }

      if (res?.statusCode === 200) {
        toast.success("Board updated successfully");
        closeBoardForm();
      }
      fetchBoards();
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      setError(msg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const boardId = prevData?._id;
      if (!boardId) return;

      const { data } = await api.delete(`/board/${boardId}`);
      if (activeBoardId === boardId) {
        updateLastOpened(null);
      }
      if (data?.statusCode === 200) {
        toast.success(data?.message);
        fetchBoards();
        closeBoardForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // close on outside click
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
      className="m-4 w-full md:w-[45rem] bg-[#18181b] rounded-xl shadow-2xl p-6 space-y-5 border border-[#2a2a2d]"
    >
      <h2 className="text-2xl font-semibold text-gray-200">
        {boardForm.mode === "read"
          ? "Read board"
          : boardForm.mode === "edit"
          ? "Edit board"
          : "Create New Board"}
      </h2>
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-300">Name</label>
        <input
          type="text"
          placeholder="Enter board name"
          value={boardName}
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
          value={description}
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
        {boardForm.mode === "read" && (
          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        {boardForm.mode !== "read" && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {boardForm?.mode === "edit"
              ? loading
                ? "Updating.."
                : "Update"
              : loading
              ? "Creating.."
              : "Create"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BoardForm;
