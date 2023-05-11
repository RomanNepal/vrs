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
  InputGroup,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import axios from "axios";
import DashBar from "../../components/DashBar";
import { url } from "../../components/Constants";
import dynamic from "next/dynamic";
import { AuthContext } from "../../components/Context/authContext";
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false });
const AddVehicle = () => {
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const initialValues = {
    title: "",
    type: "",
    categoryId: "",
    subCategoryId: "",
    brandId: "",
    model: "",
    thumbnail: "",
    images: [],
    bluebookPics: [],
    vehicleNumber: "",
    description: "",
    rentGuidelines: "",
    rate: "",
    pickupAddress: "",
    driveTrain: "",
    insurancePaperPhoto: "",
    features: {
      color: "",
      noOfSeats: 0,
      noOfDoors: 0,
      hasAC: false,
      hasABS: false,
      hasAirbag: false,
      hasPowerSteering: false,
      hasUSBPort: false,
      hasBluetooth: false,
      hasKeylessEntry: false,
      hasHeatedSeats: false,
      hasBackCamera: false,
      hasParkingSensors: false,
      hasAutoDrive: false,
      transmission: "",
      gClearance: 0,
      fuelTank: 0,
    },
  };

  const [formData, setFormData] = useState(initialValues);
  const formRef = useRef(null);
  const formRef1 = useRef(null);
  const toast = useToast();
  const { loggedInInfo, setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const getResults = async () => {
      try {
        let catresult = await axios.get(`${url}/vehicle/category/listall`);
        let subcatresult = await axios.get(
          `${url}/vehicle/subcategory/listall`
        );
        let brandresult = await axios.get(`${url}/vehicle/brand/listall`);
        setCategory(catresult.data.data.result);
        setSubcategory(subcatresult.data.data.result);
        setBrand(brandresult.data.data.result);
        setFormData((prev) => {
          return {
            ...prev,
            categoryId: catresult.data.data.result[0].id,
            subCategoryId: subcatresult.data.data.result[0].id,
            brandId: brandresult.data.data.result[0].id,
            type: "petrol",
            driveTrain: "frontWheel",
          };
        });
      } catch (err) {
        console.log(err);
      }
    };
    getResults();
  }, []);

  const uploadBrandLogo = async (e) => {
    e.preventDefault();
    console.log("e is", e.target);
    // setFormData({ title: e.target });
    let data = new FormData(e.target);
    try {
      let response = await axios.post(`${url}/upload/image`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response) {
        console.log(response.data.data.image);
        setFormData({ ...formData, images: response.data.data.image });
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

  const uploadThumbnail = async (e) => {
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
        setFormData({
          ...formData,
          thumbnail: response.data.data.image[0],
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

  const uploadBluebook = async (e) => {
    e.preventDefault();
    console.log("e is", e.target);
    // setFormData({ title: e.target });
    let data = new FormData(e.target);
    try {
      let response = await axios.post(`${url}/upload/image`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response) {
        console.log(response.data.data.image);
        setFormData({ ...formData, bluebookPics: response.data.data.image });
        toast({
          title: `${response.data.data.msg}`,
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

  const uploadInsurance = async (e) => {
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
        setFormData({
          ...formData,
          insurancePaperPhoto: response.data.data.image[0],
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

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "categoryId") {
      const getSubCategory = async () => {
        try {
          let result = await axios.post(
            `${url}/vehicle/subcategory/findbycategory`,
            { categoryId: e.target.value }
          );
          setSubcategory(result.data.data.result);
        } catch (err) {}
      };
      getSubCategory();
    }
    console.log(e.target);
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleChange1 = (e) => {
    // e.preventDefault();
    setFormData((prev) => {
      return {
        ...prev,
        features: { ...formData.features, [e.target.name]: e.target.value },
      };
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let data = new FormData(e.target);
    //start from here ok
    console.log(formData);
    const parseNumbers = (key, value) => {
      if (key != "model" && !isNaN(value)) {
        return Number(value);
      }
      if (value == "true") {
        return true;
      } else if (value == "false") {
        return false;
      }
      return value;
    };
    const d = { name: "Roman", age: "20" };
    const parsedData = JSON.parse(JSON.stringify(formData), parseNumbers);
    console.log(parsedData);
    try {
      let response = await axios.post(
        `${url}/vehicle/add/vehicle`,
        parsedData,
        {
          headers: { Authorization: `Bearer ${loggedInInfo.token}` },
        }
      );
      if (response) {
        formRef.current?.reset();
        formRef1.current?.reset();
        setFormData({ title: "", description: "", logo: "" });
        toast({
          title: `${response.data.data.msg}`,
          description: "Vehicle Added Successfully",
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
        <DashBar activeIndex={1} />
        <Box
          display={"flex"}
          width={"85%"}
          pl={"20"}
          pr={"20"}
          flexDirection={"column"}
        >
          <Text mb={"3"} fontSize={"2xl"} fontWeight={"bold"}>
            Add Vehicle
          </Text>

          <form onSubmit={handleSubmit} id="form" ref={formRef}>
            <Stack gap={"3"}>
              <FormControl isRequired>
                <FormLabel>Vehicle Name</FormLabel>
                <Input
                  name="title"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange}
                  value={formData.title}
                ></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Type</FormLabel>
                <Select
                  name="type"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange}
                  defaultValue={"petrol"}
                >
                  <option value={"petrol"}>Petrol</option>
                  <option value={"diesel"}>Diesel</option>
                  <option value={"electric"}>Electric</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Select Category</FormLabel>
                <Select name="categoryId" onChange={handleChange} width={"40%"}>
                  {category?.map((item, index) => {
                    return <option value={item.id}>{item.title}</option>;
                  })}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Select Sub-category</FormLabel>
                <Select
                  name="subCategoryId"
                  onChange={handleChange}
                  width={"40%"}
                >
                  {subcategory?.map((item, index) => {
                    return <option value={item.id}>{item.title}</option>;
                  })}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Select Brand</FormLabel>
                <Select name="brand" onChange={handleChange} width={"40%"}>
                  {brand?.map((item, index) => {
                    return <option value={item.id}>{item.title}</option>;
                  })}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Model</FormLabel>
                <Input
                  name="model"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange}
                  value={formData.model}
                ></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Vehicle Number</FormLabel>
                <Input
                  name="vehicleNumber"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange}
                  value={formData.vehicleNumber}
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
                <FormLabel>Rent Guidelines</FormLabel>
                <Input
                  name="rentGuidelines"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange}
                  value={formData.rentGuidelines}
                ></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Rate</FormLabel>
                <Input
                  name="rate"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange}
                  value={formData.rate}
                ></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Pickup Address</FormLabel>
                <Input
                  name="pickupAddress"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange}
                  value={formData.pickupAddress}
                ></Input>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Drive Train</FormLabel>
                <Select
                  name="driveTrain"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange}
                  defaultValue={"frontWheel"}
                >
                  <option value={"frontWheel"}>Front Wheel</option>
                  <option value={"rearWheel"}>Real Wheel</option>
                  <option value={"fourWheel"}>Four Wheel</option>
                  <option value={"allWheel"}>All Wheel</option>
                </Select>
              </FormControl>
              <br></br>

              <FormLabel>Features</FormLabel>
              <FormControl isRequired>
                <FormLabel>Color</FormLabel>
                <Input
                  name="color"
                  width={"40%"}
                  type={"text"}
                  onChange={handleChange1}
                  value={formData?.features?.color}
                ></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>No. of Seats</FormLabel>
                <Input
                  name="noOfSeats"
                  width={"40%"}
                  type={"number"}
                  onChange={handleChange1}
                  value={formData?.features?.noOfSeats}
                ></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>No. of Doors</FormLabel>
                <Input
                  name="noOfDoors"
                  width={"40%"}
                  type={"number"}
                  onChange={handleChange1}
                  value={Number(formData?.features?.noOfDoors)}
                ></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has AC?</FormLabel>
                <input
                  type="radio"
                  name="hasAC"
                  value={"true"}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasAC"
                  value={"false"}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has ABS?</FormLabel>
                <input
                  type="radio"
                  name="hasABS"
                  value={true}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasABS"
                  value={false}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has Air Bag?</FormLabel>
                <input
                  type="radio"
                  name="hasAirbag"
                  value={true}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasAirbag"
                  value={false}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has Sun Roof?</FormLabel>
                <input
                  type="radio"
                  name="hasSunRoof"
                  value={"true"}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasSunRoof"
                  value={"false"}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has Power Steering?</FormLabel>
                <input
                  type="radio"
                  name="hasPowerSteering"
                  value={"true"}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasPowerSteering"
                  value={"false"}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has USB Port?</FormLabel>
                <input
                  type="radio"
                  name="hasUSBPort"
                  value={"true"}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasUSBPort"
                  value={"false"}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has Bluetooth?</FormLabel>
                <input
                  type="radio"
                  name="hasBluetooth"
                  value={"true"}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasBluetooth"
                  value={"false"}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has Key-less entry?</FormLabel>
                <input
                  type="radio"
                  name="hasKeylessEntry"
                  value={"true"}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasKeylessEntry"
                  value={"false"}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has heated seats?</FormLabel>
                <input
                  type="radio"
                  name="hasHeatedSeats"
                  value={"true"}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasHeatedSeats"
                  value={"false"}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has Back Camera?</FormLabel>
                <input
                  type="radio"
                  name="hasBackCamera"
                  value={"true"}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasBackCamera"
                  value={"false"}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has Parking Sensors?</FormLabel>
                <input
                  type="radio"
                  name="hasParkingSensors"
                  value={"true"}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasParkingSensors"
                  value={"false"}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Has Auto Drive?</FormLabel>
                <input
                  type="radio"
                  name="hasAutoDrive"
                  value={"true"}
                  onChange={handleChange1}
                ></input>
                <label>Yes</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="hasAutoDrive"
                  value={"false"}
                  onChange={handleChange1}
                ></input>
                <label>No</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Transmission</FormLabel>
                <input
                  type="radio"
                  name="transmission"
                  value={"manual"}
                  onChange={handleChange1}
                ></input>
                <label>Manual</label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  name="transmission"
                  value={"automatic"}
                  onChange={handleChange1}
                ></input>
                <label>Automatic</label>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Ground Clearance (in mm)</FormLabel>
                <Input
                  name="gClearance"
                  width={"40%"}
                  type={"number"}
                  onChange={handleChange1}
                ></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Fuel Tank Capacity (in litres)</FormLabel>
                <Input
                  name="fuelTank"
                  width={"40%"}
                  type={"number"}
                  onChange={handleChange1}
                ></Input>
              </FormControl>

              <Input
                as={Button}
                bgColor={"blue.500"}
                width={"40%"}
                textColor={"white"}
                type={"submit"}
              >
                Add Vehicle
              </Input>
            </Stack>
          </form>

          <form onSubmit={uploadThumbnail}>
            <FormControl isRequired>
              <FormLabel>Thumbnail Image</FormLabel>
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

          <form onSubmit={uploadBluebook} ref={formRef1}>
            <FormControl isRequired>
              <FormLabel>Bluebook Photos</FormLabel>
              <Input name="images" width={"40%"} type={"file"} multiple></Input>
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

          <form onSubmit={uploadInsurance}>
            <FormControl isRequired>
              <FormLabel>Insurance Paper Photo</FormLabel>
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

          <form onSubmit={uploadBrandLogo} ref={formRef1}>
            <FormControl isRequired>
              <FormLabel>Vehicle Logo</FormLabel>
              <Input name="images" width={"40%"} type={"file"} multiple></Input>
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

export default AddVehicle;
