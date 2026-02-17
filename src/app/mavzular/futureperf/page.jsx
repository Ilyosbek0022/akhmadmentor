"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../learn/header";

const questions = [
  { q: "Men ishni ertaga tugatib bo‘lgan bo‘laman", a: "I will have finished the work tomorrow." },
  { q: "Ular yetib kelguncha, biz ovqatni tayyorlab bo‘lgan bo‘lamiz", a: "We will have prepared the food before they arrive." },
  { q: "U soat 10 gacha o‘qishni tugatgan bo‘ladi", a: "He will have finished studying by 10 o’clock." },
  { q: "Men u yerga borgunimcha, u ketgan bo‘ladi", a: "He will have left before I get there." },
  { q: "Ular film boshlanguncha kinoga yetib kelgan bo‘lishadi", a: "They will have arrived at the cinema before the film starts." },
  { q: "Sen ertaga kitobni o‘qib bo‘lgan bo‘lasanmi?", a: "Will you have finished the book by tomorrow?" },
  { q: "Men 5 yil ichida ingliz tilini o‘rganib bo‘lgan bo‘laman", a: "I will have learned English in five years." },
  { q: "Ular biz kelguncha ketgan bo‘lishadi", a: "They will have left before we arrive." },
  { q: "Men 30 yoshimda uy sotib olgan bo‘laman", a: "I will have bought a house by the time I am 30." },
  { q: "U dars tugaguncha vazifasini yozib bo‘lgan bo‘ladi", a: "She will have written her homework before the class ends." }
];

const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const FuturePerfectPage = () => {
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
              ⏳ Future Perfect Tense
            </h1>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              <b>Future Perfect</b> — kelajakda ma’lum bir paytgacha <b>tugallanadigan</b> ish-harakatni bildiradi.  
              “will have + V3” formulasi bilan yasaladi.
            </p>
          </header>

          {/* Structure */}
          <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">📘 Tuzilishi</h2>
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
                  <td className="border px-4 py-4">Subject + will have + V3</td>
                  <td className="border px-4 py-4">I will have finished my work.</td>
                </tr>
                <tr className="bg-gray-50 hover:bg-pink-50 transition">
                  <td className="border px-4 py-4 font-medium">Negative</td>
                  <td className="border px-4 py-4">Subject + will not have + V3</td>
                  <td className="border px-4 py-4">She won’t have left by 5.</td>
                </tr>
                <tr className="hover:bg-purple-50 transition">
                  <td className="border px-4 py-4 font-medium">Question</td>
                  <td className="border px-4 py-4">Will + Subject + have + V3?</td>
                  <td className="border px-4 py-4">Will you have finished by tomorrow?</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Signal words */}
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-10">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">🚦 Signal words</h2>
            <p className="text-gray-700 text-lg italic">
              by, by the time, before, until, when, in two years, by tomorrow...
            </p>
          </section>

          {/* Misollar */}
          <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-left">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">📝 Misollar</h2>
            <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
              <li><u>I will have finished</u> my work <i>by 6 o’clock.</i></li>
              <li><u>She will have gone</u> home <i>before</i> we arrive.</li>
              <li><u>They will not have completed</u> the task <i>by tomorrow.</i></li>
              <li><u>Will</u> you <u>have studied</u> before the test?</li>
              <li><u>We will have eaten</u> when he comes.</li>
            </ul>
          </section>

          {/* Extra Info */}
          <section className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl border border-gray-200 p-10">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">📚 Qo‘shimcha ma’lumot</h2>
            <ul className="text-left text-gray-700 text-lg space-y-3 leading-relaxed">
              <li><b>will have + V3</b> — barcha shaxslar uchun bir xil ishlatiladi.</li>
              <li>Bu zamon tugallangan kelajakdagi ishni bildiradi.</li>
              <li><i>Masalan:</i> “By next week, I will have completed this course.”</li>
            </ul>
          </section>

          {/* Quiz Game */}
          <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">🎮 Future Perfect Challenge</h2>

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

export default FuturePerfectPage;
