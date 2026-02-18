"use client";

import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Header from "../learn/header";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        totalScore: 0,
        completedQuizzes: [],
        createdAt: new Date()
      });

      toast.success("Account created successfully 🎉");
      router.push("/profile");

    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed ❌");
    }
  };

  return (
    <div className="all">
    <Header/>
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">

      <h1 className="text-2xl font-bold">Signup</h1>

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
        onClick={signup}
        className="bg-green-500 text-white p-2"
      >
        Signup
      </button>
    </div>
    </div>
  );
}
