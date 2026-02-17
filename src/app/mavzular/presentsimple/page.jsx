"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../learn/header";

const questions = [
  { q: "Men har kuni kitob o'qiyman", a: "I read a book every day." },
  { q: "U (qiz) maktabga boradi", a: "She goes to school." },
  { q: "Biz ingliz tilini o'rganamiz", a: "We learn English." },
  { q: "U (o'g'il) futbol o'ynamaydi", a: "He doesn't play football." },
  { q: "Siz choy ichasizmi?", a: "Do you drink tea?" },
  { q: "U (qiz) qahva ichadimi?", a: "Does she drink coffee?" },
  { q: "Men o'qituvchiman", a: "I am a teacher." },
  { q: "U (o'g'il) uyda", a: "He is at home." },
  { q: "Ular do'stlar", a: "They are friends." },
  { q: "Biz Samarqanddamiz", a: "We are in Samarkand." }
];

// normalize qilib tekshiruvni yumshatamiz
const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const PresentSimplePage = () => {
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
                    bg-gradient-to-br from-green-50 via-blue-50 to-yellow-100 px-6 py-16">
      <div className="max-w-5xl w-full space-y-16 text-center">

        {/* Title */}
        <header>
          <h1 className="text-6xl font-extrabold 
                         bg-gradient-to-r from-green-600 to-blue-600 
                         bg-clip-text text-transparent drop-shadow-md">
            🌞 Present Simple Tense
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <b>Present Simple</b> – odatdagi, muntazam yoki umumiy 
            haqiqatlarni ifodalaydi.
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
                <td className="border px-4 py-4">Subject + V1 (+s/es) + SPS</td>
                <td className="border px-4 py-4">She plays football every day.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition">
                <td className="border px-4 py-4 font-medium">Negative</td>
                <td className="border px-4 py-4">Subject + do/does not + V1 + SPS</td>
                <td className="border px-4 py-4">He doesn't read books on Sundays.</td>
              </tr>
              <tr className="hover:bg-green-50 transition">
                <td className="border px-4 py-4 font-medium">Question</td>
                <td className="border px-4 py-4">Do/Does + Subject + V1 + SPS?</td>
                <td className="border px-4 py-4">Do you play the guitar?</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition">
                <td className="border px-4 py-4 font-medium">To be (am/is/are)</td>
                <td className="border px-4 py-4">Subject + am/is/are + SPS</td>
                <td className="border px-4 py-4">I am a student. / They are happy.</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signal words */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🚦 Signal words</h2>
          <p className="text-gray-700 text-lg italic">
            always, usually, often, sometimes, never, every day, on Sundays, in the morning...
          </p>
        </section>

        {/* Misollar */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-left">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">📝 Misollar</h2>
          <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
            <li><u>I read</u> books <i>every day</i>.</li>
            <li><u>She goes</u> to school <i>in the morning</i>.</li>
            <li><u>We play</u> football <i>on Sundays</i>.</li>
            <li><u>He doesn't watch</u> TV <i>at night</i>.</li>
            <li><u>Do</u> you <u>like</u> pizza?</li>
            <li><u>Does</u> she <u>drink</u> tea?</li>
            <li><u>I am</u> a student.</li>
            <li><u>They are</u> friends.</li>
          </ul>
        </section>

        {/* Extra formulas */}
        <section className="bg-gradient-to-r from-yellow-50 to-green-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">📚 Qo'shimcha formulalar</h2>
          <ul className="text-left text-gray-700 text-lg space-y-3 leading-relaxed">
            <li><b>To be (am/is/are)</b> → I am happy. / She is tall. / They are students.</li>
            <li><b>Regular verbs</b> → V + s/es → plays, goes, watches.</li>
            <li><b>Negative (do/does)</b> → I don't like tea. / He doesn't play football.</li>
            <li><b>Questions</b> → Do you read books? / Does she study English?</li>
          </ul>
        </section>

        {/* Quiz Game */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">🎮 Present Simple Challenge</h2>

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

export default PresentSimplePage;
