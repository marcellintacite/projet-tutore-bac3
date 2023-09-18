"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

type Props = {};

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "Acte de naissance",
    "Attestation de naissance",
    "Certificat de naissance",
    "Certificat de décès",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [15, 19, 3, 25],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function Chart({}: Props) {
  return <Doughnut data={data} className="w-full" />;
}
