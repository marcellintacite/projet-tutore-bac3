"use client";

import axiosCon from "@/libs/Axios";
import { certificatDbType } from "@/types/certi";
import Link from "next/link";
import React, { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import CardDoc from "./CardDoc";

type Props = {};

const getTable = async () => {
  const token = sessionStorage.getItem("access");
  const res = await axiosCon.get(`/app/get_cn_per_hosp/${token}`);
  return res.data;
};

export default function TableReuse({}: Props) {
  const [certificats, setCertificats] = useState<certificatDbType[]>([]);
  const [search, setSearch] = useState("");
  let afficher = certificats;

  // Queries
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (search !== "") {
      const nsearch = certificats.filter(
        (c) =>
          c.nom_enfant.includes(search) ||
          c.prenom_enfant.includes(search) ||
          c.post_nom_enfant.includes(search)
      );

      setCertificats(nsearch);
    } else {
      setCertificats(afficher);
    }
  };
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
      {isLoading && data && (
        <div className="w-full flex justify-center items-center pb-7 mt-5">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}
      <div
        className="
      flex flex-wrap gap-5 p-4 mt-4 items-center 
    "
      >
        {!isLoading &&
          data.map((c: certificatDbType) => (
            <CardDoc key={c.id} certificat={c} />
          ))}
      </div>

      {
        data.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <p className="text-xl text-gray-500">
              Aucun document n'a été trouvé
            </p>
          </div>
        ) // <div className="flex justify-center items-center h-96">
      }
    </div>
  );
}
