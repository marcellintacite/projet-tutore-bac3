"use client";

import axiosCon from "@/libs/Axios";
import { storeType } from "@/types/store";
import React from "react";
import { useSelector } from "react-redux";
import {
  AiFillHeart,
  AiFillCalendar,
  AiFillBuild,
  AiFillFile,
} from "react-icons/ai";
import Table from "@/components/dashboard/Table";
import TableCommune from "@/components/dashboard/TableCommune";
import Chart from "@/components/dashboard/Chart";
import Card from "@/components/dashboard/Card";
import DashboardChart from "./dashboard/admin-dash";

export default function Content() {
  const { userRole } = useSelector((state: storeType) => state.user);
  const token = sessionStorage.getItem("access");

  const getTable = async (api: string) => {
    const res = await axiosCon.get(api);
    return res.data;
  };

  // Define card data to avoid repetition
  const cards = [
    {
      roles: ["admin", "hopital"],
      lien: "/dashboard/certificat-de-naissance",
      icon: <AiFillBuild className="text-3xl text-gray-900" />,
      datafn: () => getTable(`/app/get_cn_per_hosp/${token}`),
      label: "Certificat de naissance",
    },
    {
      roles: ["admin", "hopital"],
      lien: "/dashboard/certificat-de-deces",
      icon: <AiFillFile className="text-3xl text-red-400" />,
      datafn: () => getTable(`/app/get_certi_desc_par_hopital/${token}`),
      label: "Certificat de décès",
    },
    {
      roles: ["admin", "commune"],
      lien: "/dashboard/acte-de-naissance",
      icon: <AiFillHeart className="text-3xl text-secondary-100" />,
      datafn: () => getTable(`/app/get_acte_naiss_par_commune/${token}`),
      label: "Acte de naissance",
    },
    {
      roles: ["admin", "commune"],
      lien: "/dashboard/acte-de-deces",
      icon: <AiFillCalendar className="text-3xl text-yellow-400" />,
      datafn: () => getTable(`/app/get_acte_desc_par_commune/${token}`),
      label: "Acte de décès",
    },
  ];

  return (
    <div className="p-4 w-full">
      {/* Cards Section */}
      <div className="flex flex-wrap gap-6 justify-start md:mx-5 w-[95%] md:w-full">
        {cards
          .filter((card) => card.roles.includes(userRole))
          .map((card, index) => (
            <Card
              key={index}
              lien={card.lien}
              icon={card.icon}
              datafn={card.datafn}
              label={card.label}
            />
          ))}
      </div>

      {/* Tables and Charts Section */}
      <div className="flex flex-col md:flex-row gap-5 justify-around mt-5 md:mx-5">
        {/* Table Section */}
        <div className="flex-1 w-[95%]">
          {userRole === "hopital" && <Table />}
          {userRole === "commune" && <TableCommune />}
        </div>

        {/* Chart Section */}
        {userRole === "commune" && (
          <div className="w-full md:w-2/5 bg-white rounded-lg p-4 shadow-md">
            <h1 className="text-lg font-semibold mb-4">Nombre d'opérations</h1>
            <Chart />
          </div>
        )}
      </div>

      {/* Admin Dashboard Chart */}
      {userRole === "admin" && <DashboardChart />}
    </div>
  );
}
