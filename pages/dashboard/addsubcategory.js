import React, { useContext, useEffect } from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useToast,
  Select,
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
    categoryId: "",
  });
  const formRef = useRef(null);
  const formRef1 = useRef(null);
  const toast = useToast();
  const { userLoggedInInfo, setUserLoggedIn } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      try {
        let result = await axios.get(`${url}/vehicle/category/listall`);
        console.log(result.data.data.result);
        if (result) {
          setCategories(result.data.data.result);
          setFormData((prev) => {
            return { ...prev, categoryId: result.data.data.result[0].id };
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();
  }, []);

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
      let response = await axios.post(
        `${url}/vehicle/subcategory/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${userLoggedInInfo.token}` },
        }
      );
      if (response) {
        formRef.current?.reset();
        formRef1.current?.reset();
        setFormData({
          title: "",
          description: "",
          categoryId: categories[0].id,
        });
        toast({
          title: `${response.data}`,
          description: "Sub Category Added Successfully",
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
        <DashBar activeIndex={4} />
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
                <FormLabel>Sub Category Name</FormLabel>
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
              <FormControl isRequired>
                <FormLabel>Select Category</FormLabel>
                <Select width={"40%"} name="categoryId" onChange={handleChange}>
                  {categories?.map((item, index) => {
                    return <option value={item.id}>{item.title}</option>;
                  })}
                </Select>
              </FormControl>
              <Input
                as={Button}
                bgColor={"blue.500"}
                width={"40%"}
                textColor={"white"}
                type={"submit"}
              >
                Add Sub Category
              </Input>
            </Stack>
          </form>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default AddCategory;
