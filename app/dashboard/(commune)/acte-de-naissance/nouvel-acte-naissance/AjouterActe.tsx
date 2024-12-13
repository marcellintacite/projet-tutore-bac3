"use client";
import CustomInput from "@/app/dashboard/(hopital)/certificat-de-naissance/components/Input";
import { base_url } from "@/data/url";
import axiosCon from "@/libs/Axios";
import img from "@/public/assets/illustration/jpr.png";
import { storeType } from "@/types/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {};

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
const getTable = async () => {
  const token = sessionStorage.getItem("access");
  const res = await axiosCon.get(`${base_url}/app/get_cert_nais_non_acte`);
  return res.data;
};
export default function AjouterActe({}: Props) {
  const { userId } = useSelector((state: storeType) => state.user);
  const { data, error, isLoading } = useQuery({
    queryKey: ["certificat"],
    queryFn: getTable,
  }) as { data: []; error: Error; isLoading: boolean };
  console.log(data);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InputesActe>();

  const onSubmit = (data: InputesActe) => {
    console.log(data);
    const token = sessionStorage.getItem("access");
    if (!token) return window.location.reload();
    axiosCon
      .post("/app/create_actenaiss", {
        token,
        new_actenaiss: {
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
        toast.success("Acte de naissance ajouté avec succès");
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur lors de l'ajout de l'acte de naissance");
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

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Certificat de naissance</span>
            </label>
            <select
              className="select w-full max-w-xs"
              required
              {...register("certNais_id", {
                required: "Ce champ est requis",
              })}
              name="certNais_id"
            >
              {data?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.nom_enfant} {item.prenom_enfant}
                </option>
              ))}
            </select>

            {errors.certNais_id && (
              <span className="text-red-500">{errors.certNais_id.message}</span>
            )}
          </div>
          <button className="btn btn-primary mt-5" type="submit">
            Ajouter
          </button>
        </form>
      </div>
      <div className="flex-1 p-9">
        <Image src={img} alt="Picture of the author" />
      </div>
    </div>
  );
}
