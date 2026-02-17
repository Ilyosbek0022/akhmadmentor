"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../learn/header";

const questions = [
  { q: "Men yangi filmni ko‘rdim", a: "I have seen the new movie." },
  { q: "Ular allaqachon ovqatlandilar", a: "They have already eaten." },
  { q: "U maktabni tugatdi", a: "He has finished school." },
  { q: "Biz hali boshlamadik", a: "We haven’t started yet." },
  { q: "Men Londonda bo‘lganman", a: "I have been to London." },
  { q: "U hech qachon sushi yemagan", a: "She has never eaten sushi." },
  { q: "Siz uy vazifangizni bajardingizmi?", a: "Have you done your homework?" },
  { q: "U hech qachon chet elga chiqmaganmi?", a: "Has he never been abroad?" },
  { q: "Ular yangi mashina sotib olishgan", a: "They have bought a new car." },
  { q: "Men u bilan endigina gaplashdim", a: "I have just talked to him." }
];

// Tekshiruvni yumshatish
const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const PresentPerfectPage = () => {
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
          toast.error("💔 O‘yin tugadi! Qaytadan boshlang!");
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
                    bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 px-6 py-16">
      <div className="max-w-5xl w-full space-y-16 text-center">

        {/* Title */}
        <header>
          <h1 className="text-6xl font-extrabold 
                         bg-gradient-to-r from-pink-600 to-purple-600 
                         bg-clip-text text-transparent drop-shadow-md">
            ✨ Present Perfect Tense
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <b>Present Perfect</b> – o‘tgan va hozirgi zamonni bog‘laydi. 
            Ya’ni ish-harakat <b>hozirgacha sodir bo‘lgan</b> yoki <b>hozirgi natijaga ega</b>.
          </p>
        </header>

        {/* Structure */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📌 Tuzilishi</h2>
          <table className="w-full text-center border-collapse overflow-hidden rounded-xl">
            <thead>
              <tr className="bg-gradient-to-r from-pink-100 to-purple-100 text-gray-800">
                <th className="border px-4 py-3">Tur</th>
                <th className="border px-4 py-3">Formula</th>
                <th className="border px-4 py-3">Misol</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="hover:bg-pink-50 transition">
                <td className="border px-4 py-4 font-medium">Affirmative</td>
                <td className="border px-4 py-4">Subject + have/has + V3</td>
                <td className="border px-4 py-4">I have finished my work.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-purple-50 transition">
                <td className="border px-4 py-4 font-medium">Negative</td>
                <td className="border px-4 py-4">Subject + have/has not + V3</td>
                <td className="border px-4 py-4">She hasn’t called me yet.</td>
              </tr>
              <tr className="hover:bg-pink-50 transition">
                <td className="border px-4 py-4 font-medium">Question</td>
                <td className="border px-4 py-4">Have/Has + Subject + V3?</td>
                <td className="border px-4 py-4">Have you seen this film?</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signal words */}
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">🚦 Signal words</h2>
          <p className="text-gray-700 text-lg italic">
            already, just, yet, ever, never, recently, so far, today, this week...
          </p>
        </section>

        {/* Misollar */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-left">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📝 Misollar</h2>
          <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
            <li><u>I have seen</u> that movie <i>already</i>.</li>
            <li><u>She has never</u> been to Paris.</li>
            <li><u>They have just</u> arrived home.</li>
            <li><u>We haven’t</u> finished our homework <i>yet</i>.</li>
            <li><u>He has</u> bought a new car.</li>
            <li><u>Have you ever</u> tried sushi?</li>
          </ul>
        </section>

        {/* Extra Info */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📚 Qo‘shimcha formulalar</h2>
          <ul className="text-left text-gray-700 text-lg space-y-3 leading-relaxed">
            <li><b>have</b> → I, you, we, they uchun.</li>
            <li><b>has</b> → he, she, it uchun.</li>
            <li><b>V3 (Past Participle)</b> → done, seen, been, eaten, gone.</li>
            <li>Bu zamon <i>tajriba</i>, <i>natija</i> yoki <i>yaqin o‘tmishdagi hodisa</i> uchun ishlatiladi.</li>
          </ul>
        </section>

        {/* Quiz */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">🎮 Present Perfect Challenge</h2>

          {/* Hearts */}
          <div className="flex justify-center gap-2 text-3xl mb-6">
            {Array.from({ length: hearts }).map((_, i) => (
              <span key={i}>💜</span>
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
            <p className="mt-4 text-green-700 font-semibold">✅ To‘g‘ri!</p>
          )}
          {showResult === false && (
            <p className="mt-4 text-red-600 font-semibold">❌ Noto‘g‘ri!</p>
          )}
        </section>
      </div>
      <ToastContainer position="top-center" />
    </div>
    </div>
  );
};

export default PresentPerfectPage;
