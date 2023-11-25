"use client";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosCon from "@/libs/Axios";
type Input = {
  province: string;
};
export default function ModalProvince() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = ({ province }) => {
    console.log(province);
    axiosCon
      .post("/app/create_province", {
        denom: province,
      })
      .then((res) => {
        toast.success("Province ajoutée");
        reset();
        document.querySelector("dialog")?.close();
      })
      .catch((err) => {
        console.log(err);

        if (err.response.status === 406) {
          toast.error("Cette province existe");
          reset();
          document.querySelector("dialog")?.close();
        } else {
          toast.error("Il y a une erreur inconnue");
        }
      });
  };
  return (
    <dialog id="my_modal_10" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Ajouter des données</h3>
        <p className="py-4">
          Veuillez completer tout les champs pour ajouter une province
        </p>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Nom de la province :</span>
            </label>
            <input
              type="text"
              placeholder="Sud-kivu"
              required
              className="input input-bordered rounded-md w-full "
              {...register("province", {
                required: "Ce champ est requis",
                minLength: 4,
              })}
            />
          </div>

          <div className="flex justify-end">
            <button className="btn-success btn rounded-md mt-4" type="submit">
              Enreigistrer
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
