import React from "react";
import flag from "@/public/assets/flag.svg";
import justice from "@/public/assets/illustration/jpr.png";
import Image from "next/image";
import { notFound } from "next/navigation";

import DocContent from "./DocContent";
import Link from "next/link";
import BouttonEffacer from "./BouttonEffacer";
import { ResponseCertificat } from "@/types/Certificat";
import { Metadata, ResolvingMetadata } from "next";
import { FaEdit } from "react-icons/fa";

type Props = {
  params: {
    id: number;
  };
  searchParams: { token: string };
};

// Ajout des metadonnées
// Fonction pour ajouter les metadonnées
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const certificat: ResponseCertificat = await fetch(
    `https://projetutor.onrender.com/app/print_cert/${params.id}`
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const titre = `Certificat de ${certificat.Certificat.nom_enfant} ${
    certificat.Certificat.post_nom_enfant && certificat.Certificat.prenom_enfant
  }`;

  return {
    title: titre,
    description: `Certificat de décès de ${certificat.Certificat.nom_enfant} ${
      certificat.Certificat.prenom_enfant &&
      certificat.Certificat.post_nom_enfant
    }`,
    themeColor: "#000000",
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

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
        <div className="gap-3 flex">
          <Link
            className="btn btn-success btn-square"
            href={`/dashboard/certificat-de-naissance/${params.id}/edit?token=${searchParams.token}`}
          >
            <FaEdit size={16} color={"#fff"} />
          </Link>
          <BouttonEffacer id={params.id} type="certificat-naissance" />
        </div>
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
