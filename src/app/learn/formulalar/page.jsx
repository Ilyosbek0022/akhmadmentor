'use client'
import React from "react";
import Header from "../header";
import Footer from "../footer";


const grammarFormulas = [
   { title: "Present Simple", formula: "S + am/is/are + V(s/es) + ...", example: "She walks to school every day." },
  { title: "Present Continuous", formula: "S + am/is/are + V-ing + ...", example: "They are playing football now." },
  { title: "Past Simple", formula: "S + V2/ed + ...", example: "He watched a movie yesterday." },
  { title: "Past Continuous", formula: "S + was/were + V-ing + ...", example: "I was reading when she called." },
  { title: "Future Simple", formula: "S + will + V + ...", example: "We will travel next summer." },
  { title: "Future Continuous", formula: "S + will be + V-ing + ...", example: "She will be studying at 8 PM." },
  { title: "If-Clause Type 1", formula: "If + Present Simple, S + will + V ...", example: "If it rains, I will stay home." },
  { title: "If-Clause Type 2", formula: "If + Past Simple, S + would + V ...", example: "If I had money, I would buy a car." },
  { title: "If-Clause Type 3", formula: "If + Past Perfect, S + would have + V3 ...", example: "If I had studied, I would have passed the exam." },
  { title: "Modals & Perfect Tenses", formula: "S + modal + V + ...\nS + have/has + V3 (Present Perfect)\nS + had + V3 (Past Perfect)\nS + will have + V3 (Future Perfect)", example: "You should eat healthy food.\nI have finished my homework." }
];

const FormulasPage = () => {
  return (
    <div className="all">
      <Header/>
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12">
          English Grammar Formulas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {grammarFormulas.map((item, idx) => (
            <div
              key={idx}
              className="bg-black/60 rounded-3xl p-8 flex flex-col justify-between"
            >
              <h2 className="text-2xl font-bold text-green-300 mb-4">{item.title}</h2>
              <pre className="text-green-100 font-mono mb-4">{item.formula}</pre>
              <p className="text-green-200 italic text-lg">Example: {item.example}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default FormulasPage;
