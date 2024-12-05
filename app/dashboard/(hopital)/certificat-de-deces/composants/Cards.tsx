"use client";

import axiosCon from "@/libs/Axios";
import { certificatDbType } from "@/types/certi";
import Link from "next/link";
import React, { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import CardDoc from "@/components/CardDoc";
import CardDece from "./CardDece";
import { InputsDeces } from "@/types/dece";

type Props = {};

const getTable = async () => {
  const token = sessionStorage.getItem("access");
  const res = await axiosCon.get(`/app/get_certi_desc_par_hopital/${token}`);
  return res.data;
};


export default function TableDeces({}: Props) {
  const [certificats, setCertificats] = useState<certificatDbType[]>([]);
  const [search, setSearch] = useState("");
  let afficher = certificats;

  // Queries
  const { data, error, isLoading } = useQuery({
    queryKey: ["cn_deces"],
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
          data.map((c: InputsDeces) => <CardDece key={c.id} certificat={c} />)}
        {data.length === 0 && (
          <div className="w-full flex justify-center items-center pb-7 mt-5">
            <p className="text-2xl text-gray-400">
              Aucun certificat de décès n'est disponible
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
