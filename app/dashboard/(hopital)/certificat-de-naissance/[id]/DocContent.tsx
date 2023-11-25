"use client";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import Quixote from "./Document";
import { ResponseCertificat } from "@/types/Certificat";

type Props = {
  certificat: ResponseCertificat;
};

export default function DocContent({ certificat }: Props) {
  return (
    <PDFViewer className="w-full h-screen">
      <Quixote certificat={certificat} />
    </PDFViewer>
  );
}
