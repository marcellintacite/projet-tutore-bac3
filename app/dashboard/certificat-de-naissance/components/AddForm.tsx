"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosCon from "@/libs/Axios";
import Carrousel from "./Carrousel";
import { changeStep, testData } from "@/libs/form";
import CustomInput from "./Input";
import { motion } from "framer-motion";
import { AxiosError } from "axios";

type Input = {
  nom_enfant: string;
  post_nom_enfant: string;
  prenom_enfant: string;
  sexe_enfant: string;
  poid_enfant: number;
  nom_complet_pere: string;
  profession_pere: string;
  date_nais_pere: Date;
  lieu_nais_pere: string;
  nationalite_pere: string;
  nom_complet_mere: string;
  profession_mere: string;
  date_nais_mere: string;
  lieu_nais_mere: string;
  nationalite_mere: string;
  localite_parent: string;
  collectiv_parent: string;
};

type Props = {};

const AddForm = (props: Props) => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    if (step !== 3) {
      toast.error("Veuillez completer tout les champs");
      return;
    }
    if (testData(data)) {
      const token = sessionStorage.getItem("access");
      axiosCon
        .post("/app/create_certinaiss", {
          token,
          new_certinaiss: data,
        })
        .then((res) => {
          reset();
          document.querySelector("dialog")?.close();
          toast.success("Ajouté avec succès");
        })
        .catch((err: any) => {
          console.log(err);
          toast.error(err.response?.data?.message);
        });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="flex gap-6 w-4/5 m-auto justify-center mt-3">
          <div
            className={`w-8 h-8 rounded-full ${
              step === 1 ? "bg-blue-500" : "bg-gray-300"
            }  flex items-center justify-center text-white text-xs font-bold cursor-pointer`}
            onClick={() => changeStep(setStep, 1)}
          >
            1
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer ${
              step === 2 ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => changeStep(setStep, 2)}
          >
            2
          </div>
          <div
            className={`w-8 h-8 rounded-full  flex items-center justify-center text-white text-xs font-bold cursor-pointer ${
              step === 3 ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => changeStep(setStep, 3)}
          >
            3
          </div>
        </div>{" "}
        <p className="py-4">
          Veuillez completer tout les champs pour ajouter un enfant
        </p>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div
            className="flex gap-5
          
          "
          >
            {step === 1 && (
              <motion.div
                className="flex-1

              "
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-bold">Information sur l'enfant</h2>
                <CustomInput
                  register={register}
                  name="nom_enfant"
                  label="Nom de l'enfant"
                  placeholder="Asifiwe"
                  type="text"
                />

                <CustomInput
                  register={register}
                  name="post_nom_enfant"
                  label="Postnom de l'enfant"
                  placeholder="Baraka"
                  type="text"
                />
                <CustomInput
                  register={register}
                  name="prenom_enfant"
                  label="Prenom de l'enfant"
                  placeholder="tacite"
                  type="text"
                />

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Sexe de l'enfant</span>
                  </label>
                  <select
                    className="select select-bordered rounded-md"
                    {...register("sexe_enfant", {
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
                  name="poid_enfant"
                  label="Poid de l'enfant"
                  placeholder="99.6"
                  type="text"
                />
                <CustomInput
                  register={register}
                  name="nom_medecin"
                  label="Nom du médecin"
                  placeholder="KIKUYU ,ungq"
                  type="text"
                />
                <button
                  className="btn-success btn rounded-md mt-4"
                  onClick={() => setStep(2)}
                >
                  Suivant
                </button>
              </motion.div>
            )}

            {
              // step 2
              step === 2 && (
                <motion.div
                  className="flex-1

              "
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-bold">Information sur les parents</h2>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Nom complet du père:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Munguiko Akonkwa"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("nom_complet_pere", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">
                        Nom complet de la mère :
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Sifa Chukulo"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("nom_complet_mere", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Profession père :</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Sentinelle"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("profession_pere", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Date naissance père :</span>
                    </label>
                    <input
                      type="date"
                      placeholder="1963-08-20"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("date_nais_pere", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Nationalité père :</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Congolais"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("nationalite_pere", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">
                        Nom complet de la mère :
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nzigire Nsimire"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("nom_complet_mere", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>
                  <div className="mt-3 flex gap-3">
                    <button
                      className="btn-ghost btn rounded-md mt-4"
                      onClick={() => setStep(1)}
                    >
                      Précédent
                    </button>
                    <button
                      className="btn-success btn rounded-md mt-4"
                      onClick={() => setStep(3)}
                    >
                      Suivant
                    </button>
                  </div>
                </motion.div>
              )
            }

            {
              // step 3

              step === 3 && (
                <motion.div
                  className="flex-1

            "
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-bold">Information sur les parents</h2>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">
                        Profession de la mère :
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Programmeuse"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("profession_mere", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">
                        Date de naissace de la mère :
                      </span>
                    </label>
                    <input
                      type="date"
                      placeholder="2000-05-18"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("date_nais_mere", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Lieu de naissance:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="bagira"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("lieu_nais_mere", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">
                        Nationalité de la mère:
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Rwandaise"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("nationalite_mere", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Localité parent:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Bushusha"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("localite_parent", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">
                        Collectivité des parents:
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Kyuku"
                      required
                      className="input input-bordered rounded-md w-full "
                      {...register("collectiv_parent", {
                        required: "Ce champ est requis",
                        minLength: 4,
                      })}
                    />
                  </div>
                </motion.div>
              )
            }
          </div>

          {step === 3 && (
            <div className="flex justify-end gap-5">
              <button className="btn-ghost btn rounded-md mt-4" type="reset">
                Annuler
              </button>
              <button
                className="btn-primary font-bold btn rounded-md mt-4"
                type="submit"
              >
                Enreigistrer
              </button>
            </div>
          )}
        </form>
      </div>
      <Carrousel />
    </div>
  );
};

export default AddForm;
