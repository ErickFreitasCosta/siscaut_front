// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbut7HPvrvP8sDvGBvs9qM6mocJiNQTYY",
  authDomain: "siscaut-353ee.firebaseapp.com",
  projectId: "siscaut-353ee",
  storageBucket: "siscaut-353ee.appspot.com",
  messagingSenderId: "313008776403",
  appId: "1:313008776403:web:69c4a77fc9617f09372026",
  measurementId: "G-NKR0KQ051J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


