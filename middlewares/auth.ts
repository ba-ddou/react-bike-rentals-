import { getAuthUser } from "@helpers/getAuthUser";
import { UserRole } from "@root/@types";
import { IncomingMessage } from "http";

type Req = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
};

interface RedirectionConfig {
  destination: "/dashboard/auth";
}

export const onlyAllow = async (
  req: Req,
  roles: UserRole[]
): Promise<RedirectionConfig | undefined> => {
  const user = await getAuthUser(req);
  const { role } = user || { role: null };

    if (!roles.includes(role)) {
      console.log(`you are not allowed to access this page`);
    return {
      destination: "/dashboard/auth",
    };
  }
  return undefined;
};
