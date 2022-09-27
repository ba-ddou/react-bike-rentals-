import { Gallery, Header } from "@components/organisms";
import { getGetServerSidePropsWithUserAuth } from "@helpers/getGetServerSideProps";
import { useAuth } from "@root/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Profile: NextPage = () => {
  const { user } = useAuth();

    return (
      <div className={styles.container}>
        <Header />
        {user?.name}
      </div>
    );
};

export default Profile;

export const getServerSideProps = getGetServerSidePropsWithUserAuth();
