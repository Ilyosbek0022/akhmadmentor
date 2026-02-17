"use client";

import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Header from "../learn/header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    notification.success("Logged in successfully!");
      router.push("/profile"); // login bo‘lgandan keyin
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="all">
        <Header/>
        <div className="forloginpage">
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20 ">
      <h1 className="text-2xl font-bold">Login</h1>

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
        onClick={login}
        className="bg-blue-500 text-white p-2"
      >
        Login
      </button>
    </div>
    </div>
    </div>
  );
}
