"use client";
import React from "react";

export default function Actions() {
  const openModal = (id: string) => {
    const model = document.getElementById(id) as HTMLDialogElement;
    if (model) {
      model.showModal();
    }
  };
  return (
    <div className="grid gap-3 grid-cols-2 flex-wrap mt-3">
      <button
        className="btn btn-neutral rounded-md"
        onClick={() => openModal("my_modal_10")}
      >
        Ajouter une province
      </button>
      <button
        className="btn btn-warning text-white rounded-md"
        onClick={() => openModal("my_modal_11")}
      >
        Ajouter un territoire
      </button>
      <button
        className="btn  rounded-md btn-warning"
        onClick={() => openModal("my_modal_12")}
      >
        Ajouter une commune
      </button>
      <button className="btn  rounded-md btn-neutral">Ajouter un compte</button>
      <button
        className="btn  rounded-md btn-warning"
        onClick={() => openModal("my_modal_13")}
      >
        Ajouter un hopital
      </button>
    </div>
  );
}
