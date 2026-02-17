"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../learn/header";

const questions = [
  { q: "Men u kelguncha ishlayotgan edim", a: "I had been working before he came." },
  { q: "Ular ikki soat davomida o‘ynashayotgan edi", a: "They had been playing for two hours." },
  { q: "U mashina haydashni o‘rganayotgan edi", a: "He had been learning to drive." },
  { q: "Biz telefon jiringlaguncha uxlayotgan edik", a: "We had been sleeping before the phone rang." },
  { q: "U darsdan oldin televizor ko‘rayotgan edi", a: "She had been watching TV before the lesson." },
  { q: "Men kutayotganimda yomg‘ir yog‘ayotgan edi", a: "It had been raining while I was waiting." },
  { q: "Ular sinovdan oldin ingliz tili o‘rganayotgan edi", a: "They had been studying English before the exam." },
  { q: "Biz kinoga borguncha, ular kutishayotgan edi", a: "They had been waiting when we arrived at the cinema." },
  { q: "Men uzoq vaqt davomida ishlayotgan edim", a: "I had been working for a long time." },
  { q: "U mashinani ta’mirlayotgan edi, keyin u buzilib qoldi", a: "He had been fixing the car before it broke down." }
];

const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const PastPerfectContinuousPage = () => {
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
            ⏳ Past Perfect Continuous Tense
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <b>Past Perfect Continuous</b> – o‘tgan zamonda <b>ma’lum vaqt davomida</b> 
            sodir bo‘lgan, lekin boshqa bir o‘tgan ish-harakatdan <b>avval</b> 
            bo‘lib o‘tgan jarayonni ifodalaydi.
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
                <td className="border px-4 py-4">Subject + had been + V-ing</td>
                <td className="border px-4 py-4">I had been working all day.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-pink-50 transition">
                <td className="border px-4 py-4 font-medium">Negative</td>
                <td className="border px-4 py-4">Subject + had not been + V-ing</td>
                <td className="border px-4 py-4">She hadn’t been studying before the test.</td>
              </tr>
              <tr className="hover:bg-purple-50 transition">
                <td className="border px-4 py-4 font-medium">Question</td>
                <td className="border px-4 py-4">Had + Subject + been + V-ing?</td>
                <td className="border px-4 py-4">Had you been waiting long?</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signal words */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">🚦 Signal words</h2>
          <p className="text-gray-700 text-lg italic">
            for, since, before, when, until, all day, how long, the whole week...
          </p>
        </section>

        {/* Misollar */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-left">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📝 Misollar</h2>
          <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
            <li><u>I had been working</u> for two hours <i>before</i> he came.</li>
            <li><u>She had been studying</u> English <i>for</i> a year.</li>
            <li><u>They hadn’t been sleeping</u> well <i>before</i> the trip.</li>
            <li><u>Had</u> you <u>been waiting</u> long?</li>
            <li><u>We had been living</u> in London <i>since</i> 2010.</li>
          </ul>
        </section>

        {/* Formula Section */}
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">📚 Qo‘shimcha ma’lumot</h2>
          <ul className="text-left text-gray-700 text-lg space-y-3 leading-relaxed">
            <li><b>had been + V-ing</b> → barcha shaxslarda bir xil shaklda ishlatiladi.</li>
            <li><b>for</b> → vaqt davomiyligi uchun (for 3 hours), <b>since</b> → boshlanish nuqtasi uchun (since morning).</li>
            <li>Odatda o‘tgan zamondagi boshqa bir voqeadan <i>oldin davom etgan</i> jarayonni bildiradi.</li>
          </ul>
        </section>

        {/* Quiz Game */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">🎮 Past Perfect Continuous Challenge</h2>

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

export default PastPerfectContinuousPage;
