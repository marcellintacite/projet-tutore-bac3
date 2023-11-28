import { ResponseCertificat } from "@/types/Certificat";
import React from "react";
import EditForm from "./EditForm";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    token: string;
  };
};

export default async function page({ searchParams, params }: Props) {
  const getAdresse = await fetch(
    `https://projetutor.onrender.com/app/print_cert/${params.id}`
  );

  const certificat: ResponseCertificat = await getAdresse.json();

  return (
    <div>
      <h1
        className="
        text-xl
        font-bold
        text-gray-900
        text-center
        mb-4
        mt-4
      "
      >
        Modification du certificat de naissance de{" "}
        {certificat.Certificat.nom_enfant}
      </h1>
      <div className="bg-white p-4 rounded-md">
        <EditForm
          certificat={certificat}
          id={params.id}
          token={searchParams.token}
        />
      </div>
    </div>
  );
}
