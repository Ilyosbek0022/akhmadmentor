// src/firebase.js
"use client"; // Next.js App Router uchun (agar server componentda ishlatmoqchi bo'lsang olib tashla)

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔑 Firebase config — o'zing Firebase Console dan olasan
const firebaseConfig = {
  apiKey: "SENING_API_KEY",
  authDomain: "SENING_AUTH_DOMAIN",
  projectId: "SENING_PROJECT_ID",
  storageBucket: "SENING_STORAGE_BUCKET",
  messagingSenderId: "SENING_MESSAGING_SENDER_ID",
  appId: "SENING_APP_ID",
};

// Firebase app ni initialize qilish — bir marta ishga tushadi
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore va Auth export qilamiz
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
