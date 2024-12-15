"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios"; // Ensure axios is set up correctly
import toast from "react-hot-toast";
import axiosCon from "@/libs/Axios";
import { base_url } from "@/data/url";
import { useQuery } from "@tanstack/react-query";
type DeathCertificateFormInputs = {
  cert_desc_id: number;
  numeros_volume: string;
  nom_declarant: string;
  qualite_declarant: string;
  profession_declarant: string;
  residence_principale: string;
  residence_temporaire?: string;
  nationalite: string;
  etat_civile: "m" | "c"; // "m" for Marié, "c" for Célibataire
  conjoint_identite?: string;
  nom_complet_pere: string;
  nom_complet_mere: string;
  langue_redaction: "Français" | "Anglais" | "Swahili";
};

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
  const { data, error, isLoading } = useQuery({
    queryKey: ["certificat"],
    queryFn: getTable,
  }) as { data: []; error: Error; isLoading: boolean };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<DeathCertificateFormInputs>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<DeathCertificateFormInputs> = (data) => {
    const token = sessionStorage.getItem("access");
    if (!token) {
      toast.error("Session expirée, veuillez vous reconnecter.");
      return window.location.reload();
    }

    setLoading(true);
    axiosCon
      .post("/app/create_actedesc", {
        token,
        new_acte_desc: {
          cert_desc_id: data.cert_desc_id,
          numeros_volume: data.numeros_volume,
          nom_declarant: data.nom_declarant,
          qualite_declarant: data.qualite_declarant,
          profession_declarant: data.profession_declarant,
          residence_principale: data.residence_principale,
          residence_temporaire: data.residence_temporaire || "",
          nationalite: data.nationalite,
          etat_civile: data.etat_civile,
          conjoint_identite: data.conjoint_identite || "",
          nom_complet_pere: data.nom_complet_pere,
          nom_complet_mere: data.nom_complet_mere,
          langue_redaction: data.langue_redaction,
        },
      })
      .then((res) => {
        toast.success("Acte de décès ajouté avec succès !");
        reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Erreur lors de l'ajout de l'acte de décès.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Formulaire d'Acte de Décès
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Certificat de décès</span>
            </label>
            <select
              className="select w-full max-w-xs"
              required
              onChange={(e) => setValue("cert_desc_id", Number(e.target.value))}
              name="certNais_id"
            >
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
        </div>

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

        <div className="form-control">
          <label className="label">Identité du Conjoint (facultatif)</label>
          <input
            type="text"
            {...register("conjoint_identite")}
            className="input input-bordered w-full"
          />
        </div>

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
