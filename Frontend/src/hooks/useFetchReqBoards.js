import { useEffect, useState } from "react"
import { useUserContext } from "../context/UserContext"
import api from "../api/axios";


export const useFetchReqBoards = () => {
    const { user } = useUserContext()
    const [boardData, setBoardData] = useState([])


    const fetchReqBoards = async () => {
        try {
            const { data } = await api.get("/board-member/invited");
            if (data?.statusCode === 200) {
                setBoardData(data?.data)
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchReqBoards()
    }, [user])

    return { boardData, fetchReqBoards }
}