"use client";
import { ResponseCertificatDeces } from "@/types/Certificat";
import CustomInput from "../../../../certificat-de-naissance/components/Input";
import { addDeces, deleteDeces } from "@/libs/functions";
import { InputsDeces } from "@/types/dece";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  certificatDec: ResponseCertificatDeces;
  id: string;
  token: string;
};

export default function EditDeces({ certificatDec, id, token }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InputsDeces>({
    defaultValues: {
      medecin_traitant: certificatDec.Certificat.medecin_traitant,
      nom_defunt: certificatDec.Certificat.nom_defunt,
      postnom_defunt: certificatDec.Certificat.post_nom_defunt,
      prenom_defunt: certificatDec.Certificat.prenom_defunt,
      sexe_defunt: certificatDec.Certificat.sexe_defunt,
      cause_desc: certificatDec.Certificat.cause_desc,
      date_desc: certificatDec.Certificat.date_desc,
      date_naissance_defunt: certificatDec.Certificat.date_naissance_defunt,
    },
  });

  console.log(certificatDec);
  const [show, setShow] = React.useState(false);

  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<InputsDeces> = (data) => {
    deleteDeces(data, id, token, setShow);
    reset();
    queryClient.invalidateQueries({
      queryKey: ["cn_deces"],
    });
  };
  return (
    <div className="mt-2 flex-1">
      <p>
        Veuillez remplir le formulaire ci-dessous pour modifier le certificat
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
          name="post_nom_defunt"
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

        <CustomInput
          register={register}
          name="date_desc"
          label="Date du décès"
          placeholder="Date du décès"
          type="date"
        />
        <CustomInput
          register={register}
          name="date_naissance_defunt"
          label="Date de naissance du défunt"
          placeholder="Date de naissance du défunt"
          type="date"
        />

        <div className="mt-3 flex justify-end">
          <button className="btn btn-primary rounded-md">
            {!show ? (
              "Enregistrer"
            ) : (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Patientez</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
