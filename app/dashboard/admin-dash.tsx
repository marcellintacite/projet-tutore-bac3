"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
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
import axiosCon from "@/libs/Axios";
import { base_url } from "@/data/url";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetchStats = async () => {
  const { data } = await axiosCon.get(`${base_url}/stat/voir_cert`);
  return data;
};

const DashboardChart = () => {
  const { data, isLoading, error } = useQuery(["certStats"], fetchStats);

  const generalChartData = React.useMemo(() => {
    if (!data) return null;
    const combined = Object.values(data).flat();
    return formatChartData(combined);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Il y a une erreur</div>;
  if (!data || Object.keys(data).length === 0)
    return <div>No data available</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Statistiques des Naissances et Décès
      </h1>
      <div className="card bg-white shadow-md p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Graphique Général
        </h2>
        {generalChartData && (
          <Line
            data={generalChartData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(data).map((key) => {
          const chartData = formatChartData(data[key]);
          return (
            <div key={key} className="card bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
                {key.replace("_", " ")}
              </h2>
              {chartData && (
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const formatChartData = (records: any) => {
  if (!Array.isArray(records)) return null;

  const labels = records.map((item) => item?.date || "N/A");
  const boys = records.map((item) => item?.garçon || 0);
  const girls = records.map((item) => item?.fille || 0);
  const totals = records.map((item) => item?.total || 0);

  return {
    labels,
    datasets: [
      {
        label: "Garçons",
        data: boys,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "Filles",
        data: girls,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Total",
        data: totals,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };
};

export default DashboardChart;
