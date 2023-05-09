import React from "react";
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
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });
const AddCategory = () => {
  const formRef = useRef(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    try {
      let response = await axios.post(`${url}/vehicle/add`, data, {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });
      if (response) {
        formRef.current?.reset();
        toast({
          title: `${response.data.msg}`,
          description: "Election Added Successfully",
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
            Add Category
          </Text>

          <form onSubmit={handleSubmit} id="form" ref={formRef}>
            <Stack gap={"3"}>
              <FormControl isRequired>
                <FormLabel>Election Name</FormLabel>
                <Input name="election_name" width={"40%"} type={"text"}></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Election Date</FormLabel>
                <Input name="election_year" width={"40%"} type={"date"}></Input>
              </FormControl>
              <Input
                as={Button}
                bgColor={"blue.500"}
                width={"40%"}
                textColor={"white"}
                type={"submit"}
              >
                Add Election
              </Input>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddCategory;
