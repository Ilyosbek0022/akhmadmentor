// app/components/UsersList.jsx
"use client"; // bu kerak, chunki useState/useEffect va DOM element bilan ishlaymiz

// import { db, auth } from "./firebase"; // pathni loyihaga moslashtir
import { collection, getDocs } from "firebase/firestore";

export default function UsersList() {
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };

  return (
    <div>
      <button onClick={fetchUsers} className="btn">
        Usersni ko‘rsat
      </button>
    </div>
  );
}
