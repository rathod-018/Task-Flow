import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { useFetchTaskByStatus } from "../../../hooks/useFetchTaskByStatus";

function DoughnutChart() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const todo=useFetchTaskByStatus("todo");
  const in_progress=useFetchTaskByStatus("in_progress");
  const done=useFetchTaskByStatus("done");


  const data = {
    labels: ["Todo", "In Progress", "Done"],
    datasets: [
      {
        data: [todo.length, in_progress.length, done.length],
        backgroundColor: ["#4c6ef5", "#f59f00", "#51cf66"],
        borderWidth: 0.25,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          boxWidth: 14,
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div>
      <Doughnut data={data} options={doughnutOptions} />
    </div>
  );
}

export default DoughnutChart;
