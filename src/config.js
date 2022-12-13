// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { Firestore, getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7H3O08-nF6s2tJ5ncesLzJR2aWWz_a7E",
  authDomain: "crud-sein.firebaseapp.com",
  projectId: "crud-sein",
  storageBucket: "crud-sein.appspot.com",
  messagingSenderId: "771605303963",
  appId: "1:771605303963:web:c561ee9599dbc198ffec3e",
  measurementId: "G-7061Z26EG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
