export interface GerneType {
    _id: string;
    name: string;
    imageUrl?: string
}

export interface LanguageType {
    _id: string;
    name: string;
    imageUrl?: string
}
export interface MusicType {

    _id: string;
    name: string;
    imageUrl: string
}

export interface IBoxTypes {
    data: Array<{
        _id: string; 
        name: string; 
        imageUrl: string; 
        liked?: boolean, 
        description?: string, 
        musicIds? : Array<{ _id: string }>,
        Price?: number,
        Rating?:number,
        Genre?: Array<{ _id: string; name: string }>, Language?: Array<{ _id: string; name: string }>, artists?: Array<{ _id: string; firstName: string; lastName: string; }>
    }>;
    className: string;
    message: string;
}


export interface Genre {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    imageUrl: string | null;
    isDeleted: boolean;
  }
  
export interface Language {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    imageUrl: string;
    isDeleted: boolean;
  }
  
export interface MusicDetails {
    name: string;
    artistId: string[];
    description: string;
    genreId: string;
    languageId: string;
    releaseDate: string;
    duration: number;
  }
  
export interface AudioDetails {
    imageUrl: string;
    audioUrl: string;
  }
  
export interface Music {
    musicDetails: MusicDetails;
    audioDetails: AudioDetails;
    price: {
      amount: number;
      currency: string;
    };
    _id: string;
    playTime: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
export interface Album {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    isDeleted: boolean;
    Label: string;
    Rating: number;
    Price: number;
    ShareCount: number;
    Genre: Genre[];
    Language: Language[];
    musicIds: Music[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  