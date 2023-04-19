import { Box, ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box fontFamily={"Inter"}>
        <Component {...pageProps} />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}
