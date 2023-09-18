import React from "react";
import { AiFillHeart } from "react-icons/ai";

type Props = {};

export default function Card({}: Props) {
  return (
    <div className="flex-1 bg-white rounded-lg flex p-5 items-center gap-3">
      <div className="w-12 h-12 rounded-full flex justify-center items-center bg-slate-100">
        <AiFillHeart className="text-3xl text-secondary-100" />
      </div>
      <div>
        <h2 className="font-extrabold text-2xl">126+</h2>
        <p>Acte de naissances</p>
      </div>
    </div>
  );
}
