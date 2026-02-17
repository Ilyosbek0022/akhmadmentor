"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../learn/header";

const questions = [
  { q: "Men soatlab kitob o'qiyapman", a: "I have been reading a book for hours." },
  { q: "Ular bir necha soatdan beri kutishmoqda", a: "They have been waiting for several hours." },
  { q: "U butun kun dars qilyapti", a: "She has been studying all day." },
  { q: "Biz ertalabdan beri futbol o'ynayapmiz", a: "We have been playing football since morning." },
  { q: "U bir soatdan beri ishlamayapti", a: "He has not been working for an hour." },
  { q: "Men bu masalani hal qilishga urinib ko'rayapman", a: "I have been trying to solve this problem." },
  { q: "Siz uzoq vaqtdan beri shu yerda o'tiryapsizmi?", a: "Have you been sitting here for a long time?" },
  { q: "Ular so'nggi bir necha kundan beri loyiha ustida ishlamoqdamimi?", a: "Have they been working on the project for the last few days?" },
  { q: "Men bolaligimdan beri ingliz tilini o'rganyapman", a: "I have been learning English since my childhood." },
  { q: "Biz 2020-yildan beri bu uyda yashayapmiz", a: "We have been living in this house since 2020." }
];

// Tekshiruvni yumshatish funksiyasi
const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const PresentPerfectContinuousPage = () => {
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
                    bg-gradient-to-br from-green-50 via-blue-50 to-teal-100 px-6 py-16">
      <div className="max-w-5xl w-full space-y-16 text-center">

        {/* Title */}
        <header>
          <h1 className="text-6xl font-extrabold 
                         bg-gradient-to-r from-green-600 to-blue-600 
                         bg-clip-text text-transparent drop-shadow-md">
            ⏳ Present Perfect Continuous Tense
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <b>Present Perfect Continuous</b> – o'tmishda boshlanib hozirgacha davom etayotgan 
            yoki hozirgacha davom etgan va natijasi hozir sezilayotgan ish-harakatlarni ifodalaydi.
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
                <td className="border px-4 py-4">Subject + have/has + been + V-ing</td>
                <td className="border px-4 py-4">I have been studying.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition">
                <td className="border px-4 py-4 font-medium">Negative</td>
                <td className="border px-4 py-4">Subject + have/has + not + been + V-ing</td>
                <td className="border px-4 py-4">She has not been working.</td>
              </tr>
              <tr className="hover:bg-green-50 transition">
                <td className="border px-4 py-4 font-medium">Question</td>
                <td className="border px-4 py-4">Have/Has + Subject + been + V-ing?</td>
                <td className="border px-4 py-4">Have you been waiting?</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signal words */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🚦 Signal words</h2>
          <p className="text-gray-700 text-lg italic">
            for, since, all day, all week, how long, lately, recently, for hours, for days...
          </p>
        </section>

        {/* Misollar */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-left">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">📝 Misollar</h2>
          <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
            <li><u>I have been watching</u> TV <i>for two hours</i>.</li>
            <li><u>They have been living</u> here <i>since 2015</i>.</li>
            <li><u>She has been cooking</u> <i>all morning</i>.</li>
            <li><u>We have been playing</u> tennis <i>for an hour</i>.</li>
            <li><u>He has not been sleeping</u> well <i>lately</i>.</li>
            <li><u>I have not been feeling</u> well <i>recently</i>.</li>
            <li><u>Have</u> you <u>been exercising</u> regularly?</li>
            <li><u>How long have</u> they <u>been dating</u>?</li>
          </ul>
        </section>

        {/* Formula Section */}
        <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">📚 Qo'shimcha ma'lumotlar</h2>
          <ul className="text-left text-gray-700 text-lg space-y-3 leading-relaxed">
            <li><b>For</b> → ma'lum vaqt davomiyligini (for hours, for three days)</li>
            <li><b>Since</b> → aniq vaqt nuqtasini (since morning, since 2020)</li>
            <li><b>All + vaqt</b> → butun davrni (all day, all week, all month)</li>
            <li><b>How long</b> → qancha vaqt davomida savol so'rash</li>
          </ul>
        </section>

        {/* Quiz Game */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">🎮 Present Perfect Continuous Challenge</h2>

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

export default PresentPerfectContinuousPage;