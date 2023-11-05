import React from "react";
import flag from "@/public/assets/flag.svg";
import justice from "@/public/assets/illustration/jpr.png";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { certificatDbType } from "@/types/certi";

import DocContent from "./DocContent";
import Link from "next/link";
import BouttonEffacer from "./BouttonEffacer";

type Props = {
  params: {
    id: number;
  };
  searchParams: { token: string };
};

async function getData(token: string) {
  // `https://projetutor.onrender.com/app/get_cn_per_hosp/${token}`,

  const res = await fetch(
    `http://192.168.100.33:8000/app/get_cn_per_hosp/${token}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return notFound();
  }

  return res.json();
}

export default async function page({ params, searchParams }: Props) {
  console.log(params.id);
  const data = await getData(searchParams.token);
  const certData: certificatDbType = data[params.id];
  // `https://projetutor.onrender.com/app/print_cert/${params.id}`
  const getAdresse = await fetch(
    `http://192.168.100.33:8000/app/print_cert/${params.id}`
  );

  const adresse = await getAdresse.json();

  console.log(adresse);

  if (!certData) {
    return notFound;
  }
  return (
    <div className="md:mx-32 mt-4  h-screen">
      <div className="flex justify-between">
        <h2 className="my-3 text-3xl font-bold">
          Certificat de {certData.nom_enfant} {certData.post_nom_enfant}
        </h2>
        <BouttonEffacer id={params.id} />
      </div>
      <DocContent data={certData} adress={adresse} />

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
