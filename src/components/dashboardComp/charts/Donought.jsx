import React from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const DonoughtCharts = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label,
        data: data.values,
        backgroundColor: ["#0B91BC", "#967DDD", "#4BD9ED"],

        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 16,
          boxHeight: 16,
          padding: 10,
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
      <div className="relative" style={{ width: "80%", margin: "0 auto" }}>
        <Doughnut data={chartData} options={chartOptions} />
        <span className="flex flex-col items-center absolute top-[70px] left-[73px]">
          <span className="text-[#0B91BC] font-semibold text-[28px]">60</span>
          <span className="text-[14px] font-light">Visa Application</span>
        </span>
    </div>
  );
};

export default DonoughtCharts;
