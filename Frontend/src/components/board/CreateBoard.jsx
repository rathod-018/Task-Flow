import { useEffect, useState } from "react";
import api from "../../api/axios";
import { usePageHistory } from "../../hooks/usePageHisrory";

const CreateBoard = ({ close }) => {
  const { updateLastOpened } = usePageHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const create = async () => {
    if (!title) {
      setError("Board name is required");
      return;
    }
    if (!description) {
      setError("description is required");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post("/board/create", { title, description });
      const boardId = data.data._id;
      updateLastOpened(boardId);
      if (typeof close === "function") close();
    } catch (error) {
      const msg =
        error?.response?.data?.message || error?.message || "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto w-full p-4 bg-[#151618] z-40">
      <div className="flex flex-col gap-3">
        <label className="text-sm text-gray-300">Board title</label>
        <input
          className="w-full p-2 rounded-md bg-[#0f1113] border border-[#26282b] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="Board title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <label className="text-sm text-gray-300 mt-2">Description</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full p-2 rounded-md bg-[#0f1113] border border-[#26282b] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Write description..."
          rows={4}
          disabled={loading}
        />

        <button
          className="mt-3 w-full px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          onClick={create}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default CreateBoard;
