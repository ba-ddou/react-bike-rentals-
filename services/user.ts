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


export const deletedUser = async (id: string) => {
  return await fetch(`/api/user/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}