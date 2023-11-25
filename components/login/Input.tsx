"use client";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React from "react";

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  otherprops?: any;
};

export default function Input({ label, type, placeholder, otherprops }: Props) {
  const [show, setShow] = React.useState(false);
  return (
    <div
      className="
  w-full flex flex-col justify-center items-start gap-2 relative
  "
    >
      <label className="text-left text-gray-500 text-sm font-bold">
        {label}
      </label>
      <input
        className="bg-[#f7f7f8] w-full h-14 rounded-lg outline-none p-2 px-4  focus:border-primary-100 focus:border-[1px] transition-all duration-100 ease-in-out"
        type={type === "password" ? (show ? "text" : "password") : "text"}
        placeholder={placeholder}
        {...otherprops}
      />
      {type === "password" && (
        <div
          className="absolute right-6 bottom-4 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <AiOutlineEyeInvisible className="text-primary-200 text-2xl" />
          ) : (
            <AiOutlineEye className="text-primary-200 text-2xl" />
          )}
        </div>
      )}
    </div>
  );
}
