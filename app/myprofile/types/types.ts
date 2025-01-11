
export interface IDateOfBirth {
  day: number;
  month: number;
  year: number;
}

export interface IUserDetails {
  _id?: string;  // MongoDB ObjectId as a string
  firstName?: string;
  lastName?: string;
  email?: string;
  imageUrl?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  gender?: string;
  dateOfBirth?: string; // ISO string format
  createdAt?: string; // ISO string format
  updatedAt?: string; // ISO string format
  playlists?: string[]; // Array of playlist IDs (as string)
  likedMusics?: { $oid: string }[]; // Array of liked music IDs (ObjectId as string)
  likedGenres?: { $oid: string }[]; // Array of liked genre IDs (ObjectId as string)
  likedAlbums?: { $oid: string }[]; // Array of liked album IDs (ObjectId as string)
  userId?: string; 
  uid?: string;
  emailAddresses?: string;
  artistId?:string
}



export interface IUser {
  isLoaded?: boolean;
  isSignedIn?: boolean;
  userDetails?: IUserDetails;
}

export interface IState {
  user: IUser;
}

export interface IEditProfileProps {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setImage: Function;
  image:string;
}
