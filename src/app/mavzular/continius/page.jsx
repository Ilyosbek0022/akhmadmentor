"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../learn/header";

const questions = [
  { q: "Men hozir kitob o‘qiyapman", a: "I am reading a book now." },
  { q: "Ular hozir futbol o‘ynayapti", a: "They are playing football now." },
  { q: "U ovqat pishiryapti", a: "She is cooking dinner." },
  { q: "Biz ingliz tilini o‘rganayapmiz", a: "We are learning English." },
  { q: "U ishga ketayapti", a: "He is going to work." },
  { q: "Men hozir telefon ishlatayapman", a: "I am using my phone now." },
  { q: "Siz hozir televizor ko‘rayapsizmi?", a: "Are you watching TV now?" },
  { q: "U hozir kitob o‘qiyaptimi?", a: "Is he reading a book now?" },
  { q: "Biz hozir film ko‘rayapmiz", a: "We are watching a movie now." },
  { q: "Ular hozir dars qilmayapti", a: "They are not studying now." }
];

// Normalize function (tekshiruvni yumshatish)
const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const PresentContinuousPage = () => {
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
                    bg-gradient-to-br from-blue-50 via-green-50 to-yellow-100 px-6 py-16">
      <div className="max-w-5xl w-full space-y-16 text-center">

        {/* Title */}
        <header>
          <h1 className="text-6xl font-extrabold 
                         bg-gradient-to-r from-green-600 to-blue-600 
                         bg-clip-text text-transparent drop-shadow-md">
             Present Continuous Tense
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <b>Present Continuous</b> – hozirgi paytda davom etayotgan ish-harakatlarni ifodalaydi.
            Odatda “now”, “at the moment”, “currently” kabi signal so‘zlar bilan ishlatiladi.
          </p>
        </header>

        {/* Structure */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">📌 Tuzilishi</h2>
          <table className="w-full text-center border-collapse overflow-hidden rounded-xl">
            <thead>
              <tr className="bg-gradient-to-r from-green-100 to-blue-100 text-gray-800">
                <th className="border px-4 py-3">Tur</th>
                <th className="border px-4 py-3">Formula</th>
                <th className="border px-4 py-3">Misol</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="hover:bg-green-50 transition">
                <td className="border px-4 py-4 font-medium">Affirmative</td>
                <td className="border px-4 py-4">Subject + am/is/are + V-ing</td>
                <td className="border px-4 py-4">I am studying English.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition">
                <td className="border px-4 py-4 font-medium">Negative</td>
                <td className="border px-4 py-4">Subject + am/is/are + not + V-ing</td>
                <td className="border px-4 py-4">She isn’t watching TV.</td>
              </tr>
              <tr className="hover:bg-green-50 transition">
                <td className="border px-4 py-4 font-medium">Question</td>
                <td className="border px-4 py-4">Am/Is/Are + Subject + V-ing?</td>
                <td className="border px-4 py-4">Are you reading now?</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signal words */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🚦 Signal words</h2>
          <p className="text-gray-700 text-lg italic">
            now, right now, at the moment, currently, today, this week...
          </p>
        </section>

        {/* Misollar */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-left">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">📝 Misollar</h2>
          <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
            <li><u>I am reading</u> a book <i>now</i>.</li>
            <li><u>They are playing</u> football <i>at the moment</i>.</li>
            <li><u>She is cooking</u> dinner.</li>
            <li><u>We are studying</u> English.</li>
            <li><u>He is going</u> to work.</li>
            <li><u>I am not watching</u> TV <i>now</i>.</li>
            <li><u>Are you listening</u> to music?</li>
            <li><u>Is he reading</u> a book?</li>
          </ul>
        </section>

        {/* Extra Info */}
        <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">📚 Qo‘shimcha formulalar</h2>
          <ul className="text-left text-gray-700 text-lg space-y-3 leading-relaxed">
            <li><b>am</b> → I uchun ishlatiladi (I am reading).</li>
            <li><b>is</b> → he/she/it uchun (He is working).</li>
            <li><b>are</b> → you/we/they uchun (They are running).</li>
            <li><b>V-ing</b> → fe’lga -ing qo‘shiladi (go → going, eat → eating).</li>
          </ul>
        </section>

        {/* Quiz */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">🎮 Present Continuous Challenge</h2>

          {/* Hearts */}
          <div className="flex justify-center gap-2 text-3xl mb-6">
            {Array.from({ length: hearts }).map((_, i) => (
              <span key={i}>💚</span>
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
                       focus:border-green-500 focus:ring-4 focus:ring-green-200 
                       transition-all duration-300 outline-none text-lg"
          />

          {/* Button */}
          <button
            onClick={handleCheck}
            className="px-8 py-3 mt-6 bg-gradient-to-r from-green-600 to-blue-600 
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

export default PresentContinuousPage;
