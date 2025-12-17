"use client";
import React, { useEffect, useRef, useState } from "react";

/* =======================
   CEFR SPEAKING TASKS
======================= */
const PARTS = [
  {
    id: 1,
    level: "A2",
    title: "Task 1 — Personal Information",
    desc: "Oddiy savollar. Kundalik hayot va shaxsiy ma’lumotlar.",
    questions: [
      "Can you introduce yourself?",
      "Where do you live?",
      "What do you do every day?",
      "What do you like doing in your free time?",
    ],
    prep: 5,
    speak: 45,
  },
  {
    id: 2,
    level: "B1–B2",
    title: "Task 2 — Individual Long Turn",
    desc: "Berilgan mavzu bo‘yicha tartibli gapiring.",
    cueCard: {
      title: "Talk about a memorable experience",
      prompts: [
        "What happened?",
        "When and where did it happen?",
        "Who was with you?",
        "Why do you remember it?",
      ],
    },
    prep: 60,
    speak: 120,
  },
  {
    id: 3,
    level: "B2–C1",
    title: "Task 3 — Discussion & Opinion",
    desc: "Murakkab savollar. Sabab keltiring va fikringizni himoya qiling.",
    questions: [
      "Why is communication important in modern society?",
      "How has technology changed the way people speak?",
      "Should schools focus more on speaking skills?",
    ],
    prep: 30,
    speak: 120,
  },
];

/* =======================
   CEFR FEEDBACK
======================= */
const simpleFeedback = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let level = "A2";
  if (wordCount > 80) level = "B1";
  if (wordCount > 120) level = "B2";
  if (wordCount > 170) level = "C1";

  return {
    wordCount,
    cefrLevel: level,
    comment:
      level === "A2"
        ? "Basic answers. Try to speak longer and use connectors."
        : level === "B1"
        ? "Clear speech. Add examples and reasons."
        : level === "B2"
        ? "Good fluency. Use more complex grammar."
        : "Advanced level. Minor accuracy improvements needed.",
  };
};

