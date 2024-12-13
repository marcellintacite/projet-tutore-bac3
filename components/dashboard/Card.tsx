"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

type Props = {
  lien: string;
  label: string;
  icon: any;
  datafn?: () => Promise<any>;
};

type DataRes = {
  date: Date;
  garçon: number;
  fille: number;
  total: number;
};

export default function Card({ lien, icon, label, datafn }: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: [label],
    queryFn: datafn,
  }) as { data: []; error: Error; isLoading: boolean };
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
          <h2 className="font-extrabold text-2xl">{data?.length}</h2>
        </div>
        <p>{label}</p>
      </div>
    </Link>
  );
}
