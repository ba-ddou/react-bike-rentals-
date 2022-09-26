import { UserInput } from "@root/@types";

export const signupUser = async (user: UserInput) => {
  return await fetch("/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};
