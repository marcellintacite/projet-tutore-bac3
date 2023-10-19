"use client";
import { certificatDbType } from "@/types/certi";
import { InputsDeces } from "@/types/dece";
import Link from "next/link";
import React from "react";

import { IoDocumentTextOutline } from "react-icons/io5";

type Props = {
  certificat: InputsDeces;
};

export default function CardDece({ certificat }: Props) {
  const token = sessionStorage.getItem("access");
  return (
    <div className="card bordered shadow-lg flex-shrink-0 w-full md:w-72 rounded-xl bg-slate-50">
      <div className="flex justify-center items-center p-5 bg-white h-28">
        <IoDocumentTextOutline className="text-6xl text-primary" />
      </div>
      <div className="p-4">
        <p>Certificat de decès</p>
        <Link
          href={`/dashboard/certificat-de-deces/${certificat.id}?token=${token}`}
          className="
            text-2xl font-bold text-gray-700 hover:underline hover:text-blue-950 cursor-pointer
        "
        >
          {certificat.nom_defunt} {certificat.postnom_defunt}
        </Link>
        <p className="pt-1">Médecin : {certificat.medecin_traitant}</p>
      </div>
    </div>
  );
}
