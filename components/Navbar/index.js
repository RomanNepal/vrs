import { Avatar, Box, Button, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = ({ loggedIn }) => {
  return (
    <Box position={"sticky"} top={"0"} zIndex={"100"}>
      <Box
        top={"0"}
        position={"sticky"}
        fontFamily={"Inter"}
        className="top-menu-bar"
        textAlign={"right"}
      >
        <Box
          textColor={"white"}
          pr={"7%"}
          pt={"1"}
          pb={"1"}
          bgColor={"#DE3450"}
        >
          Call: 9825319866
        </Box>
      </Box>
      <Box
        className="main-menu-bar"
        fontFamily={"Inter"}
        display={"flex"}
        bgColor={"white"}
        paddingLeft={"7%"}
        paddingRight={"7%"}
        paddingTop={"4"}
        paddingBottom={"4"}
        fontWeight={"medium"}
      >
        <Box>
          <Image src={"/logo.jpg"} width={"200"} height={"200"}></Image>
        </Box>
        <Spacer />
        <Box display={"flex"} gap={"12"} alignItems={"center"}>
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Contact</Link>
          <Link href={"/"}>About Us</Link>
          <Link href={"/"}>Vehicles</Link>
          <Link href="/search">Search</Link>
          {loggedIn ? (
            <Avatar />
          ) : (
            <Button variant={"outline"} colorScheme="red">
              <Link href={"/login"}>Login</Link>
            </Button>
          )}

          <Button colorScheme="red">
            <Link href={"/"}>Book Now</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
