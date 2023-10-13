"use client";

import store from "@/data/store";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Provider } from "react-redux";

const nunito = Nunito({ subsets: ["latin"] });

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Application pour rationaliser les données entre hopitaux et etat civil"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Citoyen</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={nunito.className}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
