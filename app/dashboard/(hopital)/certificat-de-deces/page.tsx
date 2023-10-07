import Navbar from "@/components/dashboard/NavbarSearh";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <main>
      <Navbar
        name="Certificat de decès"
        path="/certificat-de-deces"
        pageRoute="/dashboard/certificat-de-deces/nouveau-certificat-deces"
      />
    </main>
  );
}
