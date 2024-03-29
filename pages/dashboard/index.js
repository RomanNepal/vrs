import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/Context/authContext";
import { url } from "../../components/Constants";
import axios from "axios";
import { Router, useRouter } from "next/router";
import dynamic from "next/dynamic";
import DashBar from "../../components/DashBar";
import { Box, Center, Table, Td, Text, Th, Tr } from "@chakra-ui/react";
import Image from "next/image";
import Footer from "../../components/Footer";
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });

const Dashboard = () => {
  const [profile, setProfile] = useState();
  const router = useRouter();
  const {
    userLoggedInInfo,
    setUserLoggedIn,
    driverLoggedInInfo,
    setDriverLoggedIn,
  } = useContext(AuthContext);

  useEffect(() => {
    const getDetails = async () => {
      try {
        let response = await axios.get(`${url}/user/profile`, {
          headers: {
            Authorization: `Bearer ${userLoggedInInfo.token}`,
          },
        });
        setProfile(response.data.data.result);
        console.log(response);
      } catch (err) {
        if (err.response.status === 401) {
          router.push("/login");
        }
        router.push("/login");
      }
    };
    getDetails();
  }, []);
  return (
    <>
      <Navbar activeIndex={0} />
      <Box display={"flex"}>
        <DashBar activeIndex={0} />

        <Box
          fontSize={"lg"}
          fontWeight={"medium"}
          padding={"4"}
          paddingLeft={"10"}
          width={"100%"}
          display={"flex"}
          flexDir={"column"}
          gap={"5"}
        >
          <Text>
            <b>Full Name:</b> {profile?.fullName}
          </Text>

          <Text>
            <b>Gender:</b> {profile?.gender}
          </Text>
          <Text>
            <b>Province:</b> {profile?.address?.province}
          </Text>
          <Text>
            <b>District:</b> {profile?.address?.district}
          </Text>
          {/* <Text>Street: {profile?.address?.street}</Text> */}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
