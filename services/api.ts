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

export const deletedManager = async (id: string) => {
  return await fetch(`/api/manager/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

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
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const rateReservation = async (id: string, rating: number) => {
  return await fetch(`/api/reservation/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
