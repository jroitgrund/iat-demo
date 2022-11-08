import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const theme = extendTheme({
  styles: {
    global: {
      html: { h: "100%" },
      body: {
        minH: "100%",
        mx: "auto",
        display: "flex",
      },
      "#__next": { display: "flex", flex: "1" },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
