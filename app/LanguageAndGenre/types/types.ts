
export interface IAddLanguageProps {
    handleCloseDialog: () => void;

}

export  interface IAddGenreProps {
    handleCloseDialog: () => void;

}
export interface IAddLanguageFormData {
    name: string;
    description: string;
    imageUrl: FileList; 
  }

export interface IAddGenreFormData {
    name: string;
    description: string;
    imageUrl: FileList; 
  }