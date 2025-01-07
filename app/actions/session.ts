"use server";
import { cookies } from "next/headers";
export async function getSession() {
  const cookieStore = await cookies();
  const session =  cookieStore.get("user_session")?.value || null;

  return session;
}
