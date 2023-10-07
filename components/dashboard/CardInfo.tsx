import React from "react";

type Props = {
  title: string;
  value: any;
};

export default function CardInfo({ title, value }: Props) {
  return (
    <div className="flex gap-3">
      <h2 className="font-bold"> {title} : </h2>
      <p>{value}</p>
    </div>
  );
}
