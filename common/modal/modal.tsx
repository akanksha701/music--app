'use client';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import React, { ReactNode, useState } from 'react';
import ButtonWithIcon from '../buttons/ButtonWithIcon';

export interface IModalProps {
  children?: ReactNode;
  title?: string;
  body?: ReactNode;
  description?: string
}

export const Modal = (props: IModalProps) => {
  const { children, title, body, description } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      {React.cloneElement(children as React.ReactElement, { onClick: handleOpen })}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {body}
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <ButtonWithIcon
                text='close'
                onClick={handleClose}
                 className="w-1/2 text-black  bg-vivid-orange "
              />
              {/* <Button type="button" variant="secondary" onClick={handleClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800">
                Close
              </Button> */}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
