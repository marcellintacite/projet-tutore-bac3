"use client";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import Quixote from "./Document";
import { ResponseActeNaissance } from "@/types/commune";
import { base_url } from "@/data/url";

type Props = {
  data: ResponseActeNaissance;
};

export default function ActeNaissance({ data }: Props) {
  console.log(`
  ${base_url}${data.Certificat.url_qrcode}
    `);
  return (
    <PDFViewer className="w-full h-screen">
      <Quixote data={data} />
    </PDFViewer>
  );
}
