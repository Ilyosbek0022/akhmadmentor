"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const questions = [
  { q: "I saw ___ cat on the wall. (birinchi marta eslatilmoqda)", a: "a" },
  { q: "___ sun is shining brightly today.", a: "the" },
  { q: "She is ___ honest girl.", a: "an" },
  { q: "I love ___ music.", a: "zero" },
  { q: "___ Mount Everest is the highest mountain.", a: "the" },
  { q: "He bought ___ umbrella yesterday.", a: "an" },
  { q: "We live in ___ big house.", a: "a" },
  { q: "___ water is essential for life.", a: "zero" },
  { q: "She went to ___ United States last year.", a: "the" },
  { q: "He is ___ best student in the class.", a: "the" },
];

const normalize = (t) => t.toLowerCase().trim();

const ArticlesPage = () => {
  const [answer, setAnswer] = useState("");
  const [level, setLevel] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showResult, setShowResult] = useState(null);

  const handleCheck = () => {
    const user = normalize(answer);
    const correct = normalize(questions[level].a);

    if (user === correct) {
      setShowResult(true);
      toast.success(`✅ To‘g‘ri!`);
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
        }
      }, 1000);
    } else {
      setShowResult(false);
      setHearts((h) => {
        const nh = h - 1;
        if (nh === 0) {
          toast.error("💔 Yurak tugadi! Qayta boshlang!");
          setTimeout(() => {
            setLevel(0);
            setHearts(3);
            setAnswer("");
            setShowResult(null);
          }, 1500);
        }
        return nh;
      });
    }
  };

  return (
    <div className="all">
      {/* Header */}
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

      {/* Main */}
      <div className="min-h-screen flex items-center justify-center 
                      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 px-6 py-16">
        <div className="max-w-5xl w-full space-y-16 text-center">

          {/* Title */}
          <header>
            <h1 className="text-6xl font-extrabold 
                           bg-gradient-to-r from-purple-600 to-pink-600 
                           bg-clip-text text-transparent drop-shadow-md">
              📰 ARTICLES (A / AN / THE / ZERO)
            </h1>
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Ingliz tilidagi <b>Articles</b> — “a”, “an”, “the” va “zero article” (ya’ni hech qanday article ishlatilmaydigan holatlar).
              Ular ism oldidan keladi va gapdagi **aniqlik** yoki **noma’lumlik**ni bildiradi.
            </p>
          </header>

          {/* Types of Articles */}
          <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
            <h2 className="text-3xl font-semibold text-purple-700 mb-6">📖 Article turlari</h2>
            <ul className="text-left text-gray-700 text-lg leading-relaxed space-y-3">
              <li><b>Indefinite Articles (a / an)</b> — noma’lum narsalar uchun.</li>
              <li><b>Definite Article (the)</b> — aniq, ma’lum narsalar uchun.</li>
              <li><b>Zero Article</b> — umuman article ishlatilmaydigan holatlar.</li>
            </ul>
          </section>

          {/* Indefinite Article */}
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-10 text-left">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">🅰️ “A” va “An” qoidalari</h2>
            <p className="text-gray-700 text-lg mb-4">
              <b>“A”</b> — undosh tovush bilan boshlanadigan so‘zlardan oldin keladi. <br />
              <b>“An”</b> — unli tovush (a, e, i, o, u) bilan boshlanadigan so‘zlardan oldin keladi.
            </p>
            <ul className="space-y-2 text-gray-800 text-lg">
              <li>✅ <b>a</b> car, a book, a teacher</li>
              <li>✅ <b>an</b> apple, an engineer, an hour (bu yerda “h” talaffuz qilinmaydi)</li>
              <li>⚠️ Faqat talaffuzga e’tibor beriladi: <b>an MBA</b> (M - “em” undosh emas, unli tovush)</li>
            </ul>
          </section>

          {/* Definite Article */}
          <section className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 text-left">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">🔹 “The” — aniqlik bildiruvchi article</h2>
            <p className="text-gray-700 text-lg mb-4">
              “The” ma’lum yoki kontekstda oldin eslatilgan narsaga nisbatan ishlatiladi.
            </p>
            <ul className="space-y-2 text-gray-800 text-lg">
              <li>✅ The book on the table is mine. (aniq kitob haqida)</li>
              <li>✅ I saw a dog. <b>The dog</b> was very cute. (oldin eslatilgan)</li>
              <li>✅ The sun, the sky, the Earth — yagona narsalar oldidan</li>
              <li>✅ The richest person in the world — superlativ darajali sifatlar bilan</li>
              <li>✅ The United Kingdom, The Philippines — ko‘plik yoki “Republic / States” bo‘lgan davlat nomlari bilan</li>
            </ul>
          </section>

          {/* Zero Article */}
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border border-gray-200 p-10 text-left">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">🚫 Zero Article — article ishlatilmaydigan joylar</h2>
            <ul className="text-gray-800 text-lg space-y-2 leading-relaxed">
              <li>❌ Ismlar, joylar, tillar bilan: <b>John, Paris, English</b></li>
              <li>❌ Ko‘plikdagi umumiy so‘zlar: <b>Dogs are friendly.</b></li>
              <li>❌ Abstrakt tushunchalar: <b>Love is important.</b></li>
              <li>❌ Ovqatlar va ichimliklar: <b>I like tea.</b></li>
              <li>❌ Sport nomlari: <b>I play football.</b></li>
              <li>❌ Transport + by bilan: <b>by car, by bus, by plane</b></li>
            </ul>
          </section>

          {/* Comparison Table */}
          <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">⚖️ Qachon ishlatiladi, qachon ishlatilmaydi</h2>
            <table className="w-full text-center border-collapse overflow-hidden rounded-xl">
              <thead>
                <tr className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800">
                  <th className="border px-4 py-3">Article</th>
                  <th className="border px-4 py-3">Ishlatiladigan joy</th>
                  <th className="border px-4 py-3">Misol</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr><td className="border px-4 py-3">A / An</td><td className="border px-4 py-3">Noma’lum bitta narsa</td><td className="border px-4 py-3">I saw <b>a dog</b>.</td></tr>
                <tr className="bg-gray-50"><td className="border px-4 py-3">The</td><td className="border px-4 py-3">Aniq, oldin aytilgan narsa</td><td className="border px-4 py-3">The dog was big.</td></tr>
                <tr><td className="border px-4 py-3">Zero</td><td className="border px-4 py-3">Umumiy tushuncha</td><td className="border px-4 py-3">I like <b>music</b>.</td></tr>
              </tbody>
            </table>
          </section>

          {/* Mini Quiz */}
          <section className="bg-white rounded-3xl shadow-lg border border-gray-200 p-10">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">🎯 Mini Quiz – Articles</h2>
            <div className="flex justify-center gap-2 text-3xl mb-6">
              {Array.from({ length: hearts }).map((_, i) => (<span key={i}>❤️</span>))}
            </div>
            <p className="text-lg font-medium text-gray-800 mb-4">
              Level {level + 1}: {questions[level].q}
            </p>
            <input
              type="text"
              placeholder="✍️ a / an / the / zero"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-2/3 p-4 border-2 border-gray-300 rounded-2xl shadow-md bg-white 
                         text-gray-900 placeholder-gray-400
                         focus:border-purple-500 focus:ring-4 focus:ring-purple-200 
                         transition-all duration-300 outline-none text-lg"
            />
            <button
              onClick={handleCheck}
              className="px-8 py-3 mt-6 bg-gradient-to-r from-purple-600 to-pink-600 
                         text-white font-medium rounded-xl shadow-md 
                         hover:scale-105 transition-transform"
            >
              ✅ Check
            </button>
            {showResult === true && <p className="mt-4 text-green-700 font-semibold">✅ To‘g‘ri!</p>}
            {showResult === false && <p className="mt-4 text-red-600 font-semibold">❌ Noto‘g‘ri!</p>}
          </section>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default ArticlesPage;
