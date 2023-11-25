"use client";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import Quixote from "./Document";
import { ResponseCertificatDeces } from "@/types/Certificat";

type Props = {
  data: ResponseCertificatDeces;
};

export default function DocContent({ data }: Props) {
  return (
    <PDFViewer className="w-full h-screen">
      <Quixote data={data} />
    </PDFViewer>
  );
}
