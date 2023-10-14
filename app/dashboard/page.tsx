"use client";
import Card from "@/components/dashboard/Card";
import Chart from "@/components/dashboard/Chart";
import Navbar from "@/components/dashboard/Navbar";
import Table from "@/components/dashboard/Table";
import UserName from "@/components/dashboard/UserName";
import { storeType } from "@/types/store";
import React from "react";
import {
  AiFillHeart,
  AiFillCalendar,
  AiFillBuild,
  AiFillFile,
} from "react-icons/ai";
import { useSelector } from "react-redux";

type Props = {};

export default function page({}: Props) {
  const { userRole } = useSelector((state: storeType) => state.user);
  console.log(userRole);
  return (
    <div className="m-auto w-full  mx-3">
      <Navbar name="Dashboard" path={"/dashboard"} />
      <div className="flex-col md:flex-row md:mx-5 flex flex-wrap gap-6 justify-start p-3 w-[95%] md:w-full">
        {userRole === "admin" || userRole === "hopital" ? (
          <>
            <Card
              lien="/dashboard/certificat-de-naissance"
              icon={<AiFillBuild className="text-3xl text-gray-900" />}
              label="Certificat de naissance"
            />
            <Card
              lien="/dashboard/certificat-de-deces"
              icon={<AiFillFile className="text-3xl text-red-400" />}
              label="Certificat de decès"
            />
          </>
        ) : null}

        {userRole === "admin" || userRole === "commune" ? (
          <>
            <Card
              lien="/dashboard/acte-de-naissance"
              icon={<AiFillHeart className="text-3xl text-secondary-100" />}
              label="Certificar de naissance"
            />

            <Card
              lien="/dashboard/acte-de-deces"
              icon={<AiFillCalendar className="text-3xl text-yellow-400" />}
              label="Acte de decès"
            />
          </>
        ) : null}
      </div>

      <div className="flex-col md:flex-row  md:mx-5 gap-5 justify-around mt-5 flex">
        <div className="md:flex-1 w-[95%]">
          <h1 className="text-2xl font-bold">Liste des documents recents</h1>
          <Table />
        </div>
        <div className="w-4/5 md:w-2/5 bg-white rounded-lg p-4 m-auto">
          <h1 className="text-2xl font-bold">Nombre d'opérations</h1>
          <Chart />
        </div>
      </div>
    </div>
  );
}
