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
  email: string;
  TerriVi: string;
  numeros_national: string;
  boite_postal: string;
};

type province = {
  denom: string;
  id: number;
}[];
export type Territoire = {
  id: number;
  denom: string;
  prov: number;
}[];
export default function ModalHopital() {
  const [provinces, setProvinces] = useState<province>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [territoires, setTerritoires] = useState<Territoire>([]);
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
    // getTerritoire(setTerritoires, idProvince.id);
  }, [watch("prov")]);

  const onSubmit: SubmitHandler<Input> = ({
    denom,
    prov,
    TerriVi,
    password,
    email,
    username,
    boite_postal,
    numeros_national,
  }) => {
    setIsLoading(true);
    const idProvince = provinces.filter((p) => p.denom === prov)[0];
    const idTerritoire = territoires.filter((t) => t.denom === TerriVi)[0];
    const token = sessionStorage.getItem("access");

    console.log(token);

    axiosCon
      .post("/user/create_hospital", {
        token,
        new_user_hospital: {
          username,
          password,
        },
        info_hospital: {
          denom,
          prov: idProvince.id,
          TerriVi: idTerritoire.id,
          email,

          numeros_id: numeros_national,
          boite_postal,
        },
      })
      .then((res) => {
        reset();
        document.querySelector("dialog")?.close();
        toast.success("Hopital ajouté");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        if (err.response.status === 406) {
          toast.error("Cet hopital existe");
          reset();
          document.querySelector("dialog")?.close();
        } else {
          toast.error("Il y a une erreur inconnue");
        }
      });
  };
  return (
    <dialog id="my_modal_13" className="modal">
      <div className="modal-box px-6">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Ajouter un hopital</h3>
        <p className="py-4">
          Veuillez completer tout les champs pour ajouter un hopital
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
                  <span className="label-text">Nom hopital:</span>
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
                  <span className="label-text">Email:</span>
                </label>
                <input
                  type="text"
                  placeholder="test@gmail.com"
                  required
                  className="input input-bordered rounded-md w-full "
                  {...register("email", {
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
                  placeholder="xxxxxxxxxxxxxxx"
                  required
                  className="input input-bordered rounded-md w-full "
                  {...register("password", {
                    required: "Ce champ est requis",
                    minLength: 4,
                  })}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Numero National:</span>
                </label>
                <input
                  type="text"
                  placeholder="0229NRDC"
                  required
                  className="input input-bordered rounded-md w-full "
                  {...register("numeros_national", {
                    required: "Ce champ est requis",
                    minLength: 4,
                  })}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Boite postal:</span>
                </label>
                <input
                  type="text"
                  placeholder="bp.850"
                  required
                  className="input input-bordered rounded-md w-full "
                  {...register("boite_postal", {
                    required: "Ce champ est requis",
                    minLength: 4,
                  })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn-success btn rounded-md mt-4" type="submit">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Enreigistrer"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
