import { ResponseCertificatDeces } from "@/types/Certificat";
import React from "react";
import EditDeces from "./components/EditDece";
import Image from "next/image";
import imgillustration from "@/public/assets/Illustration.png";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    token: string;
  };
};

export default async function page({ searchParams, params }: Props) {
  console.log(searchParams, params);
  const getAdresse = await fetch(
    `https://projetutor.onrender.com/app/print_cert_desc/${params.id}`
  );

  const certificatDec: ResponseCertificatDeces = await getAdresse.json();

  return (
    <div className="md:mx-32 mt-4  h-screen">
      <h2 className="my-3 text-3xl font-bold">
        Modification du certificat de décès de{" "}
        {certificatDec.Certificat.nom_defunt}{" "}
      </h2>
      <div className="w-full flex gap-4 bg-white p-5 rounded-md">
        <EditDeces
          certificatDec={certificatDec}
          id={params.id}
          token={searchParams.token}
        />
      </div>
      <div className="mt-7 pb-6">
        <button className="btn btn-info">Retourner</button>
      </div>
    </div>
  );
}
