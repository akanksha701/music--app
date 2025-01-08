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
    document.cookie = `${name}=${value}; path=/`;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser: any) => {
      if (authUser) {
         dispatch(setAccessToken(authUser?.accessToken));
         localStorage.setItem("accessToken", authUser?.accessToken);
         setCookie("accessToken", authUser?.accessToken);
        const name = authUser?.reloadUserInfo.displayName.split(" ");
        const user = {
          uid: authUser?.uid,
          firstName: name[0],
          lastName: name[1],
          email: authUser?.email,
          imageUrl: authUser?.reloadUserInfo?.photoUrl,
        };
        const userData = await saveUser(user);
        setUserUid(userData as any);
        dispatch(setLoggedInUser(userData));
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}
