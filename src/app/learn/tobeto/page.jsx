"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * ToBeToPage.jsx
 * Dizayn: dizayn1 (gradient background, rounded cards, shadows)
 * Responsive: sm:/md: prefikslar bilan barcha ekranlarga moslashadi
 */

const questions = [
  {
    q: "The president ___ to visit our city next month. (scheduled event)",
    a: "is to",
  },
  {
    q: "You ___ to hand in the report by Friday. (obligation/arrangement)",
    a: "are to",
  },
  {
    q: "He ___ to be promoted after the review. (planned / scheduled)",
    a: "is to",
  },
  {
    q: "They ___ to report to the manager at 9 AM yesterday. (past arrangement)",
    a: "were to",
  },
  {
    q: "She ___ to sign the contract tomorrow. (formal arrangement)",
    a: "is to",
  },
  {
    q: "By all accounts, the hero ___ to save the day. (destiny / expectation)",
    a: "is to",
  },
  {
    q: "Students ___ to sit the exam in June. (timetable/future schedule)",
    a: "are to",
  },
  {
    q: "He ___ to see the doctor, but he didn't. (planned but didn't happen—use past form)",
    a: "was to",
  },
  {
    q: "You ___ to follow the safety rules at all times. (formal instruction / obligation)",
    a: "are to",
  },
  {
    q: "They said she ___ to lead the team next year. (reported arrangement)",
    a: "is to",
  },
];

const normalize = (t) => (t || "").toLowerCase().trim();

