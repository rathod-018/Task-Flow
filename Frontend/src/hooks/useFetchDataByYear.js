import { useFetchTaskByStatus } from "./useFetchTaskByStatus"



export const useFetchDataByYear = (year) => {

    const todoTask = useFetchTaskByStatus("todo")
    const inPreogressTask = useFetchTaskByStatus("in_progress")
    const doneTask = useFetchTaskByStatus("done")

    const todo = getDataByYear(todoTask, year)
    const in_pregress = getDataByYear(inPreogressTask, year)
    const done = getDataByYear(doneTask, year)


    function getDataByYear(task, year) {

        const monthData = new Array(12).fill(0)

        for (let i = 0; i < task.length; i++) {
            const data = new Date(task[i].createdAt)

            if (data.getFullYear() !== year) continue;

            const month = data.getMonth()

            monthData[month] += 1
        }
        return monthData
    }

    return [todo, in_pregress, done]
}