// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChfPBafKim98cfZkttQbGAoDaYyUFcZXk",
  authDomain: "blog-c29.firebaseapp.com",
  projectId: "blog-c29",
  storageBucket: "blog-c29.appspot.com",
  messagingSenderId: "229409419161",
  appId: "1:229409419161:web:d3f27a2dbc4e03d1d46d08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//setup database and export it 
export const db = getFirestore(app)