import { UserData } from "@clerk/types";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import React, { ReactNode } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export interface IButtonProps {
  name?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  mode? :  string
  children?: ReactNode;
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
  name: string;
  className?: string;
}

export interface INextTextAreaProps<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  id: string;
  register: UseFormRegister<UserData>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  options?: object;
  name: string;
}
export interface ISelectProps<T extends FieldValues> {
  control: any;
  name: Path<T>;
  label?: string;
  items: Array<{ id: string; name: string, imageUrl?: string }>; // Define the structure of items
  rules?: object;
  error?: any;
  id?: string;
  selectionMode: any;
  placeholder: string;
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

export interface IHoverCardProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export interface IMenuProps {
  data: Array<{ id: number; name: string }>;
  handleClick: Function;
}

export interface IFileUploadProps {
  name: string; // The name of the field (used by react-hook-form)
  control: Control<FieldValues>; // The control object from react-hook-form to manage the form state
  rules?: any; // Optional validation rules (can be more specific based on your needs)
  label?: string; // Optional label for the file input
  defaultValue?: File | null; // Optional default value (default can be null, no file selected initially)
  [key: string]: any; // Al
}

export interface ITabsProps {
  tabsData: Array<{
    value: string;
    label: string;
    content: React.ReactNode;
  }>;
}

export interface IColumn {
  header: string;
  accessor: string;
  className?: string;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
}

export interface ITableProps {
  message: string;
  columns: IColumn[];
  data: Record<string, any>[];
  handleEdit?: any;
  paginationData?: IPagination;
  page: number;
  setPage: (page: number) => void;
}
export interface IGridrops {
  columns: IColumn[];
  data: Record<string, any>[];
  handleEdit?: any; 
  label : string
  moreBox: ReactNode;
  addBox:ReactNode
}