import { UserData } from "@clerk/types";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export interface IButtonProps {
  name?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export interface IIconProps {
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  fill?: string;
  className?: string;
}

export interface IImageUploadProps {
  onChange: (value: CloudinaryUploadWidgetResults) => void;
  value?: string;
}

export interface IRadioButtonProps {
  radioOptions: string[];
  radioLabel: string;
}

export interface IDatePickerType {
  control?: any;
  label?: string;
  name?: string;
  rules?: object;
  error?: any;
  register: UseFormRegister<UserData>;

}

export interface INextInputProps<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  id: string;
  register: UseFormRegister<UserData>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  options?: object;
  name?: string;
}

export interface ISelectProps<T extends FieldValues> {
  control: any;
  name: Path<T>;
  label?: string;
  items: Array<{ id: string; name: string }>; // Define the structure of items
  rules?: object;
  error?: string;
  id?: string;
}

export interface IPlusIconProps {
  size?: number;
  width?: number;
  height?: number;
}

export interface IPauseCircleIconProps {
  size?: number;
  width?: number;
  height?: number;
}



export interface IHoverCardProps
{
  content: React.ReactNode; 
  children: React.ReactNode; 
}

export interface IMenuProps
{
  data:Array<{id:number,name:string}>
}