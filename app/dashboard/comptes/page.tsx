import TableUser from "@/app/components/TableUser";
import Navbar from "@/components/dashboard/Navbar";
import React from "react";
import Actions from "./components/Actions";
import ModalProvince from "./components/ModalProvince";
import { Toaster } from "react-hot-toast";
import ModalTerritoire from "./components/ModalTerritoire";
import ModalCommune from "./components/ModalCommune";
import ModalHopital from "./components/ModalHopital";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="m-auto w-full  mx-3">
      <Toaster position="top-center" />
      <Navbar name="Comptes" path={"/dashboard"} />
      <div className="flex gap-3 flex-col md:flex-row">
        <TableUser />
        <div className="bg-white rounded-md p-3">
          <h3 className="text-lg font-bold">Actions</h3>
          <Actions />
        </div>
        <ModalProvince />
        <ModalTerritoire />
        <ModalCommune />
        <ModalHopital />
      </div>
    </div>
  );
}
