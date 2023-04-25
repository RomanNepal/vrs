import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { loggedInInfo, setLoggedIn } = useContext(AuthContext);
  const isLoggedIn = loggedInInfo.isLoggedIn;
  const handleLogout = () => {
    setLoggedIn(false, "");
    router.push("/");
  };
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
          {isLoggedIn ? (
            <Menu>
              {" "}
              <MenuButton as={Button} variant={"unstyled"}>
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList>
                <MenuItem>Roman Nepal</MenuItem>
                <MenuItem>
                  <Button variant={"unstyled"} onClick={handleLogout}>
                    {" "}
                    <Box display={"flex"} alignItems={"center"}>
                      <FiLogOut /> &nbsp; <Text>Logout</Text>
                    </Box>
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
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
