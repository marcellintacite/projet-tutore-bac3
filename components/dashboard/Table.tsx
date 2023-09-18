import React from "react";
import { AiFillEye, AiOutlineEdit } from "react-icons/ai";

type Props = {};

export default function Table({}: Props) {
  return (
    <div className="overflow-x-auto bg-white w-full rounded-md">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="font-bold"></th>
            <th className="font-bold text-">Nom</th>
            <th className="font-bold text-lg">Document</th>
            <th className="font-bold text-lg">Date d'émission</th>
            <th className="font-bold text-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="">
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Quality Control Specialist</td>
            <td className="flex gap-3">
              <button className="btn btn-square bg-slate-50">
                <AiFillEye className="w-5 h-5 text-secondary-50" />
              </button>
              <button className="btn btn-square bg-slate-50">
                <AiOutlineEdit className="w-5 h-5 text-warning font-bold" />
              </button>
            </td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
