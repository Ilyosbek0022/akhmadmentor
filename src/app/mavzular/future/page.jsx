"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const questions = [
  { q: "Men ertaga kitob o‘qiyman", a: "I will read a book tomorrow." },
  { q: "Ular kechqurun futbol o‘ynashadi", a: "They will play football in the evening." },
  { q: "Biz tez orada uchrashamiz", a: "We will meet soon." },
  { q: "U darsni ertaga tayyorlaydi", a: "He will prepare the lesson tomorrow." },
  { q: "Men yordam beraman", a: "I will help you." },
  { q: "Ular yangi mashina sotib olishadi", a: "They will buy a new car." },
  { q: "Biz sayohatga chiqamiz", a: "We will go on a trip." },
  { q: "U kechki ovqatni pishiradi", a: "She will cook dinner." },
  { q: "Men senga qo‘ng‘iroq qilaman", a: "I will call you." },
  { q: "Ular film tomosha qilishadi", a: "They will watch a movie." }
];

const normalize = (text) =>
  text.toLowerCase().trim().replace(/[.?!]/g, "");

const FutureSimplePage = () => {
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
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 px-6 py-16">
      <div className="max-w-5xl w-full space-y-16 text-center">

        {/* Title */}
        <header>
          <h1 className="text-6xl font-extrabold 
                         bg-gradient-to-r from-blue-600 to-teal-500 
                         bg-clip-text text-transparent drop-shadow-md">
             Future Simple Tense
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            <b>Future Simple</b> — kelajakda sodir bo‘ladigan ish-harakatni ifodalaydi.  
            Asosan <b>will + V (fe’lning 1-shakli)</b> yordamida tuziladi.
          </p>
        </header>

        {/* Structure */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">📘 Tuzilishi</h2>
          <table className="w-full text-center border-collapse overflow-hidden rounded-xl">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-teal-100 text-gray-800">
                <th className="border px-4 py-3">Tur</th>
                <th className="border px-4 py-3">Formula</th>
                <th className="border px-4 py-3">Misol</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="hover:bg-blue-50 transition">
                <td className="border px-4 py-4 font-medium">Affirmative</td>
                <td className="border px-4 py-4">Subject + will + V</td>
                <td className="border px-4 py-4">I will go to school.</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-teal-50 transition">
                <td className="border px-4 py-4 font-medium">Negative</td>
                <td className="border px-4 py-4">Subject + will not (won’t) + V</td>
                <td className="border px-4 py-4">He won’t come tomorrow.</td>
              </tr>
              <tr className="hover:bg-blue-50 transition">
                <td className="border px-4 py-4 font-medium">Question</td>
                <td className="border px-4 py-4">Will + Subject + V?</td>
                <td className="border px-4 py-4">Will they visit us?</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signal words */}
        <section className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">🚦 Signal words</h2>
          <p className="text-gray-700 text-lg italic">
            tomorrow, next week, soon, in the future, later, in an hour, tonight...
          </p>
        </section>

        {/* Misollar */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 text-left">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">📝 Misollar</h2>
          <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
            <li><u>I will go</u> to the cinema tomorrow.</li>
            <li><u>She will call</u> you later.</li>
            <li><u>We won’t eat</u> at home tonight.</li>
            <li><u>Will</u> they <u>visit</u> us next week?</li>
            <li><u>It will rain</u> soon.</li>
          </ul>
        </section>

        {/* Formula Section */}
        <section className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-3xl border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">📚 Qo‘shimcha ma’lumot</h2>
          <ul className="text-left text-gray-700 text-lg space-y-3 leading-relaxed">
            <li><b>will</b> → barcha shaxslar uchun bir xil.</li>
            <li><b>won’t</b> → “will not” qisqartmasi, inkor shakli.</li>
            <li>Kelajakdagi <i>reja, taxmin, va’da yoki qaror</i>ni bildiradi.</li>
          </ul>
        </section>

        {/* Quiz Game */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">🎮 Future Simple Challenge</h2>

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
                       focus:border-blue-500 focus:ring-4 focus:ring-blue-200 
                       transition-all duration-300 outline-none text-lg"
          />

          {/* Button */}
          <button
            onClick={handleCheck}
            className="px-8 py-3 mt-6 bg-gradient-to-r from-blue-600 to-teal-500 
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
  );
};

export default FutureSimplePage;
