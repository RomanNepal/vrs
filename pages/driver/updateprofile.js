import React, { useContext, useEffect, useState } from "react";
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
  Toast,
  useToast,
} from "@chakra-ui/react";
// const Stepper = dynamic(() => import("react-form-stepper"), { ssr: false });
import { Stepper } from "react-form-stepper";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMail } from "react-icons/md";
import { useRouter } from "next/router";
import axios from "axios";
import { AuthContext } from "../../components/Context/authContext";
import { apiToken, url } from "../../components/Constants";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });

const UpdateProfile = () => {
  const profile = {
    fullName: "",
    photo: "",
    liscenceType: "",
    liscencePic: "",
    gender: "",
    address: [],
    liscenceNo: "",
  };
  const center = {
    lat: 27.7172,
    lng: 85.324,
  };
  const [loc, setLoc] = useState({ lat: "", lng: "" });
  const [cntr, setCenter] = useState(center);
  const [profileFormData, setProfileFormData] = useState(profile);
  //   const [addressData, setAddressFormData] = useState(address);
  const [activeStep, setActiveStep] = useState(0);
  const [completedStep, setCompletedStep] = useState(null);
  //   const [province, setProvince] = useState([]);
  //   const [districts, setDistricts] = useState([]);
  //   const [municipalities, setMunicipalities] = useState([]);
  //   const [cities, setCities] = useState([]);
  const { driverLoggedInInfo, setDriverLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    const getDetail = async () => {
      //   try {
      //     let result = await axios.get(
      //       "https://www.nepallocation.com.np/api/v1/province/list",
      //       { headers: { Authorization: `${apiToken}` } }
      //     );
      //     setProvince(result.data.data.data);
      //   } catch (err) {
      //     console.log(err);
      //   }
    };
    getDetail();
  }, []);

  const handleProfile = (e) => {
    // console.log(profileFormData);
    setProfileFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadPhoto = (e) => {
    // console.log(e.target.files[0]);
    let formDa = new FormData();
    formDa.append("images", e.target.files[0]);
    const getDetail = async () => {
      try {
        let result = await axios.post(`${url}/upload/image`, formDa, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczMWMyOTc3LTNlZTAtNDE4OC04YzVmLTYzYzZjNzliMjE1ZSIsInBob25lIjo5ODI1MzE5ODY2LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODQxNTY1MzV9.SO3yQ8lfv4d-MAMSI1E_c5t2OZ_7fKZXETKf7qspnlM`,
          },
        });
        // console.log(result);
        setProfileFormData((prev) => {
          return { ...prev, photo: result.data.data.image[0].toString() };
        });
      } catch (err) {
        console.log(err);
      }
    };
    getDetail();
  };

  const uploadLiscencePic = (e) => {
    // console.log(e.target.files[0]);
    let formD = new FormData();
    formD.append("images", e.target.files[0]);
    console.log("here");
    const getDetail = async () => {
      try {
        let result = await axios.post(`${url}/upload/image`, formD, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczMWMyOTc3LTNlZTAtNDE4OC04YzVmLTYzYzZjNzliMjE1ZSIsInBob25lIjo5ODI1MzE5ODY2LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODQxNTY1MzV9.SO3yQ8lfv4d-MAMSI1E_c5t2OZ_7fKZXETKf7qspnlM`,
          },
        });
        console.log(result);
        setProfileFormData((prev) => {
          return { ...prev, liscencePic: result.data.data.image[0] };
        });
      } catch (err) {
        console.log(err);
      }
    };
    getDetail();
  };

  const updateAddress = (e) => {
    console.log(e);
    console.log(e.latLng.lat());
    let lat = e.latLng.lat();
    let latStr = lat.toString();
    console.log(typeof latStr);
    let lng = e.latLng.lng();
    let lngStr = lng.toString();
    setLoc({ lat, lng });
    setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setProfileFormData((prev) => {
      return {
        ...prev,
        address: [`${latStr.toString()}`, `${lngStr.toString()}`],
      };
    });
  };

  const steps = [
    {
      label: "Update Profile Information",
    },
    { label: "Update Profile Picture" },
    { label: "Update Address" },
  ];
  const handleProvince = (e) => {
    const getDistrictsByProvince = async () => {
      try {
        let result = await axios.get(
          `https://www.nepallocation.com.np/api/v1/province/${e.target.value}/district`,
          { headers: { Authorization: `${apiToken}` } }
        );
        console.log("fetched: ", result.data.data);
        setDistricts(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDistrictsByProvince();
  };

  const getMunicipalities = async (e) => {
    try {
      let result = await axios.get(
        `https://www.nepallocation.com.np/api/v1/district/${e.target.value}`,
        { headers: { Authorization: `${apiToken}` } }
      );
      let result1 = await axios.get(
        `https://www.nepallocation.com.np/api/v1/district/${e.target.value}/cities`,
        { headers: { Authorization: `${apiToken}` } }
      );
      console.log("fetched: ", result.data.data.municipalities);
      setMunicipalities(result.data.data.municipalities);
      setCities(result1.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitPhoto = async (e) => {
    e.preventDefault();
    console.log(e.target);
    let data = new FormData(e.target);
    try {
      let response = await axios.post(`${url}/upload/image`, data, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczMWMyOTc3LTNlZTAtNDE4OC04YzVmLTYzYzZjNzliMjE1ZSIsInBob25lIjo5ODI1MzE5ODY2LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODQxNTY1MzV9.SO3yQ8lfv4d-MAMSI1E_c5t2OZ_7fKZXETKf7qspnlM`,
        },
      });
      if (response) {
        console.log(response.data.data.image[0]);
        setProfileFormData({
          ...profileFormData,
          profileImage: response.data.data.image[0],
        });
        toast({
          title: `${response.data.data.msg}`,
          description: `${""}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
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
                <Input
                  name="fullName"
                  type={"text"}
                  onChange={handleProfile}
                  value={profileFormData.fullName}
                ></Input>
              </InputGroup>
            </FormControl>
            <br></br>
            <FormControl isRequired>
              <FormLabel>Select Gender</FormLabel>
              <input
                type={"radio"}
                value={"male"}
                name="gender"
                onChange={handleProfile}
              ></input>
              <label>Male</label>&nbsp;&nbsp;&nbsp;
              <input
                type={"radio"}
                name={"gender"}
                value={"female"}
                onChange={handleProfile}
              ></input>
              <label>Female</label>
            </FormControl>
            <br></br>
            <FormControl isRequired>
              <FormLabel>Enter Your License Number</FormLabel>
              <InputGroup>
                <Input
                  name="liscenceNo"
                  type={"text"}
                  onChange={handleProfile}
                  value={profileFormData.liscenceNo}
                ></Input>
              </InputGroup>
            </FormControl>
            <br></br>
            <FormControl isRequired>
              <FormLabel>
                Enter Your License Type (Can be multiple, e.g.:A,B)
              </FormLabel>
              <InputGroup>
                <Input
                  name="liscenceType"
                  type={"text"}
                  onChange={handleProfile}
                  value={profileFormData.liscenceType}
                ></Input>
              </InputGroup>
            </FormControl>

            <br></br>
            {/* <FormControl isRequired>
              <FormLabel>Enter Your Email</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<MdOutlineMail />} />
                <Input
                  onChange={handleProfile}
                  name="email"
                  type={"email"}
                  value={profileFormData.email}
                ></Input>
              </InputGroup>
            </FormControl> */}
          </>
        );
      case 1:
        return (
          <>
            <FormLabel>Upload Photo</FormLabel>
            <Input type={"file"} name="images" onChange={uploadPhoto}></Input>
            <br></br>
            <br></br>
            <FormLabel>Upload Licence</FormLabel>
            <Input
              type={"file"}
              name="images"
              onChange={uploadLiscencePic}
            ></Input>

            {/* <Button onClick={uploadPhoto}>Upload</Button> */}
          </>
        );
      case 2:
        return (
          <>
            <FormControl>
              <FormLabel>Select Your Location</FormLabel>
              <LoadScript googleMapsApiKey="">
                <GoogleMap
                  mapContainerStyle={{ width: "90%", height: "400px" }}
                  center={cntr}
                  zoom={13}
                  onClick={updateAddress}
                  options={{ zoomControl: { scroll: true } }}
                >
                  {/* Child components, such as markers, info windows, etc. */}
                  <Marker position={loc} />
                </GoogleMap>
              </LoadScript>
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
  const toast = useToast();
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      // console.log(profileFormData);
      let response = await axios.put(
        `${url}/driver/update-profile`,
        profileFormData,
        {
          headers: {
            Authorization: `Bearer ${driverLoggedInInfo.driverToken}`,
          },
        }
      );
      console.log(response.data.data);
      toast({
        title: `Profile Updated Successfully`,
        description: `${""}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setProfileFormData(profile);
      //   setAddressFormData(address);
      router.push("/driver/dashboard");
    } catch (err) {
      console.log(err);
    }
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
              <Button mt={"5"} onClick={handleSubmit}>
                Submit
              </Button>
            </>
          )}

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
