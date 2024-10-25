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
      <div className="w-full flex justify-center items-center pb-7 mt-5">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (error) return notFound();
  const dataShow = data?.slice(0, 5);

  return (
    <div className="overflow-x-auto bg-white w-full min-h-8 rounded-md flex flex-wrap gap-5 p-4 justify-center items-center">
      {dataShow.map((d: ActeNaissance) => (
        <CardDocCommuneTable key={d.id} certificat={d} />
      ))}
    </div>
  );
}
