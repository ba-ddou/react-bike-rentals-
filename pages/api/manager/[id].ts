import type { NextApiRequest, NextApiResponse } from "next";
import { User, UserRole } from "@types";
import admin from "@root/lib/firebase";
import { EntityStatus } from "@root/@types/Global";


// TODO: This slogic is the same as the user/[id] endpoint. Refactor to a common function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { method, query } = req;
  console.log("🚀 ~ file: [id].ts ~ line 12 ~ query", query);
  console.log("🚀 ~ file: [id].ts ~ line 12 ~ method", method);
  if (method == "DELETE") {
    const { id } = query;
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
  } else {
    res.status(404).json({ message: "Method not found" });
  }
}
