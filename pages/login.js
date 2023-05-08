import {
  Box,
  Button,
  Center,
  Input,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
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
  const Toast = useToast();
  const { loggedInInfo, setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (loggedInInfo.isLoggedIn) {
      router.back();
    } else {
      console.log("not logged in");
    }
  }, []);
  const handleSubmit = async (e) => {
    try {
      if (show) {
        let response = await axios.post(`${url}/auth/verify-otp`, {
          phone: phone,
          otp: otp,
        });

        setLoggedIn(true, response.data.data.token);
        router.push("/updateprofile");
      } else {
        let response = await axios.post(`${url}/auth/send-otp`, {
          phone: phone,
        });
        console.log(response.data);
        if (response) {
          setShow(true);
        }
      }
    } catch (err) {
      console.log(err);
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
