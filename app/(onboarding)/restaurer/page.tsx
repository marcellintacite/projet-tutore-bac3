import Input from "@/components/login/Input";
import Image from "next/image";
import React from "react";
import Bouton from "@/components/Bouton";
import Link from "next/link";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-[#F7F7F8]">
      <div className="w-11/12 md:w-[500px] min-h-[450px] bg-white rounded-lg py-4 flex justify-center flex-col">
        <div className="flex justify-center items-center  flex-col gap-3 ">
          <Image
            src={require("@/public/assets/Logo.png")}
            alt="Logo"
            width={70}
            height={70}
          />
          <h2
            className="
            text-2xl font-bold
          "
          >
            Restaurer compte
          </h2>
        </div>
        <form className="flex flex-col gap-7 px-10 mt-5">
          <Input label="Adresse mail" value="" placeholder="test@gmail.com" />
          <Bouton
            label="Restaurer votre compte"
            type="submit"
            onClick={() => console.log("test")}
          />
          <Link href="/" className="text-center">
            Retour à la connexion
          </Link>
        </form>
      </div>
    </main>
  );
}
