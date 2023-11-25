"use client";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import Quixote from "./Document";

type Props = {
  data: any;
  adress?: any;
};

export default function ActeNaissance({ data }: Props) {
  return (
    <PDFViewer className="w-full h-screen">
      <Quixote data={data} />
    </PDFViewer>
  );
}
