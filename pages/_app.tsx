import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from '@root/providers';
import "config/firebase";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </AuthProvider>
  );
}

export default MyApp
