import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "config/firebase";
import { collection, where, query } from "firebase/firestore";
import { User, UserRole } from "@root/@types";
import { docConverter } from "@helpers/firebase";

export const useUsers = () => {
  const [users, loading, error] = useCollectionData(
    query(collection(db, "users"), where("role", "==", UserRole.USER))
  );

  return { users: users as User[], loading, error };
};

export const useManagers = (authenticatedManagerID?: string) => {
  const [managers, loading, error] = useCollectionData(
    query(collection(db, "users").withConverter(docConverter), where("role", "==", UserRole.MANAGER))
  );

  return {
    managers: managers?.filter(
      (manager) => manager.id !== authenticatedManagerID
    ) as User[],
    loading,
    error,
  };
};
