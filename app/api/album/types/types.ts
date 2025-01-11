export interface IGenre {
    _id?: string;
    name?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
    imageUrl?: string;
    isDeleted?: boolean;
  }
  
  export interface ILanguage {
    _id?: string; 
    name?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
    isDeleted?: boolean;
    imageUrl?: string;
  }
  
  export interface Ifilter {
    isDeleted ?: boolean,
    Label ?: string
  }
  
  export interface IAlbum 
  { name: string; description: FormDataEntryValue; Price: number; 
    imageUrl: string; Genre: (string | undefined)[]; Language: (string | undefined)[]; 
    musicIds: (string | undefined)[];   }