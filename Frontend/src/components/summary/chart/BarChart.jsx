import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useProjectContext } from "../../../context/ProjectContext";
import { useFetchDataByYear } from "../../../hooks/useFetchDataByYear";

function BarChart() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
  const { selectedProject } = useProjectContext();
  const [year, setYear] = useState(new Date().getFullYear());
  const [todo, in_pregress, done] = useFetchDataByYear(year);

  const years = [];
  const currentYear = new Date().getFullYear();
  const projectCreatedYear = new Date(selectedProject?.createdAt).getFullYear();
  for (let y = currentYear; y >= projectCreatedYear; y--) {
    years.push(y);
  }

  const options = {
    position: "left",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          boxWidth: 14,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "#333" },
      },
    },
  };

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Todo",
        data: todo,
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        barPercentage: 0.35,
      },
      {
        label: "In Progress",
        data: in_pregress,
        backgroundColor: "#eab308",
        borderRadius: 6,
        barPercentage: 0.35,
      },
      {
        label: "Done",
        data: done,
        backgroundColor: "#22c55e",
        borderRadius: 6,
        barPercentage: 0.35,
      },
    ],
  };

  return (
    <div className="w-full h-full relative">
      <select
        name="year"
        id="year-select"
        className="bg-[#1e1f22] text-white px-4 py-2 rounded-lg border border-white/10 
           focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
           hover:border-white/20 transition-all duration-200 absolute right-1 top-1 z-10"
      >
        {years.map((y) => (
          <option key={y} value={y} onClick={(e) => setYear(e.target.value)}>
            {y}
          </option>
        ))}
      </select>

      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
