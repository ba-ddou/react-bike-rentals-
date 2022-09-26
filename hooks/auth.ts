import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  useAuthState as useFirebaseAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import firebaseApp from "config/firebase";
import { UserInput, User, SigninCredentials } from "@types";
import { createUser } from "@root/services";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { json } from "stream/consumers";
const auth = getAuth(firebaseApp);

export const useAuthState = () => {
  const [user, loading, error] = useFirebaseAuthState(auth);

  return {
    user: user ? formatUserRecord(user) : null,
    authenticated: user != null,
    loading,
    error,
  };
};

const formatUserRecord = (user: UserRecord) => {
  const {
    uid,
    email,
    displayName,
    reloadUserInfo: {
      customAttributes
    }
  } = user;
  return {
    uid,
    email,
    name: displayName,
    role: JSON.parse(customAttributes).role,
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
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    });
    // alert(JSON.stringify(result, null, 2));
    if (result?.user.uid)
      await createUser(result.user.uid, {
        name,
        email,
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
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    });
    result?.user.getIdToken().then((token) => {
      cookie.set("token", token, {
        expires: 10,
        path: "/",
      });
    });
    setLoading(false);
    return result?.user ? true : false;
  };

  return {
    signin,
    loading,
    error,
  };
};
