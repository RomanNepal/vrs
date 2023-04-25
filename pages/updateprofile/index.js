import React from "react";
import dynamic from "next/dynamic";
import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Text,
  useEditableControls,
} from "@chakra-ui/react";
import { BsCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });

const UpdateProfile = () => {
  // function EditableControls() {
  //   const {
  //     isEditing,
  //     getSubmitButtonProps,
  //     getCancelButtonProps,
  //     getEditButtonProps,
  //   } = useEditableControls();

  //   return isEditing ? (
  //     <ButtonGroup justifyContent="center" size="sm">
  //       <IconButton icon={<BsCheck />} {...getSubmitButtonProps()} />
  //       <IconButton icon={<IoClose />} {...getCancelButtonProps()} />
  //     </ButtonGroup>
  //   ) : (
  //     <Flex justifyContent="center">
  //       <IconButton size="sm" icon={<BiEdit />} {...getEditButtonProps()} />
  //     </Flex>
  //   );
  // }
  return (
    <>
      <Navbar />
      {/* <HStack
        border={"1px"}
        marginTop={"7%"}
        alignItems={"center"}
        justifyContent={"center"}
        fontWeight={"bold"}
        fontSize={"3xl"}
        bgColor={"#DE3450"}
        textColor={"white"}
      >
        <Text textAlign={"center"}>Welcome to</Text>

        <Text>EzyRental</Text>
      </HStack> */}
      <Box
        display={"flex"}
        flexDir={"column"}
        marginTop={"5%"}
        pl={"10%"}
        marginLeft={"7%"}
        marginRight={"7%"}
        border={"1px"}
        // bgColor={"#F7F7F7"}
        borderColor={"gray.100"}
        borderRadius={"xl"}
      >
        <br></br>
        <Text
          textColor={"gray.700"}
          fontWeight={"semibold"}
          textAlign={"center"}
        >
          Please complete your profile to continue
        </Text>
        <Box width={"70%"}>
          <form>
            <FormControl isRequired>
              <FormLabel>Enter Your Full Name</FormLabel>
              <Input type={"text"}></Input>
            </FormControl>
            <br></br>
            <FormControl isRequired>
              <FormLabel>Select Gender</FormLabel>
              <input type={"radio"} value={"male"} name="gender"></input>
              <label>Male</label>&nbsp;&nbsp;&nbsp;
              <input type={"radio"} name={"gender"} value={"female"}></input>
              <label>Female</label>
            </FormControl>
            <br></br>
            <FormControl isRequired>
              <FormLabel>Enter Your Full Name</FormLabel>
              <Input type={"text"}></Input>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Enter Your Email</FormLabel>
              <Input type={"email"}></Input>
            </FormControl>
            
          </form>
        </Box>
      </Box>
    </>
  );
};

export default UpdateProfile;
