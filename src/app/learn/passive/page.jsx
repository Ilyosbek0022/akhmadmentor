"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../header";

export default function PassiveVoicePage() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const questions = [
    {
      q: "They build houses every year.",
      a: "Houses are built every year.",
    },
    {
      q: "The teacher is checking the tests.",
      a: "The tests are being checked by the teacher.",
    },
    {
      q: "They will deliver the package tomorrow.",
      a: "The package will be delivered tomorrow.",
    },
    {
      q: "People have used this app for years.",
      a: "This app has been used for years.",
    },
    {
      q: "Someone cleaned the room yesterday.",
      a: "The room was cleaned yesterday.",
    },
  ];

  const checkAnswers = () => {
    let correct = 0;
    questions.forEach((item, index) => {
      if (
        answers[index]?.trim().toLowerCase() ===
        item.a.trim().toLowerCase()
      ) {
        correct++;
      }
    });
    setScore(correct);
    if (correct === questions.length) {
      toast.success("Excellent! All answers are correct!");
    } else {
      toast.info(`You got ${correct} / ${questions.length} correct.`);
    }
  };

  return (
    <div className="all">
          <Header/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-200 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-5xl font-bold text-indigo-700 mb-6">
          🧩 Passive Voice
        </h1>
      

        <section className="bg-indigo-50 p-6 rounded-2xl mb-8 text-left">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-3">
            🧱 Tuzilishi
          </h2>
          <table className="w-full text-left border border-indigo-300 rounded-lg overflow-hidden">
            <thead className="bg-indigo-200 text-indigo-900">
              <tr>
                <th className="p-3">Zamon</th>
                <th className="p-3">Formula</th>
                <th className="p-3">Misol</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">Present Simple</td>
                <td className="p-3">am/is/are + V3</td>
                <td className="p-3 underline">
                  The room is cleaned every day.
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Past Simple</td>
                <td className="p-3">was/were + V3</td>
                <td className="p-3 underline">
                  The cake was baked yesterday.
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Future Simple</td>
                <td className="p-3">will be + V3</td>
                <td className="p-3 underline">
                  The letter will be sent tomorrow.
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Present Perfect</td>
                <td className="p-3">has/have been + V3</td>
                <td className="p-3 underline">
                  The project has been finished.
                </td>
              </tr>
              <tr className="border-t">
                <td className="p-3">Continuous</td>
                <td className="p-3">is/was being + V3</td>
                <td className="p-3 underline">
                  The car is being washed now.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="bg-white border border-indigo-200 p-6 rounded-2xl shadow-inner">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4 text-left">
            🧠 Mini Quiz: Turn into Passive Voice
          </h2>
          <div className="space-y-4">
            {questions.map((item, index) => (
              <div key={index} className="text-left">
                <p className="text-gray-800 font-medium mb-2">
                  {index + 1}. {item.q}
                </p>
                <input
                  type="text"
                  className="w-full border border-indigo-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Write in Passive Voice..."
                  value={answers[index] || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [index]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>

          <button
            onClick={checkAnswers}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-lg transition-all"
          >
            Check Answers
          </button>

          {score !== null && (
            <p className="mt-4 text-indigo-700 font-semibold text-lg">
              Your Score: {score} / {questions.length}
            </p>
          )}
        </section>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
    </div>
  );
}
