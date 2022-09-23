import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  useAuthState as useFirebaseAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import firebaseApp from "config/firebase";
import { UserInput, User } from "@types";
import { createUser } from "@root/services";
import { useState } from "react";
const auth = getAuth(firebaseApp);

export const useAuthState = () => {
  const [user, loading, error] = useFirebaseAuthState(auth);
  return { user, authenticated: user != null, loading, error };
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
