import { Box, Center, Divider, Grid, Image, Text } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import React from "react";
import { BsTelephone } from "react-icons/bs";
import {
  FaFacebook,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";
const Footer = (props) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Box display={props.display ? props.display : ""}>
      <Box
        ml={"7%"}
        mr={"7%"}
        pt={"10"}
        pb={"10"}
        borderBottom={"1px"}
        borderColor={"gray.200"}
        fontFamily={"Inter"}
      >
        <Grid
          templateColumns={"repeat(4, 1fr)"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDir={"column"} gap={"5"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Support
            </Text>
            <Box textColor={"gray.500"}>
              <Text>Putalisadak,</Text>
              <Text>Kathmandu,</Text>
              <Text>Nepal.</Text>
            </Box>

            <Box textColor={"gray.500"}>
              <Box display={"flex"} alignItems={"center"} gap={"1"}>
                <RiMailSendLine></RiMailSendLine>
                <Text>vrs@gmail.com</Text>
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={"1"}>
                <BsTelephone />
                <Text>9825319866, 9862234282</Text>
              </Box>
            </Box>
          </Box>

          <Box display={"flex"} flexDir={"column"} gap={"5"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Account
            </Text>
            <Box
              textColor={"gray.500"}
              fontWeight={"semibold"}
              display={"flex"}
              flexDir={"column"}
              gap={"3"}
            >
              <Text>Login/Register</Text>
              <Text>Cart</Text>
              <Text>Wishlist</Text>
            </Box>
          </Box>

          <Box display={"flex"} flexDir={"column"} gap={"5"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Quick Link
            </Text>
            <Box
              textColor={"gray.500"}
              display={"flex"}
              flexDir={"column"}
              gap={"3"}
            >
              <Text>Privacy Policy</Text>
              <Text>FAQ</Text>
              <Text>Contact</Text>
            </Box>
          </Box>

          <Box display={"flex"} flexDir={"column"} gap={"5"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Support
            </Text>
            <Box textColor={"gray.500"}>
              <Text>Putalisadak,</Text>
              <Text>Kathmandu,</Text>
              <Text>Nepal.</Text>
            </Box>

            <Box textColor={"gray.500"}>
              <Box display={"flex"} alignItems={"center"} gap={"1"}>
                <RiMailSendLine></RiMailSendLine>
                <Text>vrs@gmail.com</Text>
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={"1"}>
                <BsTelephone />
                <Text>9825319866, 9862234282</Text>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
      {/* bottom footer */}

      <Box display={"flex"} ml={"7%"} mr={"7%"}>
        <Box width={"33%"} display={"flex"} pt={"5"} pb={"5"} gap={"3"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"6"}
            width={"6"}
            borderRadius={"50%"}
            transition={"all 0.5s ease"}
            cursor={"pointer"}
            _hover={{ bgColor: "#FF497C", color: "white" }}
          >
            <FaFacebookF />
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"6"}
            width={"6"}
            borderRadius={"50%"}
            transition={"all 0.5s ease"}
            cursor={"pointer"}
            _hover={{ bgColor: "#FF497C", color: "white" }}
          >
            <FaInstagram />
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"6"}
            width={"6"}
            borderRadius={"50%"}
            transition={"all 0.5s ease"}
            cursor={"pointer"}
            _hover={{ bgColor: "#FF497C", color: "white" }}
          >
            <FaTwitter />
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"6"}
            width={"6"}
            borderRadius={"50%"}
            transition={"all 0.5s ease"}
            cursor={"pointer"}
            _hover={{ bgColor: "#FF497C", color: "white" }}
          >
            <FaLinkedin />
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"6"}
            width={"6"}
            borderRadius={"50%"}
            transition={"all 0.5s ease"}
            cursor={"pointer"}
            _hover={{ bgColor: "#FF497C", color: "white" }}
          >
            <FaGithub />
          </Box>
        </Box>
        <Box
          width={"33%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize={"smaller"} textColor={"gray.500"}>
            Copyright @vrs.com
          </Text>
        </Box>

        <Box
          width={"33%"}
          display={"flex"}
          gap={"3"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {" "}
          <Image src="/esewa.png" height={"40px"} width={"40px"}></Image>
          <Image src="/khalti.png" height={"40px"}></Image>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
