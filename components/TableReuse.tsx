"use client";

import axiosCon from "@/libs/Axios";
import { certificatDbType } from "@/types/certi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

type Props = {};

export default function TableReuse({}: Props) {
  const [certificats, setCertificats] = useState<certificatDbType[]>([]);
  const [search, setSearch] = useState("");
  let afficher = certificats;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("access");
    setLoading(true);
    axiosCon
      .get(`/app/get_cn_per_hosp/${token}`)
      .then((res) => {
        setCertificats(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (search !== "") {
      const nsearch = certificats.filter(
        (c) =>
          c.nom_enfant.includes(search) ||
          c.prenom_enfant.includes(search) ||
          c.post_nom_enfant.includes(search)
      );

      setCertificats(nsearch);
    } else {
      setCertificats(afficher);
    }
  };
  return (
    <div className="overflow-x-auto bg-white">
      <div className="flex justify-end mt-4 mx-3">
        <form className="form-control">
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Chercher ..."
            className="input input-bordered border-slate-300 rounded-md bg-white w-full max-w-xs"
          />
        </form>
      </div>
      {loading && (
        <div className="w-full flex justify-center items-center pb-7 mt-5">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}

      {!loading && (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Date du certificat</th>
              <th>Sexe</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {/* row 1 */}

            {certificats.map((cert) => (
              <tr key={cert.id}>
                <th>
                  <label>{cert.id}</label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">
                        <Link
                          href={{
                            pathname: `/dashboard/certificat-de-naissance/${cert.id}`,
                            query: { token: sessionStorage.getItem("access") },
                          }}
                          className="text-blue-950 underline"
                        >
                          {cert.nom_enfant} {cert.post_nom_enfant}{" "}
                          {cert.prenom_enfant}
                        </Link>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{cert.date_deliv_cert}</td>
                <td>{cert.sexe_enfant}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
