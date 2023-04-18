import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const CarCard = (prop) => {
  return (
    <Box
      height={"150px"}
      width={"300px"}
      // border={"1px"}
      borderRadius={"2xl"}
      position={"relative"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      // bgColor={"red"}
    >
      <Box
        position={"absolute"}
        zIndex={"1"}
        bgColor={"black"}
        width={"100%"}
        height={"100%"}
        borderRadius={"2xl"}
        opacity={"0.4"}
      ></Box>

      <Text
        zIndex={"2"}
        textColor={"white"}
        fontFamily={"Inter"}
        fontWeight={"semibold"}
        fontSize={"2xl"}
        position={"absolute"}
      >
        {prop.title}
      </Text>

      <Box bgColor={"red"}>
        {prop.image ? (
          <Image src={prop.image} fill objectFit="contain"></Image>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default CarCard;
