import React, { useEffect } from "react";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { useNavigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = getUserFromStorage();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default AuthRoute;
