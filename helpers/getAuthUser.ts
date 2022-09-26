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
  if (!token) return null;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // console.log(
    //   "🚀 ~ file: getAuthUser.ts ~ line 17 ~ decodedToken",
    //   decodedToken
    // );

    return decodedToken;
  } catch (error: any) {
    return null;
  }
};
