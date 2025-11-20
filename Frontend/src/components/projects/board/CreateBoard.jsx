import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { usePageHistory } from "../../../hooks/usePageHisrory";

const CreateBoard = ({ close }) => {
  // To update boardId in user model
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
    }
    // console.log(data);
    try {
      setLoading(true);
      const { data } = await api.post("/board/create", { title, description });
      console.log(data);

      //update last opened board
      const boardId = data.data._id;
      console.log(boardId);
      updateLastOpened(boardId);

      // to clode create component
      close();
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

  return (
    <div className="h-full bg-slate-700 rounded-xl p-4 flex flex-col gap-4 mt-2">
      <div className="flex flex-col gap-4 mt-8">
        <div>
          <label htmlFor="name">Board name:</label>
          <input
            className="w-full p-2 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            type="text"
            name="name"
            placeholder="Board name"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            disabled={loading}
          />
        </div>
        <div>
          <label className="text-sm font-medium"> Description</label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            className="w-full h-32 p-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write description..."
            disabled={loading}
          />
        </div>

        <button
          className="w-full border-2 border-red-400 py-2 rounded-lg"
          onClick={create}
          disabled={loading}
        >
          Create
        </button>
      </div>
      {error ? <div className="text-center text-red-500">{error}</div> : null}
    </div>
  );
};

export default CreateBoard;
