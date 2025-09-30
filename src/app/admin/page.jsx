"use client";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // LocalStorage orqali admin sessiyani tekshirish
    if (localStorage.getItem("admin") === "true") {
      setLoggedIn(true);
      fetchData();
    }
  }, []);

  async function fetchData() {
    const res = await fetch("/api/contact");
    if (res.ok) {
      const data = await res.json();
      setSubmissions(data);
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    if (password === "12345") { // 🔑 faqat siz biladigan parol
      setLoggedIn(true);
      localStorage.setItem("admin", "true");
      fetchData();
    } else {
      alert("❌ Noto‘g‘ri parol!");
    }
  }

  // Agar hali login qilinmagan bo‘lsa
  if (!loggedIn) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>🔒 Admin panelga kirish</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parolni kiriting"
            style={{ padding: "10px", margin: "10px" }}
          />
          <button type="submit" style={{ padding: "10px 20px" }}>
            Kirish
          </button>
        </form>
      </div>
    );
  }

  // Agar login qilingan bo‘lsa
  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Admin Panel</h1>
      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Ism</th>
            <th>Familiya</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Xabar</th>
            <th>Policy</th>
            <th>Vaqt</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s, i) => (
            <tr key={i}>
              <td>{s["first-name"]}</td>
              <td>{s["last-name"]}</td>
              <td>{s.email}</td>
              <td>{s["phone-number"]}</td>
              <td>{s.message}</td>
              <td>{s.policy ? "✅ Rozilik bergan" : "❌ Yo‘q"}</td>
              <td>{s.date ? new Date(s.date).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
