import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import "config/firebase";
import { Layout } from "@components/templates";

function MyApp({ Component, pageProps }: AppProps) {
  return (
   
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
  );
}

export default MyApp;
