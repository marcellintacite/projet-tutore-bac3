import React from "react";

type Props = {};

export default function Coming({}: Props) {
  return (
    <section className="py-24 relative ">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full  bg-gray-900 h-[60vh] rounded-2xl flex  justify-center items-center lg:gap-28 md:gap-16 gap-10 flex-col">
          <h2 className="text-center text-emerald-400 md:text-6xl text-5xl font-bold font-manrope leading-normal">
            En cours de construction
          </h2>
          <p className="text-center text-gray-500 text-base font-normal leading-relaxed">
            Nous travaillons encore sur cette fonctionalité
          </p>
        </div>
      </div>
    </section>
  );
}
