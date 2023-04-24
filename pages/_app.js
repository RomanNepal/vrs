import { Box, ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { useState } from "react";
import { AuthContext } from "../components/Context/authContext";

export default function App({ Component, pageProps }) {
  const [loggedInInfo, sLogginInInfo] = useState({
    isLoggedIn: false,
    token: "",
  });
  const setLoggedIn = (isTrue, token) => {
    if (isTrue) {
      sLogginInInfo({ isLoggedIn: true, token: token });
      localStorage.setItem("token", token);
    } else if (!isTrue && localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  };
  return (
    <ChakraProvider>
      <AuthContext.Provider value={{ loggedInInfo, setLoggedIn }}>
        <Box fontFamily={"Inter"}>
          <Component {...pageProps} />
        </Box>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}
