"use client";

import axiosCon from "@/libs/Axios";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  const [loading, setLoading] = React.useState(false);
  const token = sessionStorage.getItem("access") || "";
  const router = useRouter();
  console.log(id);
  const handleRemoveCertificat = () => {
    setLoading(true);
    axiosCon
      .delete(`/app/create_certinaiss`, {
        data: {
          token,
          cert_id: id,
        },
      })
      .then((res) => {
        document.querySelector("dialog")?.close();
        toast.success("Supprimé avec succès");
        setLoading(false);
        router.refresh();
        router.push(`/dashboard/certificat-de-naissance`);
      })
      .catch((err: any) => {
        console.log(err);
        toast.error(err.response?.data?.message);
        setLoading(false);
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
            {loading && (
              <svg
                className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
};
