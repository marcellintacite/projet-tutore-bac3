"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type DeathCertificateFormInputs = {
  declarationNumber: string;
  volume: string;
  deathNumber: string;
  deathYear: string;
  deathMonth: string;
  deathDay: string;
  deathPlace: string;
  name: string;
  gender: string;
  profession: string;
  mainResidence: string;
  temporaryResidence: string;
  nationality: string;
  statusAtDeath: string;
  birthDate: string;
  birthPlace: string;
  birthFather: string;
  birthMother: string;
};

export default function DeathCertificateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeathCertificateFormInputs>();

  const onSubmit: SubmitHandler<DeathCertificateFormInputs> = (data) => {
    console.log(data);
    // Handle form submission logic
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Formulaire d'Acte de Décès
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">N° Déclaration</label>
          <input
            type="text"
            {...register("declarationNumber", { required: true })}
            className="input "
          />
          {errors.declarationNumber && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Volume</label>
          <input
            type="text"
            {...register("volume", { required: true })}
            className="input  input-bordered w-full "
          />
          {errors.volume && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">N° Acte de Décès</label>
          <input
            type="text"
            {...register("deathNumber", { required: true })}
            className="input "
          />
          {errors.deathNumber && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control grid grid-cols-3 gap-2">
          <label className="label col-span-3">Date de Décès</label>
          <input
            type="text"
            placeholder="Année"
            {...register("deathYear", { required: true })}
            className="input "
          />
          <input
            type="text"
            placeholder="Mois"
            {...register("deathMonth", { required: true })}
            className="input "
          />
          <input
            type="text"
            placeholder="Jour"
            {...register("deathDay", { required: true })}
            className="input "
          />
          {(errors.deathYear || errors.deathMonth || errors.deathDay) && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Lieu de Décès</label>
          <input
            type="text"
            {...register("deathPlace", { required: true })}
            className="input "
          />
          {errors.deathPlace && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Nom et Prénom</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input "
          />
          {errors.name && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Sexe</label>
          <select
            {...register("gender", { required: true })}
            className="select select-bordered"
          >
            <option value="">Sélectionnez le sexe</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
          {errors.gender && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Profession</label>
          <input
            type="text"
            {...register("profession", { required: true })}
            className="input "
          />
          {errors.profession && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Résidence Principale</label>
          <input
            type="text"
            {...register("mainResidence", { required: true })}
            className="input "
          />
          {errors.mainResidence && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Résidence Temporaire</label>
          <input
            type="text"
            {...register("temporaryResidence")}
            className="input "
          />
        </div>

        <div className="form-control">
          <label className="label">Nationalité</label>
          <input
            type="text"
            {...register("nationality", { required: true })}
            className="input "
          />
          {errors.nationality && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Statut au Moment du Décès</label>
          <input
            type="text"
            {...register("statusAtDeath", { required: true })}
            className="input "
          />
          {errors.statusAtDeath && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Date de Naissance</label>
          <input
            type="text"
            {...register("birthDate", { required: true })}
            className="input "
          />
          {errors.birthDate && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Lieu de Naissance</label>
          <input
            type="text"
            {...register("birthPlace", { required: true })}
            className="input "
          />
          {errors.birthPlace && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Nom du Père</label>
          <input
            type="text"
            {...register("birthFather", { required: true })}
            className="input "
          />
          {errors.birthFather && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Nom de la Mère</label>
          <input
            type="text"
            {...register("birthMother", { required: true })}
            className="input "
          />
          {errors.birthMother && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
}
