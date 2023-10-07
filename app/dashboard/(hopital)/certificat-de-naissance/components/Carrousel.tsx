import React from "react";
import baby1 from "@/public/assets/illustration/baby3.png";
import baby2 from "@/public/assets/illustration/baby2.svg";
import Image from "next/image";

type Props = {};

const Carrousel = (props: Props) => {
  return (
    <div className="w-3/5  p-3  justify-center items-center hidden md:flex">
      <div className=" w-full">
        <Image src={baby1} className="w-full" alt="" />
      </div>
    </div>
  );
};
export default Carrousel;
