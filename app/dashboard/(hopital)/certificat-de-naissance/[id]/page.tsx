import React from "react";
import flag from "@/public/assets/flag.svg";
import justice from "@/public/assets/illustration/jpr.png";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { certificatDbType } from "@/types/certi";
import CardInfo from "@/components/dashboard/CardInfo";

import DocContent from "./DocContent";
import Link from "next/link";

type Props = {
  params: {
    id: number;
  };
  searchParams: { token: string };
};

async function getData(token: string) {
  const res = await fetch(
    `https://projetutor.onrender.com/app/get_cn_per_hosp/${token}`,
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
  const certData: certificatDbType = data[params.id - 1];
  const getAdresse = await fetch(
    `https://projetutor.onrender.com/app/print_cert/${params.id}`
  );
  const adresse = await getAdresse.json();

  if (!certData) {
    return notFound;
  }
  return (
    <div className="md:mx-32 mt-4  h-screen">
      <DocContent data={certData} adress={adresse} />

      <div className="mt-7">
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
