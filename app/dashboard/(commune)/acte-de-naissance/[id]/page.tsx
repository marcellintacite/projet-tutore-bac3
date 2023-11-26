import axiosCon from "@/libs/Axios";
import { InputesActe } from "@/types/acteType";
import Link from "next/link";
import React from "react";
import ActeNaissance from "./DocContent";
import { ResponseCertificat } from "@/types/Certificat";

type Props = {
  params: {
    id: number;
  };
  searchParams: {
    token: string;
  };
};

export default async function page({ params, searchParams }: Props) {
  const getAdresse = await fetch(
    `https://projetutor.onrender.com/app/print_acte_naiss/${params.id}`
  );

  const certificat: ResponseCertificat = await getAdresse.json();

  console.log(certificat);
  return (
    <div className="md:mx-32 mt-4  h-screen">
      {/* <h2 className="my-3 text-3xl font-bold">
        Acte de Naissance de {current.nom_declarant} {current.qualite_declarant}
      </h2> */}
      {/* <ActeNaissance data={current} /> */}
      <div className="mt-7 pb-6">
        <Link
          href={`/dashboard/certificat-de-naissance/`}
          className="btn btn-info"
        >
          Retourner
        </Link>
      </div>
    </div>
  );
}
