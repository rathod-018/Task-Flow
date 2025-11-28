import { useEffect, useState } from "react"
import { useUserContext } from "../context/UserContext"
import { toast } from "react-toastify"
import api from "../api/axios"



export const useMembersByStatus = (status) => {
    const { user } = useUserContext()
    const [data, setData] = useState([])

    const getMembers = async () => {
        try {
            const { data } = await api.get("/board-member/all", {
                params: {
                    boardId: user?.userPageHistory?.boardId,
                    status
                }
            })
            setData(data.data)

        } catch (error) {
            toast.error("Failed to load members")
        }
    }

    useEffect(() => { getMembers() }, [status])

    return data
}