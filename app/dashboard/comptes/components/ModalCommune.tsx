"use client";
import React, { useEffect, useState } from "react";
import axiosCon from "@/libs/Axios";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
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
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Input>();

  // Fetch provinces and territoires
  useEffect(() => {
    getProvice(setProvinces);
    const idProvince = provinces.find((p) => p.denom === watch("prov"));
    idProvince && getTerritoire(setTerritoires, idProvince.id);
  }, [watch("prov")]);

  const onSubmit: SubmitHandler<Input> = async ({
    denom,
    prov,
    TerriVi,
    password,
    nom_bour,
    username,
  }) => {
    setIsLoading(true); // Start loading
    const idProvince = provinces.find((p) => p.denom === prov);
    const idTerritoire = territoires.find((t) => t.denom === TerriVi);
    const token = sessionStorage.getItem("access");

    try {
      await axiosCon.post("/user/create_commune", {
        token,
        new_user_commune: {
          username,
          password,
        },
        info_commune: {
          denom,
          prov: idProvince?.id,
          TerriVi: idTerritoire?.id,
          nom_bour,
        },
      });
      reset();
      document.querySelector("dialog")?.close();
      toast.success("Commune ajoutée");
    } catch (err: any) {
      if (err.response?.status === 406) {
        toast.error("Cette commune existe déjà");
      } else {
        toast.error("Une erreur est survenue");
      }
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <dialog id="my_modal_12" className="modal">
      <div className="modal-box px-6">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Ajouter un territoire</h3>
        <p className="py-4">
          Veuillez compléter tous les champs pour ajouter un territoire.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-3">
            {/* Province and Territoire Fields */}
            <div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Choisir la province</span>
                </label>
                <select
                  className="select select-bordered rounded-md"
                  {...register("prov", { required: "Ce champ est requis" })}
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
                  {...register("TerriVi", { required: "Ce champ est requis" })}
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
                  className="input input-bordered rounded-md w-full"
                  {...register("denom", { required: "Ce champ est requis" })}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nom bourgumestre:</span>
                </label>
                <input
                  type="text"
                  placeholder="Dieume ..."
                  className="input input-bordered rounded-md w-full"
                  {...register("nom_bour", { required: "Ce champ est requis" })}
                />
              </div>
            </div>

            {/* Username and Password Fields */}
            <div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nom utilisateur:</span>
                </label>
                <input
                  type="text"
                  placeholder="cika"
                  className="input input-bordered rounded-md w-full"
                  {...register("username", { required: "Ce champ est requis" })}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Mot de passe:</span>
                </label>
                <input
                  type="password"
                  placeholder="sinza"
                  className="input input-bordered rounded-md w-full"
                  {...register("password", { required: "Ce champ est requis" })}
                />
              </div>
            </div>
          </div>

          {/* Submit Button with Loading Spinner */}
          <div className="flex justify-end items-center gap-2 mt-4">
            {isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            <button
              className="btn-success btn rounded-md"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
