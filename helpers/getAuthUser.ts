import { IncomingMessage } from "http";
import admin from "../lib/firebase";

export const getAuthUser = async (
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  }
) => {
  const {
    cookies: { token },
  } = req;
  console.log("🚀 ~ file: getAuthUser.ts ~ line 14 ~ token", token);
  if (!token) return null;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("🚀 ~ file: getAuthUser.ts ~ line 18 ~ decodedToken", decodedToken)
    
    return decodedToken;
  } catch (error: any) {
    console.log("🚀 ~ file: getAuthUser.ts ~ line 22 ~ error", error)
    return null;
  }
};
