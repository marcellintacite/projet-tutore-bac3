import React from "react";
import { notFound, useRouter } from "next/navigation";
import DocContent from "./DocContent";
import Link from "next/link";
import BouttonEffacer from "./BouttonEffacer";
import { ResponseCertificatDeces } from "@/types/Certificat";

// Ajout des metadonnées

import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: {
    id: number;
  };
  searchParams: { token: string };
};

// Fonction pour ajouter les metadonnées
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const certificat: ResponseCertificatDeces = await fetch(
    `https://projetutor.onrender.com/app/print_cert_desc/${id}`
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const titre = `Certificat de ${certificat.Certificat.nom_defunt} ${
    certificat.Certificat.post_nom_defunt &&
    certificat.Certificat.post_nom_defunt
  }`;

  return {
    title: titre,
    description: `Certificat de décès de ${certificat.Certificat.nom_defunt} ${
      certificat.Certificat.post_nom_defunt &&
      certificat.Certificat.post_nom_defunt
    }`,
    themeColor: "#000000",
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

export default async function page({ params, searchParams }: Props) {
  const getAdresse = await fetch(
    `https://projetutor.onrender.com/app/print_cert_desc/${params.id}`
  );

  const certificatDec: ResponseCertificatDeces = await getAdresse.json();

  if (!certificatDec) {
    return notFound;
  }
  return (
    <div className="md:mx-32 mt-4  h-screen">
      <div className="flex justify-between">
        <h2 className="my-3 text-3xl font-bold">
          Certificat de {certificatDec.Certificat.nom_defunt}{" "}
          {certificatDec.Certificat.post_nom_defunt &&
            certificatDec.Certificat.post_nom_defunt}{" "}
        </h2>
        <BouttonEffacer id={params.id} />
      </div>
      <DocContent data={certificatDec} />

      <div className="mt-7 pb-6">
        <Link href={`/dashboard/certificat-de-deces/`} className="btn btn-info">
          Retourner
        </Link>
      </div>
    </div>
  );
}
