import axiosCon from "@/libs/Axios";
import { InputesActe } from "@/types/acteType";
import Link from "next/link";
import React from "react";
import ActeNaissance from "./DocContent";

type Props = {
  params: {
    id: number;
  };
  searchParams: {
    token: string;
  };
};

const getData = async (token: string) => {
  const res = await axiosCon.get(`/app/get_acte_naiss_par_commune/${token}`);
  return res.data;
};

export default async function page({ params, searchParams }: Props) {
  const data = await getData(searchParams.token);
  const current: InputesActe = data[params.id - 1];
  console.log(current);
  return (
    <div className="md:mx-32 mt-4  h-screen">
      <h2 className="my-3 text-3xl font-bold">
        Acte de Naissance de {current.nom_declarant} {current.qualite_declarant}
      </h2>
      <ActeNaissance data={current} />
      <div className="mt-7 pb-6">
        <Link href={`/dashboard/certificat-de-deces/`} className="btn btn-info">
          Retourner
        </Link>
      </div>
    </div>
  );
}
