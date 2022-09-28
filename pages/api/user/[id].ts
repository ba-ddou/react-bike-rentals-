import type { NextApiRequest, NextApiResponse } from "next";
import { User, UserInput, UserRole } from "@types";
import admin from "@root/lib/firebase";
import { EntityStatus } from "@root/@types/Global";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; action?: string }>
) {
  const { method, query, body } = req;
  const { id } = query;
  if (method == "DELETE") {
    const user = await admin.auth().getUser(id as string);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await admin.auth().deleteUser(id as string);
    await admin
      .firestore()
      .collection("users")
      .doc(id as string)
      .update({
        entityStatus: EntityStatus.DELETED,
      });
    res.status(200).json({
      message: `User ${id} was deleted successfully`,
    });
  } else if (method == "PUT") {
    const { name, password } = body;
    const defiendFields: Partial<UserInput> & {
      displayName?: string;
    } = {};
    if (name) defiendFields.displayName = name;
    if (password) defiendFields.password = password;
    await admin.auth().updateUser(id as string, defiendFields);
    res.status(200).json({
      message: `User ${id} was updated successfully`,
      action: password ? "logout" : undefined,
    });
    return;
  } else {
    res.status(404).json({ message: "Method not found" });
  }
}
