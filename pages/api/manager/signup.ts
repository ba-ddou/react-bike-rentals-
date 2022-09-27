import type { NextApiRequest, NextApiResponse } from "next";
import { User, UserRole } from "@types";
import admin from "@root/lib/firebase";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { EntityStatus } from "@root/@types/Global";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { body } = req;

  const { name, email, password } = body;

  const { uid } = await admin.auth().createUser({
    displayName: name,
    password,
    email,
  });
  await admin.auth().setCustomUserClaims(uid, { role: UserRole.MANAGER });

  await admin.firestore().collection("users").doc(uid).set({
    name,
    email,
    role: UserRole.MANAGER,
    entityStatus: EntityStatus.ACTIVE,
  });
  res.status(200).json({
    id: uid,
    name,
    email,
    role: UserRole.MANAGER,
    entityStatus: EntityStatus.ACTIVE,
  });
}
