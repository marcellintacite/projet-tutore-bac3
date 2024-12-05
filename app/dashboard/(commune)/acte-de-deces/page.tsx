"use client";
import TableReuse from "@/components/TableReuse";
import Navbar from "@/components/dashboard/NavbarSearh";
import React from "react";
import Modal from "@/app/components/Modal";
import Coming from "@/components/Coming";
import { mockDeathCertificates } from "@/mockdata";
import DeathCertificateCard from "./Card";
import axiosCon from "@/libs/Axios";
import { useQuery } from "@tanstack/react-query";
import { ActeDecesData } from "@/types/acte_dec";
type Props = {};
const getTable = async () => {
  const token = sessionStorage.getItem("access");
  const res = await axiosCon.get(`/app/get_acte_desc_par_commune/${token}`);
  return res.data;
};

export default function Page({}: Props) {
  // Queries
  const { data, error, isLoading } = useQuery({
    queryKey: ["cn_commune_deces"],
    queryFn: getTable,
  }) as { data: ActeDecesData[]; error: Error; isLoading: boolean };

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center pb-7 mt-5">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  console.log(data, error, isLoading);
  return (
    <section>
      <Navbar
        pageRoute="/dashboard/acte-de-deces/nouvel-acte-deces"
        name="Acte de décès"
        path={"/dashboard/acte-de-deces"}
      />
      <Modal />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data.map((certificate) => (
          <DeathCertificateCard
            key={certificate.cert_desc_id}
            id={certificate.cert_desc_id}
            declarationNumber={certificate.cert_desc_id}
            name={certificate.nom_complet_mere}
            deathDate={certificate.date_enregistrement}
            deathPlace={certificate.residence_principale}
          />
        ))}
      </div>
    </section>
  );
}
