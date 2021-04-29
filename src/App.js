import React, { useEffect, useState } from "react";
import useToken from "./components/hooks/useToken";
import Auth from "./components/auth/Auth.component";
import Dashboard from "./Dashboard";
import axios from "axios";
import { DOMAIN } from "./config";
import SplashLoading from "./components/splash-loading/SplashLoading";

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
      setToken("");
      setState({ isAuth: false, isLoading: false });
    }
  };

  const authenticate = (userRecord) => {
    console.log(userRecord);
    setToken(userRecord.uid);
    setState({ ...state, isAuth: true });
  };

  const logout = () => {
    setToken("");
    setState({ ...state, isAuth: false });
  };

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, []);

  return state.isLoading ? (
    <SplashLoading />
  ) : state.isAuth ? (
    <Dashboard logout={logout} user_token={token} />
  ) : (
    <Auth setToken={setToken} authenticate={authenticate} />
  );
};

export default App;
