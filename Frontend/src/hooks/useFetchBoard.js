import api from "../api/axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export const useFetchBoard = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useUserContext()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get(url)
                setData(data?.data)

            } catch (error) {
                setError(error.response?.data?.message || "something went wrong")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [user])

    return { data, loading, error }

}