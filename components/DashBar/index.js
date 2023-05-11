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
import React from "react";
import { CgChevronDown } from "react-icons/cg";

const DashBar = (props) => {
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
              <MenuItem>Show All</MenuItem>
            </MenuList>
          </Menu>
        </Box>
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
            <MenuButton display={"flex"}>Brand</MenuButton>
            <MenuList>
              {" "}
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
              <Link href="/dashboard/addcategory">
                <MenuItem>Add Category</MenuItem>
              </Link>
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
              <Link href="/dashboard/addsubcategory">
                <MenuItem>Add Sub Category</MenuItem>
              </Link>
              <MenuItem>Show All Sub Category</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Box
          paddingLeft={"4"}
          paddingRight={"4"}
          paddingTop={"2"}
          paddingBottom={"2"}
          borderRadius={"lg"}
          bgColor={props.activeIndex === 5 ? "#E53E3E" : ""}
          textColor={props.activeIndex === 5 ? "white" : "black"}
        >
          <Link href={"/"}>Bookings</Link>
        </Box>
      </Box>
    </>
  );
};

export default DashBar;
