import React, { useEffect, useState } from "react";
import SignIn from "./signin/SignIn.component";
import SignUp from "./signup/SignUp.component";
import firebase from "firebase";
import { IconButton, Snackbar, SnackbarContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./Auth.style";
import axios from "axios";
import { DOMAIN } from "../../config";

const FIREBASE_ERRORS = {
  INVALID_EMAIL: "auth/invalid-email",
  WRONG_PASSWORD: "auth/wrong-password",
  WEAK_PASSWORD: "auth/weak-password",
  NETWORK_REQUEST_FAILED: "auth/network-request-failed",
  TOO_MANY_REQUESTS: "auth/too-many-requests",
};

const CLEAR_VALIDATION = {
  form: { error: false, helperText: "" },
  email: { error: false, helperText: "" },
  password: { error: false, helperText: "" },
};

const Auth = ({ authenticate }) => {
  const classes = useStyles();
  const [showSignUp, setshowSignUp] = useState(false);
  const [loading, setloading] = useState(false);

  const [validation, setvalidation] = useState({
    form: { error: false, helperText: "" },
    email: { error: false, helperText: "" },
    password: { error: false, helperText: "" },
  });

  const handleCloseSnackbar = () => {
    setvalidation({
      ...validation,
      form: { error: false, helperText: "" },
    });
  };

  const validator = (error) => {
    const validationInfo = { ...CLEAR_VALIDATION };
    switch (error.code) {
      case FIREBASE_ERRORS.INVALID_EMAIL:
        validationInfo.email = { error: true, helperText: error.message };
        break;
      case FIREBASE_ERRORS.WRONG_PASSWORD:
        validationInfo.password = { error: true, helperText: error.message };
        break;
      case FIREBASE_ERRORS.WEAK_PASSWORD:
        validationInfo.password = { error: true, helperText: error.message };
        break;
      case FIREBASE_ERRORS.NETWORK_REQUEST_FAILED:
        validationInfo.form = { error: true, helperText: error.message };
        break;
      case FIREBASE_ERRORS.TOO_MANY_REQUESTS:
        validationInfo.form = { error: true, helperText: error.message };
        break;
      default:
        break;
    }
    return validationInfo;
  };

  const signUp = async (email, password) => {
    setloading(true);
    try {
      const response = await axios.post(`${DOMAIN}/auth/signup`, {
        email,
        password,
      });
      console.log(response);

      authenticate(response.data);
      setvalidation(CLEAR_VALIDATION);
      setloading(false);
    } catch (error) {
      console.log("Error", error.response);
      const validationInfo = validator(error.response.data);
      setvalidation(validationInfo);
      setloading(false);
    }
  };

  const signIn = async (email, password) => {
    setloading(true);
    try {
      const response = await axios.post(`${DOMAIN}/auth/signin`, {
        email,
        password,
      });
      console.log(response);

      authenticate(response.data);
      setvalidation(CLEAR_VALIDATION);
      setloading(false);
    } catch (error) {
      console.log("Error", error.response);
      const validationInfo = validator(error.response.data);
      setvalidation(validationInfo);
      setloading(false);
    }
  };

  console.log(validation);
  return (
    <div>
      {validation.form.error && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={validation.form.error}
          // autoHideDuration={6000}
        >
          <SnackbarContent
            onClose={handleCloseSnackbar}
            classes={{ root: classes.snackbar }}
            message={validation.form.helperText}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        </Snackbar>
      )}
      {showSignUp ? (
        <SignUp
          signUp={signUp}
          loading={loading}
          setshowSignUp={() => setshowSignUp(false)}
          validation={validation}
        />
      ) : (
        <SignIn
          signIn={signIn}
          loading={loading}
          setshowSignUp={() => setshowSignUp(true)}
          validation={validation}
        />
      )}
    </div>
  );
};

export default Auth;
