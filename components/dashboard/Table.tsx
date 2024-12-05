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
    <div className="overflow-x-auto bg-white h-auto w-full rounded-md flex flex-wrap gap-5 p-4 justify-center items-center">
      {dataShow.map((d: certificatDbType) => (
        <CardDocDash key={d.id} certificat={d} />
      ))}
    </div>
  );
}
