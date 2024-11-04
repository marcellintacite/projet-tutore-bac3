"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosCon from "@/libs/Axios";
type Input = {
  prov: string;
  denom: string;
};

export type province = {
  denom: string;
  id: number;
}[];
export default function ModalTerritoire() {
  const [provinces, setProvinces] = useState<province>([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Input>();

  //   Recherche des provinces
  useEffect(() => {
    console.log("test");
    axiosCon
      .get("/app/create_province")
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((err) => {
        toast.error("Il y a une erreur avec les provinces");
      });
  }, []);

  const onSubmit: SubmitHandler<Input> = ({ denom, prov }) => {
    const idProvince = provinces.filter((p) => p.denom === prov)[0];

    axiosCon
      .post("/app/create_ville_or_Terri", {
        denom,
        prov: idProvince.id,
      })
      .then((res) => {
        reset();
        document.querySelector("dialog")?.close();
        toast.success("Territoire ajouté");
      })
      .catch((err) => {
        console.log(err);

        if (err.response.status === 406) {
          toast.error("Ce territoire existe");
          reset();
          document.querySelector("dialog")?.close();
        } else {
          toast.error("Il y a une erreur inconnue");
        }
      });
  };
  return (
    <dialog id="my_modal_11" className="modal">
      <div className="modal-box px-6">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Ajouter un territoire</h3>
        <p className="py-4">
          Veuillez completer tout les champs pour ajouter un territoire
        </p>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Choisir la province</span>
            </label>
            <select
              className="select select-bordered rounded-md"
              {...register("prov", {
                required: "Ce champ est requis",
                minLength: 1,
                max: 3,
              })}
            >
              <option disabled selected>
                Choisissez une province
              </option>
              {provinces.map((province) => (
                <option key={province.id}>{province.denom}</option>
              ))}
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Nom territoire :</span>
            </label>
            <input
              type="text"
              placeholder="Bukavu"
              required
              className="input input-bordered rounded-md w-full "
              {...register("denom", {
                required: "Ce champ est requis",
                minLength: 4,
              })}
            />
          </div>

          <div className="flex justify-end">
            <button className="btn-success btn rounded-md mt-4" type="submit">
              Enreigistrer
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
