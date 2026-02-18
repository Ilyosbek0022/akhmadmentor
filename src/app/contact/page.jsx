"use client";

import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Header from "../learn/header";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🔥 Firestore’da profil yaratish
     await setDoc(doc(db, "users", user.uid), {
  name: name,
  email: email,
  role: "student",
  totalScore: 0,
  completedQuizzes: [],
  createdAt: new Date()
});

     toast.success("Registered successfully! Please log in.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="all">
      <Header/>
      <h1 className="text-center text-2xl font-bold mt-10">Register</h1>
      <div className="forloginpage">
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">
      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="border p-2"
      />
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />
      <button
        onClick={register}
        className="bg-green-500 text-white p-2"
      >
        Register
      </button>
    </div>
    </div>
    </div>
  );
}
