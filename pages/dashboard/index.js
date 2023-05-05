import React, { useContext, useEffect } from "react";
import ProtectedRoutes from "../../components/ProtectedRoute";
import { AuthContext } from "../../components/Context/authContext";
import { url } from "../../components/Constants";
import axios from "axios";

const Dashboard = () => {
  const { loggedInInfo, setLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    const getDetails = async () => {
      try {
        let response = await axios.get(`${url}/vehicle/listall/vehicle`, {
          headers: { Authorization: `Bearer ${loggedInInfo.token}` },
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    getDetails();
  }, []);
  return (
    <ProtectedRoutes>
      <>Dashboard only</>
    </ProtectedRoutes>
  );
};

export default Dashboard;
