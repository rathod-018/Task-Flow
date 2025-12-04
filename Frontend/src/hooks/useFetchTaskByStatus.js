import { useEffect, useState } from "react"
import { useTaskContext } from "../context/TaskContext"


export function useFetchTaskByStatus(status) {
    const { taskData } = useTaskContext()
    const [data, setData] = useState([])

    useEffect(() => {
        setData(taskData
            .filter((item) => item.status === status)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)))
    }, [status, taskData])

    return data
}