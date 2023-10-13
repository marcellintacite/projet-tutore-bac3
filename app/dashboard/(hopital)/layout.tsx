"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "@/types/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { removeUser } from "@/data/reducers/userReducer";
export const dynamic = "force-dynamic";
type Props = {
  children: ReactNode;
};

export default function layout({ children }: Props) {
  const { username, email, userRole } = useSelector(
    (store: storeType) => store.user
  );
  const router = useRouter();
  const dispatch = useDispatch();

  console.log(userRole);

  useEffect(() => {
    if (!userRole) {
      router.push("/");
      sessionStorage.clear();
    }
    if (userRole === "commune") {
      toast.error("Vous n'avez pas accès");
      router.push("/");
      dispatch(removeUser);
      sessionStorage.clear();
    }
  });

  return (
    <main>
      <h3 className="text-primary-200 font-bold text-2xl ml-6 mt-1 mb-1">
        Hopital
      </h3>
      {children}
    </main>
  );
}
