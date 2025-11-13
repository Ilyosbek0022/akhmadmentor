'use client'
import React, { useState } from "react";
const questions = [ { id: 1, question: "I’m 18 and my brother is 20, so he’s ........ me.", options: ["the oldest of", "older than", "as old as"], correct: "older than" }, { id: 2, question: "Carl’s very ........ . He’s never late, and he never forgets to do things.", options: ["reliable", "patient", "strict"], correct: "reliable" }, { id: 3, question: "We stayed in a lovely villa ........ the sea.", options: ["it overlooks", "overlooked", "overlooking"], correct: "overlooking" }, { id: 4, question: "Not until the 1980s ........ for the average person to own a computer.", options: ["it was possible", "was it possible", "was possible"], correct: "was it possible" }, { id: 5, question: "Jan ........ her arm on a hot iron.", options: ["broke", "burned", "sprained"], correct: "burned" }, { id: 6, question: "Tomorrow’s a holiday, so we ........ go to work.", options: ["have to", "mustn’t", "don’t have to"], correct: "don’t have to" }, { id: 7, question: "I usually ........ swimming at least once a week.", options: ["go", "do", "play"], correct: "go" }, { id: 8, question: "My friend Siena ........ to Russia last year.", options: ["went", "has gone", "has been"], correct: "went" }, { id: 9, question: "This is ........ area, with a lot of factories and warehouses.", options: ["an agricultural", "an industrial", "a residential"], correct: "an industrial" }, { id: 10, question: "If I ........ well in my exams, I ........ to university.", options: ["will do; will go", "will do; go", "do; will go"], correct: "do; will go" }, { id: 11, question: "She was so upset that she burst ........ tears.", options: ["into", "out", "with"], correct: "into" }, { id: 12, question: "Where did you go ........ holiday last year?", options: ["for", "on", "to"], correct: "on" }, { id: 13, question: "Ocean currents ........ play an important part in regulating global climate.", options: ["are known to", "thought to", "are believed that they"], correct: "are known to" }, { id: 14, question: "My cousin ........ getting a job in Bahrain.", options: ["would like", "is planning", "is thinking of"], correct: "is thinking of" }, { id: 15, question: "I can’t ........ your hair, because I haven’t got any scissors.", options: ["brush", "cut", "wash"], correct: "cut" }, { id: 16, question: "I wish I ........ have an exam tomorrow!", options: ["don’t", "didn’t", "won’t"], correct: "didn’t" }, { id: 17, question: "The government plans to ........ taxes on sales of luxury items.", options: ["increase", "expand", "go up"], correct: "increase" }, { id: 18, question: "When I first moved to Hong Kong, life in a different country was very strange, but now I’m used ........ here.", options: ["living", "to live", "to living"], correct: "to living" }, { id: 19, question: "There ........ milk in the fridge.", options: ["is some", "are some", "is a"], correct: "is some" }, { id: 20, question: "Criminals are people who are guilty of ........ the law.", options: ["breaking", "cheating", "committing"], correct: "breaking" }, { id: 21, question: "Why on earth isn’t Josh here yet? ........ for him for over an hour!", options: ["I’m waiting", "I’ve been waiting", "I’ve waited"], correct: "I’ve been waiting" }, { id: 22, question: "“It’s pouring down, and it’s freezing.” What are the weather conditions?", options: ["high winds and snow", "heavy rain and cold temperatures", "thick cloud but quite warm"], correct: "heavy rain and cold temperatures" }, { id: 23, question: "........ feeling OK? You don’t look very well.", options: ["Do you", "You are", "Are you"], correct: "Are you" }, { id: 24, question: "Daniel’s hair is getting far too long; he should ........ soon.", options: ["cut it", "have cut it", "have it cut"], correct: "have it cut" }, { id: 25, question: "Mandy works for a computer software company. She got ........ recently, and so now she’s an area manager.", options: ["made redundant", "promoted", "a raise"], correct: "promoted" }, { id: 26, question: "I can’t hear you – it’s ........ noisy in here.", options: ["too", "too much", "too many"], correct: "too" }, { id: 27, question: "Jamal has just sent me ........ to arrange plans for this weekend.", options: ["a blog", "an email", "a website"], correct: "an email" }, { id: 28, question: "I promise I’ll call you as soon as I ........ .", options: ["I arrive", "I arrived", "I’ll arrive"], correct: "I arrive" }, { id: 29, question: "Photographers and designers need to be very ........ .", options: ["creative", "fit", "annoying"], correct: "creative" }, { id: 30, question: "The global financial crisis, ........ is forcing lots of small businesses to close, does not look set to end soon.", options: ["it", "that", "which"], correct: "which" }, { id: 31, question: "There ........ a terrible accident if the pilot hadn’t reacted so quickly.", options: ["had been", "was", "would have been"], correct: "would have been" }, { id: 32, question: "“Are you ready to order?” “Not yet – I’m still looking at the ........ .”", options: ["bill", "menu", "service"], correct: "menu" }, { id: 33, question: "“My job is never boring.” The speaker’s job is always ........ .", options: ["interesting", "popular", "difficult"], correct: "interesting" }, { id: 34, question: "I’ve been working here ........ about the last two years.", options: ["during", "for", "since"], correct: "for" }, { id: 35, question: "“It leaves from Platform 2 at 4.15.” The speaker is talking about ........ .", options: ["an airline flight", "a train", "a taxi"], correct: "a train" }, { id: 36, question: "I went to a lovely ........ last Saturday. The bride was my best friend when we were at school.", options: ["anniversary", "marriage", "wedding"], correct: "wedding" }, { id: 37, question: "“I’ve got a headache.” “Maybe you ........ to take an aspirin.”", options: ["should", "ought", "don’t"], correct: "should" }, { id: 38, question: "The patient had an ........ to insert metal pins in his broken leg.", options: ["injection", "operation", "X-ray"], correct: "operation" }, { id: 39, question: "She won a seat in parliament at the last ........ .", options: ["general election", "opinion poll", "referendum"], correct: "general election" }, { id: 40, question: "I’m surprised you didn’t get upset. If someone said that to me, ........ really angry.", options: ["I’m", "I was", "I’d be"], correct: "I’d be" }, { id: 41, question: "This used to be ........ part of the city, but since the old buildings were renovated it’s become a very fashionable area.", options: ["an affluent", "a run-down", "a trendy"], correct: "a run-down" }, { id: 42, question: "Cassie went to bed early because she was ........ .", options: ["tired", "stressed", "relaxed"], correct: "tired" }, { id: 43, question: "In the 1960s, computers were ........ expensive that ordinary people couldn’t afford them.", options: ["so", "such", "too"], correct: "so" }, { id: 44, question: "Do you want ........ the match tonight?", options: ["watching", "watch", "to watch"], correct: "to watch" }, { id: 45, question: "Researchers claim the new discovery is a major ........ in the fight against malaria.", options: ["breakthrough", "investigation", "progress"], correct: "breakthrough" }, { id: 46, question: "The Maths problem was really difficult and I just couldn’t ........ the answer.", options: ["check in", "set off", "work out"], correct: "work out" }, { id: 47, question: "When I was a child, I never ........ about the future.", options: ["have worried", "used to worry", "was worrying"], correct: "used to worry" }, { id: 48, question: "A local politician has ........ charges of corruption made by the opposition party.", options: ["accused", "blamed", "denied"], correct: "denied" }, { id: 49, question: "........ worries me about society today is how completely we have come to depend on technology.", options: ["That", "What", "Which"], correct: "What" }, { id: 50, question: "Cats and dogs are usually kept as ........ .", options: ["farm animals", "wild animals", "pets"], correct: "pets" }, ];
function getCEFR(score, total) {
  const percent = (score / total) * 100;
  if (percent >= 90) return "C2";
  if (percent >= 80) return "C1";
  if (percent >= 70) return "B2";
  if (percent >= 60) return "B1";
  if (percent >= 40) return "A2";
  return "A1";
}

function TestCEFR50() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const evaluateCEFR = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) score++;
    });
    const level = getCEFR(score, questions.length);
    setResult({ score, level });
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
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div className="test-container">
        <h2 className="test-title">Entry Test (50 Questions)</h2>

        {questions.map((q, i) => (
          <div key={q.id} className="question-block">
            <p><strong>{i + 1})</strong> {q.question}</p>
            {q.options.map((opt, j) => (
              <label key={j} className="option">
                <input
                  type="radio"
                  name={`q-${i}`}
                  value={opt}
                  checked={answers[i] === opt}
                  onChange={(e) => handleChange(i, e.target.value)}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}

        <button className="submit-btn" onClick={evaluateCEFR}>
          Submit
        </button>

        {result && (
          <div className="result">
            <p>Score: {result.score} / {questions.length}</p>
            <p>CEFR Level: <strong>{result.level}</strong></p>
          </div>
        )}
      </div>

      <footer id="contact" className="footer">
        <div className="container">
          <p>&copy; 2025 Mrakhmadjon IELTS Learning Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default TestCEFR50;
