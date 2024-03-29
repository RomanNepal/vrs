import {
  Box,
  Button,
  Center,
  Input,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { decode } from "jsonwebtoken";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
import axios from "axios";
import Router, { useRouter } from "next/router";
import { url } from "../components/Constants";
import { AuthContext } from "../components/Context/authContext";
const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { userLoggedInInfo, setUserLoggedIn, setAdmin } =
    useContext(AuthContext);
  const [routeChanged, setRouteChanged] = useState(false);
  useEffect(() => {
    console.log("useeffect called");
    if (userLoggedInInfo.isLoggedIn) {
      console.log("logged in");
      if (!routeChanged) {
        router.replace("/");
      }
    } else {
      console.log("not logged in");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (show) {
        let response = await axios.post(`${url}/auth/verify-otp`, {
          phone: phone,
          otp: otp,
        });
        // console.log("response.data.data.token is: ", response.data.data.token);
        setUserLoggedIn(true, response.data.data.token.toString());

        let decoded = decode(response.data.data.token);
        if (decoded.role === "admin") {
          setAdmin(true);
        }
        if (response.data.data.isProfileUpdated != true) {
          console.log("response.data.data: ", response.data.data);
          setRouteChanged(true);
          router.push("/updateprofile");
        } else {
          toast({
            title: `${response.data.data.msg}`,
            description: "",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          router.replace("/");
        }
      } else {
        let response = await axios.post(`${url}/auth/send-otp`, {
          phone: phone,
        });

        if (response) {
          setShow(true);
        }
      }
    } catch (err) {
      toast({
        title: `Error Logging In`,
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar loggedIn={"true"} />
      <Center marginTop={"10%"}>
        <Box>
          <form>
            <Text fontWeight={"semibold"} fontSize={"2xl"}>
              {show ? `Enter OTP Sent to: ${phone}` : "Enter Your Phone Number"}
            </Text>
            <br></br>
            <Input
              type={"number"}
              display={show ? "none" : "flex"}
              placeholder="10-digit phone number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            ></Input>

            <Input
              display={show ? "flex" : "none"}
              placeholder="Enter the otp"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            ></Input>
            <br></br>
            <Button width={"100%"} colorScheme={"red"} onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default Login;
