import firebase from 'firebase/app';
import 'firebase/auth';

 // Your web app's Firebase configuration

 var firebaseConfig = {
  apiKey: "AIzaSyB_Rt0WmSy590jSIHianVocNGDCd2XV6lQ",
  authDomain: "login-244d9.firebaseapp.com",
  databaseURL: "https://login-244d9.firebaseio.com",
  projectId: "login-244d9",
  storageBucket: "login-244d9.appspot.com",
  messagingSenderId: "469989287252",
  appId: "1:469989287252:web:cf216be8892e433420d4c1",
  measurementId: "G-FZKLKNWS1M"
  
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const provider = new firebase.auth.GoogleAuthProvider();