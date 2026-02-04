'use client'
import React, { useState } from "react";
import { toast } from "react-toastify"; // toastify import

// 10 exercises uchun words va answers (shu 10ta bo‘shliq misol tariqasida birinchi exercise bilan)
const exercises = [
  {
    words: ["because", "but", "didn’t like", "enjoy", "favourite", "for", "fun", "like", "so", "started"],
    correct: ["favourite","for","like","but","started","so","enjoy","fun","didn’t like","because"],
    paragraph: `Table tennis is my __1__ hobby. I play it with my cousin at the sports centre near my house. We practise __2__ one or two hours three days a week. We sometimes play other sports, __3__ basketball or volleyball, __4__ I prefer table tennis. I __5__ playing table tennis two years ago. My cousin showed me how to play, and I loved it, __6__ I wanted to learn more. At first, it was a bit difficult, __7__ practised a lot and got better. Now I sometimes play in competitions. I __8__ playing table tennis because it’s __9__ and it’s important to do exercise. I tried other sports, like swimming and football, but I __10__ them. I prefer table tennis because it’s exciting, and you can learn it quickly.`
  },
  // 9 ta mashqlar uchun xuddi shu formatda qo‘shamiz...
];

const Exercises = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(exercises[current].correct.length).fill(""));
  const [checked, setChecked] = useState(false);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    if (checked) setChecked(false);
  };

  const checkAnswers = () => {
    setChecked(true);
    const correctAnswers = exercises[current].correct;
    const results = answers.map((ans, i) => ans.trim().toLowerCase() === correctAnswers[i].toLowerCase());
    const correctCount = results.filter(Boolean).length;

    // 5/6 yoki undan ko'p bo'lsa hooray toast
    if(correctCount >= Math.ceil(correctAnswers.length * 5 / 6)){
      toast.success("🎉 Hooray! Siz juda zo‘r ishladingiz!");
    }

    alert(
      `Natija: ${correctCount}/${correctAnswers.length}\n\n` +
      results.map((res, i) => `Bo'shliq ${i + 1}: ${res ? "✅ To'g'ri" : "❌ Noto'g'ri"}`).join("\n")
    );
  };

  const nextExercise = () => {
    if(current < exercises.length - 1){
      setCurrent(current + 1);
      setAnswers(Array(exercises[current+1].correct.length).fill(""));
      setChecked(false);
    } else {
      toast.info("Siz barcha mashqlarni tugatdingiz!");
    }
  };

  const getSelectClass = (index) => {
    if(!checked) return "";
    const userAns = answers[index]?.trim().toLowerCase();
    const correct = exercises[current].correct[index].toLowerCase();
    if(userAns === correct) return "border-green-500 bg-green-50 text-green-800";
    if(userAns && userAns !== correct) return "border-red-500 bg-red-50 text-red-800";
    return "";
  };

  const { words, paragraph, correct } = exercises[current];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50 py-10 px-4 forex"  >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Exercise {current+1} / {exercises.length}</h1>
          <p className="text-indigo-100 text-lg">
            Bo‘shliqlarni to‘ldiring va javoblaringizni tekshiring!
          </p>
        </div>

        {/* Words box */}
        <div className="p-6 md:p-8 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Foydalaniladigan so‘zlar:</h2>
          <div className="flex flex-wrap gap-3">
            {words.map((word) => (
              <span key={word} className="px-4 py-2 bg-white border border-indigo-200 rounded-full text-indigo-700 font-medium shadow-sm hover:shadow-md transition-shadow">
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="p-6 md:p-10 space-y-10 text-gray-800">
          {correct.map((_, i) => (
            <select
              key={i}
              onChange={(e) => handleChange(i, e.target.value)}
              value={answers[i]}
              className={`inline-block min-w-[140px] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${getSelectClass(i)}`}
            >
              <option value="">tanlang...</option>
              {words.map((word) => <option key={word} value={word}>{word}</option>)}
            </select>
          ))}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={checkAnswers}
            disabled={answers.every(a => !a.trim())}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            Javoblarni tekshirish
          </button>

          <button
            onClick={nextExercise}
            className="w-full sm:w-auto px-8 py-3 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-all shadow-md"
          >
            Keyingi mashq
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
