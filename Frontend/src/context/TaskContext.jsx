import React, { createContext, useContext, useEffect, useState } from "react";
import { useProjectContext } from "./ProjectContext";
import api from "../api/axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const TaskContext = createContext();

export function TaskContextProvider({ children }) {
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectedProject } = useProjectContext();
  const projectId = selectedProject?._id;

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/task/all/${projectId}`);
      if (data.statusCode === 200) {
        setTaskData(data.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error while fetching task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!projectId) return;
    fetchTasks();
  }, [projectId]);


  return (
    <TaskContext.Provider value={{ taskData, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => useContext(TaskContext);

// add this context rather than custom hook
