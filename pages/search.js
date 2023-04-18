import React from "react";
import Navbar from "../components/Navbar";
import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { MdOutlineNavigateNext } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
const arr = [
  "Cars",
  "Bikes",
  "Bicycle",
  "Off Road",
  "Sedan",
  "Hatchback",
  "SUV (5 Seater)",
  "SUV (7 Seater)",
];
const cars = [
  {
    title: "Jeep Wrangler Rubicon-3.0l v8 OFF ROAD",
    company: "Jeep",
    model: "2020",
    engine: "3.0l v8",
    category: "OFF ROAD",
    seller: "Nepal Rental Enterprises",
    image: "/jeep.jpg",
    status: "available",
    price: "Rs. 3000/day",
  },
  {
    title: "Mahindra Scorpio s11",
    company: "Mahindra",
    model: "2018",
    engine: "1998cc NA 4 cylinder",
    category: "SUV (7 seater)",
    seller: "Nepal Rental Enterprises",
    image: "/scorpio.jpg",
    status: "reserved",
    price: "Rs. 2000/day",
  },
  {
    title: "Hyundai Verna Sedan Luxury",
    company: "Hyundai",
    model: "2015",
    engine: "1498cc NA 4 cylinder",
    category: "Sedan",
    seller: "Nepal Rental Enterprises",
    image: "/verna.jpg",
    status: "available",
    price: "Rs. 1500/day",
  },
  {
    title: "Hyundai Creta Black",
    company: "Hyundai",
    model: "2019",
    engine: "1198 NA 3 cylinder",
    category: "SUV(5 seater)",
    seller: "Nepal Rental Enterprises",
    image: "/creta.jpg",
    status: "booked",
    price: "Rs. 1400/day",
  },
  {
    title: "Maruti Suzuki Vitara Brezza",
    company: "Maruti Suzuki",
    model: "2021",
    engine: "1498 NA 3 cylinder",
    category: "SUV(5 seater)",
    seller: "Nepal Rental Enterprises",
    image: "/brezza.jpg",
    status: "available",
    price: "Rs. 1400/day",
  },
  {
    title: "Toyota Fortuner VIP",
    company: "Toyota",
    model: "2017",
    engine: "2798 NA 6 cylinder",
    category: "SUV(5 seater)",
    seller: "Nepal Rental Enterprises",
    image: "/fortuner.jpg",
    status: "reserved",
    price: "Rs. 5000/day",
  },
];
const Search = () => {
  return (
    <>
      <Navbar />

      <Box
        display={"flex"}
        marginLeft={"7%"}
        marginRight={"7%"}
        marginTop={"8"}
      >
        <Box height={"1000"} width={"25%"} position={"sticky"} top={"0"}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Categories:
          </Text>
          <br></br>
          {arr?.map((item, index) => {
            return (
              <>
                <Box
                  _hover={{ textColor: "red" }}
                  padding={"1"}
                  display={"flex"}
                >
                  <Box width={"90%"}>{item}</Box>
                  <Box
                    width={"10%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <MdOutlineNavigateNext size={"20px"} />
                  </Box>
                </Box>
                <Divider />
              </>
            );
          })}
        </Box>
        <Divider height={"100%"} ml={"4"} mr={"4"} orientation="vertical" />
        <Box width={"50%"}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Search Results:
          </Text>
          <br></br>

          {cars?.map((item, index) => {
            return (
              <>
                <Box
                  as={Link}
                  href={"/jeep"}
                  paddingRight={"4"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Box
                    height={"100px"}
                    width={"150px"}
                    borderRadius={"xl"}
                    position={"relative"}
                    overflow={"hidden"}
                  >
                    <Image
                      src={item.image}
                      // height={"100"}
                      // width={"100"}
                      fill
                      objectFit="cover"
                    ></Image>
                  </Box>
                  <Box width={"70%"} paddingLeft={"5"} wordBreak={"break-word"}>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"lg"}
                      textColor={"gray.600"}
                    >
                      {item.title}
                    </Text>
                    <Text
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      textColor={"gray.600"}
                    >
                      Company: {item.company}
                    </Text>
                    <Text
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      textColor={"gray.600"}
                    >
                      Model: {item.model}
                    </Text>
                    <Text
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      textColor={"gray.600"}
                    >
                      Engine: {item.engine}
                    </Text>
                    <Text
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      textColor={"gray.600"}
                    >
                      Category: {item.category}
                    </Text>
                    <Text
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      textColor={"gray.600"}
                    >
                      Seller: {item.seller}
                    </Text>
                    <Text
                      fontSize={"medium"}
                      fontWeight={"medium"}
                      textColor={"gray.600"}
                    >
                      <b>Price: {item.price}</b>
                    </Text>

                    <Button
                      colorScheme={
                        item.status === "available"
                          ? "green"
                          : item.status === "reserved"
                          ? "yellow"
                          : item.status === "booked"
                          ? "red"
                          : ""
                      }
                      padding={"1"}
                      size={"smaller"}
                      fontSize={"x-small"}
                    >
                      {item.status}
                    </Button>
                  </Box>
                </Box>
                <Divider marginTop={"4"} marginBottom={"4"} />
              </>
            );
          })}
        </Box>
        <Box width={"25%"}></Box>
      </Box>
    </>
  );
};

export default Search;
