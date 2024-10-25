import React from "react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import DocContent from "./DocContent";
import Link from "next/link";
import BouttonEffacer from "./BouttonEffacer";
import { ResponseCertificatDeces } from "@/types/Certificat";
import { FaEdit } from "react-icons/fa";

// Ajout des metadonnées

import { Metadata, ResolvingMetadata } from "next";
import { base_url } from "@/data/url";

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
    `${base_url}/app/print_cert_desc/${id}`
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
  console.log(`${base_url}/app/print_cert_desc/${params.id}`);
  const getAdresse = await fetch(
    `${base_url}/app/print_cert_desc/${params.id}`
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
        <div className="flex gap-5">
          <Link
            className="btn btn-success btn-square"
            href={`/dashboard/certificat-de-deces/${params.id}/edit?token=${searchParams.token}`}
          >
            <FaEdit size={16} color={"#fff"} />
          </Link>
          <BouttonEffacer id={params.id} token={searchParams.token} />
        </div>
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
