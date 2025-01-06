"use client";
import React from "react";
import { AiFillEye, AiOutlineEdit } from "react-icons/ai";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosCon from "@/libs/Axios";
import { notFound } from "next/navigation";
import CardDoc from "../CardDoc";
import { certificatDbType } from "@/types/certi";
import CardDocDash from "../CardDocDash";

type Props = {};

const getTable = async () => {
  const token = sessionStorage.getItem("access");
  const res = await axiosCon.get(`/app/get_cn_per_hosp/${token}`);
  return res.data;
};

export default function Table({}: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cn_hospital"],
    queryFn: getTable,
  });

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center pb-7 mt-5">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (error) return notFound();
  const dataShow = data?.slice(0, 5);
  return (
    <div className="min-h-[40vh] h-auto">
      <h1 className="text-2xl font-bold mb-6">Liste des certificats </h1>
      <div className="overflow-x-auto bg-white  w-full rounded-md flex flex-wrap gap-5 p-4  items-center">
        {dataShow.map((d: certificatDbType) => (
          <CardDocDash key={d.id} certificat={d} />
        ))}
        {dataShow.length === 0 && (
          <div className="flex justify-center items-center w-full flex-col gap-3">
            <p className="text-center text-gray-500">
              Aucune donnée disponible
            </p>
            <p>
              Veuillez vous deplacer via le sidebar pour ajouter des données
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
