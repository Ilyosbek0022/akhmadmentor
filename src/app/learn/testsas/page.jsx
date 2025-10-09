// GeneralGrammarTest.jsx
"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * GeneralGrammarTest (dizayn1)
 * 14 questions across: Conditionals, Tenses, Passive, Reported, Articles, To be to, Prepositions
 */

const QUESTIONS = [
  // If Conditionals (2)
  {
    id: "c1",
    topic: "If Conditionals",
    q: "If you heat water, it ___ (boil).",
    options: ["boils", "will boil", "boiled"],
    correct: "boils",
  },
  {
    id: "c2",
    topic: "If Conditionals",
    q: "If I were you, I ___ (study) harder.",
    options: ["would study", "will study", "had studied"],
    correct: "would study",
  },

  // Tenses (2)
  {
    id: "t1",
    topic: "Tenses",
    q: "I ___ to London last year.",
    options: ["went", "go", "have gone"],
    correct: "went",
  },
  {
    id: "t2",
    topic: "Tenses",
    q: "She ___ dinner two hours ago.",
    options: ["cooked", "has cooked", "is cooking"],
    correct: "cooked",
  },

  // Passive Voice (2)
  {
    id: "p1",
    topic: "Passive Voice",
    q: "They will deliver the package tomorrow. → Passive?",
    options: [
      "The package will be delivered tomorrow.",
      "The package will deliver tomorrow.",
      "Tomorrow the package is delivered.",
    ],
    correct: "The package will be delivered tomorrow.",
  },
  {
    id: "p2",
    topic: "Passive Voice",
    q: "Someone cleaned the room yesterday. → Passive?",
    options: [
      "The room was cleaned yesterday.",
      "The room is cleaned yesterday.",
      "The room had been cleaned yesterday.",
    ],
    correct: "The room was cleaned yesterday.",
  },

  // Reported Speech (2)
  {
    id: "r1",
    topic: "Reported Speech",
    q: `He said, "I am tired." → Reported?`,
    options: ["He said he was tired.", "He said he is tired.", "He says he was tired."],
    correct: "He said he was tired.",
  },
  {
    id: "r2",
    topic: "Reported Speech",
    q: `They said, "We will come tomorrow." → Reported?`,
    options: [
      "They said they would come the next day.",
      "They said they will come tomorrow.",
      "They said they come tomorrow.",
    ],
    correct: "They said they would come the next day.",
  },

  // Articles (2)
  {
    id: "a1",
    topic: "Articles",
    q: "I saw ___ cat on the wall. (first mention)",
    options: ["a", "the", "an"],
    correct: "a",
  },
  {
    id: "a2",
    topic: "Articles",
    q: "___ water is essential for life.",
    options: ["The", "A", "Zero (no article)"],
    correct: "Zero (no article)",
  },

  // To be to (2)
  {
    id: "b1",
    topic: "To be to",
    q: "The president ___ to visit our city next month. (scheduled)",
    options: ["is to", "will", "was to"],
    correct: "is to",
  },
  {
    id: "b2",
    topic: "To be to",
    q: "He ___ to see the doctor, but he didn't. (planned but didn't happen)",
    options: ["was to", "is to", "will be"],
    correct: "was to",
  },

  // Prepositions (2)
  {
    id: "pr1",
    topic: "Prepositions",
    q: "We met ___ the bus stop.",
    options: ["at", "in", "on"],
    correct: "at",
  },
  {
    id: "pr2",
    topic: "Prepositions",
    q: "She was born ___ 2001.",
    options: ["in", "on", "at"],
    correct: "in",
  },
];

