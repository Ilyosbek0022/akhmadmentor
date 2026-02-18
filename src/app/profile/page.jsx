"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { a } from "framer-motion/client";
import Header from "../learn/header";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

  
  const calculateLevel = (completedCount) => {
    if (completedCount === 0) return "🐧 Penguin";
    if (completedCount < 6) return "Junior 🐣";
    if (completedCount < 18) return "Middle 🚀";
    return "Senior 👑";
  };

  if (!userData) return <p>Loading...</p>;

  const completedCount = userData.completedQuizzes?.length || 0;
  const level = calculateLevel(completedCount);

  return (
    <div className="all">
      <Header />
    <div className=" max-w-md mx-auto mt-20 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Level:</strong> {level}</p>
      <p><strong>Total Score:</strong> {userData.totalScore}</p>
      <p><strong>Completed Quizzes:</strong> {completedCount} / 18</p>
    </div>
    </div>
  );
}
