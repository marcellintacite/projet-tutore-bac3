"use client";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import DeathCertificate from "./death";
import { DeathCertificateData } from "@/app/dashboard/(hopital)/certificat-de-naissance/page";

type Props = {
  certificat: DeathCertificateData;
};

export default function Doc({ certificat }: Props) {
  return (
    <div className="h-full">
      <PDFViewer className="w-full h-screen">
        <DeathCertificate data={certificat} />
      </PDFViewer>
    </div>
  );
}
