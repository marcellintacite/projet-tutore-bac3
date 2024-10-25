import TableReuse from "@/components/TableReuse";
import Navbar from "@/components/dashboard/NavbarSearh";
import React from "react";
import Modal from "@/app/components/Modal";
import TableReuseDeces from "./CardsDece";
import Coming from "@/components/Coming";

type Props = {};

export default function page({}: Props) {
  return (
    <section>
      <Navbar
        pageRoute="/dashboard/acte-de-deces/nouvel-acte-deces"
        name="Acte de décès"
        path={"/dashboard/acte-de-deces"}
      />
      {/* <Modal /> */}
      <div>
        {/* <TableReuseDeces /> */}
        <Coming />
      </div>
    </section>
  );
}
