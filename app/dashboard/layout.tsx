import Sidebar from "@/components/Sidebar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Accueil",
  description:
    "Application pour rationaliser les données entre hopitaux et etat civil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex relative pb-56 overflow-hidden" data-theme="cupcake">
      <Sidebar />

      <div className="flex-1 min-h-screen md:px-4 mt-2">{children}</div>
    </main>
  );
}
