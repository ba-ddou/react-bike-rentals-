import { UserRole } from "@root/@types";
import { onlyAllow } from "@root/middlewares";
import { GetServerSideProps } from "next";


export const getGetServerSidePropsWithManagerAuth = (): GetServerSideProps => {
  return async (context) => {
    const redirect = await onlyAllow(context.req, [UserRole.MANAGER]);
    const { id } = context?.params || {id: null};
    return {
      redirect: redirect,
      props: {
        id
      },
    };
  };
};