export default function GeneralGrammarTest() {
  const [answers, setAnswers] = useState({}); // {id: option}
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState({}); // {id: {ok: boolean}}
  const [score, setScore] = useState(null);

  const handleSelect = (id, option) => {
    if (checked) return; // lock answers after check
    setAnswers((s) => ({ ...s, [id]: option }));
  };

  const checkAnswers = () => {
    const res = {};
    let correctCount = 0;

    QUESTIONS.forEach((q) => {
      const user = (answers[q.id] || "").trim();
      const ok = user !== "" && user.toLowerCase() === q.correct.toLowerCase();
      res[q.id] = { ok, user, correct: q.correct };
      if (ok) correctCount++;
    });

    setResults(res);
    setScore(correctCount);
    setChecked(true);

    if (correctCount === QUESTIONS.length) {
      toast.success(`🏆 Perfect! ${correctCount}/${QUESTIONS.length}`);
    } else {
      toast.info(`You scored ${correctCount} / ${QUESTIONS.length}`);
    }
  };

  const restart = () => {
    setAnswers({});
    setChecked(false);
    setResults({});
    setScore(null);
    toast.info("Test restarted");
  };

  return (
    <div className="all">
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

    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 px-4 py-10">
      <div className="w-full max-w-6xl space-y-8 text-center">
        {/* Title */}
        <header>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold
                         bg-gradient-to-r from-purple-600 to-pink-600
                         bg-clip-text text-transparent drop-shadow-md">
            🧪 General Grammar Test
          </h1>
        
        </header>

        {/* Grid of questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUESTIONS.map((q, idx) => {
            const res = results[q.id];
            const user = answers[q.id];
            const isOk = res?.ok;
            const isWrong = checked && res && !res.ok;
            return (
              <div
                key={q.id}
                className={`bg-white rounded-3xl p-5 text-left shadow-lg border
                  ${isOk ? "border-green-300" : isWrong ? "border-red-300" : "border-gray-200"}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">{q.topic}</div>
                    <p className="font-medium text-gray-800 mb-3">
                      {idx + 1}. {q.q}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">{checked ? (isOk ? "✅" : isWrong ? "❌" : "") : ""}</div>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-2">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt;
                    const showCorrect = checked && opt === q.correct;
                    const showWrong = checked && selected && !isOk;
                    const optionClasses = [
                      "text-left",
                      "px-4 py-2 rounded-xl border transition-colors",
                      selected ? "ring-2 ring-offset-1" : "",
                      // coloring after check
                      checked && showCorrect ? "bg-green-50 border-green-300" : "",
                      checked && showWrong ? "bg-red-50 border-red-300" : "",
                      !checked && selected ? "bg-sky-50 border-sky-300" : "bg-white",
                    ].join(" ");

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(q.id, opt)}
                        className={optionClasses}
                        aria-pressed={selected}
                        disabled={checked}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold
                              ${selected ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-600"}`}
                          >
                            {selected ? "✓" : ""}
                          </div>
                          <span className="text-gray-800">{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* If checked and wrong -> show correct answer */}
                {isWrong && (
                  <div className="mt-3 bg-red-50 border border-red-100 text-red-700 p-3 rounded-lg text-sm">
                    <strong>Correct:</strong> {res.correct}
                  </div>
                )}

                {/* If checked and correct -> small confirmation */}
                {isOk && (
                  <div className="mt-3 bg-green-50 border border-green-100 text-green-700 p-2 rounded-lg text-sm">
                    Correct ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
          <button
            onClick={checkAnswers}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-md hover:scale-105 transition-transform"
            disabled={checked}
          >
            ✅ Check Answers
          </button>

          <button
            onClick={restart}
            className="px-6 py-3 border rounded-2xl text-gray-700 hover:bg-gray-50 transition"
          >
            🔄 Restart Test
          </button>

          {checked && (
            <div className="ml-0 sm:ml-4 text-lg font-semibold text-gray-800">
              Score: <span className="text-purple-700">{score}</span> / {QUESTIONS.length}
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-2">Hints: You can change answers before pressing <b>Check Answers</b>.</p>

        <ToastContainer position="top-center" />
      </div>
    </div>
    </div>
  );
}
