// page.tsx

"use client";
import React from "react";
import DeathCertificate from "./death";
import { fakeDeathData } from "@/mockdata";
import { PDFViewer } from "@react-pdf/renderer";

export default function ActePage() {
  return (
    <div style={{ height: "100vh" }}>
      <PDFViewer width="100%" height="100%">
        <DeathCertificate data={fakeDeathData} />
      </PDFViewer>
    </div>
  );
}
