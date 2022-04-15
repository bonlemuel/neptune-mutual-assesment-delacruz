import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  isDefault?: boolean;
};

function Recharts({ isDefault }: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: true,
        text: isDefault ? "NEP - BUSD" : "BUSD - NEP",
      },
    },
  };

  const labels = [
    moment().format("HH:00 A"),
    moment().add(1, "hour").format("HH:00 A"),
    moment().add(2, "hour").format("HH:00 A"),
    moment().add(3, "hour").format("HH:00 A"),
    moment().add(4, "hour").format("HH:00 A"),
    moment().add(5, "hour").format("HH:00 A"),
    moment().add(6, "hour").format("HH:00 A"),
    moment().add(7, "hour").format("HH:00 A"),
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Rate",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9].sort((a, b) => 0.5 - Math.random()),
        borderColor: "rgb(129 201 149)",
        backgroundColor: "rgba(129 201 149)",
      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default Recharts;
