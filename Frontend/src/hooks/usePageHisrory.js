import api from "../api/axios";
import { useUserContext } from "../context/UserContext";

export const usePageHistory = () => {
    const { getUser } = useUserContext();

    const updateLastOpened = async (boardId = null, projectId = null) => {
        try {
            const { data } = await api.patch("/user/page-history", { boardId, projectId })
            if (data.statusCode === 200) {
                getUser()
            }
        } catch (error) {
            console.error(error)
        }
    }

    return { updateLastOpened }
}
