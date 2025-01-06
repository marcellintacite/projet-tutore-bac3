"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axiosCon from "@/libs/Axios";
import toast from "react-hot-toast";
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
      .catch(() => {
        toast.error("Erreur lors de l'ajout de l'acte de décès.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 sm:p-8 bg-white rounded shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Formulaire d'Acte de Décès
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Certificate Selection */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Certificat de décès</span>
          </label>
          <select
            className="select select-bordered w-full"
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

        {/* Text Inputs */}
        {[
          { label: "Volume", name: "numeros_volume" },
          { label: "Nom du Déclarant", name: "nom_declarant" },
          { label: "Qualité du Déclarant", name: "qualite_declarant" },
          { label: "Résidence Principale", name: "residence_principale" },
          {
            label: "Résidence Temporaire (facultative)",
            name: "residence_temporaire",
          },
          { label: "Nationalité", name: "nationalite" },
          { label: "Nom du Père", name: "nom_complet_pere" },
          { label: "Nom de la Mère", name: "nom_complet_mere" },
        ].map((input, idx) => (
          <div key={idx} className="form-control">
            <label className="label">{input.label}</label>
            <input
              type="text"
              {...register(input.name as keyof DeathCertificateFormInputs, {
                required: !input.name.includes("temporaire"),
              })}
              className="input input-bordered w-full"
            />
            {errors[input.name as keyof DeathCertificateFormInputs] && (
              <span className="text-red-500">Ce champ est requis</span>
            )}
          </div>
        ))}

        {/* Select Inputs */}
        {[
          {
            label: "Profession du Déclarant",
            name: "profession_declarant",
            options: professions,
          },
          {
            label: "Statut au Décès",
            name: "etat_civile",
            options: etatCivileChoices,
          },
          {
            label: "Langue de Rédaction",
            name: "langue_redaction",
            options: langues,
          },
        ].map((select, idx) => (
          <div key={idx} className="form-control">
            <label className="label">{select.label}</label>
            <select
              {...register(select.name as keyof DeathCertificateFormInputs, {
                required: true,
              })}
              className="select select-bordered w-full"
            >
              {select.options.map((opt: any) =>
                typeof opt === "object" ? (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ) : (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                )
              )}
            </select>
            {errors[select.name as keyof DeathCertificateFormInputs] && (
              <span className="text-red-500">Ce champ est requis</span>
            )}
          </div>
        ))}

        {/* Submit Button */}
        <div className="form-control">
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Chargement..." : "Soumettre"}
          </button>
        </div>
      </form>
    </div>
  );
}
