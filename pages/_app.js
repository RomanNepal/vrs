import { Box, ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box fontFamily={"Inter"}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}
