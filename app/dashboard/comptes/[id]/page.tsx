import axiosCon from "@/libs/Axios";
import React from "react";
import { Territoire } from "../components/ModalHopital";
import { FaEdit, FaTrash } from "react-icons/fa";

type Props = {
  params: {
    id: string;
  };
};

const getTerritoire = async (id: string) => {
  const res = axiosCon.get(`/app/get_territoire_par_province/${id}`);

  return (await res).data;
};

export default async function page({ params }: Props) {
  const data = (await getTerritoire(params.id)) as Territoire | undefined;
  console.log(data);
  return (
    <div className="overflow-x-auto p-2">
      <h2
        className="text-center text-lg font-bold"
      >Données par Province</h2>
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
          {data?.map((p) => (
            <tr key={p.id}>
              <td></td>
              <td>{p.id}</td>
              <td>{p.denom}</td>
              {/* <td className="flex gap-3">
                <button className="btn btn-sm btn-primary">
                  <FaEdit />
                </button>
                <button className="btn btn-sm btn-danger">
                  <FaTrash />
                </button>
              </td> */}
            </tr>
          ))}

          {/* empty */}
          {data?.length === 0 && (
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
