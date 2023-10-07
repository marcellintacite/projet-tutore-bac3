import Link from "next/link";
import React from "react";

type Props = {
  lien: string;
  label: string;
  icon: any;
};

export default function Card({ lien, icon, label }: Props) {
  return (
    <Link
      href={lien}
      className="flex-1  bg-white rounded-lg flex p-5 items-center gap-3"
    >
      <div className="w-12 h-12 rounded-full flex justify-center items-center bg-slate-100">
        {icon}
      </div>
      <div>
        <h2 className="font-extrabold text-2xl">126+</h2>
        <p>{label}</p>
      </div>
    </Link>
  );
}
