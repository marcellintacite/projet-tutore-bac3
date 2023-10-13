"use client";
import { certificatDbType } from "@/types/certi";
import { IoDocumentText } from "react-icons/io5";
import React from "react";
import Link from "next/link";

type Props = {
  certificat: certificatDbType;
};

export default function CardDocDash({ certificat }: Props) {
  return (
    <div className="card card-compact w-48 bg-slate-50 overflow-hidden">
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
          {certificat.nom_enfant} {certificat.post_nom_enfant}
        </h2>
        <p>Certificat de naissance etabli le {certificat.date_deliv_cert}</p>
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
