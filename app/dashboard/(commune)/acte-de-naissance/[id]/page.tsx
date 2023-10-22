import React from "react";

type Props = {
  params: {
    id: number;
  };
};

export default function page({ params }: Props) {
  return (
    <div>
      <h2>Bienvenue cher {params.id}</h2>
    </div>
  );
}