export default function ToBeToPage() {
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showResult, setShowResult] = useState(null);

  const handleCheck = () => {
    const user = normalize(answer);
    const correct = normalize(questions[level].a);

    if (user === correct) {
      setShowResult(true);
      toast.success(`🎉 To‘g‘ri! Level ${level + 1} cleared!`);
      setTimeout(() => {
        if (level + 1 < questions.length) {
          setLevel(level + 1);
          setAnswer("");
          setShowResult(null);
        } else {
          toast.success("🏆 Ajoyib! Barcha savollar tugadi!");
          setLevel(0);
          setHearts(3);
          setAnswer("");
          setShowResult(null);
        }
      }, 900);
    } else {
      setShowResult(false);
      setHearts((h) => {
        const nh = h - 1;
        if (nh <= 0) {
          toast.error("💔 Yurak tugadi! Qayta boshlang!");
          setTimeout(() => {
            setLevel(0);
            setHearts(3);
            setAnswer("");
            setShowResult(null);
          }, 1200);
        }
        return nh;
      });
    }
  };

  return (
    <div className="all">
      {/* Header (dizayn1 style header block used across pages) */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="/">
              <div className="logo">
                <div className="logo-icon">Mr</div>
                <div className="logo-text">Akhmadjon IELTS</div>
              </div>
            </a>
            <nav className="nav">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/price">Price</a></li>
                <li><a href="/test">Tests</a></li>
                <li><a href="/locate">Location</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/learn/glavniy">Learn</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 px-4 sm:px-6 py-10 sm:py-16">
        <div className="w-full max-w-5xl space-y-12 text-center">

          {/* Title */}
          <header>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold
                           bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-md">
              📌 "To be to" Structure
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
              <b>"be to + V"</b> — rasmiy, jadvaliy yoki taqsimlangan reja, buyruq, majburiyat, yoki taqdirni ifodalash uchun ishlatiladi.
              Quyida <b>qachon</b>, <b>qanday</b> va <b>nima uchun</b> ishlatilishini keng va aniq tushuntiraman.
            </p>
          </header>

          {/* Quick summary card */}
          <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10 text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4">🔎 Qisqacha: nima uchun ishlatiladi?</h2>
            <ul className="text-gray-700 space-y-2 text-sm sm:text-base leading-relaxed">
              <li><b>Scheduled events / timetables:</b> official plans (The president <b>is to</b> visit next month).</li>
              <li><b>Official instructions / orders:</b> formal instructions (You <b>are to</b> report to the manager).</li>
              <li><b>Obligation in formal contexts:</b> (He <b>is to</b> attend the meeting).</li>
              <li><b>Arrangements (often in news, formal writing):</b> (They <b>are to</b> open the new bridge on Monday).</li>
              <li><b>Destiny / expectation (literary):</b> (He <b>is to</b> become king).</li>
              <li><b>Negation:</b> not + be + to (He <b>is not to</b> enter the room).</li>
            </ul>
          </section>

          {/* Structure table */}
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-6 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4">🧭 Tuzilishi (Structure)</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800">
                    <th className="p-3 border">Situation</th>
                    <th className="p-3 border">Form</th>
                    <th className="p-3 border">Example</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t">
                    <td className="p-3">Present planned / scheduled</td>
                    <td className="p-3"><code>Subject + is/are/am to + V</code></td>
                    <td className="p-3">The meeting <b>is to</b> start at 10.</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="p-3">Past plan / scheduled</td>
                    <td className="p-3"><code>Subject + was/were to + V</code></td>
                    <td className="p-3">She <b>was to</b> arrive at noon (but didn't).</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Future (formal)</td>
                    <td className="p-3"><code>Subject + is/are to + V (used for timetables)</code></td>
                    <td className="p-3">The new wing <b>is to</b> open next year.</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="p-3">Negative / Prohibition</td>
                    <td className="p-3"><code>Subject + is/are/am not to + V</code></td>
                    <td className="p-3">You <b>are not to</b> use your phone during the exam.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* When to use: detailed sections */}
          <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-10 text-left space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700">🧩 Qachon va qanday ishlatiladi — batafsil</h2>

            <div>
              <h3 className="font-semibold text-gray-800">1) Timetables & Scheduled events</h3>
              <p className="text-gray-700">Rasmiy dasturlar, jadval yoki rasmiy rejalarda: <em>The delegation <b>is to</b> arrive on Monday.</em></p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">2) Formal instructions / orders</h3>
              <p className="text-gray-700">Rasmiy yoki hukumatli ko‘rsatmalar uchun: <em>All visitors <b>are to</b> present ID cards.</em></p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">3) Destiny / Expectation (old-fashioned / literary)</h3>
              <p className="text-gray-700">Badiiy yoki rasmiy kontekstdagi taqdir ifodasi: <em>He <b>is to</b> become the leader.</em></p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">4) Planned but not realized (past)</h3>
              <p className="text-gray-700">O‘tmishda rejalashtirilgan, lekin sodir bo‘lmagan hodisalar: <em>He <b>was to</b> join us, but he fell ill.</em></p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">5) Negative: prohibition in formal contexts</h3>
              <p className="text-gray-700">Rasmiy va mustahkam inkor: <em>Students <b>are not to</b> cheat on exams.</em></p>
            </div>
          </section>

          {/* Common pitfalls */}
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-6 sm:p-10 text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-3">⚠️ Common mistakes</h2>
            <ul className="text-gray-700 space-y-2">
              <li>❌ <em>He is to going</em> — xato. To‘g‘ri: <strong>He is to go</strong>.</li>
              <li>❌ <em>Are you to come?</em> — rasmiy so‘rov uchun ma’qullanmagan (so‘roq shakli kam ishlatiladi).</li>
              <li>❌ To be to o‘rniga will ishlatish — kontekst farqi: <strong>is to</strong> emphasizes schedule/formality; <strong>will</strong> — oddiy kelajak.</li>
            </ul>
          </section>

          {/* Signal words & contexts */}
          <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-3">🚦 Signal words / contexts</h2>
            <p className="text-gray-700">next week, tomorrow, on Monday, by Friday, scheduled, arranged, ordered, expected, supposed to</p>
          </section>

          {/* Mini Quiz */}
          <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4">🎮 Mini Quiz — "To be to"</h2>

            {/* Hearts */}
            <div className="flex justify-center gap-2 text-2xl sm:text-3xl mb-4">
              {Array.from({ length: hearts }).map((_, i) => (
                <span key={i}>❤️</span>
              ))}
            </div>

            {/* Question */}
            <p className="text-base sm:text-lg font-medium text-gray-800 mb-3">{questions[level].q}</p>

            <input
              type="text"
              placeholder='Type "is to", "are to", "was to", "were to" (etc.)'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleCheck(); }}
              className="w-full sm:w-2/3 lg:w-1/2 p-3 sm:p-4 border-2 border-gray-300 rounded-2xl shadow-sm bg-white text-gray-900 placeholder-gray-400
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none text-sm sm:text-base"
            />

            <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={handleCheck}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-md hover:scale-105 transition-transform w-full sm:w-auto"
              >
                ✅ Check
              </button>

              <button
                onClick={() => { setAnswer(""); setShowResult(null); toast.info("Javob tozalandi"); }}
                className="px-4 py-2 border rounded-xl text-gray-700 hover:bg-gray-100 transition"
              >
                Clear
              </button>
            </div>

            {/* Result */}
            <div className="mt-4 min-h-[28px]">
              {showResult === true && <p className="text-green-700 font-semibold">✅ To‘g‘ri!</p>}
              {showResult === false && <p className="text-red-600 font-semibold">❌ Noto‘g‘ri — to‘g‘ri javob: <strong>{questions[level].a}</strong></p>}
            </div>
          </section>

          {/* Extra tips */}
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-6 sm:p-10 text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-3">💡 Teacher tips (qisqacha)</h2>
            <ol className="text-gray-700 space-y-2 list-decimal list-inside">
              <li>Official documents and news reports often use <b>be to</b> for schedules.</li>
              <li>To express prohibition use <b>is not to / are not to</b> in formal instructions.</li>
              <li>To report failed plans use past form <b>was to / were to</b> + (but ...).</li>
              <li>Do not confuse with <b>supposed to</b> — 'supposed to' is more about expectation/common knowledge; 'be to' is more formal/official.</li>
            </ol>
          </section>

        </div>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}
