import { Box, Link } from "@chakra-ui/react";
import React from "react";

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
          bgColor={props.activeIndex===0?"#E53E3E"}
          textColor={"white"}
        >
          {" "}
          <Link>Profile</Link>
        </Box>
        <Box paddingLeft={"2"}>
          <Link>Vehicle</Link>
        </Box>
        <Box paddingLeft={"2"}>
          <Link>Category</Link>
        </Box>
        <Box paddingLeft={"2"}>
          <Link>SubCategory</Link>
        </Box>
        <Box paddingLeft={"2"}>
          <Link>Bookings</Link>
        </Box>
      </Box>
    </>
  );
};

export default DashBar;
