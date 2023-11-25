import React from "react";

type Props = {
  errors: {
    message: string | undefined;
    type: string;
  };
};

export default function ErrorInput({ errors: { message, type } }: Props) {
  return (
    <div
      className="
    flex flex-col  text-red-500
    "
    >
      <p>{message}</p>
    </div>
  );
}
