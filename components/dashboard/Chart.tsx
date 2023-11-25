"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axiosCon from "@/libs/Axios";
import { useQuery } from "@tanstack/react-query";

type Props = {};

ChartJS.register(ArcElement, Tooltip, Legend);

const getHopital = async () => {
  const token = sessionStorage.getItem("access");
  const res = await axiosCon.get(`/app/get_cn_per_hosp/${token}`);
  return res.data;
};

const getDeces = async () => {
  const token = sessionStorage.getItem("access");
  const res = await axiosCon.get(`/app/get_certi_desc_par_hopital/${token}`);
  return res.data;
};

export default function Chart({}: Props) {
  const {
    data: naissance,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cn_hospital"],
    queryFn: getHopital,
  });

  const {
    data: deces,
    error: err,
    isLoading: load,
  } = useQuery({
    queryKey: ["deces_hospital"],
    queryFn: getDeces,
  });

  const dataChart = {
    labels: ["Certificat de naissance", "Certificat de décès"],
    datasets: [
      {
        label: "certificat",
        data: [naissance?.length, deces?.length],
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

  if (isLoading || load)
    return (
      <div className="w-full flex justify-center items-center pb-7 mt-5">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  return <Doughnut data={dataChart} className="w-full" />;
}
