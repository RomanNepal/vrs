import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { MdOutlineNavigateNext } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { url } from "../components/Constants";
import { AuthContext } from "../components/Context/authContext";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
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
    hello: {
      this: "roman",
    },
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
    hello: {
      this: "roman",
    },
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
    hello: {
      this: "roman",
    },
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
    hello: {
      this: "roman",
    },
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
    hello: {
      this: "roman",
    },
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
    hello: {
      this: "roman",
    },
  },
];

const Search = () => {
  const {
    userLoggedInInfo,
    setUserLoggedIn,
    driverLoggedInInfo,
    setDriverLoggedIn,
  } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState();
  const router = useRouter();
  const query = router.query.query;
  console.log(query);
  useEffect(() => {
    if (query != "" || typeof query != undefined) {
      const getResult = async () => {
        try {
          let response = await axios.post(
            `${url}/vehicle/search`,
            {
              searchString: query,
            },
            {
              headers: {
                Authorization: `Bearer ${
                  userLoggedInInfo.token
                    ? userLoggedInInfo.token
                    : driverLoggedInInfo.driverToken
                }`,
              },
            }
          );
          console.log(response);
          setVehicles(response.data.data.result);
        } catch (err) {
          console.log(err);
        }
      };
      getResult();
    } else {
      const getResult = async () => {
        try {
          let response = await axios.get(
            `${url}/vehicle/listall/vehicle`,

            {
              headers: {
                Authorization: `Bearer ${
                  userLoggedInInfo.token
                    ? userLoggedInInfo.token
                    : driverLoggedInInfo.driverToken
                }`,
              },
            }
          );
          console.log(response);
          setVehicles(response.data.data.result);
        } catch (err) {
          console.log(err);
        }
      };
      getResult();
    }
  }, [query]);
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
            Search Results for: {query}
          </Text>
          <br></br>
          {console.log(vehicles)}
          {vehicles?.map((item, index) => {
            return (
              <>
                <Box
                  as={Link}
                  key={index}
                  href={`/vehicle/${item.id}`}
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
                      src={item.thumbnail}
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
                      {/* Brand: {item.brand.title} */}
                    </Text>
                    <Text
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      textColor={"gray.600"}
                    >
                      Model: {item.model}
                    </Text>
                    {/* <Text
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      textColor={"gray.600"}
                    >
                      Engine: {}
                    </Text> */}
                    <Text
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      textColor={"gray.600"}
                    >
                      {/* Category: {item.category.title} */}
                    </Text>
                    {/* <Text
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      textColor={"gray.600"}
                    >
                      Seller: {}
                    </Text> */}
                    <Text
                      fontSize={"medium"}
                      fontWeight={"medium"}
                      textColor={"red.600"}
                    >
                      <b>Rate: {item.rate}</b>
                    </Text>

                    <Button
                      // colorScheme={
                      //   item.status === "available"
                      //     ? "green"
                      //     : item.status === "reserved"
                      //     ? "yellow"
                      //     : item.status === "booked"
                      //     ? "red"
                      //     : ""
                      // }
                      padding={"1"}
                      size={"smaller"}
                      fontSize={"x-small"}
                      colorScheme={item.isBooked ? "red" : "green"}
                    >
                      {item.isBooked ? "Booked" : "Available"}
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
      <Footer />
    </>
  );
};

export default Search;
