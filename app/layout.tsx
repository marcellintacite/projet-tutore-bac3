"use client";

import store from "@/data/store";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Provider } from "react-redux";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Le citoyen",
  description:
    "Application pour rationaliser les données entre hopitaux et etat civil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
