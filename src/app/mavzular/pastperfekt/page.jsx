"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../learn/header";

const questions = [
  { q: "Men ishni tugatgan edim", a: "I had finished the work." },
  { q: "Ular kinoga borguncha, film boshlangan edi", a: "The film had started before they arrived at the cinema." },
  { q: "Biz yetib kelganimizda u ketgan edi", a: "He had left when we arrived." },
  { q: "Men u bilan uchrashishdan oldin uni ko‘rmagan edim", a: "I had not seen him before I met him." },
  { q: "Ular ovqat tayyor bo‘lganidan keyin yedi", a: "They ate after the food had been prepared." },
  { q: "Siz sinovdan oldin tayyorlangan edingizmi?", a: "Had you prepared before the exam?" },
  { q: "U maktabga borguncha nonushta qilgan edi", a: "She had had breakfast before she went to school." },
  { q: "Men u yerga borganimda, hamma ketgan edi", a: "When I got there, everyone had left." },
  { q: "Ular yetib kelgan paytda biz allaqachon ketgan edik", a: "We had already left when they arrived." },
  { q: "Men maktabni tugatgan edim, keyin universitetga kirdim", a: "I had finished school before I entered the university." }
];

const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const PastPerfectPage = () => {
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
                    bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 px-6 py-16">
      <div className="max-w-5xl w-full space-y-16 text-center">

        {/* Title */}
        <header>
          <h1 className="text-6xl font-extrabold 
                         bg-gradient-to-r from-purple-600 to-pink-600 
                         bg-clip-text text-transparent drop-shadow-md">
            ⏳ Past Perfect Tense 
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <b>Past Perfect</b> – bu o‘tgan zamonda boshqa bir o‘tgan ish-harakatdan
            <b> avval</b> bo‘lib o‘tgan voqeani ifodalaydi. “Had + V3” formulasi bilan yasaladi.
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
                <td className="border px-4 py-4">Subject + had + V3</td>
                <td className="border px-4 py-4">I had finished my homework.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-pink-50 transition">
                <td className="border px-4 py-4 font-medium">Negative</td>
                <td className="border px-4 py-4">Subject + had not + V3</td>
                <td className="border px-4 py-4">She hadn’t eaten before 8.</td>
              </tr>
              <tr className="hover:bg-purple-50 transition">
                <td className="border px-4 py-4 font-medium">Question</td>
                <td className="border px-4 py-4">Had + Subject + V3?</td>
                <td className="border px-4 py-4">Had you studied before the test?</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signal words */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">🚦 Signal words</h2>
          <p className="text-gray-700 text-lg italic">
            before, after, already, when, by the time, never, just, until...
          </p>
        </section>

        {/* Misollar */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-left">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📝 Misollar</h2>
          <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
            <li><u>I had finished</u> my work <i>before</i> dinner.</li>
            <li><u>She had gone</u> home <i>by the time</i> we arrived.</li>
            <li><u>They hadn’t seen</u> that film <i>before</i>.</li>
            <li><u>Had</u> you <u>studied</u> before the exam?</li>
            <li><u>We had already eaten</u> when he came.</li>
          </ul>
        </section>

        {/* Formula Section */}
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📚 Qo‘shimcha formulalar</h2>
          <ul className="text-left text-gray-700 text-lg space-y-3 leading-relaxed">
            <li><b>had + V3</b> → yordamchi fe’l “had” hamma shaxslar uchun bir xil.</li>
            <li><b>Regular verbs</b> → V3 = V2 + ed → worked, cleaned.</li>
            <li><b>Irregular verbs</b> → go → gone, see → seen, eat → eaten.</li>
          </ul>
        </section>

        {/* Quiz Game */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">🎮 Past Perfect Challenge</h2>

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

export default PastPerfectPage;
