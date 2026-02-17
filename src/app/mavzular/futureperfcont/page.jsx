"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../learn/header";

const questions = [
  { q: "Men ertaga soat 5 gacha ishlayotgan bo‘laman", a: "I will have been working until 5 o’clock tomorrow." },
  { q: "U bir yil davomida o‘qiyotgan bo‘ladi", a: "He will have been studying for a year." },
  { q: "Biz shu paytgacha sayohat qilayotgan bo‘lamiz", a: "We will have been traveling by that time." },
  { q: "Ular loyihada ikki hafta ishlayotgan bo‘lishadi", a: "They will have been working on the project for two weeks." },
  { q: "Men bir soat davomida kutayotgan bo‘laman", a: "I will have been waiting for an hour." },
  { q: "U kitob o‘qiyotganiga ikki soat bo‘ladi", a: "She will have been reading for two hours." },
  { q: "Biz uch soat davomida mashq qilayotgan bo‘lamiz", a: "We will have been practicing for three hours." },
  { q: "Ular tongdan beri ishlayotgan bo‘lishadi", a: "They will have been working since morning." },
  { q: "Men u bilan bir yil davomida gaplashayotgan bo‘laman", a: "I will have been talking to her for a year." },
  { q: "U mashina haydayotganiga 30 daqiqa bo‘ladi", a: "He will have been driving for 30 minutes." }
];

const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const FuturePerfectContinuousPage = () => {
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
                    bg-gradient-to-br from-purple-50 via-pink-50 to-violet-100 px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-5xl w-full space-y-12 sm:space-y-16 text-center">

        {/* Title */}
        <header>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold 
                         bg-gradient-to-r from-purple-600 to-pink-600 
                         bg-clip-text text-transparent drop-shadow-md">
            ⏳ Future Perfect Continuous
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <b>Future Perfect Continuous</b> – kelajakda ma’lum bir vaqtgacha davom etib turgan harakatni bildiradi.  
            Asosan <b>will have been + V-ing</b> shaklida tuziladi.
          </p>
        </header>

        {/* Structure */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10 hover:shadow-2xl transition">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4 sm:mb-6">📘 Tuzilishi</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse rounded-xl">
              <thead>
                <tr className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800">
                  <th className="border px-3 sm:px-4 py-2 sm:py-3">Tur</th>
                  <th className="border px-3 sm:px-4 py-2 sm:py-3">Formula</th>
                  <th className="border px-3 sm:px-4 py-2 sm:py-3">Misol</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm sm:text-base">
                <tr className="hover:bg-pink-50 transition">
                  <td className="border px-3 sm:px-4 py-3 font-medium">Affirmative</td>
                  <td className="border px-3 sm:px-4 py-3">Subject + will have been + V-ing</td>
                  <td className="border px-3 sm:px-4 py-3">I will have been studying for 2 hours.</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-purple-50 transition">
                  <td className="border px-3 sm:px-4 py-3 font-medium">Negative</td>
                  <td className="border px-3 sm:px-4 py-3">Subject + won’t have been + V-ing</td>
                  <td className="border px-3 sm:px-4 py-3">She won’t have been sleeping long.</td>
                </tr>
                <tr className="hover:bg-pink-50 transition">
                  <td className="border px-3 sm:px-4 py-3 font-medium">Question</td>
                  <td className="border px-3 sm:px-4 py-3">Will + Subject + have been + V-ing?</td>
                  <td className="border px-3 sm:px-4 py-3">Will they have been working?</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Signal Words */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-3 sm:mb-4">🚦 Signal words</h2>
          <p className="text-gray-700 text-base sm:text-lg italic">
            for two hours, since morning, by that time, before, until, the whole day...
          </p>
        </section>

        {/* Examples */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-10 text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4 sm:mb-6">📝 Misollar</h2>
          <ul className="space-y-2 sm:space-y-3 text-gray-700 text-base sm:text-lg leading-relaxed">
            <li><u>I will have been working</u> for three hours by that time.</li>
            <li><u>They will have been studying</u> since morning.</li>
            <li><u>She will have been reading</u> for two hours.</li>
            <li><u>Will</u> you <u>have been waiting</u> long?</li>
            <li><u>He won’t have been sleeping</u> for more than an hour.</li>
          </ul>
        </section>

        {/* Quiz Section */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4 sm:mb-6">🎮 Future Perfect Continuous Challenge</h2>

          {/* Hearts */}
          <div className="flex justify-center gap-2 text-2xl sm:text-3xl mb-4 sm:mb-6">
            {Array.from({ length: hearts }).map((_, i) => (
              <span key={i}>❤️</span>
            ))}
          </div>

          {/* Question */}
          <p className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">
            Level {level + 1}: {questions[level].q}
          </p>

          {/* Input */}
          <input
            type="text"
            placeholder="✍️ Javob yozing..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full sm:w-2/3 p-3 sm:p-4 border-2 border-gray-300 rounded-2xl 
                       shadow-md bg-white text-gray-900 placeholder-gray-400
                       focus:border-purple-500 focus:ring-4 focus:ring-purple-200 
                       transition-all duration-300 outline-none text-base sm:text-lg"
          />

          {/* Button */}
          <button
            onClick={handleCheck}
            className="px-6 sm:px-8 py-2 sm:py-3 mt-4 sm:mt-6 bg-gradient-to-r from-purple-600 to-pink-600 
                       text-white font-medium rounded-xl shadow-md 
                       hover:scale-105 transition-transform"
          >
            ✅ Check
          </button>

          {/* Result */}
          {showResult === true && (
            <p className="mt-3 sm:mt-4 text-green-700 font-semibold">✅ To‘g‘ri!</p>
          )}
          {showResult === false && (
            <p className="mt-3 sm:mt-4 text-red-600 font-semibold">❌ Noto‘g‘ri!</p>
          )}
        </section>
      </div>
      <ToastContainer position="top-center" />
    </div>
    </div>
  );
};

export default FuturePerfectContinuousPage;
