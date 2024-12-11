"use client";
import { certificatDbType } from "@/types/certi";
import { IoDocumentText } from "react-icons/io5";
import React from "react";
import Link from "next/link";
import { InputesActe } from "@/types/acteType";

type Props = {
  certificat: InputesActe;
};

export default function CardDocCommune({ certificat }: Props) {
  return (
    <div className="card card-compact w-full md:w-64 bg-slate-50 overflow-hidden">
      <div
        className="
        w-full
        h-40
        flex
        justify-center
        items-center
        bg-slate-100
      "
      >
        <IoDocumentText size={80} color="grey" />
      </div>
      <div className="card-body">
        <h2 className="card-title">Declarant : {certificat.nom_declarant}</h2>
        <p>
          Certificat de naissance etabli le {certificat.date_enregistrement}
        </p>
        <div className="card-actions justify-end">
          <Link
            href={`/dashboard/acte-de-naissance/${
              certificat.id
            }?token=${sessionStorage.getItem("access")}`}
            className="btn btn-primary"
          >
            Voir les details
          </Link>
        </div>
      </div>
    </div>
  );
}
