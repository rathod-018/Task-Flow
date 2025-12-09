import React, { createContext, useContext, useEffect, useState } from "react";
import { useProjectContext } from "./ProjectContext";
import api from "../api/axios";
import { toast } from "react-toastify";

const TaskContext = createContext();

export function TaskContextProvider({ children }) {
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectedProject } = useProjectContext();
  const projectId = selectedProject?._id;

  const fetchTasks = async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const { data } = await api.get(`/task/all/${projectId}`);
      if (data.statusCode === 200) {
        setTaskData(data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while fetching task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!projectId) return setTaskData([]);
    fetchTasks();
  }, [projectId]);

  return (
    <TaskContext.Provider value={{ taskData, fetchTasks, loading }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => useContext(TaskContext);
