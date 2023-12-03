"use client";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import Quixote from "./Document";
import { ResponseActeNaissance } from "@/types/commune";

type Props = {
  data: ResponseActeNaissance;
};

export default function ActeNaissance({ data }: Props) {
  return (
    <PDFViewer className="w-full h-screen">
      <Quixote data={data} />
    </PDFViewer>
  );
}
