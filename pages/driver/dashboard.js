import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/Context/authContext";
import { url } from "../../components/Constants";
import axios from "axios";
import { Router, useRouter } from "next/router";
import dynamic from "next/dynamic";
import DashBar from "../../components/DashBar";
import { Box, Center, Text } from "@chakra-ui/react";
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });

const Dashboard = () => {
  const router = useRouter();
  const { driverLoggedInInfo, setDriverLoggedIn } = useContext(AuthContext);
  const [profile, setProfile] = useState();
  useEffect(() => {
    const getDetails = async () => {
      try {
        let response = await axios.get(`${url}/vehicle/listall/vehicle`, {
          headers: {
            Authorization: `Bearer ${driverLoggedInInfo.driverToken}`,
          },
        });
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
        >
          <Text>Full Name: Roman Nepal</Text>
          <Text>Gender:male</Text>
          <Text>Province: Province 1</Text>
          <Text>District: Sunsari</Text>
          <Text>Street: Chakraghatti</Text>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
