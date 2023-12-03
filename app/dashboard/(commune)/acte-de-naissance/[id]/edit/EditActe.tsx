"use client";
import CustomInput from "@/app/dashboard/(hopital)/certificat-de-naissance/components/Input";
import axiosCon from "@/libs/Axios";
import img from "@/public/assets/illustration/jpr.png";
import { ResponseActeNaissance } from "@/types/commune";
import { storeType } from "@/types/store";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
  certificat: ResponseActeNaissance;
};

type InputesActe = {
  numeros_volume: string;
  numeros_folio: string;
  nom_declarant: string;
  qualite_declarant: string;
  profession_declarant: string;
  date_enregistrement: string;
  langue_redaction: string;
  certNais_id: string;
  commune: number;
};

export default function EditActe({ certificat }: Props) {
  const { userId } = useSelector((state: storeType) => state.user);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InputesActe>({
    defaultValues: {
      numeros_volume: certificat.acte.numeros_volume,
      numeros_folio: certificat.acte.numeros_folio,
      nom_declarant: certificat.acte.nom_declarant,
      qualite_declarant: certificat.acte.qualite_declarant,
      profession_declarant: certificat.acte.profession_declarant,
      date_enregistrement: certificat.acte.date_enregistrement,
      langue_redaction: certificat.acte.langue_redaction,
      certNais_id: certificat.acte.certNais_id.toString(),
    },
  });

  const onSubmit = (data: InputesActe) => {
    setIsSubmitting(true);
    console.log(data);
    const token = sessionStorage.getItem("access");
    if (!token) return window.location.reload();
    axiosCon
      .put("/app/create_actenaiss", {
        token,
        act_id: certificat.acte.id,

        actenaiss: {
          numeros_volume: data.numeros_volume,
          numeros_folio: data.numeros_folio,
          nom_declarant: data.nom_declarant,
          qualite_declarant: data.qualite_declarant,
          profession_declarant: data.profession_declarant,
          date_enregistrement: data.date_enregistrement,
          langue_redaction: data.langue_redaction,
          certNais_id: data.certNais_id,
          commune: userId,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Acte de naissance modifié avec succès");
        setIsSubmitting(false);
        reset();
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        toast.error("Erreur lors de la modification de l'acte de naissance");
      });
  };
  return (
    <div className="mx-6 mt-3  bg-white md:flex justify-center p-7">
      <div className="flex-1 md:w-4/5 w-full">
        <p>Veuillez compléter tout les champs</p>
        <form
          className="form-control mt-5  md:w-3/4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            register={register}
            name="numeros_volume"
            label="Numéro de volume du registre"
            placeholder="Xv5"
            type="text"
          />
          <CustomInput
            register={register}
            name="numeros_folio"
            label="Numéro de folio du registre"
            placeholder="Xve"
            type="text"
          />
          <CustomInput
            register={register}
            name="nom_declarant"
            label="Nom du déclarant"
            placeholder="Bora Sila"
            type="text"
          />
          <CustomInput
            register={register}
            name="qualite_declarant"
            label="Qualité du déclarant"
            placeholder="Père"
            type="text"
          />
          <CustomInput
            register={register}
            name="profession_declarant"
            label="Profession du déclarant"
            placeholder="Ingénieur"
            type="text"
          />
          <CustomInput
            register={register}
            name="date_enregistrement"
            label="Date d'enregistrement"
            placeholder="2021-09-09"
            type="date"
          />
          <CustomInput
            register={register}
            name="langue_redaction"
            label="Langue de rédaction"
            placeholder="Français"
            type="text"
          />
          <CustomInput
            register={register}
            name="certNais_id"
            label="ID du certificat de naissance"
            placeholder="1"
            type="text"
          />
          <button className="btn btn-primary mt-5" type="submit">
            Modifier
            {/* Adding spinner */}
            {isSubmitting && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8
                  v 1.5a6.5 6.5 0 00-6.5
                  6.5H4zm2 5.5A6.5 6.5 0 0012
                  19v 1.5a8 8 0 01-8-8H6z"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
      <div className="flex-1 p-9">
        <Image src={img} alt="Picture of the author" />
      </div>
    </div>
  );
}
