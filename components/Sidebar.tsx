"use client";
import Image from "next/image";
import React, { use } from "react";
import { FaTimes } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LiaAddressBook, LiaSignOutAltSolid } from "react-icons/lia";
import { PiBookOpenTextLight } from "react-icons/pi";
import { RiShieldCrossLine } from "react-icons/ri";
import CardNavigation from "./dashboard/CardNavigation";
import { PiUsersThree, PiUser } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { removeUser } from "@/data/reducers/userReducer";
import { storeType } from "@/types/store";
import logo from "@/public/assets/illustration/jpr.png";

type Props = {};

export default function Sidebar({}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userRole, username } = useSelector((state: storeType) => state.user);
  console.log(username);

  const deconnexionUser = () => {
    dispatch(removeUser());
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <aside className="w-1 md:w-1/6 h-screen  flex flex-col justify-between items-center">
      <section
        className="
        flex md:flex-col justify-between  items-center bg-white gap-6 md:gap-3 fixed md:top-0 md:w-1/6 h-20 md:h-screen w-full pt-5  z-[1000] left-0 bottom-0 px-4 md:px-0
        py-3"
      >
        <div
          className="
        md:flex  justify-center items-center  md:flex-row gap-3 hidden
      "
        >
          <Image src={logo} alt="Logo" width={40} height={40} />
          <h2 className="hidden md:block text-2xl font-bold">Le Citoyen</h2>
        </div>
        <div className=" w-full lg:px-6 flex gap-2 md:flex-col">
          <CardNavigation
            title="Tableau de bord"
            icon={<RxDashboard size={26} />}
            path="/dashboard"
          />
          {(userRole === "admin" || userRole === "commune") && (
            <>
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
            </>
          )}

          {(userRole === "hopital" || userRole === "admin") && (
            <>
              <CardNavigation
                title="Certificat de décès"
                icon={<RiShieldCrossLine size={26} />}
                path="/dashboard/certificat-de-deces"
              />
              <CardNavigation
                title="Certificat naissance"
                icon={<PiBookOpenTextLight size={26} />}
                path="/dashboard/certificat-de-naissance"
              />
            </>
          )}

          {userRole === "admin" && (
            <CardNavigation
              title="Comptes"
              icon={<PiUsersThree size={26} />}
              path="/dashboard/comptes"
            />
          )}

          <CardNavigation
            title="Profile"
            icon={<PiUser size={26} />}
            path="/dashboard/profile"
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
            <h2 className="font-bold text-lg">{username}</h2>
            <p>{userRole}</p>
          </div>
          <div>
            <button onClick={deconnexionUser}>
              <LiaSignOutAltSolid size={26} />
            </button>
          </div>
        </footer>
      </section>
    </aside>
  );
}
