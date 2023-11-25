"use client";

import axiosCon from "@/libs/Axios";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  lien: string;
  label: string;
  icon: any;
};

type DataRes = {
  date: Date;
  garçon: number;
  fille: number;
  total: number;
};

export default function Card({ lien, icon, label }: Props) {
  const [data, setData] = useState<DataRes>();
  console.log(data);

  useEffect(() => {
    axiosCon
      .get("/stat/voir_cert")
      .then((res) => {
        console.log(res.data.cert_naissance);
        setData(res.data.cert_naissance[0]);
      })

      .catch((e) => console.log(e));
  }, []);
  return (
    <Link
      href={lien}
      className="w-full md:w-80  bg-white rounded-lg flex p-5 items-center gap-3"
    >
      <div className="w-12 h-12 rounded-full flex justify-center items-center bg-slate-100">
        {icon}
      </div>
      <div>
        <div className="flex justify-between">
          <h2 className="font-extrabold text-2xl">{data?.total}</h2>
          <div className="flex gap-3">
            <div className="flex gap-2 items-center">
              <AiOutlineMan size={13} />
              <p className="text-xs">{data?.garçon}</p>
            </div>
            <div className="flex gap-2 items-center">
              <AiOutlineWoman size={13} />
              <p className="text-xs">{data?.fille}</p>
            </div>
          </div>
        </div>
        <p>{label}</p>
      </div>
    </Link>
  );
}
