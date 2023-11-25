import React from "react";
import AddForm from "../components/AddForm";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

type Props = {};
export const dynamic = "force-dynamic";

export default function page({}: Props) {
  return (
    <main className="bg-white p-6">
      <Toaster />
      <Link
        href={"/dashboard/certificat-de-naissance"}
        className="flex gap-2 items-center justify-start p-2 text-orange-300"
      >
        <FaArrowLeft />
        <p>retour</p>
      </Link>
      <div className="mt-3">
        <h3 className="font-bold text-2xl">Ajouter un nouvel enfant</h3>

        <AddForm />
      </div>
    </main>
  );
}
