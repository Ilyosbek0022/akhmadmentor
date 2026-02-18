"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  totalScore: number;
  completedQuizzes: string[];
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

  if (!userData) return null;

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const completedCount = userData.completedQuizzes?.length || 0;

  const calculateLevel = () => {
    if (completedCount === 0) return "🐧 Penguin";
    if (completedCount < 6) return "Junior 🐣";
    if (completedCount < 18) return "Middle 🚀";
    return "Senior 👑";
  };

  const percentage = Math.round((completedCount / 18) * 100);
  const firstLetter = userData.name?.charAt(0).toUpperCase();

  return (
    <div className="relative">
      {/* Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex items-center justify-center 
        rounded-full bg-gradient-to-br from-green-400 to-emerald-600 
        cursor-pointer font-bold text-white shadow-md 
        hover:scale-105 transition"
      >
        {firstLetter}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 
w-[90vw] max-w-xs sm:max-w-sm 
p-5 rounded-2xl
backdrop-blur-xl bg-black/80 text-white 
border border-white/10 shadow-2xl">


          <p className="font-bold text-lg">{userData.name}</p>
          <p className="text-sm text-gray-400">{userData.email}</p>

          <div className="mt-4 space-y-2 text-sm">
            <p>Level: <span className="font-semibold">{calculateLevel()}</span></p>
            <p>Total Score: {userData.totalScore}</p>
            <p>Progress: {percentage}%</p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mt-2">
            <div className="bg-green-400 h-2 rounded-full transition-all progress-fill"
              style={{ "--progress-width": `${percentage}%` } as React.CSSProperties}
            ></div>
          </div>

          <hr className="my-4 border-white/10" />

          <button
            onClick={() => router.push("/profile")}
            className="w-full mb-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            View Profile
          </button>

          <button
            onClick={logout}
            className="w-full p-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
