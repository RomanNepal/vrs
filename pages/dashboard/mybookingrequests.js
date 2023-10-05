import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import DashBar from "../../components/DashBar";
import dynamic from "next/dynamic";
import { headers } from "next/dist/client/components/headers";
import { AuthContext } from "../../components/Context/authContext";
import axios from "axios";
import { url } from "../../components/Constants";
import { BiEdit } from "react-icons/bi";
import { BsOption } from "react-icons/bs";
import { CgOptions } from "react-icons/cg";
import { Nanum_Brush_Script } from "@next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });

const MyBookingRequests = () => {
  const { userLoggedInInfo, setUserLoggedIn } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [vehicleId, setVehicleId] = useState("");
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    const getResults = async () => {
      try {
        let response = await axios.get(`${url}/booking/booking-requests`, {
          headers: { Authorization: `Bearer ${userLoggedInInfo.token}` },
        });
        console.log(response.data.data);
        setBookings(response.data.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    getResults();
  }, []);
  const cancelBooking = async (e, id) => {
    try {
      let response = await axios.post(
        `${url}/booking/accept-or-reject`,
        {
          id: id,
          status: "rejected",
        },
        { headers: { Authorization: `Bearer ${userLoggedInInfo.token}` } }
      );
      toast({
        title: `${response.data.data.msg}`,
        description: `${""}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/dashboard/mybookingrequests");
    } catch (err) {
      console.log(err);
    }
  };

  const acceptBooking = async (e, id) => {
    console.log(userLoggedInInfo.token);
    console.log(id);
    let data = { id: id, status: "accepted" };
    console.log("data is: ", data);
    try {
      let response = await axios.post(`${url}/booking/accept-or-reject`, data, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczMWMyOTc3LTNlZTAtNDE4OC04YzVmLTYzYzZjNzliMjE1ZSIsInBob25lIjo5ODI1MzE5ODY2LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODQxNTIxMDR9.ztQQYaVx4lxONgtw9sauSscVIP3UiMiIxmjRB2HX_k8`,
        },
      });
      toast({
        title: `${response.data.data.msg}`,
        description: `${""}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.route("/dashboard/mybookingrequests");
    } catch (err) {
      console.log(err);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (e) => {
    console.log(e);
    onOpen();
  };
  return (
    <>
      <Navbar />
      <Box display={"flex"}>
        <DashBar activeIndex={5} />

        <Box borderRadius={"xl"} width={"100%"} paddingLeft={"8"}>
          <br></br>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            Bookings Requests On Your Vehicles
          </Text>
          <br></br>
          {bookings?.length ? (
            bookings.map((item, index) => {
              return (
                <>
                  <Box
                    display={"flex"}
                    borderRadius={"md"}
                    bgColor={index % 2 == 0 ? "gray.100" : "white"}
                    marginLeft={"8"}
                    marginRight={"8"}
                    paddingLeft={"4"}
                    alignItems={"center"}
                  >
                    <Text>{item.vehicle.title}</Text>&nbsp;&nbsp;
                    <Button
                      colorScheme={
                        item.status == "accepted"
                          ? "green"
                          : item.status == "rejected"
                          ? "red"
                          : "yellow"
                      }
                      size={"xs"}
                    >
                      {item.status}
                    </Button>
                    <Spacer />
                    <Menu>
                      <MenuButton
                        as={Button}
                        colorScheme="red"
                        onClick={handleClick}
                      >
                        View
                      </MenuButton>
                      <MenuList>
                        <Box padding={"8"}>
                          <Image
                            width={"300"}
                            height={"300"}
                            src={item.thumbnail}
                          ></Image>
                          <Text>From: {item.startDate.substring(0, 10)}</Text>
                          <Text>To: {item.endDate.substring(0, 10)}</Text>
                          <Box display={"flex"} justifyContent={"left"}>
                            <Button
                              colorScheme="green"
                              onClick={(e) => acceptBooking(e, item.id)}
                            >
                              Accept
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                              colorScheme="red"
                              onClick={(e) => cancelBooking(e, item.id)}
                            >
                              Reject
                            </Button>
                          </Box>
                        </Box>
                      </MenuList>
                    </Menu>
                    {/* <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>{item.vehicle.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Image
                            width={"300"}
                            height={"300"}
                            src={item.thumbnail}
                          ></Image>
                          <Text>From: {item.startDate.substring(0, 10)}</Text>
                          <Text>To: {item.endDate.substring(0, 10)}</Text>
                        </ModalBody>

                        <ModalFooter display={"flex"} justifyContent={"left"}>
                          <Button
                            colorScheme="green"
                            onClick={(e) => acceptBooking(e, item.id)}
                          >
                            Accept
                          </Button>
                          &nbsp;&nbsp;&nbsp;
                          <Button
                            colorScheme="red"
                            onClick={(e) => cancelBooking(e, item.id)}
                          >
                            Reject
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal> */}
                  </Box>
                  <br></br>
                </>
              );
            })
          ) : (
            <Text color={"red.600"}>No Bookings Yet</Text>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyBookingRequests;
