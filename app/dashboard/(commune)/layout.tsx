"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "@/types/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { removeUser } from "@/data/reducers/userReducer";
import { Toaster } from "react-hot-toast";

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

  const token = sessionStorage.getItem("access");
  useEffect(() => {
    if (!token) {
      toast.error("Vous n'avez pas accès");
      router.push("/");
      dispatch(removeUser);
      sessionStorage.clear();
    }
    if (userRole === "hopital") {
      toast.error("Vous n'avez pas accès");
      router.push("/");
      dispatch(removeUser);
      sessionStorage.clear();
    }
  });

  return (
    <main>
      <h3 className="text-primary-200 font-bold text-2xl ml-6 mt-1 mb-1">
        Commune
      </h3>
      {children}
      <Toaster />
    </main>
  );
}
