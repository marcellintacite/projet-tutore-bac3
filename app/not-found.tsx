import errorImage from "@/public/assets/erro.png";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="w-full md:w-96 bg-white text-center p-3">
        <Image src={errorImage} alt="image error" />
        <h2 className="text-primary-200 font-extrabold text-3xl">
          Quelque chose ne va pas
        </h2>
        <p className="pt-">
          Nous ne parvenons pas à trouver la page que vous cherchez. Si vous
          voulez retourner à l'accueil, cliquez{" "}
          <Link href={"/"} className="text-primary-200">
            ici
          </Link>
        </p>
      </div>
    </main>
  );
}
