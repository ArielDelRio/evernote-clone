import React, { useEffect, useState } from "react";
import SignIn from "./signin/SignIn.component";
import SignUp from "./signup/SignUp.component";
import firebase from "firebase";
import { IconButton, Snackbar, SnackbarContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./Auth.style";

const FIREBASE_ERRORS = {
  INVALID_EMAIL: "auth/invalid-email",
  WRONG_PASSWORD: "auth/wrong-password",
  WEAK_PASSWORD: "auth/weak-password",
  NETWORK_REQUEST_FAILED: "auth/network-request-failed",
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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        authenticate(user);
      } else {
        console.log("not login");
      }
    });
  }, []);

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
      default:
        break;
    }
    return validationInfo;
  };

  const signUp = (email, password) => {
    setloading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        authenticate(userCredential);
        setvalidation(CLEAR_VALIDATION);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        const validationInfo = validator(error);
        setvalidation(validationInfo);
        setloading(false);
      });
  };

  const signIn = (email, password) => {
    setloading(true);

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            console.log(userCredential);
            authenticate(userCredential);
            setvalidation(CLEAR_VALIDATION);
            setloading(false);
          })
          .catch((error) => {
            console.log(error);
            const validationInfo = validator(error);
            setvalidation(validationInfo);
            setloading(false);
          });
      });
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
