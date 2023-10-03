"use client";
import CustomInput from "@/app/dashboard/certificat-de-naissance/components/Input";
import { addDeces } from "@/libs/functions";
import { InputsDeces } from "@/types/dece";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {};

export default function AddDece({}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsDeces>();

  const onSubmit: SubmitHandler<InputsDeces> = (data) => addDeces(data);
  return (
    <div className="mt-2">
      <p>
        Veuillez remplir le formulaire ci-dessous pour enregistrer un nouveau
        décès
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control w-full mt-5"
      >
        <CustomInput
          register={register}
          name="medecin_traitant"
          label="Nom du medecin traitant"
          placeholder="Bora Sila"
          type="text"
        />
        <CustomInput
          register={register}
          name="nom_defunt"
          label="Nom du défunt"
          placeholder="Test Nom"
          type="text"
        />
        <CustomInput
          register={register}
          name="postnom_defunt"
          label="Postnom du défunt"
          placeholder="Bores"
          type="text"
        />
        <CustomInput
          register={register}
          name="prenom_defunt"
          label="Prenom du défunt"
          placeholder="Gasore"
          type="text"
        />

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Sexe du defunt</span>
          </label>
          <select
            className="select select-bordered rounded-md"
            {...register("sexe_defunt", {
              required: "Ce champ est requis",
              minLength: 1,
              max: 1,
            })}
          >
            <option>m</option>
            <option>f</option>
          </select>
        </div>

        <CustomInput
          register={register}
          name="cause_desc"
          label="Cause du décès"
          placeholder="Cause du décès"
          type="text"
        />

        <div className="mt-3 flex justify-end">
          <button className="btn btn-primary rounded-md">Enregistrer</button>
        </div>
      </form>
    </div>
  );
}
