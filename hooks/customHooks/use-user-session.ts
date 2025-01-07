import { saveUser } from "@/lib/auth";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { checkIfUserExists } from "@/lib/firebase/userActions";
import { setAccessToken } from "@/Redux/features/user/sessionSlice";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function useUserSession(InitSession: string | null) {
  const [userUid, setUserUid] = useState(InitSession);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser: any) => {
      if (authUser) {
        setUserUid(authUser as any);
        await dispatch(setAccessToken(authUser?.accessToken));
        localStorage.setItem('accessToken',authUser?.accessToken)
        saveUser(authUser);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}
