import { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import React, { ReactNode } from 'react';
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

export interface IButtonProps {
  name?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
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
  // eslint-disable-next-line no-unused-vars
  onChange: (value: CloudinaryUploadWidgetResults) => void;
  value?: string;
}

export interface IRadioButtonProps {
  radioOptions: string[];
  radioLabel: string;
}

export interface IDatePickerType<T extends FieldValues> {
  control?: Control<T>; 
  label?: string;      
  name: Path<T>;       
  rules?: object;   
  error?: string;      
  register: UseFormRegister<T>; 
}
export interface INextInputProps<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  id: string;
  register: UseFormRegister<T>;
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
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  options?: object;
  name: string;
}
export interface ISelectProps<T extends FieldValues> {
  control?: Control<FieldValues>;
  name: Path<T>;
  label?: string;
  items: Array<{ id: string; name: string, imageUrl?: string }>; // Define the structure of items
  rules?: object;
  error: FieldErrors<T>;
  id?: string;
  selectionMode?: string;
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

export interface ILanguage {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isDeleted: boolean;
  imageUrl: string;
}

export interface IMenuProps {
  row?:Record<string,string>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  handleMenuToggle?:Function
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  handleEdit?:Function
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  handleDelete?:Function
  data?:ILanguage[]
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  handleClick?:(_value?: string | null, _index?: number | null) => Promise<never>
}

export type FormDataType = {
  name?: string;
  imageUrl?: File | string | null; // Allow `null` here
  description?: string;
  price?: string;
  genreIds?: (string | undefined)[];
  songIds?: (string | undefined)[];
  languageIds?: (string | undefined)[];
};

export interface IFileUploadProps<T extends FieldValues> {
  name: Path<T> 
  control: Control<T>; 
  label?: string;
  accept: string;
  validationRules?: object
  
}


export interface ITabsProps {
  tabsData: Array<{
    value: string;
    label: string;
    content: React.ReactNode;
  }>;
}

export interface IColumn {
  header?: string|null;
  accessor?: string|null;
  className?: string|null;
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
  data: Record<string,string>[];
  handleEdit?: (_id: string) => void;
  paginationData?: IPagination;
  page: number;
  setPage: (_page: number) => void;
}
export interface IGridrops {
  columns: IColumn[];
  data: Record<string, string>[];
  label : string
  moreBox: ReactNode;
  addBox:ReactNode
}


export interface MusicDocument {
  _id: string;
  musicDetails: {
      name: string;
      artistId: Array<string>; 
      description: string;
      genreId: string; // Genre ObjectId
      languageId: string; // Language ObjectId
      releaseDate: string; // ISO Date string
      duration: number; // Duration in seconds
  };
  audioDetails: {
      audioUrl: string; // URL to audio file
      imageUrl: string; // URL to image
  };
  playTime: number; // Total playtime in seconds
  price: {
      amount: number;
      currency: string;
  };
  isDeleted: boolean;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  artists? : string;
  liked?: boolean;
}


export interface IGenre {
  _id?: string;
  name?: string;
  description?: string;
  createdAt?: string; 
  updatedAt?: string;
  __v?: number;
  imageUrl?: File | undefined;
  isDeleted?: boolean; 
}


export interface Column {
  accessor?: keyof IGenre | 'edit';
  className?: string|null;
  header?:string|null
}

export interface ISmallGridProps
{
  columns: Column[]; 
  data: IGenre[];
  label: string;
  moreBox?: JSX.Element;
  addBox?: JSX.Element;
}

export interface IArtist {
  fullName: string;
  email: string;
}

export interface IMusic {
  _id: string;
  name: string;
  language: string;
  genre: string;
  description: string;
  artists: IArtist[];
  liked?: boolean;
  price: number;
  currency: string;
  imageUrl: string;
  audioUrl: string;
  createdAt: string;
}

export interface ISelectedRow
{
  id: string;
  image: string;
  name: string;
  description: string;
  genre: string;
  language: string;
  artists: string[];
}

export interface  IPrevData
  {
    albumDescription: string;
    albumId: string;
    albumImage: string;
    albumMusicIds: string[];
    albumName: string;
    albumPrice: number;
    
}