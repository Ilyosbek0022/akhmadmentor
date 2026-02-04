"use client";
import { Link } from "lucide-react";
import { useState } from "react";

export default function GeminiPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      const data = await res.json();
      console.log("GEMINI RESPONSE:", data);

      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from Gemini.";

      setResponse(text);
    } catch (err) {
      setResponse("Xatolik: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="all">
      <header className="header static top-0 left-0 ">
    <div className="container">
      <div className="header-content">
        <a href="/">
        <div className="logo">
          <div className="logo-icon">Mr</div>
          <div className="logo-text">Akhmadjon IELTS</div>
        </div></a>
        <nav className="nav">
          <ul>
                   <li><a href="/">Home</a></li>
            <li><a href="/price">Price</a></li>
            <li><a href="/test">Tests</a></li>
            <li><a href="/locate">Location</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/learn/glavniy">Learn</a></li>
            <li><a href="/learn/gemini">GEMINI AI</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
    
    <div
      style={{
        padding: "20px",
        maxWidth: "650px",
        margin: "auto",
        fontFamily: "sans-serif",
      }}
    >
      
      <h2> Gemini API — Chat</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Savolingizni yozing..."
        style={{ width: "100%", height: "120px", padding: "10px", fontSize: "16px" }}
      />

      <button
        onClick={sendMessage}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Send
      </button>

      <div
        style={{
          marginTop: "20px",
          background: "#111",
          color: "#0f0",
          padding: "10px",
          minHeight: "100px",
          borderRadius: "4px",
        }}
      >
        <strong>Response:</strong>
        <p>{loading ? "Yuklanmoqda..." : response}</p>
      </div>
    </div>
    </div>
  );
}
