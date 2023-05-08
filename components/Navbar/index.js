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
import { ImHome3 } from "react-icons/im";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/authContext";
import { useRouter } from "next/router";
const Navbar = ({ activeIndex }) => {
  const router = useRouter();
  const { loggedInInfo, setLoggedIn } = useContext(AuthContext);
  const isLoggedIn = loggedInInfo.isLoggedIn;
  const handleLogout = () => {
    setLoggedIn(false, "");
    router.push("/");
  };
  // const [activeIndex, setActive] = useState(0);
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
          <Box
            borderBottom={activeIndex == 0 ? "2px" : "0px"}
            borderBottomColor={"red"}
            paddingBottom={"1"}
          >
            <Link href={"/"}>
              <ImHome3 size={"25px"}></ImHome3>
            </Link>
          </Box>

          <Box
            borderBottom={activeIndex == 1 ? "2px" : "0px"}
            borderBottomColor={"red"}
            paddingBottom={"1"}
            _hover={{ borderBottom: "2px" }}
          >
            <Link href={"/contact"}>Contact</Link>
          </Box>

          <Box
            borderBottom={activeIndex == 2 ? "2px" : "0px"}
            borderBottomColor={"red"}
            paddingBottom={"1"}
          >
            <Link href={"/"}>About Us</Link>
          </Box>
          <Box
            borderBottom={activeIndex == 3 ? "2px" : "0px"}
            borderBottomColor={"red"}
            paddingBottom={"1"}
          >
            <Link href={"/"}>Vehicles</Link>
          </Box>

          <Box
            borderBottom={activeIndex == 4 ? "2px" : "0px"}
            borderBottomColor={"red"}
            paddingBottom={"1"}
          >
            <Link href="/search">Search</Link>
          </Box>
          {isLoggedIn ? (
            <Menu>
              {" "}
              <MenuButton as={Button} variant={"unstyled"}>
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList>
                <Link href={"/dashboard"}>
                  {" "}
                  <MenuItem>Dashboard</MenuItem>
                </Link>
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
