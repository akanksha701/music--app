'use client';
import { Button } from '@/components/ui/button';
import { IButtonProps } from '../types/types';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';

export default function PrimaryButton(buttonProps: IButtonProps) {
  const { name, onClick, type, mode } = buttonProps;
  return (
    <Button
      type={type}
      className="border-2 border-[#9333ea] flex justify-between items-center text-white 
      bg-[#9333ea] rounded-full hover:bg-white hover:text-black hover:border-[#9333ea]"
      onClick={onClick}
    >
      {mode === 'edit' ?
        <FaEdit style={{
          height: '1.5rem',
          width: '1.5rem',
        }} /> :
        <IoAddCircleOutline
          style={{
            height: '1.8rem',
            width: '1.8rem',
          }}
        />
      }

      <span className="text-lg">{name}</span>
    </Button>

  );
}
