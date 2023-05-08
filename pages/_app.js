import { Box, ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { AuthContext } from "../components/Context/authContext";

export default function App({ Component, pageProps }) {
  let tk = "";
  if (typeof window != "undefined") {
    tk = localStorage.getItem("token");
  }
  const [loggedInInfo, sLogginInInfo] = useState({
    isLoggedIn: tk ? true : false,
    token: tk ? tk : "",
  });

  const setLoggedIn = (isTrue, token) => {
    if (isTrue) {
      sLogginInInfo({ isLoggedIn: true, token: token });
      localStorage.setItem("token", token);
    } else if (!isTrue && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      sLogginInInfo({ isLoggedIn: false, token: "" });
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
