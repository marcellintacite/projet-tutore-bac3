import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import AddDece from "./components/AddDece";
import death from "@/public/assets/illustration/death.png";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="bg-white p-4">
      <Link
        href={"/dashboard/certificat-de-deces"}
        className="flex gap-2 items-center justify-start  text-orange-300"
      >
        <FaArrowLeft />
        <p>retour</p>
      </Link>
      <h2 className="text-2xl font-bold mt-3">Enreigistrer un nouveau decès</h2>
      <div className="flex gap-2">
        <Toaster />
        <AddDece />
        <div className="flex-1 hidden md:flex items-center justify-center">
          <Image src={death} alt="death" />
        </div>
      </div>
    </main>
  );
}
