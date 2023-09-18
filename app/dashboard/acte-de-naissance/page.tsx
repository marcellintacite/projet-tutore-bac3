import TableReuse from "@/components/TableReuse";
import Navbar from "@/components/dashboard/NavbarSearh";
import React from "react";
import Modal from "../../components/Modal";

type Props = {};

export default function page({}: Props) {
  return (
    <section>
      <Navbar name="Acte de naissance" path={"/dashboard/acte-de-naissance"} />
      <Modal />
      <div className="mt-3 bg-white rounded-md">
        <TableReuse />
      </div>
    </section>
  );
}
