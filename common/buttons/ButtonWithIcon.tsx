import React from "react";
import { Button } from "@/components/ui/button";
export interface IButtonWithIcon {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  className?: string;
  text?: string;
}
export const ButtonWithIcon = (props: IButtonWithIcon) => {
  const { onClick, icon, className, text } = props;
  return (
    <Button className={className} onClick={onClick}>
      {icon}
      {text}
    </Button>
  );
};

export default ButtonWithIcon;
