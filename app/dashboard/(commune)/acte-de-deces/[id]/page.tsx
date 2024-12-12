// page.tsx

import React from "react";
import DeathCertificate from "./death";

import { PDFViewer } from "@react-pdf/renderer";
import { base_url } from "@/data/url";
import { DeathCertificateData } from "@/app/dashboard/(hopital)/certificat-de-naissance/page";
import Doc from "./Doc";

type Props = {
  params: {
    id: number;
  };
  searchParams: {
    token: string;
  };
};

export default async function ActePage({ params }: Props) {
  const getAdresse = await fetch(
    `${base_url}/app/print_acte_desc/${params.id}`
  );

  const certificat: DeathCertificateData = await getAdresse.json();
  console.log(certificat);

  return (
    <div style={{ height: "100vh" }}>
      <Doc certificat={certificat} />
    </div>
  );
}
