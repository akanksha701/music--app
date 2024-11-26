import { CloudinaryUploadWidgetResults } from 'next-cloudinary';

export interface ButtonProps {
    name: string;
    onClick: () => void;
    type: 'button' | 'submit' | 'reset';
}

export interface IconProps {
    size?: number
    width?: number
    height?: number
    strokeWidth?: number
    fill?: string
    className?: string
}

export interface ImageUploadProps {
    onChange: (value: CloudinaryUploadWidgetResults) => void;
    value?: string;
  }

export interface RadioButtonProps {
    radioOptions: string[];
    radioLabel: string;
}