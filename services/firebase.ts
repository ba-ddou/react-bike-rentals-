import { StrippedUser, UserRole } from "@root/@types";
import firebaseApp from "../config/firebase";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import cookie from "js-cookie";
import { getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export const createUser = async (id: string, user: StrippedUser) => {
  const res = await setDoc(doc(db, "users", id), {
    ...user,
    role: UserRole.USER,
  });
  return res;
};


export const getUser = async (id: string) => { 
  const user = await getDoc(doc(db, "users", id));
  return user;
}

export const signOut = async () => { 
  await auth.signOut();
  cookie.remove("token");
}