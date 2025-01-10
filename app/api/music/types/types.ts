export interface IMusicFormData {
    audio: Blob | null;
    image: Blob | null;
    artists: string | string[] | null;
    name: string;
    description: string;
    genre: string;
    priceAmount?: number | string;
    currency?: string;
    album: string | string[] | null;
    language: string;      
  }