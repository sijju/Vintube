import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJCpjUYhagyOR918POD3lVjXB7jr1_CfQ",
  authDomain: "fir-4a7af.firebaseapp.com",
  projectId: "fir-4a7af",
  storageBucket: "fir-4a7af.appspot.com",
  messagingSenderId: "1021672457377",
  appId: "1:1021672457377:web:daa26efe7b1ea6a5765ce0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app;