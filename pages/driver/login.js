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
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });
import axios from "axios";
import Router, { useRouter } from "next/router";
import { url } from "../../components/Constants";
import { AuthContext } from "../../components/Context/authContext";
const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { driverLoggedInInfo, setDriverLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (driverLoggedInInfo.isLoggedIn) {
      // router.push("/");
    } else {
      console.log("not logged in");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (show) {
        let response = await axios.post(`${url}/driver/verify-otp`, {
          phone: phone,
          otp: otp,
        });
        console.log(response.data.data.token);
        setDriverLoggedIn(true, response.data.data.token);
        if (response.data.data.isProfileUpdated != true)
          router.push("/driver/updateprofile");
        else {
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
        console.log(response.data);
        if (response) {
          setShow(true);
        }
      }
    } catch (err) {
      console.log(err);
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
