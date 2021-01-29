import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyC-rP19P1Nz6zmkX3DK5O_vE4KCGnH_GDE",
  authDomain: "evernote-app-88845.firebaseapp.com",
  projectId: "evernote-app-88845",
  storageBucket: "evernote-app-88845.appspot.com",
  messagingSenderId: "1030117439402",
  appId: "1:1030117439402:web:4600f563fbd1904e369dd3",
  measurementId: "G-1946BQPB1X",
});
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("root"));
