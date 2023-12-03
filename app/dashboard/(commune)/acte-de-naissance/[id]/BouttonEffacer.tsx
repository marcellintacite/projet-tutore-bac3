"use client";

import axiosCon from "@/libs/Axios";
import { removeActeDeces } from "@/libs/functions";
import { storeType } from "@/types/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

type Props = {
  id: number;
};

export default function BouttonEffacer({ id }: Props) {
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
      <Confirmation id={id} />
    </>
  );
}

export const Confirmation = ({ id }: Props) => {
  const { token } = useSelector((state: storeType) => state.user);
  const router = useRouter();
  const handleRemoveCertificat = () => {
    axiosCon
      .delete(`/app/create_actenaiss`, {
        data: {
          token: token,
          act_id: id,
        },
      })
      .catch((err) => {
        toast.error("Erreur lors de la suppression");
        console.log(err);
      })
      .then((res) => {
        console.log(res);
        router.push("/dashboard/certificat-de-deces");
        toast.success("Suppression reussie");
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
