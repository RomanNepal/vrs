import React, { useContext, useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
// for commit

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "../../components/Constants";
import { AuthContext } from "../../components/Context/authContext";
import Footer from "../../components/Footer";
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });
const stars = [1, 2, 3, 4, 5];
// const images = ["/brezza.jpg", "/fortuner.jpg", "/scorpio.jpg", "/verna.jpg"];
const Vehicle = () => {
  const [vehicle, setVehicle] = useState();
  const [images, setImages] = useState([]);
  const [booked, setBooked] = useState(false);
  const router = useRouter();
  const id = router.query.vehicle;
  const [formData, setFormData] = useState({
    vehicleId: id,
    startDate: "",
    endDate: "",
  });
  const data = { id: id };
  console.log(id);
  const { userLoggedInInfo, setUserLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    const getVehicle = async () => {
      try {
        let result = await axios.post(`${url}/vehicle/vehicle`, data, {
          headers: { Authorization: `Bearer ${userLoggedInInfo.token}` },
        });
        console.log(result.data.data.result);
        if (result.data.data.result.isBooked == true) {
          setBooked(true);
        }
        setVehicle(result.data.data.result);
        setFormData((prev) => {
          return { ...prev, vehicleId: id };
        });
        setImages(result.data.data.result.images);
      } catch (err) {
        console.log(err);
      }
    };
    getVehicle();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 12:00:00.000Z
    let fd = { ...formData };
    fd.startDate = `${fd.startDate}T12:00:00.000Z`;
    fd.endDate = `${fd.endDate}T12:00:00.000Z`;
    console.log(fd);
    try {
      let result = await axios.post(`${url}/booking`, fd, {
        headers: { Authorization: `Bearer ${userLoggedInInfo.token}` },
      });
      console.log(result.data.data);
      setFormData({
        vehicleId: id,
        startDate: "",
        endDate: "",
      });
      toast({
        title: `${result.data.data.msg}`,
        description: `${""}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

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
              {vehicle?.title}
            </Text>
            {/* <Box display={"flex"} alignItems={"center"} gap={"1"}>
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
            </Box> */}
            <br></br>

            <Text
              fontSize={"lg"}
              fontWeight={"semibold"}
              textColor={"gray.400"}
            >
              Description
            </Text>

            <Text fontWeight={"semibold"} fontSize={"lg"}>
              {vehicle?.description}
            </Text>

            <br></br>
            {/* <Text textColor={"gray.400"} fontWeight={"semibold"}>
              Seller Description
            </Text> */}
            {/* <Text fontWeight={"semibold"} fontSize={"lg"}>
              Nepal Rental Enterprises
            </Text> */}
            <br></br>
            <Text
              fontFamily={"Poppins"}
              fontWeight={"semibold"}
              textColor={"#FF497C"}
            >
              Rate:
            </Text>
            <Box
              display={"flex"}
              width={"100%"}
              alignItems={"center"}
              gap={"2"}
            >
              <Text fontWeight={"bold"} fontSize={"4xl"} textColor={"red.500"}>
                {vehicle?.rate}
              </Text>
            </Box>
            <br></br>
            <Text textColor={"gray.400"} fontWeight={"semibold"}>
              Select Start & End Date
            </Text>
            <br></br>
            <form>
              <Box display={"flex"} gap={"4"}>
                {/* <NumberInput
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
                </NumberInput> */}
                <Input
                  type={"date"}
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                ></Input>
                <Input
                  type={"date"}
                  onChange={handleChange}
                  name="endDate"
                  value={formData.endDate}
                ></Input>

                {/* <Input as={Button} width={"16"} p={"0"}>
                  <BiHeart />
                </Input> */}
              </Box>
              <br></br>
              <Button
                isDisabled={booked ? true : false}
                variant={"filled"}
                bgColor={"#FF497C"}
                textColor={"white"}
                onClick={handleSubmit}
                width={"100%"}
              >
                Book Now
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Vehicle;
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
