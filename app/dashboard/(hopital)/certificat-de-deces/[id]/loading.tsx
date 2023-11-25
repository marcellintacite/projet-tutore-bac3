import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type Props = {};

export default function loading({}: Props) {
  return (
    <div className="md:mx-32 mt-4  h-screen">
      <div className="flex justify-between">
        <h2 className="my-3 text-3xl font-bold">
          Certificat de <Skeleton width={200} /> <Skeleton width={200} />
        </h2>
        <div className="flex justify-between">
          <Skeleton width={200} />
          <Skeleton width={200} />
        </div>
      </div>
      <div className="mt-7 pb-6 w-full">
        <Skeleton className="w-full min-h-screen" />
      </div>
    </div>
  );
}
