import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { AuthProvider, GlobalDataProvider } from "@root/providers";
import "config/firebase";
import { DashboardLayout } from "@components/templates";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GlobalDataProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
          }}
        >
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </MantineProvider>
      </GlobalDataProvider>
    </AuthProvider>
  );
}

export default MyApp;
