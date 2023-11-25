import React from "react";
import flag from "@/public/assets/flag.svg";
import justice from "@/public/assets/illustration/jpr.png";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { certificatDbType } from "@/types/certi";

import DocContent from "./DocContent";
import Link from "next/link";
import { InputsDeces } from "@/types/dece";

type Props = {
  params: {
    id: number;
  };
  searchParams: { token: string };
};

async function getData(token: string) {
  const res = await fetch(
    `https://projetutor.onrender.com/app/get_certi_desc_par_hopital/${token}`,
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
  const data = await getData(searchParams.token);

  const certData: InputsDeces = data[params.id - 1];

  //   const getAdresse = await fetch(
  //     `https://projetutor.onrender.com/app/get_certi_desc_par_hopital/${params.id}`
  //   );
  //   const adresse = await getAdresse.json();

  if (!certData) {
    return notFound;
  }
  return (
    <div className="md:mx-32 mt-4  h-screen">
      <h2 className="my-3 text-3xl font-bold">
        Certificat de {certData.nom_defunt} {certData.postnom_defunt}
      </h2>
      <DocContent data={certData} />

      <div className="mt-7 pb-6">
        <Link href={`/dashboard/certificat-de-deces/`} className="btn btn-info">
          Retourner
        </Link>
      </div>
    </div>
  );
}
