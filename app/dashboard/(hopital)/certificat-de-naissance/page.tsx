import Navbar from "@/components/dashboard/NavbarSearh";
import React from "react";

import TableReuse from "@/components/TableReuse";

type Props = {};

export default function page({}: Props) {
  return (
    <main>
      <Navbar
        name="Certificat de naissance"
        path="/certificat-de-naissance"
        pageRoute="/dashboard/certificat-de-naissance/nouveau-certificat-naissance"
      />

      <div>
        <TableReuse />
      </div>
    </main>
  );
}