/* =======================
   PAGE COMPONENT
======================= */
export default function SpeakingPage() {
  const [transcripts, setTranscripts] = useState({});
  const [logs, setLogs] = useState([]);
  const [timers, setTimers] = useState({});
  const mediaRecorderRef = useRef({});
  const chunksRef = useRef({});
  const recognitionRef = useRef({});

  /* Speech recognition init */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    PARTS.forEach((p) => {
      const rec = new SpeechRecognition();
      rec.lang = "en-US";
      rec.continuous = true;
      rec.interimResults = true;
      rec.onresult = (e) => {
        let text = "";
        for (let i = 0; i < e.results.length; i++) {
          text += e.results[i][0].transcript;
        }
        setTranscripts((t) => ({ ...t, [p.id]: text }));
      };
      recognitionRef.current[p.id] = rec;
    });
  }, []);

  /* Timer */
  useEffect(() => {
    const interval = setInterval(() => {
      PARTS.forEach((p) => {
        const t = timers[p.id];
        if (!t?.running) return;

        if (t.phase === "prep") {
          if (t.prep <= 1) {
            setTimers((prev) => ({
              ...prev,
              [p.id]: { ...prev[p.id], phase: "speak" },
            }));
            startRecording(p.id);
          } else {
            setTimers((prev) => ({
              ...prev,
              [p.id]: { ...prev[p.id], prep: t.prep - 1 },
            }));
          }
        }

        if (t.phase === "speak") {
          if (t.speak <= 1) stopRecording(p.id);
          else {
            setTimers((prev) => ({
              ...prev,
              [p.id]: { ...prev[p.id], speak: t.speak - 1 },
            }));
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timers]);

  /* Recording */
  const startRecording = async (id) => {
    chunksRef.current[id] = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    mediaRecorderRef.current[id] = mr;

    mr.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current[id].push(e.data);
    };

    mr.onstop = () => {
      setLogs((l) => [...l, `Task ${id}: recording finished`]);
    };

    mr.start();
    recognitionRef.current[id]?.start();
    setLogs((l) => [...l, `Task ${id}: recording started`]);
  };

  const stopRecording = (id) => {
    mediaRecorderRef.current[id]?.stop();
    recognitionRef.current[id]?.stop();
    setTimers((p) => ({ ...p, [id]: { ...p[id], running: false } }));
  };

  const startPart = (p) => {
    setTimers((t) => ({
      ...t,
      [p.id]: {
        phase: "prep",
        prep: p.prep,
        speak: p.speak,
        running: true,
      },
    }));
    setTranscripts((t) => ({ ...t, [p.id]: "" }));
  };

  return (
    <div className="page-wrap">
      <header className="top">
        <h1>CEFR Speaking — Mock Test</h1>
        <p>A2 → C1 | Practice & self-assessment</p>
      </header>

      <main>
        {PARTS.map((p) => (
          <section key={p.id} className="part-card">
            <span className="level-badge">{p.level}</span>
            <h2>{p.title}</h2>
            <p>{p.desc}</p>

            {p.cueCard && (
              <div className="cue">
                <h3>{p.cueCard.title}</h3>
                <ol>
                  {p.cueCard.prompts.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </div>
            )}

            {p.questions && (
              <ul>
                {p.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            )}

            <div className="controls">
              <button onClick={() => startPart(p)}>Start</button>
              <button onClick={() => stopRecording(p.id)}>Stop</button>
            </div>

            <p className="timer">
              Phase: {timers[p.id]?.phase || "-"} | Prep:{" "}
              {timers[p.id]?.prep || "-"}s | Speak:{" "}
              {timers[p.id]?.speak || "-"}s
            </p>

            <textarea
              rows={4}
              value={transcripts[p.id] || ""}
              onChange={(e) =>
                setTranscripts({ ...transcripts, [p.id]: e.target.value })
              }
            />

            <button
              className="feedback-btn"
              onClick={() =>
                setLogs((l) => [
                  ...l,
                  JSON.stringify(simpleFeedback(transcripts[p.id] || ""), null, 2),
                ])
              }
            >
              Get CEFR Feedback
            </button>
          </section>
        ))}

        <section className="log-section">
          <h3>Session Log</h3>
          {logs.map((l, i) => (
            <pre key={i}>{l}</pre>
          ))}
        </section>
      </main>

      {/* =======================
          STYLES
      ======================= */}
   <style jsx>{`
/* ===== Premium SpeakingPage Styles ===== */
.page-wrap {
  max-width: 1080px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Inter', sans-serif;
  color: #e5e7eb;
  background: radial-gradient(circle at top, #0b0f14, #020617);
}

header.top {
  text-align: center;
  margin-bottom: 40px;
}

header.top h1 {
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: 0.6px;
  color: #a5f3fc;
  text-shadow: 0 2px 8px rgba(34,197,94,0.5);
}

header.top p {
  color: #9ca3af;
  margin-top: 6px;
  font-size: 1rem;
}

main {
  display: grid;
  gap: 30px;
}

.part-card {
  background: linear-gradient(145deg, #0c1118, #0a0d14);
  border-radius: 22px;
  padding: 28px;
  border: 1px solid rgba(34,197,94,0.3);
  box-shadow: 0 20px 40px rgba(0,255,127,0.15);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.part-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(34,197,94,0.35);
}

.level-badge {
  display: inline-block;
  background: rgba(34,197,94,0.12);
  color: #22c55e;
  border: 1px solid rgba(34,197,94,0.35);
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.6px;
}

.controls {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.controls button {
  width: 100px;
  height: 40px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.controls button:first-child {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #0f1114;
  box-shadow: 0 5px 15px rgba(34,197,94,0.3);
}

.controls button:first-child:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 10px 25px rgba(34,197,94,0.4);
}

.controls button:last-child {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: #e5e7eb;
}

.controls button:last-child:hover {
  background: rgba(34,197,94,0.1);
}

.timer {
  margin-top: 14px;
  font-size: 0.85rem;
  color: #9ca3af;
  letter-spacing: 0.4px;
}

textarea {
  margin-top: 14px;
  width: 100%;
  min-height: 100px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid rgba(34,197,94,0.3);
  background: rgba(0,0,0,0.35);
  color: #e5e7eb;
  font-size: 0.95rem;
  line-height: 1.5;
  transition: all 0.25s ease;
  backdrop-filter: blur(8px);
}

textarea:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 8px rgba(34,197,94,0.4);
}

.feedback-btn {
  margin-top: 14px;
  width: 100%;
  padding: 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.95rem;
  color: #0f1114;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 6px 20px rgba(34,197,94,0.35);
  transition: all 0.25s ease;
}

.feedback-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 30px rgba(34,197,94,0.5);
}

.log-section {
  background: rgba(0,0,0,0.45);
  border-radius: 18px;
  padding: 20px;
  border: 1px solid rgba(34,197,94,0.2);
  box-shadow: 0 10px 30px rgba(0,255,127,0.15);
}

.log-section h3 {
  margin-bottom: 12px;
  color: #22c55e;
}

.log-section pre {
  font-size: 0.85rem;
  color: #9ca3af;
  padding: 6px 0;
  border-bottom: 1px dashed rgba(34,197,94,0.2);
}

/* Cue card */
.cue {
  margin-top: 18px;
  padding: 18px;
  border-radius: 16px;
  background: linear-gradient(145deg, rgba(34,197,94,0.05), rgba(0,0,0,0.3));
  border: 1px dashed rgba(34,197,94,0.4);
}

/* Lists */
ul, ol {
  margin: 14px 0;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
  line-height: 1.5;
  color: #d1d5db;
}

`}</style>

    </div>
  );
}
