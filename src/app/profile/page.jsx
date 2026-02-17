"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userData) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Level: {userData.level}</p>
      <p>Total Score: {userData.totalScore}</p>
    </div>
  );
}
