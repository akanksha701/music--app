import { saveUser } from "@/lib/auth";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import {
  setAccessToken,
  setLoggedInUser,
} from "@/Redux/features/user/sessionSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function useUserSession(InitSession: string | null) {
  const [userUid, setUserUid] = useState(InitSession);
  const dispatch = useDispatch();
  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/`;  // Set cookie with no expiration
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;  // Expire the cookie immediately
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser: any) => {
      if (authUser) {
        setUserUid(authUser as any);
         await dispatch(setAccessToken(authUser?.accessToken));
        
        localStorage.setItem('accessToken', authUser?.accessToken)
        setCookie("accessToken" ,  authUser?.accessToken)
        saveUser(authUser);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}
