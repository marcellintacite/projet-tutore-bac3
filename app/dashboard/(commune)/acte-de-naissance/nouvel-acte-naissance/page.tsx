import Navbar from "@/components/dashboard/NavbarSearh";
import React from "react";
import AjouterActe from "./AjouterActe";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Navbar
        pageRoute="/dashboard/acte-de-naissance/nouvel-acte-naissance"
        name="Ajouter acte de naissance"
        path={"/dashboard/acte-de-naissance"}
        show={true}
      />
      <AjouterActe />
    </div>
  );
}
