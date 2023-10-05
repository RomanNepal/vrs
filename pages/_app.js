import { Box, ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { AuthContext } from "../components/Context/authContext";
import { url } from "../components/Constants";
import axios from "axios";

export default function App({ Component, pageProps }) {
  let tk = "";
  let driverTk = "";
  let isA = false;
  if (typeof window != "undefined") {
    tk = localStorage.getItem("token");
    driverTk = localStorage.getItem("driverToken");
    isA = localStorage.getItem("isAdmin");
  }

  const [userLoggedInInfo, sUserLoggedInInfo] = useState({
    isLoggedIn: tk ? true : false,
    token: tk ? tk : "",
  });
  const [admin, sAdmin] = useState(isA ? isA : false);

  const setAdmin = (isAdm) => {
    sAdmin(isAdm);
    if (isAdm) {
      localStorage.setItem("isAdmin", isAdm.toString());
    } else {
      localStorage.removeItem("isAdmin");
    }
  };

  const [driverLoggedInInfo, sDriverLoggedInInfo] = useState({
    isLoggedIn: driverTk ? true : false,
    driverToken: driverTk ? driverTk : "",
  });

  const setUserLoggedIn = (isTrue, token) => {
    if (isTrue) {
      sUserLoggedInInfo({ isLoggedIn: true, token: token });
      localStorage.setItem("token", token);
      const getDetails = async () => {
        try {
          let response = await axios.get(`${url}/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          localStorage.setItem("userName", response.data.data.result.fullName);
          // console.log(response.data.data.result);
        } catch (err) {
          console.log(err);
        }
      };
      getDetails();
    } else if (!isTrue && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      sUserLoggedInInfo({ isLoggedIn: false, token: "" });
    }
  };

  const setDriverLoggedIn = (isTrue, driverToken) => {
    if (isTrue) {
      localStorage.setItem("driverToken", driverToken);
      sDriverLoggedInInfo({ isLoggedIn: true, driverToken: driverToken });

      // const getDetails = async () => {
      //   try {
      //     let response = await axios.get(`${url}/user/profile`, {
      //       headers: { Authorization: `Bearer ${driverToken}` },
      //     });

      //     console.log(response.data.data.result);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // };
      // getDetails();
    } else if (!isTrue && localStorage.getItem("driverToken")) {
      localStorage.removeItem("driverToken");
      sDriverLoggedInInfo({ isLoggedIn: false, driverToken: "" });
    }
  };

  return (
    <ChakraProvider>
      <AuthContext.Provider
        value={{
          userLoggedInInfo,
          setUserLoggedIn,
          driverLoggedInInfo,
          setDriverLoggedIn,
          admin,
          setAdmin,
        }}
      >
        <Box fontFamily={"Inter"}>
          <Component {...pageProps} />
        </Box>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}
