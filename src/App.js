import React, { useEffect, useState } from "react";
import useToken from "./components/hooks/useToken";
import Auth from "./components/auth/Auth.component";
import Dashboard from "./Dashboard";
import axios from "axios";
import { DOMAIN } from "./config";

const App = () => {
  const [state, setState] = useState({
    isAuth: false,
    isLoading: false,
  });

  const { token, setToken } = useToken();

  const verifyToken = async () => {
    console.log("verify token");
    setState({ ...state, isLoading: true });
    try {
      const response = await axios.post(`${DOMAIN}/auth/verify`, {
        token,
      });
      setState({ isAuth: response.status === 200, isLoading: false });
    } catch (error) {
      console.log(error);
      setToken('');
      setState({ isAuth: false, isLoading: false });
    }
  };

  const authenticate = (userRecord) => {
    console.log(userRecord);
    setToken(userRecord.uid);
    setState({ ...state, isAuth: true });
  };

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, []);

  return state.isLoading ? (
    <div>...loading</div>
  ) : state.isAuth ? (
    <Dashboard />
  ) : (
    <Auth setToken={setToken} authenticate={authenticate} />
  );
};

export default App;
