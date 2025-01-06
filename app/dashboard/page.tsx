import Navbar from "@/components/dashboard/Navbar";

import React from "react";
import Content from "../content";

type Props = {};

export const dynamic = "force-dynamic";

export default function page({}: Props) {
  return (
    <div className="m-auto w-full  mx-3">
      <Navbar name="Dashboard" path={"/dashboard"} />
      <div className="w-full">
        <Content />
      </div>
    </div>
  );
}
