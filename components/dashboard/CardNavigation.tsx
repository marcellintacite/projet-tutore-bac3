"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
type Props = {
  title: string;
  icon: React.ReactNode;

  path: string;
};

export default function CardNavigation({ title, icon, path }: Props) {
  const active = usePathname() === path;
  console.log("path", active);
  return (
    <Link
      href={path}
      className={`
    flex  items-center gap-3 w-full h-14 
    ${active ? "bg-[#F7F7F8]" : "bg-white"}
    rounded-lg px-5 justify-center lg:justify-start hover:bg-slate-100 transition-all duration-300
    `}
    >
      {icon}
      <h2 className="hidden lg:block">{title}</h2>
    </Link>
  );
}
