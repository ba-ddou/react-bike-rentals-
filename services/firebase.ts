import { StrippedUser, UserRole } from "@root/@types";
import firebaseApp from "../config/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export const createUser = async (id: string, user: StrippedUser) => {
  const res = await setDoc(doc(db, "users", id), {
    ...user,
    role: UserRole.USER,
  });
  return res;
};
