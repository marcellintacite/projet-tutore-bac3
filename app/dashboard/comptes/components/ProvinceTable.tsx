"use client";

import axiosCon from "@/libs/Axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { province } from "./ModalTerritoire";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Link from "next/link";

type Props = {};

const getProvinces = async () => {
  const res = await axiosCon.get("/app/create_province");
  return res.data;
};

export default function ProvinceTable({}: Props) {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  }) as { data: province; isError: boolean; isLoading: boolean; error: any };

  console.log(data, isError, isLoading, error);
  if (isLoading) {
    return <div className="text-center min-h-12 bg-white">Chargement...</div>;
  }

  if (isError) {
    return <div className="text-center min-h-12 bg-white">Erreur</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Denom</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td></td>
              <td>{p.id}</td>
              <td>
                <Link href={`/dashboard/comptes/${p.id}`} className="underline">
                  {p.denom}
                </Link>
              </td>
              <td className="flex gap-3">
                <Link href={`/dashboard/comptes/${p.id}`} className="underline">
                  <FaEye />
                </Link>
              </td>
            </tr>
          ))}

          {/* empty */}
          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center">
                Aucune donnée
              </td>
            </tr>
          )}
          {/* <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
