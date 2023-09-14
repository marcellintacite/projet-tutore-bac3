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
    <main className="flex relative bg-[#FAFAFB]">
      <Sidebar />
      <div className="w-4/5 h-screen">{children}</div>
    </main>
  );
}
