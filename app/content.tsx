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

type Props = {};

export default function Content({}: Props) {
  const { userRole } = useSelector((state: storeType) => state.user);
  console.log(userRole);
  const token = sessionStorage.getItem("access");

  const getTable = async (api: string) => {
    const res = await axiosCon.get(api);
    return res.data;
  };
  return (
    <div>
      <div className="flex-col md:flex-row md:mx-5 flex flex-wrap gap-6 justify-start p-3 w-[95%] md:w-full">
        {userRole === "admin" || userRole === "hopital" ? (
          <>
            <Card
              lien="/dashboard/certificat-de-naissance"
              icon={<AiFillBuild className="text-3xl text-gray-900" />}
              datafn={() => getTable(`/app/get_cn_per_hosp/${token}`)}
              label="Certificat de naissance"
            />
            <Card
              lien="/dashboard/certificat-de-deces"
              datafn={() =>
                getTable(`/app/get_certi_desc_par_hopital/${token}`)
              }
              icon={<AiFillFile className="text-3xl text-red-400" />}
              label="Certificat de decès"
            />
          </>
        ) : null}

        {userRole === "admin" || userRole === "commune" ? (
          <>
            <Card
              lien="/dashboard/acte-de-naissance"
              icon={<AiFillHeart className="text-3xl text-secondary-100" />}
              label="Acte de naissance"
              datafn={() =>
                getTable(`/app/get_acte_naiss_par_commune/${token}`)
              }
            />

            <Card
              datafn={() => getTable(`/app/get_acte_desc_par_commune/${token}`)}
              lien="/dashboard/acte-de-deces"
              icon={<AiFillCalendar className="text-3xl text-yellow-400" />}
              label="Acte de decès"
            />
          </>
        ) : null}
      </div>

      <div className="flex-col md:flex-row  md:mx-5 gap-5 justify-around mt-5 flex">
        <div className="md:flex-1 w-[95%]">
          {/* <h1 className="text-2xl font-bold">Liste des documents recents</h1> */}

          {userRole === "hopital" && <Table />}
          {/* {userRole === "admin" && <Table />} */}
          {userRole === "commune" && <TableCommune />}
          {/* {userRole === "admin" && <TableCommune />} */}
        </div>

        {userRole === "commune" && (
          <div className="w-4/5 md:w-2/5 bg-white rounded-lg p-4 m-auto h-auto min-h-[300px]">
            <h1 className="text-2xl font-bold">Nombre d'opérations</h1>

            <Chart />
          </div>
        )}
      </div>

      {userRole === "admin" && <DashboardChart />}
    </div>
  );
}
