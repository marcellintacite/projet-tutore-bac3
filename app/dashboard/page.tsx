import Card from "@/components/dashboard/Card";
import Chart from "@/components/dashboard/Chart";
import Navbar from "@/components/dashboard/Navbar";
import Table from "@/components/dashboard/Table";
import UserName from "@/components/dashboard/UserName";
import { storeType } from "@/types/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="m-auto w-full  mx-3">
      <Navbar name="Dashboard" path={"/dashboard"} />
      <div className="flex-col md:flex-row md:mx-5 flex flex-wrap gap-6 justify-between">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="flex-col md:flex-row  md:mx-5 gap-5 justify-around mt-5 flex">
        <div className="flex-1 ">
          <h1 className="text-2xl font-bold">Liste des documents recents</h1>
          <Table />
        </div>
        <div className="w-4/5 md:w-2/5 bg-white rounded-lg p-4">
          <h1 className="text-2xl font-bold">Nombre d'opérations</h1>
          <Chart />
        </div>
      </div>
    </div>
  );
}
