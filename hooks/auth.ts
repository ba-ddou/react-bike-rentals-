import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  getIdToken,
} from "firebase/auth";
import {
  useAuthState as useFirebaseAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import firebaseApp from "config/firebase";
import { UserInput, User, SigninCredentials, UserRole } from "@types";
import { createUser, signupUser } from "@root/services";
import { useEffect, useMemo, useState } from "react";
import cookie from "js-cookie";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { json } from "stream/consumers";
import { useRouter } from "next/router";
const auth = getAuth(firebaseApp);

export const useAuth = () => {
  const [user, loading, error] = useFirebaseAuthState(auth);
  const { push } = useRouter();

  const formatedUserRecord = useMemo(
    () => (user ? formatUserRecord(user as unknown as UserRecord) : null),
    [user]
  );

  const logout = async () => {
    await auth.signOut();
    cookie.remove("token");
    if (formatedUserRecord?.role == UserRole.MANAGER) push("/dashboard/auth");
    else push("/");
  };

  return {
    user: formatedUserRecord,
    loading,
    error,
    logout,
  };
};

const formatUserRecord = (user: UserRecord) => {
  const {
    uid,
    email,
    displayName,
    //@ts-ignore
    reloadUserInfo,
  } = user;
  return {
    id: uid,
    email,
    name: displayName,
    role: reloadUserInfo?.customAttributes
      ? JSON.parse(reloadUserInfo?.customAttributes).role
      : null,
  };
};

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setLoading(false);
    setError(null);
  };

  const signup = async (user: UserInput) => {
    reset();
    const { email, password, name } = user;
    setLoading(true);
    const result = await signupUser({ name, email, password }).catch(
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      }
    );
    console.log("🚀 ~ file: auth.ts ~ line 60 ~ signup ~ result", result);
    if (!result?.id) setError("Something went wrong");
    const userCredential = await signInWithCustomToken(auth, result.token);
    userCredential?.user.getIdToken().then((token) => {
      cookie.set("token", token, {
        expires: 10,
        path: "/",
      });
    });
    setLoading(false);
  };

  return {
    signup,
    loading,
    error,
  };
};

export const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setLoading(false);
    setError(null);
  };

  const signin = async (credentials: SigninCredentials): Promise<boolean> => {
    reset();
    const { email, password } = credentials;
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    });
    userCredential?.user.getIdToken().then((token) => {
      cookie.set("token", token, {
        expires: 10,
        path: "/",
      });
    });
    setLoading(false);
    return userCredential?.user ? true : false;
  };

  return {
    signin,
    loading,
    error,
  };
};
