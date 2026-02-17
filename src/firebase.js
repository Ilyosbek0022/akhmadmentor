// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// 🔑 Sening config
const firebaseConfig = {
  apiKey: "AIzaSyD1B_i8jYaJ16GeBhKHIQ-uQgrP8qlIW4g",
  authDomain: "akhmad-mentor.firebaseapp.com",
  projectId: "akhmad-mentor",
  storageBucket: "akhmad-mentor.firebasestorage.app",
  messagingSenderId: "325098369673",
  appId: "1:325098369673:web:a66417f7f2894d9ca7cc58",
  measurementId: "G-0VFC3YQ870"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const db = getFirestore(app);


export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
