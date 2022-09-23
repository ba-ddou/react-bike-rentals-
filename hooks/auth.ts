import { getAuth } from "firebase/auth";
import { useAuthState as useFirebaseAuthState } from "react-firebase-hooks/auth";
import firebaseApp from "config/firebase";
const auth = getAuth(firebaseApp);

export const useAuthState = () => {
  const [user, loading, error] = useFirebaseAuthState(auth);
  return { user, loading, error };
};
