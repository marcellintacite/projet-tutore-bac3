"use client";

import Link from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import deconnexion from "@/libs/deconnexion";
import { removeUser } from "@/data/reducers/userReducer";

type Props = {
  name: string;
  path: string;
};

export default function Navbar({ name, path }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const deconnexion = () => {
    dispatch(removeUser());
    router.push("/");
  };

  const openModal = () => {
    const model = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (model) {
      model.showModal();
    }
  };

  return (
    <div className="navbar justify-between gap-4 md:gap-0 bg-transparent md:w-full  ">
      <div className="">
        <Link
          href={path}
          className="btn btn-ghost normal-case text-lg md:text-2xl font-extrabold"
        >
          {name}
        </Link>
      </div>
      <div className="flex gap-3">
        <div className="form-control">
          <input
            type="text"
            placeholder="Chercher ..."
            className="input input-bordered border-slate-100 rounded-md bg-white w-full max-w-xs"
          />
        </div>
        <button
          className="btn rounded-md bg-primary-200 text-white hover:bg-blue-800"
          onClick={openModal}
        >
          <AiOutlinePlus className="w-5 h-5 text-gray-100" />
          Ajouter
        </button>
      </div>
    </div>
  );
}
