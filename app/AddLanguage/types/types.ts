interface IGenre {
  _id: string; // MongoDB ObjectId in string form
  name: string; // Genre name
  description: string; // Genre description
  isDelete: boolean; // Flag for deletion status
  createdAt: string; // ISO 8601 formatted string (timestamp)
  updatedAt: string; // ISO 8601 formatted string (timestamp)
  __v: number; // MongoDB document version
}
interface IAlbum {
  _id: string;
  name: string;
}
interface IArtist {
  id: string; 
  fullname: string; 
}
interface ILanguage {
  _id: string; 
  name: string; 
}
export interface IAddMusicProps {
  genreList: IGenre[];
  languageList: ILanguage[];
  artistList: IArtist[];
  albumList: IAlbum[];
}
