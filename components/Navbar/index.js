import {
  Avatar,
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
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
import axios from "axios";
import { url } from "../Constants";
const Navbar = ({ activeIndex }) => {
  const [searchString, setString] = useState("");
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const {
    userLoggedInInfo,
    setUserLoggedIn,
    driverLoggedInInfo,
    setDriverLoggedIn,
    admin,
    setAdmin,
  } = useContext(AuthContext);

  const isLoggedIn =
    userLoggedInInfo.isLoggedIn || driverLoggedInInfo.isLoggedIn;
  const handleLogout = () => {
    setUserLoggedIn(false, "");
    setDriverLoggedIn(false, "");
    if (admin) {
      setAdmin(false);
    }

    router.push("/");
  };
  const handleChange = (e) => {
    setString(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    console.log(searchString);
    router.replace(`/search?query=${searchString}`);
    setString("");
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
          <Image src={"/logo3.jpg"} width={"200"} height={"200"}></Image>
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
            <Link href={"/vehiclesnearme"}>Vehicles Near Me</Link>
          </Box>
          {/* <Box
            borderBottom={activeIndex == 3 ? "2px" : "0px"}
            borderBottomColor={"red"}
            paddingBottom={"1"}
          >
            <Link href={"/"}>Vehicles</Link>
          </Box> */}

          <Box
            borderBottom={activeIndex == 4 ? "2px" : "0px"}
            borderBottomColor={"red"}
            paddingBottom={"1"}
          >
            {/* <Menu>
              <MenuButton onClick={() => setOpened(!opened)}>Search</MenuButton>
              <MenuList>
                <MenuItem>
                  <Input
                    onClick={() => setOpened(true)}
                    onChange={handleChange}
                  ></Input>
                </MenuItem>
                <MenuItem>
                  <Button onClick={handleSubmit}>Submit</Button>
                </MenuItem>
              </MenuList>
            </Menu> */}

            <Popover>
              <PopoverTrigger>
                <Button>Search</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />

                <PopoverBody>
                  <Input onChange={handleChange} width={"90%"}></Input>
                  <br></br>
                  <Button onClick={handleSubmit}>Submit</Button>{" "}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          {isLoggedIn ? (
            <Menu>
              {" "}
              <MenuButton as={Button} variant={"unstyled"}>
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList>
                <Link
                  href={
                    userLoggedInInfo.isLoggedIn
                      ? "/dashboard"
                      : "/driver/dashboard"
                  }
                >
                  {" "}
                  <MenuItem>Dashboard</MenuItem>
                </Link>
                {/* <MenuItem>{userLoggedInInfo.userName}</MenuItem> */}
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
            <Menu>
              <MenuButton as={Button} variant={"outline"}>
                Login
              </MenuButton>
              <MenuList>
                <Link href={"/login"}>
                  {" "}
                  <MenuItem>User Login</MenuItem>
                </Link>
                <Link href={"/driver/login"}>
                  {" "}
                  <MenuItem>Driver Login</MenuItem>
                </Link>
              </MenuList>
            </Menu>
            // <Menu>
            //   <Button variant={"outline"} colorScheme="red">
            //     <Link href={"/login"}>Login</Link>
            //   </Button>
            // </Menu>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
