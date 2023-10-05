import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { CgChevronDown } from "react-icons/cg";
import { AuthContext } from "../Context/authContext";

const DashBar = (props) => {
  // useEffect(() => {
  //   const getDetail = () => {

  //   };
  //   getDetail();
  // }, []);

  const {
    userLoggedInInfo,
    setUserLoggedInInfo,
    driverLoggedInInfo,
    setDriverLoggedInInfo,
    admin,
  } = useContext(AuthContext);
  console.log("admin is: ", admin);
  return (
    <>
      <Box
        {...props}
        display={"flex"}
        flexDir={"column"}
        gap={"5"}
        padding={"8"}
        borderRadius={"xl"}
        bgColor={"gray.100"}
        width={"20%"}
      >
        <Box
          paddingLeft={"4"}
          paddingRight={"4"}
          paddingTop={"2"}
          paddingBottom={"2"}
          borderRadius={"lg"}
          bgColor={props.activeIndex === 0 ? "#E53E3E" : ""}
          textColor={props.activeIndex === 0 ? "white" : "black"}
        >
          {" "}
          <Link href={"/dashboard"}>Profile</Link>
        </Box>
        <Box
          paddingLeft={"4"}
          paddingRight={"4"}
          paddingTop={"2"}
          paddingBottom={"2"}
          borderRadius={"lg"}
          bgColor={props.activeIndex === 1 ? "#E53E3E" : ""}
          textColor={props.activeIndex === 1 ? "white" : "black"}
        >
          <Menu>
            <MenuButton display={"flex"}>Vehicle</MenuButton>
            <MenuList textColor={"black"}>
              <Link href="/dashboard/addvehicle">
                <MenuItem>Add</MenuItem>
              </Link>
              <Link href={"/dashboard/unverifiedvehicles"}>
                <MenuItem>Show Unverified Vehicles</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
        <>
          {driverLoggedInInfo.driverToken == "" && (
            <>
              <Box
                paddingLeft={"4"}
                paddingRight={"4"}
                paddingTop={"2"}
                paddingBottom={"2"}
                borderRadius={"lg"}
                bgColor={props.activeIndex === 2 ? "#E53E3E" : ""}
                textColor={props.activeIndex === 2 ? "white" : "black"}
              >
                <Menu>
                  <MenuButton>Brand</MenuButton>
                  <MenuList>
                    <Link href="/dashboard/addbrand">
                      <MenuItem>Add Brand</MenuItem>
                    </Link>
                    <MenuItem>Show All Brands</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box
                paddingLeft={"4"}
                paddingRight={"4"}
                paddingTop={"2"}
                paddingBottom={"2"}
                borderRadius={"lg"}
                bgColor={props.activeIndex === 3 ? "#E53E3E" : ""}
                textColor={props.activeIndex === 3 ? "white" : "black"}
              >
                <Menu>
                  <MenuButton display={"flex"}>Category</MenuButton>
                  <MenuList>
                    {" "}
                    <Box display={admin ? "block" : "none"}>
                      <Link href="/dashboard/addcategory">
                        <MenuItem>Add Category</MenuItem>
                      </Link>
                    </Box>
                    <MenuItem>Show All Category</MenuItem>
                  </MenuList>
                </Menu>
              </Box>

              <Box
                paddingLeft={"4"}
                paddingRight={"4"}
                paddingTop={"2"}
                paddingBottom={"2"}
                borderRadius={"lg"}
                bgColor={props.activeIndex === 4 ? "#E53E3E" : ""}
                textColor={props.activeIndex === 4 ? "white" : "black"}
              >
                <Menu>
                  <MenuButton display={"flex"}>Sub Category</MenuButton>
                  <MenuList>
                    {" "}
                    <Box display={admin ? "block" : "none"}>
                      <Link href="/dashboard/addsubcategory">
                        <MenuItem>Add Sub Category</MenuItem>
                      </Link>
                    </Box>
                    <MenuItem>Show All Sub Category</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </>
          )}
        </>

        <Box
          paddingLeft={"4"}
          paddingRight={"4"}
          paddingTop={"2"}
          paddingBottom={"2"}
          borderRadius={"lg"}
          bgColor={props.activeIndex === 5 ? "#E53E3E" : ""}
        >
          <Menu>
            <MenuButton
              display={"flex"}
              textColor={props.activeIndex === 5 ? "white" : "black"}
            >
              Bookings
            </MenuButton>
            <MenuList>
              {" "}
              <Link href="/dashboard/mybookings">
                <MenuItem textColor="black">My Bookings</MenuItem>
              </Link>
              <Link href={"/dashboard/mybookingrequests"}>
                <MenuItem textColor="black">My Booking Requests</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default DashBar;
