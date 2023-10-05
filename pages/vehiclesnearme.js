import React, { useContext, useEffect, useState } from "react";
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
import Script from "next/script";
import {
  GoogleMap,
  GoogleMapsMarkerClusterer,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import {
  Box,
  Button,
  Center,
  Divider,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import dynamic from "next/dynamic";
import { url } from "../components/Constants";
import { AuthContext } from "../components/Context/authContext";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
const VehiclesNearMe = () => {
  const center = {
    lat: 27.7172,
    lng: 85.324,
  };
  const {
    userLoggedInInfo,
    setUserLoggedIn,
    driverLoggedInInfo,
    setDriverLoggedIn,
  } = useContext(AuthContext);
  const [loc, setLoc] = useState(null);
  const [cntr, setCenter] = useState(center);
  const [radius, setRadius] = useState(20);
  const [vehicles, setVehicles] = useState();
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    if (userLoggedInInfo.token || driverLoggedInInfo.driverToken) {
    } else {
      toast({
        title: `Please Login To Continue`,
        description: "",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      router.push("/login");
    }
  }, []);
  //   google.maps.Geocoder();

  const handleClick = async (e) => {
    console.log(e);
    console.log(e.latLng.lat());
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setLoc({ lat: lat, lng: lng });
    setCenter({ lat: lat, lng: lng });

    try {
      let response = await axios.post(
        `${url}/vehicle/listall/nearme`,
        {
          lat: lat,
          lon: lng,
          radius: radius,
        },
        { headers: { Authorization: `Bearer ${userLoggedInInfo.token}` } }
      );
      console.log(response.data);
      setVehicles(response.data.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };
  return (
    <>
      <Navbar activeIndex={2} />
      <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
        Select the location on the map
      </Text>
      <br></br>
      <Box justifyContent={"center"} display={"flex"} alignItems={"center"}>
        <Text textAlign={"center"}>Enter Radius:</Text>
        <Input
          width={"100px"}
          type="number"
          name="radius"
          onChange={(e) => setRadius(e.target.value)}
          value={radius}
        ></Input>
      </Box>
      <br></br>

      <Center>
        <LoadScript googleMapsApiKey="">
          <GoogleMap
            mapContainerStyle={{ width: "90%", height: "400px" }}
            center={cntr}
            zoom={13}
            onClick={handleClick}
            options={{ zoomControl: { scroll: true } }}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <Marker position={loc} />
          </GoogleMap>
        </LoadScript>
      </Center>
      <br></br>
      <Box marginLeft={"16"} width={"90%"}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Vehicles Near You
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
      <Footer />
    </>
  );
};

export default VehiclesNearMe;
