"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import axiosCon from "@/libs/Axios";
import { base_url } from "@/data/url";

type DeathCertificateFormInputs = {
  cert_desc_id: number;
  numeros_volume: string;
  nom_declarant: string;
  qualite_declarant: string;
  profession_declarant: string;
  residence_principale: string;
  residence_temporaire?: string;
  nationalite: string;
  etat_civile: "m" | "c";
  conjoint_identite?: string;
  nom_complet_pere: string;
  nom_complet_mere: string;
  langue_redaction: "Français" | "Anglais" | "Swahili";
};

// Fetch certificates data
const getTable = async () => {
  const token = sessionStorage.getItem("access");
  const res = await axiosCon.get(`${base_url}/app/get_cert_dec_non_cert`);
  return res.data;
};

export default function DeathCertificateForm() {
  const professions = [
    "Médecin",
    "Enseignant",
    "Ingénieur",
    "Agriculteur",
    "Autre",
  ];
  const etatCivileChoices = [
    { value: "m", label: "Marié" },
    { value: "c", label: "Célibataire" },
  ];
  const langues = ["Français", "Anglais", "Swahili"];

  // React Query for fetching certificate data
  const { data, isLoading, error } = useQuery({
    queryKey: ["certificat"],
    queryFn: getTable,
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<DeathCertificateFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<DeathCertificateFormInputs> = (formData) => {
    const token = sessionStorage.getItem("access");
    if (!token) {
      toast.error("Session expirée, veuillez vous reconnecter.");
      return window.location.reload();
    }

    setLoading(true);
    axiosCon
      .post("/app/create_actedesc", {
        token,
        new_acte_desc: formData,
      })
      .then(() => {
        toast.success("Acte de décès ajouté avec succès !");
        reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Erreur lors de l'ajout de l'acte de décès.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Formulaire d'Acte de Décès
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Certificate Selection */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Certificat de décès</span>
          </label>
          <select
            className="select w-full max-w-xs"
            required
            onChange={(e) => setValue("cert_desc_id", Number(e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>
              Sélectionnez un certificat
            </option>
            {data?.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.nom_defunt} {item.post_nom_defunt}
              </option>
            ))}
          </select>
          {errors.cert_desc_id && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        {/* Volume Number */}
        <div className="form-control">
          <label className="label">Volume</label>
          <input
            type="text"
            {...register("numeros_volume", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.numeros_volume && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        {/* Declarant Information */}
        <div className="form-control">
          <label className="label">Nom du Déclarant</label>
          <input
            type="text"
            {...register("nom_declarant", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.nom_declarant && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Qualité du Déclarant</label>
          <input
            type="text"
            {...register("qualite_declarant", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.qualite_declarant && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        {/* Profession */}
        <div className="form-control">
          <label className="label">Profession du Déclarant</label>
          <select
            {...register("profession_declarant", { required: true })}
            className="input input-bordered w-full"
          >
            {professions.map((profession) => (
              <option key={profession} value={profession}>
                {profession}
              </option>
            ))}
          </select>
          {errors.profession_declarant && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        {/* Residence */}
        <div className="form-control">
          <label className="label">Résidence Principale</label>
          <input
            type="text"
            {...register("residence_principale", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.residence_principale && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Résidence Temporaire (facultative)</label>
          <input
            type="text"
            {...register("residence_temporaire")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Nationality */}
        <div className="form-control">
          <label className="label">Nationalité</label>
          <input
            type="text"
            {...register("nationalite", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.nationalite && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        {/* Marital Status */}
        <div className="form-control">
          <label className="label">Statut au Décès</label>
          <select
            {...register("etat_civile", { required: true })}
            className="input input-bordered w-full"
          >
            {etatCivileChoices.map((etat) => (
              <option key={etat.value} value={etat.value}>
                {etat.label}
              </option>
            ))}
          </select>
          {errors.etat_civile && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        {/* Parent Information */}
        <div className="form-control">
          <label className="label">Nom du Père</label>
          <input
            type="text"
            {...register("nom_complet_pere", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.nom_complet_pere && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Nom de la Mère</label>
          <input
            type="text"
            {...register("nom_complet_mere", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.nom_complet_mere && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        {/* Language */}
        <div className="form-control">
          <label className="label">Langue de Rédaction</label>
          <select
            {...register("langue_redaction", { required: true })}
            className="input input-bordered w-full"
          >
            {langues.map((langue) => (
              <option key={langue} value={langue}>
                {langue}
              </option>
            ))}
          </select>
          {errors.langue_redaction && (
            <span className="text-red-500">Ce champ est requis</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Chargement..." : "Soumettre"}
          </button>
        </div>
      </form>
    </div>
  );
}
