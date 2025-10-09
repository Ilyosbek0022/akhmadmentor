"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const questions = [
  {
    q: "We met ___ the bus stop.",
    options: ["in", "at", "on"],
    correct: "at",
  },
  {
    q: "She was born ___ 2001.",
    options: ["in", "on", "at"],
    correct: "in",
  },
  {
    q: "The picture is ___ the wall.",
    options: ["in", "on", "at"],
    correct: "on",
  },
  {
    q: "He’s interested ___ learning Spanish.",
    options: ["in", "on", "at"],
    correct: "in",
  },
  {
    q: "We will meet ___ Monday morning.",
    options: ["at", "on", "in"],
    correct: "on",
  },
];

export default function PrepositionsPage() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswer = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleSubmit = () => {
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) s++;
    });
    setScore(s);
    toast.success(`✅ You got ${s} out of ${questions.length} correct!`);
  };

  return (
    <div className="all">
         <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="/">
              <div className="logo">
                <div className="logo-icon">Mr</div>
                <div className="logo-text">Akhmadjon IELTS</div>
              </div>
            </a>
            <nav className="nav">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/price">Price</a></li>
                <li><a href="/test">Tests</a></li>
                <li><a href="/locate">Location</a></li>
                <li><a href="/contact">Contact</a></li>
                
                <li><a href="/learn/glavniy">Learn</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          🧭 Prepositions (Predloglar)
        </h1>
      

        {/* --- SECTION 1 --- */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
            📍 1. Joy bildiruvchi predloglar (Place)
          </h2>
          <p className="text-gray-700 mb-3">
            Bu predloglar biror narsa qayerda joylashganini bildiradi.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>in</strong> — ichida: <em>in the room</em>,{" "}
              <em>in the car</em>
            </li>
            <li>
              <strong>on</strong> — ustida: <em>on the table</em>,{" "}
              <em>on the wall</em>
            </li>
            <li>
              <strong>at</strong> — aniq joyda: <em>at school</em>,{" "}
              <em>at the door</em>
            </li>
          </ul>
        </section>

        {/* --- SECTION 2 --- */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
            ⏰ 2. Vaqt bildiruvchi predloglar (Time)
          </h2>
          <p className="text-gray-700 mb-3">
            Bu predloglar hodisa qachon sodir bo‘lishini ko‘rsatadi:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>in</strong> — oy, yil, asr: <em>in 1999</em>,{" "}
              <em>in June</em>
            </li>
            <li>
              <strong>on</strong> — kun, sana: <em>on Monday</em>,{" "}
              <em>on July 10th</em>
            </li>
            <li>
              <strong>at</strong> — aniq vaqt: <em>at 6 o’clock</em>,{" "}
              <em>at noon</em>
            </li>
          </ul>
        </section>

        {/* --- SECTION 3 --- */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
            🚶‍♂️ 3. Yo‘nalish bildiruvchi predloglar (Direction)
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>to</strong> — ga / tomon: <em>go to school</em>
            </li>
            <li>
              <strong>into</strong> — ichiga: <em>jump into the pool</em>
            </li>
            <li>
              <strong>onto</strong> — ustiga: <em>climb onto the roof</em>
            </li>
            <li>
              <strong>towards</strong> — tomon: <em>walk towards me</em>
            </li>
          </ul>
        </section>

        {/* --- SECTION 4 --- */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
            💡 4. Fe’llar bilan birga ishlatiladigan predloglar
          </h2>
          <p className="text-gray-700 mb-3">
            Ba’zi fe’llar ma’nosini to‘ldirish uchun predlog talab qiladi:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>depend on</strong> — bir narsaga bog‘liq bo‘lish
            </li>
            <li>
              <strong>listen to</strong> — tinglash
            </li>
            <li>
              <strong>believe in</strong> — ishonish
            </li>
            <li>
              <strong>look at</strong> — qarash
            </li>
          </ul>
        </section>

        {/* --- MINI QUIZ --- */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3 text-center">
            🧠 Mini Quiz — Prepositions Practice
          </h2>
          <div className="space-y-6">
            {questions.map((q, i) => (
              <div
                key={i}
                className="border border-indigo-200 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-indigo-50"
              >
                <p className="font-medium mb-2 text-gray-800">
                  {i + 1}. {q.q}
                </p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(i, opt)}
                      className={`px-4 py-2 rounded-lg border ${
                        answers[i] === opt
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-indigo-600 border-indigo-400 hover:bg-indigo-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            Check Answers
          </button>
        </section>

        <ToastContainer position="bottom-right" autoClose={2500} />
      </div>
    </div>
    </div>
  );
}
