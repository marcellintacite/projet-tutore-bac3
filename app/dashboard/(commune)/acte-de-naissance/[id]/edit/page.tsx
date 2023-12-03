import { ResponseActeNaissance } from "@/types/commune";
import React from "react";
import EditActe from "./EditActe";

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
    <div>
      <div className="text-center mt-1 mb-2">
        <h2>
          Modification de l'acte de naissance de{" "}
          {certificat.Certificat.nom_enfant}{" "}
          {certificat.Certificat.prenom_enfant}
        </h2>
      </div>
      <EditActe certificat={certificat} />
    </div>
  );
}
