import { EmailAddressResource } from '@clerk/types';
import { CalendarDate } from '@internationalized/date';

export interface IDateOfBirth {
  day: number;
  month: number;
  year: number;
}

export interface IUserDetails {
  id?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  emailAddresses: EmailAddressResource[];
  gender?: string;
  dob?: CalendarDate;
  unsafeMetadata?: {
    gender?: string;
    imageUrl?: string;
    dob?: IDateOfBirth; // Optional property for date of birth
  };
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
  setImage: Function;
  image:string;
}
