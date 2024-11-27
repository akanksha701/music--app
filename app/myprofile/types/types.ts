import { EmailAddressResource } from '@clerk/types';
import { CalendarDate } from '@internationalized/date';

export interface DateOfBirth {
  day?: number;
  month?: number;
  year?: number;
}

export interface UserDetails {
  id?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  emailAddresses: EmailAddressResource[];
  gender?: string;
  dob?: CalendarDate;
  unsafeMetadata: {
    gender?: string;
    imageUrl?: string;
    dob?: DateOfBirth; // Optional property for date of birth
  };
}

export interface User {
  isLoaded?: boolean;
  isSignedIn?: boolean;
  userDetails?: UserDetails;
}

export interface State {
  user: User;
}

export interface EditProfileProps {
  setImage: Function;
}
