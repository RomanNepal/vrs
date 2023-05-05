import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
} from "@chakra-ui/react";
// const Stepper = dynamic(() => import("react-form-stepper"), { ssr: false });
import { Stepper } from "react-form-stepper";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMail } from "react-icons/md";
import { useRouter } from "next/router";
import axios from "axios";
const UpdateProfilePicture = dynamic(() => import("./updateProfilePicture"));
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });

const UpdateProfile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedStep, setCompletedStep] = useState(null);
  const [province, setProvince] = useState([]);
  useEffect(() => {
    const getDetail = async () => {
      try {
        let result = await axios.get(
          "https://www.nepallocation.com.np/api/v1/province/list",
          { headers: { Authorization: `Bearer zVDeHYW-c7c5L-fyz11d6ySr` } }
        );
        console.log("result is:", result);
        setProvince(result.data.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDetail();
  }, []);
  const steps = [
    {
      label: "Update Profile Information",
    },
    { label: "Update Profile Picture" },
    { label: "Update Address" },
  ];
  const handleProvince = (e) => {
    console.log(e.target);
  };
  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <>
            <FormControl isRequired>
              <FormLabel>Enter Your Full Name</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<CgProfile />} />
                <Input type={"text"}></Input>
              </InputGroup>
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
              <FormLabel>Enter Your Email</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<MdOutlineMail />} />
                <Input type={"email"}></Input>
              </InputGroup>
            </FormControl>
          </>
        );
      case 1:
        return <Input type={"file"}></Input>;
      case 2:
        return (
          <>
            <FormControl>
              <FormLabel>Select Province</FormLabel>
              <Select>
                {province.length
                  ? province.map((item, index) => {
                      {
                        console.log(item);
                      }
                      return (
                        <option
                          value={item.province_id}
                          onClick={handleProvince}
                        >
                          {item.name}
                        </option>
                      );
                    })
                  : ""}
              </Select>
              <br></br>
              <FormLabel>Select District</FormLabel>
              <Select>
                <option></option>
              </Select>
            </FormControl>
          </>
        );

      default:
        return null;
    }
  }
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
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/");
  };
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
      {/* <Stepper
        steps={[{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }]}
        activeStep={2}
      /> */}
      <Stepper
        steps={steps}
        activeStep={activeStep}
        connectorStateColors={true}
        connectorStyleConfig={{ completedColor: "green", activeColor: "gray" }}
        styleConfig={{ activeBgColor: "#F7CD03", completedBgColor: "#A9EB56" }}
        hideConnectors={false}
      />
      <Box
        display={"flex"}
        flexDir={"column"}
        mt={"10"}
        pl={"10%"}
        pr={"10%"}
        pt={"10"}
        pb={"5%"}
        marginLeft={"7%"}
        marginRight={"7%"}
        border={"1px"}
        // bgColor={"#F7F7F7"}
        borderColor={"gray.100"}
        borderRadius={"xl"}
      >
        <Text
          textColor={"gray.700"}
          fontWeight={"semibold"}
          textAlign={"center"}
          fontSize={"2xl"}
        >
          Complete Your Profile To Continue
        </Text>
        <br></br>
        <Box width={"70%"}>
          <form>
            {getSectionComponent()}

            <br></br>
          </form>
          {/* && activeStep !== steps.length - 1 */}
          {activeStep !== 0 && (
            <>
              <Button mt={"5"} onClick={() => setActiveStep(activeStep - 1)}>
                Previous
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </>
          )}
          {activeStep !== 0 && activeStep === steps.length - 1 && (
            <>
              <Button mt={"5"} onClick={() => handleSubmit}>
                Submit
              </Button>
            </>
          )}
          {console.log(activeStep)}
          {activeStep !== steps.length - 1 && (
            <Button
              mt={"5"}
              colorScheme="red"
              onClick={() => {
                setActiveStep(activeStep + 1);
                setCompletedStep(0);
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UpdateProfile;
