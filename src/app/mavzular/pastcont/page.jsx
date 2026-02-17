"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../learn/header";

const questions = [
  { q: "Men kecha kitob o‘qiyotgan edim", a: "I was reading a book yesterday." },
  { q: "Ular o‘tgan hafta Samarqandga borayotgan edi", a: "They were going to Samarkand last week." },
  { q: "U ikki kun oldin ovqat pishirayotgan edi", a: "She was cooking dinner two days ago." },
  { q: "Biz kecha futbol o‘ynayotgan edik", a: "We were playing football yesterday." },
  { q: "U kecha ishga bormayotgan edi", a: "He wasn't going to work yesterday." },
  { q: "Men savolni tushunmayotgan edim", a: "I wasn't understanding the question." },
  { q: "Siz o‘sha filmni ko'rayotgan edingizmi?", a: "Were you watching that film?" },
  { q: "Ular o'tgan yili uchrashayotgan edimi?", a: "Were they meeting last year?" },
  { q: "Men bolaligimda Toshkentga borayotgan edim", a: "I was going to Tashkent when I was a child." },
  { q: "Biz 2000-yilda Angliyaga borayotgan edik", a: "We were going to England in 2000." }
];

// Tekshiruvni yumshatish funksiyasi
const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const PastContinuousPage = () => {
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(0); 
  const [hearts, setHearts] = useState(3);
  const [showResult, setShowResult] = useState(null);

  const handleCheck = () => {
    const userAns = normalize(answer);
    const correctAns = normalize(questions[level].a);

    if (userAns === correctAns) {
      setShowResult(true);
      toast.success(`🎉 Level ${level + 1} cleared!`);
      setTimeout(() => {
        if (level + 1 < questions.length) {
          setLevel(level + 1);
          setAnswer("");
          setShowResult(null);
        } else {
          toast.success("🏆 Tabriklaymiz! Barcha levelni tugatdingiz!");
          setLevel(0);
          setHearts(3);
          setAnswer("");
        }
      }, 1200);
    } else {
      setShowResult(false);
      setHearts((h) => {
        const newHearts = h - 1;
        if (newHearts === 0) {
          toast.error("💔 O'yin tugadi! Qaytadan boshlang!");
          setTimeout(() => {
            setLevel(0);
            setHearts(3);
            setAnswer("");
            setShowResult(null);
          }, 1500);
        }
        return newHearts;
      });
    }
  };

  return (
    <div className="all">
  <Header/>
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 px-6 py-16">
      <div className="max-w-5xl w-full space-y-16 text-center">

        {/* Title */}
        <header>
          <h1 className="text-6xl font-extrabold 
                         bg-gradient-to-r from-purple-600 to-pink-600 
                         bg-clip-text text-transparent drop-shadow-md">
            ⏳ Past Continuous Tense
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <b>Past Continuous</b> - o'tgan zamonda davom etayotgan ish-harakatlarni ifodalaydi.
            O'tgan zamonda ma'lum bir paytda davom etayotgan harakatlar uchun ishlatiladi.
          </p>
        </header>

        {/* Structure */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📌 Tuzilishi</h2>
          <table className="w-full text-center border-collapse overflow-hidden rounded-xl">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800">
                <th className="border px-4 py-3">Tur</th>
                <th className="border px-4 py-3">Formula</th>
                <th className="border px-4 py-3">Misol</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="hover:bg-purple-50 transition">
                <td className="border px-4 py-4 font-medium">Affirmative</td>
                <td className="border px-4 py-4">Subject + was/were + V-ing</td>
                <td className="border px-4 py-4">I was reading a book.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-pink-50 transition">
                <td className="border px-4 py-4 font-medium">Negative</td>
                <td className="border px-4 py-4">Subject + was/were not + V-ing</td>
                <td className="border px-4 py-4">She wasn't cooking dinner.</td>
              </tr>
              <tr className="hover:bg-purple-50 transition">
                <td className="border px-4 py-4 font-medium">Question</td>
                <td className="border px-4 py-4">Was/Were + Subject + V-ing?</td>
                <td className="border px-4 py-4">Were you watching TV?</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signal words */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">🚦 Signal words</h2>
          <p className="text-gray-700 text-lg italic">
            while, when, at 5 o'clock yesterday, all day yesterday, at that time, during...
          </p>
        </section>

        {/* Misollar */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-left">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📝 Misollar</h2>
          <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
            <li><u>I was watching</u> TV <i>when you called</i>.</li>
            <li><u>They were playing</u> football <i>at 5 PM yesterday</i>.</li>
            <li><u>She was cooking</u> dinner <i>while I was studying</i>.</li>
            <li><u>We were talking</u> on the phone.</li>
            <li><u>He wasn't sleeping</u> at that time.</li>
            <li><u>I wasn't listening</u> to the teacher.</li>
            <li><u>Were</u> you waiting for me?</li>
            <li><u>Was</u> she studying all day yesterday?</li>
          </ul>
        </section>

        {/* Formula Section */}
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📚 Qo'shimcha formulalar</h2>
          <ul className="text-left text-gray-700 text-lg space-y-3 leading-relaxed">
            <li><b>I/He/She/It</b> → was + V-ing</li>
            <li><b>You/We/They</b> → were + V-ing</li>
            <li><b>Qisqartmalar</b> → wasn't (was not), weren't (were not)</li>
            <li><b>Fe'llar</b> → read → reading, cook → cooking, play → playing</li>
          </ul>
        </section>

        {/* Quiz Game */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">🎮 Past Continuous Challenge</h2>

          {/* Hearts */}
          <div className="flex justify-center gap-2 text-3xl mb-6">
            {Array.from({ length: hearts }).map((_, i) => (
              <span key={i}>❤️</span>
            ))}
          </div>

          {/* Question */}
          <p className="text-lg font-medium text-gray-800 mb-4">
            Level {level + 1}: {questions[level].q}
          </p>

          {/* Input */}
          <input
            type="text"
            placeholder="✍️ Javob yozing..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-2/3 p-4 border-2 border-gray-300 rounded-2xl 
                       shadow-md bg-white 
                       text-gray-900 placeholder-gray-400
                       focus:border-purple-500 focus:ring-4 focus:ring-purple-200 
                       transition-all duration-300 outline-none text-lg"
          />

          {/* Button */}
          <button
            onClick={handleCheck}
            className="px-8 py-3 mt-6 bg-gradient-to-r from-purple-600 to-pink-600 
                       text-white font-medium rounded-xl shadow-md 
                       hover:scale-105 transition-transform"
          >
            ✅ Check
          </button>

          {/* Result */}
          {showResult === true && (
            <p className="mt-4 text-green-700 font-semibold">✅ To'g'ri!</p>
          )}
          {showResult === false && (
            <p className="mt-4 text-red-600 font-semibold">❌ Noto'g'ri!</p>
          )}
        </section>
      </div>
      <ToastContainer position="top-center" />
    </div>
    </div>
  );
};

export default PastContinuousPage;