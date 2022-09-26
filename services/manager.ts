import { UserInput } from "@root/@types";

export const createManager = async (manager: UserInput) => {
  return await fetch("/api/manager/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(manager),
  }).then((res) => res.json());
};
