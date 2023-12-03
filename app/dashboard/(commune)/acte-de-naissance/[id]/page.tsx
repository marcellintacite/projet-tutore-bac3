import axiosCon from "@/libs/Axios";
import { InputesActe } from "@/types/acteType";
import Link from "next/link";
import React from "react";
import ActeNaissance from "./DocContent";

import { ResponseActeNaissance } from "@/types/commune";
import BouttonEffacer from "./BouttonEffacer";
import { FaEdit } from "react-icons/fa";

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

  const certificat: ResponseActeNaissance = await getAdresse.json();

  console.log(certificat);
  return (
    <div className="md:mx-32 mt-4  h-screen">
      <div
        className="
      flex justify-between items-center mb-2
      "
      >
        <h2 className="my-3 text-3xl font-bold">
          Acte de Naissance de {certificat.Certificat.nom_enfant}{" "}
          {certificat.Certificat.prenom_enfant}
        </h2>
        <div className="gap-3 flex">
          <Link
            className="btn btn-success btn-square"
            href={`/dashboard/acte-de-naissance/${params.id}/edit?token=${searchParams.token}`}
          >
            <FaEdit size={16} color={"#fff"} />
          </Link>
          <BouttonEffacer id={params.id} />
        </div>
      </div>
      <ActeNaissance data={certificat} />
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
