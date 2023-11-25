import React from "react";
import flag from "@/public/assets/flag.svg";
import justice from "@/public/assets/illustration/jpr.png";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { certificatDbType } from "@/types/certi";

import DocContent from "./DocContent";
import Link from "next/link";
import BouttonEffacer from "./BouttonEffacer";
import { ResponseCertificat } from "@/types/Certificat";

type Props = {
  params: {
    id: number;
  };
  searchParams: { token: string };
};

export default async function page({ params, searchParams }: Props) {
  console.log(params.id);

  // `https://projetutor.onrender.com/app/print_cert/${params.id}`
  const getAdresse = await fetch(
    `https://projetutor.onrender.com/app/print_cert/${params.id}`
  );

  const certificat: ResponseCertificat = await getAdresse.json();

  console.log(certificat);

  if (!certificat) {
    return notFound;
  }
  return (
    <div className="md:mx-32 mt-4  h-screen">
      <div className="flex justify-between">
        <h2 className="my-3 text-3xl font-bold">
          Certificat de {certificat.Certificat.nom_enfant}{" "}
          {certificat.Certificat.prenom_enfant}
        </h2>
        <BouttonEffacer id={params.id} type="certificat-naissance" />
      </div>
      <DocContent certificat={certificat} />

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
