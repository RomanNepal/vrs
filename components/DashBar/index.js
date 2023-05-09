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
          textColor={"white"}
        >
          {" "}
          <Link href={"/"}>Profile</Link>
        </Box>
        <Box paddingLeft={"2"}>
          <Menu>
            <MenuButton display={"flex"}>Vehicle</MenuButton>
            <MenuList>
              {" "}
              <Link href="/dashboard/addvehicle">
                <MenuItem>Add</MenuItem>
              </Link>
              <MenuItem>Show All</MenuItem>
            </MenuList>
          </Menu>

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
        <Box paddingLeft={"2"}>
          <Link href={"/"}>Category</Link>
        </Box>
        <Box paddingLeft={"2"}>
          <Link href={"/"}>SubCategory</Link>
        </Box>
        <Box paddingLeft={"2"}>
          <Link href={"/"}>Bookings</Link>
        </Box>
      </Box>
    </>
  );
};

export default DashBar;
