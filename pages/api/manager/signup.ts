import type { NextApiRequest, NextApiResponse } from "next";
import { User, UserRole } from "@types";
import admin from "@root/lib/firebase";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserRecord>
) {
  const { body } = req;

  const { name, email, password } = body;

  const { uid } = await admin.auth().createUser({
    displayName: name,
    password,
    email,
  });
  await admin.auth().setCustomUserClaims(uid, { role: UserRole.MANAGER });

   const user = await admin.auth().getUser(uid);

   res.status(200).json(user);
}
