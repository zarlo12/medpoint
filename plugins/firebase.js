import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBd8tGyFif0ze9EFAMuR1p4LzMlm8coCbM",
    authDomain: "medpoint-9a69e.firebaseapp.com",
    projectId: "medpoint-9a69e",
    storageBucket: "medpoint-9a69e.appspot.com",
    messagingSenderId: "845215477148",
    appId: "1:845215477148:web:f253f523e6d037fa326c59"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  
  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {firebase, db, auth, storage}