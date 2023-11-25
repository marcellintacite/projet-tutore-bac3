"use client";

import axiosCon from "@/libs/Axios";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  id: number;
  type: string;
};

enum urlType {
  acteNaissance = "UP",
  acteDeces = "DOWN",
  certificatNaissance = "/app/create_certinaiss",
  certificatDeces = "RIGHT",
}
export default function BouttonEffacer({ id, type }: Props) {
  console.log(id, type);
  const openModal = (id: string) => {
    const model = document.getElementById(id) as HTMLDialogElement;
    if (model) {
      model.showModal();
    }
  };

  return (
    <>
      <button
        className="btn btn-error btn-square"
        onClick={() => openModal("confirmation_naissance")}
      >
        <FaTrashAlt size={16} color={"#fff"} />
      </button>
      <Toaster />
      <Confirmation id={id} type={type} />
    </>
  );
}

export const Confirmation = ({ id, type }: Props) => {
  console.log(type);
  const token = sessionStorage.getItem("access") || "";
  console.log(token);
  const handleRemoveCertificat = () => {
    console.log(id);
    axiosCon
      .delete("", {
        data: {
          token,
          cert_id: id,
        },
      })
      .then((res) => {
        document.querySelector("dialog")?.close();
        toast.success("Supprimé avec succès");
      })
      .catch((err: any) => {
        console.log(err);
        toast.error(err.response?.data?.message);
      });
  };
  return (
    <dialog id="confirmation_naissance" className="modal">
      <div className="modal-box px-6">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Confirmation</h3>
        <p className="py-4">Voulez-vous effacer ce certificat ?</p>
        <div className="flex gap-4 justify-end">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn  btn-square btn-ghost">Annuler</button>
          </form>

          <button
            className="btn btn-error"
            onClick={() => handleRemoveCertificat()}
          >
            Supprimer
          </button>
        </div>
      </div>
    </dialog>
  );
};
