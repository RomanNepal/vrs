import React, { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { useRouter } from "next/router";
import Login from "../../pages/login";

const ProtectedRoutes = () => {
  const { loggedInInfo, setLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  console.log(loggedInInfo.isLoggedIn);
  if (loggedInInfo.isLoggedIn) {
    return { children };
  } else {
    return router.push("/login");
  }
};

export default ProtectedRoutes;
