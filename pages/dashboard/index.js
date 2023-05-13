import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../components/Context/authContext";
import { url } from "../../components/Constants";
import axios from "axios";
import { Router, useRouter } from "next/router";
import dynamic from "next/dynamic";
import DashBar from "../../components/DashBar";
import { Box, Center } from "@chakra-ui/react";
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });

const Dashboard = () => {
  const router = useRouter();
  const { loggedInInfo, setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const getDetails = async () => {
      try {
        let response = await axios.get(`${url}/vehicle/listall/vehicle`, {
          headers: {
            Authorization: `Bearer ${loggedInInfo.token}`,
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
          padding={"4"}
          width={"100%"}
          border={"1px"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Box
            border={"1px"}
            height={"100"}
            width={"100"}
            borderRadius={"full"}
          >
            Your Profile
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
