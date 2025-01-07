import { onAuthStateChanged } from "@/lib/firebase/auth";
import { setSession } from "@/Redux/features/user/sessionSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function useUserSession(InitSession: string | null) {
  const [userUid, setUserUid] = useState(InitSession);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser: any) => {
      if (authUser) {
        setUserUid(authUser as any);
        dispatch(setSession(authUser.reloadUserInfo as any));
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}
