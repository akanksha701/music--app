import { User } from 'firebase/auth'; 
import { IUserDetails } from '@/app/MyProfile/types/types'; 
import { saveUser } from '@/lib/auth';
import { onAuthStateChanged } from '@/lib/firebase/auth';
import { setAccessToken, setLoggedInUser } from '@/Redux/features/user/sessionSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export function useUserSession(InitSession: string | null) {
  const [userUid, setUserUid] = useState<string |IUserDetails | null>(InitSession);
  const dispatch = useDispatch();

  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; secure; samesite=strict`;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser: User | null) => {
      if (authUser) {
        try {
          const accessToken = await authUser.getIdToken();
          if (accessToken) {
            await dispatch(setAccessToken(accessToken));
            await localStorage.setItem('accessToken', accessToken);
            setCookie('accessToken', accessToken);
          }

          // Split the display name into first and last names (if available)
          const name = authUser?.displayName?.split(' ') || [];
          const user: IUserDetails = {
            uid: authUser.uid,
            firstName: name[0] || '',
            lastName: name[1] || '',
            email: authUser.email || '',
            imageUrl: authUser.photoURL || '', 
          };

          const userData = await saveUser(user);
          setUserUid(userData as IUserDetails);
          dispatch(setLoggedInUser(userData));

        } catch (error) {
          console.error('Error handling user session:', error);
        }
      } else {
        setUserUid(null);
        dispatch(setLoggedInUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return userUid;
}
