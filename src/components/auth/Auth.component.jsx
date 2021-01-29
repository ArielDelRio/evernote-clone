import React, { useState } from "react";
import SignIn from "./signin/SignIn.component";
import SignUp from "./signup/SignUp.component";
import firebase from "firebase";

const Auth = () => {
  const [showSignUp, setshowSignUp] = useState(false);
  const [loading, setloading] = useState(false);

  const signUp = (email, password) => {
    setloading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  };

  const signIn = (email, password) => {
    setloading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  };

  return showSignUp ? (
    <SignUp
      signUp={signUp}
      loading={loading}
      setshowSignUp={() => setshowSignUp(false)}
    />
  ) : (
    <SignIn
      signIn={signIn}
      loading={loading}
      setshowSignUp={() => setshowSignUp(true)}
    />
  );
};

export default Auth;
