"use client";
import React from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosCon from "@/libs/Axios";
import { notFound } from "next/navigation";

import { ActeNaissance } from "@/types/commune";

import CardDocCommuneTable from "../CardCommune";

type Props = {};

const getTable = async () => {
  const token = sessionStorage.getItem("access");
  const res = await axiosCon.get(`/app/get_acte_naiss_par_commune/${token}`);
  return res.data;
};

export default function TableCommune({}: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cn_commune"],
    queryFn: getTable,
  });

  console.log(data);

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center pb-7 mt-5 min-h-[40vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (error) return notFound();
  const dataShow = data?.slice(0, 5);

  return (
    <div className="min-h-[40vh] bg-white p-3">
      <h1 className="text-2xl font-bold mb-6">Liste des actes de naissance </h1>
      <div className="overflow-x-auto  w-full min-h-8 rounded-md flex flex-wrap gap-5 p-4 justify-center items-center">
        {dataShow.map((d: ActeNaissance) => (
          <CardDocCommuneTable key={d.id} certificat={d} />
        ))}

        {dataShow.length === 0 && (
          <div className="flex justify-center items-center w-full flex-col gap-3">
            <p className="text-center text-gray-500">
              Aucune donnée disponible
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
