import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import { url } from "../components/Constants";
const Verify = () => {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      let response = await axios.post(`${url}/auth/send-otp`, { phone: phone });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <Center marginTop={"10%"}>
        <Box>
          <form>
            <Text fontWeight={"semibold"} fontSize={"2xl"}>
              Enter Your Phone Number
            </Text>
            <br></br>
            <Input
              type={"number"}
              placeholder="10-digit phone number"
              onChange={(e) => setOtp(e.target.value)}
              value={phone}
            ></Input>
            <br></br>
            <br></br>
            <Button width={"100%"} colorScheme={"red"} onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </Box>
      </Center>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default Verify;
