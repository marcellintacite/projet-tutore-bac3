"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import deconnexion from "@/libs/deconnexion";
import { removeUser } from "@/data/reducers/userReducer";

import { storeType } from "@/types/store";

type Props = {
  name: string;
  path: string;
};

export default function Navbar({ name, path }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { username, email, userRole } = useSelector(
    (store: storeType) => store.user
  );
  console.log(username, userRole);

  useEffect(() => {
    if (username === "") {
      sessionStorage.clear();
      router.push("/");
    }
  }, []);
  const deconnexion = () => {
    dispatch(removeUser());
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <div className="navbar bg-transparent md:w-full w-4/5">
      <div className="flex-1">
        <Link
          href={path}
          className="btn btn-ghost normal-case text-2xl font-extrabold"
        >
          {name}
        </Link>
      </div>

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <AiOutlineUser className="w-6 h-6" />
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>

          <li>
            <a onClick={deconnexion}>Deconnexion</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
