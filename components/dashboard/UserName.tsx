"use client";

import { storeType } from "@/types/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

export default function UserName({}: Props) {
  const { username } = useSelector((store: storeType) => store.user);
  return (
    <div>
      <p>Bonjour {username}</p>
    </div>
  );
}
