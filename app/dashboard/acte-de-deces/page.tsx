import TableReuse from "@/components/TableReuse";
import Navbar from "@/components/dashboard/NavbarSearh";
import React from "react";
import Modal from "../../components/Modal";

type Props = {};

export default function page({}: Props) {
  return (
    <section>
      <Navbar
        pageRoute="/"
        name="Acte de décès"
        path={"/dashboard/acte-de-deces"}
      />
      <Modal />
      <div>
        <TableReuse />
      </div>
    </section>
  );
}
