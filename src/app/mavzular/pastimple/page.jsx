"use client";
import React, { useState } from "react";

const PastSimplePage = () => {
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleCheck = () => setShowResult(true);

  return (
    <div className="gapuchun">
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-16">
      <div className="max-w-4xl w-full space-y-12 text-center">
        
        {/* Title */}
        <header id="headder">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            ⏳ Past Simple Tense
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <b>Past Simple</b> – o‘tgan zamonda tugallangan ish-harakatlarni ifodalaydi.
            Kundalik muloqotda eng ko‘p ishlatiladigan zamonlardan biri.
          </p>
        </header>

        {/* Structure */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 section">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">📌 Tuzilishi</h2>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="border border-gray-200 px-4 py-3">Tur</th>
                <th className="border border-gray-200 px-4 py-3">Formula</th>
                <th className="border border-gray-200 px-4 py-3">Misol</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="border border-gray-200 px-4 py-4 font-medium">Affirmative</td>
                <td className="border border-gray-200 px-4 py-4">Subject + V2</td>
                <td className="border border-gray-200 px-4 py-4">I visited Tashkent.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-4 py-4 font-medium">Negative</td>
                <td className="border border-gray-200 px-4 py-4">Subject + did not + V1</td>
                <td className="border border-gray-200 px-4 py-4">She didn’t play football.</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-4 font-medium">Question</td>
                <td className="border border-gray-200 px-4 py-4">Did + Subject + V1?</td>
                <td className="border border-gray-200 px-4 py-4">Did you watch TV?</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Signal words */}
        <section className="bg-gray-50 rounded-3xl border border-gray-200 p-10 section" >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🚦 Signal words</h2>
          <p className="text-gray-600 text-lg">
            yesterday, last week, ago, in 2000, when I was a child, two days ago, last year...
          </p>
        </section>

        {/* Misollar */}
        <section className="bg-white rounded-3xl shadow-md border border-gray-200 p-10 text-left section">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">📝 Misollar</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg leading-relaxed">
  <li>I <u>watched</u> a movie <u>yesterday</u>.</li>
  <li>They <u>visited</u> Samarkand <u>last</u> week.</li>
  <li>She <u>cooked</u> dinner two days <u>ago</u>.</li>
  <li>We <u>played</u> football after school.</li>
  <li>He <u>didn’t</u> go to work yesterday.</li>
  <li>I <u>didn’t</u> understand the question.</li>
  <li><u>Did</u> you see that film?</li>
  <li><u>Did</u> they meet <u>last</u> year?</li>
</ul>

        </section>

        {/* Quiz */}
        <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10 section">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">🎯 Mini Quiz</h2>
          <p className="text-gray-700 text-lg mb-6">
            “Men kecha kitob o‘qidim” gapini inglizchaga tarjima qiling:
          </p>
          <div className="flex flex-col items-center gap-5">
      <input
  type="text"
  placeholder="✍️ Javob yozing..."
  value={answer}
  onChange={(e) => setAnswer(e.target.value)}
  className="w-2/3 p-4 border-2 border-gray-400 rounded-2xl 
             shadow-md bg-white text-black 
             focus:border-green-500 focus:ring-4 focus:ring-green-200 
             transition-all duration-300 outline-none text-lg 
             placeholder-gray-400 "
/>

            <button
              onClick={handleCheck}
              className="px-8 py-3 bg-green-600 text-white font-medium rounded-xl shadow-md hover:bg-green-700 transition "
            >
              ✅ Check
            </button>
            {showResult && (
              <p className="mt-4 text-green-700 font-semibold text-lg">
                ✅ To‘g‘ri javob: <b>I read a book yesterday.</b>
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default PastSimplePage;
