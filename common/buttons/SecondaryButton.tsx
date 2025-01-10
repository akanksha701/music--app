'use client';
import { Button } from '@/components/ui/button';
import { IButtonProps } from '../types/types';

export default function SecondaryButton(buttonProps: IButtonProps & { children?: React.ReactNode }) {
  const { name, onClick, type, children } = buttonProps;

  return (
    <Button
      type={type}
      className="border-2 border-[#9333ea]  
       flex justify-between  items-center text-[#9333ea] rounded-full hover:bg-[#9333ea] 
       hover:text-black hover:border-black"
      onClick={onClick} 
    >
      {children}
      <span className="text-lg text-[#9333ea]">{name}</span>
    </Button>

  );
}


