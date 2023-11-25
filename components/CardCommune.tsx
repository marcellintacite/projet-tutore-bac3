"use client";

import { IoDocumentText } from "react-icons/io5";
import React from "react";
import Link from "next/link";
import { ActeNaissance } from "@/types/commune";

type Props = {
  certificat: ActeNaissance;
};

export default function CardDocCommuneTable({ certificat }: Props) {
  return (
    <div className="card card-compact w-full md:w-48 bg-slate-50 overflow-hidden">
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
        <h2 className="card-title">
          {certificat.nom_declarant} {certificat.id}
        </h2>
        <p>
          Certificat de naissance etabli le {certificat.date_enregistrement}
        </p>
        <div className="card-actions justify-end">
          <Link
            href={`/dashboard/certificat-de-naissance/${
              certificat.id
            }?token=${sessionStorage.getItem("access")}`}
            className="btn btn-ghost btn-sm"
          >
            Voir les details
          </Link>
        </div>
      </div>
    </div>
  );
}
