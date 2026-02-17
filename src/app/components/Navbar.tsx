"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  level: number;
  totalScore: number;
}

export default function Navbar() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (!userData) return null;

  const firstLetter = userData.name?.charAt(0).toUpperCase();

  return (
    <div className="flex justify-end p-4 bg-black text-white relative">
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 cursor-pointer font-bold"
      >
        {firstLetter}
      </div>

      {open && (
        <div className="absolute top-16 right-4 bg-gray-900 p-4 rounded-lg w-56 shadow-lg">
          <p className="font-bold">{userData.name}</p>
          <p className="text-sm text-gray-400">{userData.email}</p>

          <hr className="my-2 border-gray-700" />

          <p>Level: {userData.level}</p>
          <p>Total Score: {userData.totalScore}</p>

          <button
            onClick={logout}
            className="mt-3 w-full bg-red-500 p-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
