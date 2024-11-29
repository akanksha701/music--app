"use client";
import { Button as ShadCNButton } from "@/components/ui/button";
import { IButtonProps } from "../types/types";

export default function Button(buttonProps: IButtonProps) {
  const { name, onClick, type } = buttonProps;
  return (
    <ShadCNButton
      type={type}
      variant="destructive"
      className=" w-full transition duration-150 ease-in-out  bg-purple-600 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded hover:opacity-80 "
      onClick={onClick}
    >
      {name}
    </ShadCNButton>
  );
}
