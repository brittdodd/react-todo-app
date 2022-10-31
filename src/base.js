// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAe7qR6pEn87nAJcHhEfGvz1oaQ_6-mZ-0",
  authDomain: "my-app-todos-1904d.firebaseapp.com",
  projectId: "my-app-todos-1904d",
  storageBucket: "my-app-todos-1904d.appspot.com",
  messagingSenderId: "995543185417",
  appId: "1:995543185417:web:7925198b6a9685699ee0d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}