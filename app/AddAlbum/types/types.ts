export interface AddAlbumFormProps {
  formId: string;
  selectedSongs: Song[];
  handleCloseDialog: () => void;
  defaultData: {
    albumDescription: string;
    albumId: string;
    albumImage: string;
    albumMusicIds: string[];
    albumName: string;
    albumPrice: number;
  };
}
 

export interface ErrorResponseType {
  data: {
    error: string
  };
  status: number;
}


export interface MusicDetails {
    name: string;
    artistId: string[];
    description: string;
    genreId: string;
    languageId: string;
    releaseDate: string; // ISO 8601 formatted date
    duration: number; // duration in seconds
  }
  
export interface AudioDetails {
    imageUrl: string;
    audioUrl: string;
  }
  
export interface Price {
    amount: number;
    currency: string;
  }
  
export interface MusicData {
    musicDetails: MusicDetails;
    audioDetails: AudioDetails;
    price: Price;
    _id: string;
    playTime: number;
    isDeleted: boolean;
    createdAt: string; // ISO 8601 formatted date
    updatedAt: string; // ISO 8601 formatted date
    __v: number;
  }

export interface Song {
    id: string;
    image: string;
    name: string;
    description: string;
    genre: string;
    language: string;
    artists: string[];
  }
  