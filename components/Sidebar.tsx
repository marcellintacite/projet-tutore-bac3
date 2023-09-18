import Image from "next/image";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LiaAddressBook, LiaSignOutAltSolid } from "react-icons/lia";
import { PiBookOpenTextLight } from "react-icons/pi";
import { RiShieldCrossLine } from "react-icons/ri";
import CardNavigation from "./dashboard/CardNavigation";
import { PiUsersThree, PiUser } from "react-icons/pi";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <aside className="w-1 md:w-1/6 h-screen  flex flex-col justify-between items-center">
      <section
        className="
        flex md:flex-col justify-between  items-center bg-white gap-6 md:gap-3 fixed md:top-0 md:w-1/6 h-16 md:h-screen w-full pt-5  z-50 left-0 bottom-0 px-4 md:px-0
        "
      >
        <div
          className="
        md:flex  justify-center items-center  md:flex-row gap-3 hidden
      "
        >
          <Image
            src={require("@/public/assets/Logo.png")}
            alt="Logo"
            width={40}
            height={40}
          />
          <h2 className="hidden md:block text-2xl font-bold">Wazalendo</h2>
        </div>
        <div className=" w-full lg:px-6 flex gap-2 md:flex-col">
          <CardNavigation
            title="Tableau de bord"
            icon={<RxDashboard size={26} />}
            path="/dashboard"
          />
          <CardNavigation
            title="Acte de naissance"
            icon={<HiOutlineClipboardDocumentList size={26} />}
            path="/dashboard/acte-de-naissance"
          />
          <CardNavigation
            title="Acte de decès"
            icon={<LiaAddressBook size={26} />}
            path="/dashboard/acte-de-deces"
          />
          <CardNavigation
            title="Certificat naissance"
            icon={<PiBookOpenTextLight size={26} />}
            path="/dashboard/certificat-de-naissance"
          />
          <CardNavigation
            title="Certificat de décès"
            icon={<RiShieldCrossLine size={26} />}
            path="/dashboard/certificat-de-deces"
          />
          <CardNavigation
            title="Comptes"
            icon={<PiUsersThree size={26} />}
            path="/dashboard/comptes"
          />
        </div>
        <footer className="md:flex w-full  px-4 py-4 justify-center lg:justify-between items-center lg:bg-slate-50 bg-red-100 hidden">
          <div className="w-14 h-14  bg-[#f0f0ff] rounded-full lg:flex justify-center items-center ">
            <PiUser size={26} />
          </div>
          <div
            className="flex-2
           flex-col items-center gap-1 hidden lg:flex
          "
          >
            <h2 className="font-bold text-lg">Tacite bahiga</h2>
            <p>Administrateur</p>
          </div>
          <div>
            <button>
              <LiaSignOutAltSolid size={26} />
            </button>
          </div>
        </footer>
      </section>
    </aside>
  );
}
