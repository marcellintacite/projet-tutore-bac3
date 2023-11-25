"use client";

import axiosCon from "@/libs/Axios";
import { certificatDbType } from "@/types/certi";
import Link from "next/link";
import React, { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import CardDoc from "../CardDoc";
import { InputesActe } from "@/types/acteType";
import CardDocCommune from "./CardDoc";
import toast from "react-hot-toast";

type Props = {};

const getTable = async () => {
  const token = sessionStorage.getItem("access");
  const res = await axiosCon.get(`/app/get_acte_naiss_par_commune/${token}`);
  return res.data;
};

export default function CertificatNaissance({}: Props) {
  const [certificats, setCertificats] = useState<InputesActe[]>([]);
  const [search, setSearch] = useState("");
  let afficher = certificats;

  // Queries
  const { data, error, isLoading } = useQuery({
    queryKey: ["cn_commune_acte"],
    queryFn: getTable,
  });

  console.log(data, error, isLoading);

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center pb-7 mt-5">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  if (error) {
    console.log(error);
  }
  return (
    <div className="overflow-x-auto bg-white h-screen">
      <div className="flex justify-end mt-4 mx-3">
        <form className="form-control">
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Chercher ..."
            className="input input-bordered border-slate-300 rounded-md bg-white w-full max-w-xs"
          />
        </form>
      </div>
      {isLoading && (
        <div className="w-full flex justify-center items-center pb-7 mt-5">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}
      <div
        className="
      flex flex-wrap gap-5 p-4 mt-4 items-center justify-center
    "
      >
        {!isLoading &&
          !error &&
          data.map((c: InputesActe) => (
            <CardDocCommune key={c.id} certificat={c} />
          ))}
      </div>
    </div>
  );
}
