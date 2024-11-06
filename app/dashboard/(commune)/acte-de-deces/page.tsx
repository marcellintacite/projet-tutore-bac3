import TableReuse from "@/components/TableReuse";
import Navbar from "@/components/dashboard/NavbarSearh";
import React from "react";
import Modal from "@/app/components/Modal";
import Coming from "@/components/Coming";
import { mockDeathCertificates } from "@/mockdata";
import DeathCertificateCard from "./Card";
type Props = {};

export default function Page({}: Props) {
  return (
    <section>
      <Navbar
        pageRoute="/dashboard/acte-de-deces/nouvel-acte-deces"
        name="Acte de décès"
        path={"/dashboard/acte-de-deces"}
      />
      <Modal />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {mockDeathCertificates.slice(0, 5).map((certificate) => (
          <DeathCertificateCard
            key={certificate.id}
            id={certificate.id}
            declarationNumber={certificate.declarationNumber}
            name={certificate.name}
            deathDate={certificate.deathDate}
            deathPlace={certificate.deathPlace}
          />
        ))}
      </div>
    </section>
  );
}
