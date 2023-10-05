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
import Footer from "../../components/Footer";
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });
const AddCategory = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    logo: "",
  });
  const formRef = useRef(null);
  const formRef1 = useRef(null);
  const toast = useToast();
  const { userLoggedInInfo, setUserLoggedInInfo, admin } =
    useContext(AuthContext);

  const uploadCategoryLogo = async (e) => {
    e.preventDefault();
    console.log("e is", e.target);
    // setFormData({ title: e.target });
    let data = new FormData(e.target);
    try {
      let response = await axios.post(`${url}/upload/image`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response) {
        console.log(response.data.data.image[0]);
        setFormData({ ...formData, logo: response.data.data.image[0] });
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
  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // let data = new FormData(e.target);
    //start from here ok
    console.log(formData);
    try {
      let response = await axios.post(`${url}/vehicle/category/add`, formData, {
        headers: { Authorization: `Bearer ${userLoggedInInfo.token}` },
      });
      if (response) {
        formRef.current?.reset();
        formRef1.current?.reset();
        setFormData({ title: "", description: "", logo: "" });
        toast({
          title: `${response.data}`,
          description: "Category Added Successfully",
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
        <DashBar activeIndex={3} />
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
                <FormLabel>Category Name</FormLabel>
                <Input
                  name="title"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange}
                  value={formData.title}
                ></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange}
                  value={formData.description}
                ></Input>
              </FormControl>

              <Input
                as={Button}
                bgColor={"blue.500"}
                width={"40%"}
                textColor={"white"}
                type={"submit"}
              >
                Add Category
              </Input>
            </Stack>
          </form>

          <form onSubmit={uploadCategoryLogo} ref={formRef1}>
            <FormControl isRequired>
              <FormLabel>Category Logo</FormLabel>
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
      <Footer />
    </>
  );
};

export default AddCategory;
