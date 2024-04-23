import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtdtEa6bbafCPUsruVz03UDEKN-tbk79U",
  authDomain: "study-with-jorge.firebaseapp.com",
  projectId: "study-with-jorge",
  storageBucket: "study-with-jorge.appspot.com",
  messagingSenderId: "61048371701",
  appId: "1:61048371701:web:7eabe4bfcd0edd03b048bc",
  measurementId: "G-KEYZXV5LHX"
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();

