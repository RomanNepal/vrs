import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiStar } from "react-icons/hi";
import { BiHeart } from "react-icons/bi";
import Image from "next/image";
import {
  Box,
  Button,
  Grid,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  Th,
} from "@chakra-ui/react";
// for commit

import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });
const stars = [1, 2, 3, 4, 5];
const images = ["/brezza.jpg", "/fortuner.jpg", "/scorpio.jpg", "/verna.jpg"];
const Vehicle = () => {
  const [current, setCurrent] = useState(0);
  const settings = {
    appendDots: (dots) => (
      <Box
        alignItems={"center"}
        flexDir={"column"}
        height={"100%"}
        width={"15%"}
        left={"-16"}
      >
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"left"}
          justifyContent={"center"}
          gap={"10"}
          width={"100%"}
          height={"100%"}
          padding={"1"}
        >
          {dots}
        </Box>
      </Box>
    ),
    customPaging: function (i) {
      return (
        <Box
          height={"50px"}
          width={"50px"}
          border={"2px"}
          borderRadius={"md"}
          borderColor={current == i ? "red" : "white"}
          transition={"0.2s all ease-in"}
          _hover={{ border: "2px", borderColor: "red" }}
          position={"relative"}
        >
          <Image src={images[i]} fill objectFit="cover" />
        </Box>
      );
    },
    afterChange: (index) => {
      setCurrent(index);
    },

    autoplay: false,
    autoplaySpeed: 2000,
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots slick-thumb",
  };
  return (
    <>
      <Navbar />
      <Box marginLeft={"7%"}>
        <Box display={"flex"}>
          <Box width={"50%"} p={"5"}>
            <Box height={"100%"} width={"100%"}>
              <Slider {...settings}>
                {images?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      border={"1px"}
                      borderColor={"gray.200"}
                      borderRadius={"xl"}
                      height={"650px"}
                      backgroundImage={item}
                      backgroundPosition={"center"}
                      backgroundSize={"contain"}
                      backgroundRepeat={"no-repeat"}
                    ></Box>
                  );
                })}
              </Slider>
            </Box>
          </Box>
          <Box p={"10"} width={"50%"} fontFamily={"Inter"}>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              {"Jeep Wrangler Rubicon"}
            </Text>
            <Box display={"flex"} alignItems={"center"} gap={"1"}>
              <Text fontSize={"sm"} textColor={"gray.400"}>
                User Reviews:
              </Text>
              <Box display={"flex"}>
                {stars.map((item, index) => {
                  return (
                    <HiStar
                      key={index}
                      color={index < 4 ? "orange" : "#E0E0E0"}
                    ></HiStar>
                  );
                })}
              </Box>
            </Box>
            <br></br>

            <Text
              fontSize={"lg"}
              fontWeight={"semibold"}
              textColor={"gray.400"}
            >
              Description
            </Text>

            <Text fontWeight={"semibold"} fontSize={"lg"}>
              This is the short description for the Jeep Wrangler Rubicon This
              is the short description for the Jeep Wrangler Rubicon This is the
              short description for the Jeep Wrangler Rubicon This is the short
              description for the Jeep Wrangler Rubicon.
            </Text>

            <br></br>
            <Text textColor={"gray.400"} fontWeight={"semibold"}>
              Seller Description
            </Text>
            <Text fontWeight={"semibold"} fontSize={"lg"}>
              Nepal Rental Enterprises
            </Text>
            <br></br>
            <Text
              fontFamily={"Poppins"}
              fontWeight={"semibold"}
              textColor={"#FF497C"}
            >
              Price:
            </Text>
            <Box
              display={"flex"}
              width={"100%"}
              alignItems={"center"}
              gap={"2"}
            >
              <Text fontWeight={"bold"} fontSize={"4xl"} textColor={"red.500"}>
                {"Rs. 2000/day"}
              </Text>
            </Box>
            <br></br>
            <Text textColor={"gray.400"} fontWeight={"semibold"}>
              Select Quantity
            </Text>
            <br></br>
            <form>
              <Box display={"flex"} gap={"4"}>
                <NumberInput
                  name="quantity"
                  defaultValue={1}
                  min={1}
                  width={"20"}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Input
                  as={Button}
                  variant={"filled"}
                  bgColor={"#FF497C"}
                  textColor={"white"}
                >
                  Add To Cart
                </Input>
                <Input as={Button} width={"16"} p={"0"}>
                  <BiHeart />
                </Input>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Vehicle;
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
