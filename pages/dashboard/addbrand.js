import React, { useContext } from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import axios from "axios";
import DashBar from "../../components/DashBar";
import { url } from "../../components/Constants";
import dynamic from "next/dynamic";
import { AuthContext } from "../../components/Context/authContext";
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });
const AddBrand = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    logo: "",
  });
  const formRef = useRef(null);
  const toast = useToast();
  const { loggedInInfo, setLoggedIn } = useContext(AuthContext);
  const uploadBrandLogo = async (e) => {
    e.preventDefault();
    console.log("e is", e);
    let data = new FormData(e.target);
    try {
      let response = await axios.post(`${url}/upload/image`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response) {
        console.log(response.data.data.image[0]);
        setFormData({ ...formData, title: response.data.data.image[0] });
        toast({
          title: `${response.data.msg}`,
          description: `${formData.photo}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData(e.target);

    try {
      let response = await axios.post(`${url}/vehicle/brand/add`, data, {
        headers: { Authorization: `Bearer ${loggedInInfo.token}` },
      });
      if (response) {
        formRef.current?.reset();
        toast({
          title: `${response.data}`,
          description: "Brand Added Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <Box display={"flex"}>
        <DashBar />
        <Box
          display={"flex"}
          width={"85%"}
          pl={"20"}
          pr={"20"}
          flexDirection={"column"}
        >
          <Text mb={"3"} fontSize={"2xl"} fontWeight={"bold"}>
            Add Brand
          </Text>

          <form onSubmit={handleSubmit} id="form" ref={formRef}>
            <Stack gap={"3"}>
              <FormControl isRequired>
                <FormLabel>Brand Name</FormLabel>
                <Input name="title" width={"40%"} type={"text"}></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input name="description" width={"40%"} type={"text"}></Input>
              </FormControl>

              <Input
                as={Button}
                bgColor={"blue.500"}
                width={"40%"}
                textColor={"white"}
                type={"submit"}
              >
                Add Brand
              </Input>
            </Stack>
          </form>

          <form onSubmit={uploadBrandLogo} id="form1">
            <FormControl isRequired>
              <FormLabel>Brand Logo</FormLabel>
              <Input name="images" width={"40%"} type={"file"}></Input>
              &nbsp;
              <Input
                as={Button}
                bgColor={"blue.500"}
                width={"10%"}
                type={"submit"}
                textColor={"white"}
              >
                Upload
              </Input>
            </FormControl>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddBrand;
