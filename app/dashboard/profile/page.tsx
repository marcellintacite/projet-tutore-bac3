"use client";
import { AiOutlineUser } from "react-icons/ai";
import React, { useEffect } from "react";

type Props = {};

export default function page({}: Props) {
  useEffect(() => {
    if (!sessionStorage.getItem("username")) {
      sessionStorage.clear();
      window.location.reload();
    }
  });
  return (
    <main className="flex justify-center items-center ">
      <div className="mt-5 w-[500px] bg-white rounded-md flex flex-col justify-center items-center p-3">
        <h2 className="text-blue-950 text-3xl text-center font-bold">Profil</h2>
        <div className="w-32 h-32 border-2 mt-3 rounded-full flex justify-center items-center">
          <AiOutlineUser size={50} />
        </div>
        <div className="text-center mt-5 pb-5">
          <p>
            Vous etes connecté en tant que{" "}
            <span className="font-bold text-slate-700">
              {sessionStorage.getItem("user_type")}
            </span>
          </p>

          <p>
            Votre nom d'utilisateur est{" "}
            <span className="font-bold text-slate-700">
              {sessionStorage.getItem("username")}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}