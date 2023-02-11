import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { useSessionCustom } from "@/lib/next-auth-react-query";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "@/styles/globals.css";
import type { NextComponentType } from "next";
type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};
export default function App({ Component, pageProps }: CustomAppProps) {
  const emotionCache = createCache({
    key: "emotion-css-cache",
    prepend: true, // ensures styles are prepended to the <head>, instead of appended
  });
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <CacheProvider value={emotionCache}>
        <ChakraProvider>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}

function Auth({ children }: { children: ReactNode }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { session, status } = useSessionCustom({ required: true });
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
