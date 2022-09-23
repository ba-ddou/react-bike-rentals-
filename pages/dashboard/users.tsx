import { UsersTable } from "@components/organisms";
import { FunctionComponent } from "react";

interface UsersProps {}

const Users: FunctionComponent<UsersProps> = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <UsersTable />
    </div>
  );
};

export default Users;
