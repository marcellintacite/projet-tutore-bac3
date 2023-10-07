import React from "react";
import flag from "@/public/assets/flag.svg";
import justice from "@/public/assets/illustration/jpr.png";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { certificatDbType } from "@/types/certi";
import CardInfo from "@/components/dashboard/CardInfo";

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
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function page({ params, searchParams }: Props) {
  const data = await getData(searchParams.token);
  const certData: certificatDbType = data[params.id - 1];

  if (!certData) {
    return notFound;
  }
  return (
    <div className="md:mx-32 mt-4 bg-white h-screen">
      <div className="mx-6 pt-4 flex justify-between">
        <Image src={flag} alt="drapeau rdc" width={140} />

        <div className="text-center mt-3">
          <h1 className="text-2xl font-bold">
            REPUBLIQUE DEMOCRATIQUE DU CONGO
          </h1>
          <h2 className="text-xl pt-1 font-semibold">
            MINISTERE NATIONAL DE LA SANTE{" "}
          </h2>
          <h3 className="text-lg font-medium">HOPITAL DE </h3>
        </div>
        <Image src={justice} alt="drapeau rdc" width={130} />
      </div>

      <div className="mx-6 mt-5">
        <div>
          <h2 className="text-2xl font-bold text-primary-200">
            Information sur l'enfant
          </h2>
          <div className="mt-2">
            <div>
              <CardInfo title="Prenom enfant" value={certData.prenom_enfant} />
              <CardInfo title="Nom enfant" value={certData.nom_enfant} />
              <CardInfo
                title="Post nom enfant"
                value={certData.post_nom_enfant}
              />
              <CardInfo title="Nom enfant" value={certData.nom_enfant} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
