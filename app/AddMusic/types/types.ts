interface IGenre {
  _id: string; // MongoDB ObjectId in string form
  name: string; // Genre name
  description: string; // Genre description
  isDelete: boolean; // Flag for deletion status
  createdAt: string; // ISO 8601 formatted string (timestamp)
  updatedAt: string; // ISO 8601 formatted string (timestamp)
  __v: number; // MongoDB document version
}

export interface IAddMusicProps {
  genreList: IGenre[];
  languageList:Array<{name:string,_id:string}>,
}
