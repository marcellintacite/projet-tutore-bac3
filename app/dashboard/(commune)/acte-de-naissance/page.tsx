import TableReuse from "@/components/TableReuse";
import Navbar from "@/components/dashboard/NavbarSearh";
import React from "react";
import Modal from "@/app/components/Modal";
import CertificatNaissance from "@/components/commune/Container";

type Props = {};

export default function page({}: Props) {
  return (
    <section>
      <Navbar
        pageRoute="/"
        name="Acte de naissance"
        path={"/dashboard/acte-de-naissance"}
      />
      <Modal />
      <div className="mt-3 bg-white rounded-md pt-3">
        <CertificatNaissance />
      </div>
    </section>
  );
}
