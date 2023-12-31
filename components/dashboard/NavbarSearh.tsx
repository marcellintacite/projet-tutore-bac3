"use client";

import Link from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import deconnexion from "@/libs/deconnexion";
import { removeUser } from "@/data/reducers/userReducer";

type Props = {
  name: string;
  path: string;
  pageRoute: string;
  show?: boolean;
};

export default function Navbar({ name, path, pageRoute, show }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const deconnexion = () => {
    dispatch(removeUser());
    router.push("/");
  };

  return (
    <div className="navbar justify-between gap-4 md:gap-0 bg-transparent md:w-full  ">
      <div className="">
        <Link
          href={path}
          className="btn btn-ghost normal-case text-lg md:text-2xl font-extrabold"
        >
          {name}
        </Link>
      </div>
      <div className="flex gap-3">
        {!show ? (
          <button
            className="btn rounded-md bg-primary-200 text-white hover:bg-blue-800"
            onClick={() => router.push(pageRoute)}
          >
            <AiOutlinePlus className="w-5 h-5 text-gray-100" />
            Ajouter
          </button>
        ) : null}
      </div>
    </div>
  );
}
