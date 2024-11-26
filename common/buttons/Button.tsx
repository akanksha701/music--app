'use client';

import { ButtonProps } from '@nextui-org/react';

export default function Button(buttonProps: ButtonProps) {
  const { name, onClick, type } = buttonProps;
  return (
    <button
      type={type}
      className=' transition duration-150 ease-in-out  bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded hover:opacity-80 '
      onClick={onClick}
    >
      {name}
    </button>
  );
}
