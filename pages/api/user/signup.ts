import type { NextApiRequest, NextApiResponse } from "next";
import { User, UserRole } from "@types";
import admin from "@root/lib/firebase";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User & { token: string }>
) {
  const { body } = req;

  const { name, email, password } = body;

  const { uid } = await admin.auth().createUser({
    displayName: name,
    password,
    email,
  });
  await admin.auth().setCustomUserClaims(uid, { role: UserRole.USER });

  await admin.firestore().collection("users").doc(uid).set({
    name,
    email,
    role: UserRole.USER,
  });
  const token = await admin.auth().createCustomToken(uid);
  res.status(200).json({
    id: uid,
    name,
    email,
    role: UserRole.USER,
    token,
  });
}
