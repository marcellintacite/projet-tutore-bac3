"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosCon from "@/libs/Axios";
import { getProvice, getTerritoire } from "@/libs/functions";
type Input = {
  prov: string;
  denom: string;
  username: string;
  password: string;
  nom_bour: string;
  TerriVi: string;
};

type province = {
  denom: string;
  id: number;
}[];
type territoire = {
  id: number;
  denom: string;
  prov: number;
}[];
export default function ModalCommune() {
  const [provinces, setProvinces] = useState<province>([]);
  const [territoires, setTerritoires] = useState<territoire>([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Input>();

  //   Recherche des provinces
  useEffect(() => {
    getProvice(setProvinces);
    const idProvince = provinces.filter((p) => p.denom === watch("prov"))[0];
    idProvince && getTerritoire(setTerritoires, idProvince.id);
  }, [watch("prov")]);

  const onSubmit: SubmitHandler<Input> = ({
    denom,
    prov,
    TerriVi,
    password,
    nom_bour,
    username,
  }) => {
    console.log(denom, prov, TerriVi, password, nom_bour, username);
    const idProvince = provinces.filter((p) => p.denom === prov)[0];
    const idTerritoire = territoires.filter((t) => t.denom === TerriVi)[0];
    const token = sessionStorage.getItem("access");

    console.log(token);

    axiosCon
      .post("/user/create_commune", {
        token,
        new_user_commune: {
          username,
          password,
        },
        info_commune: {
          denom,
          prov: idProvince.id,
          TerriVi: idTerritoire.id,
          nom_bour,
        },
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
    <dialog id="my_modal_12" className="modal">
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
          <div className="flex gap-3">
            <div>
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
                  <span className="label-text">Choisir un territoire</span>
                </label>
                <select
                  className="select select-bordered rounded-md"
                  {...register("TerriVi", {
                    required: "Ce champ est requis",
                    minLength: 1,
                    max: 3,
                  })}
                >
                  <option disabled selected>
                    Choisissez un territoire
                  </option>
                  {territoires.map((teri) => (
                    <option key={teri.id}>{teri.denom}</option>
                  ))}
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nom commune:</span>
                </label>
                <input
                  type="text"
                  placeholder="Kadutu"
                  required
                  className="input input-bordered rounded-md w-full "
                  {...register("denom", {
                    required: "Ce champ est requis",
                    minLength: 4,
                  })}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nom bourgumestre:</span>
                </label>
                <input
                  type="text"
                  placeholder="Meschack Njuci"
                  required
                  className="input input-bordered rounded-md w-full "
                  {...register("nom_bour", {
                    required: "Ce champ est requis",
                    minLength: 4,
                  })}
                />
              </div>
            </div>
            <div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nom utilisateur:</span>
                </label>
                <input
                  type="text"
                  placeholder="tacitebahiga"
                  required
                  className="input input-bordered rounded-md w-full "
                  {...register("username", {
                    required: "Ce champ est requis",
                    minLength: 4,
                  })}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Mot de passe:</span>
                </label>
                <input
                  type="password"
                  placeholder="tacitebahiga"
                  required
                  className="input input-bordered rounded-md w-full "
                  {...register("password", {
                    required: "Ce champ est requis",
                    minLength: 4,
                  })}
                />
              </div>
            </div>
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
