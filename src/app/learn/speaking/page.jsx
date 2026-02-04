'use client'
import React, { useEffect, useRef, useState } from 'react'
import { startRec, stopRec } from '../../utils/recorder'

/* =======================
   CEFR TASKS
======================= */
const PARTS = [
  {
    id: 1,
    level: 'A2',
    title: 'Task 1 — Personal Information',
    desc: 'Answer simple questions about yourself.',
    questions: [
      'Can you introduce yourself?',
      'Where do you live?',
      'What do you do every day?',
      'What do you do in your free time?'
    ],
    prep: 5,
    speak: 45
  },
  {
    id: 2,
    level: 'B1–B2',
    title: 'Task 2 — Long Turn',
    desc: 'Speak about the topic in an organized way.',
    cue: {
      title: 'Talk about a memorable experience',
      points: [
        'What happened?',
        'When and where?',
        'Who was with you?',
        'Why do you remember it?'
      ]
    },
    prep: 60,
    speak: 120
  },
  {
    id: 3,
    level: 'B2–C1',
    title: 'Task 3 — Discussion',
    desc: 'Give opinions and reasons.',
    questions: [
      'Why is communication important today?',
      'How has technology changed speaking?',
      'Should schools focus more on speaking?'
    ],
    prep: 30,
    speak: 120
  }
]

/* =======================
   PAGE
======================= */
export default function SpeakingPage() {
  const [timers, setTimers] = useState({})
  const [texts, setTexts] = useState({})
  const [logs, setLogs] = useState([])
  const [audios, setAudios] = useState({})

  const recognitionRef = useRef({})

  /* ---------- Speech Recognition ---------- */
  useEffect(() => {
    if (typeof window === 'undefined') return // serverda ishlamasin

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return

    PARTS.forEach(p => {
      const rec = new SR()
      rec.lang = 'en-US'
      rec.continuous = true
      rec.interimResults = true

      rec.onresult = e => {
        let text = ''
        for (let i = 0; i < e.results.length; i++) {
          text += e.results[i][0].transcript
        }
        setTexts(t => ({ ...t, [p.id]: text }))
      }

      recognitionRef.current[p.id] = rec
    })
  }, [])

  /* ---------- TIMER ---------- */
  useEffect(() => {
    const i = setInterval(() => {
      PARTS.forEach(p => {
        const t = timers[p.id]
        if (!t?.running) return

        if (t.phase === 'prep') {
          if (t.prep <= 1) {
            setTimers(x => ({
              ...x,
              [p.id]: { ...x[p.id], phase: 'speak' }
            }))
            startRecording(p.id)
          } else {
            setTimers(x => ({
              ...x,
              [p.id]: { ...x[p.id], prep: t.prep - 1 }
            }))
          }
        }

        if (t.phase === 'speak') {
          if (t.speak <= 1) stopRecording(p.id)
          else {
            setTimers(x => ({
              ...x,
              [p.id]: { ...x[p.id], speak: t.speak - 1 }
            }))
          }
        }
      })
    }, 1000)

    return () => clearInterval(i)
  }, [timers])

  /* ---------- RECORDING ---------- */
  const startRecording = async id => {
    if (typeof window === 'undefined') return
    await startRec()
    recognitionRef.current[id]?.start()
    setLogs(l => [...l, `Task ${id}: recording started`])
  }

  const stopRecording = async id => {
    if (typeof window === 'undefined') return
    const blob = await stopRec()
    recognitionRef.current[id]?.stop()

    const url = URL.createObjectURL(blob)

    setAudios(a => ({ ...a, [id]: url }))
    setLogs(l => [...l, `Task ${id}: recording finished`])

    setTimers(t => ({ ...t, [id]: { ...t[id], running: false } }))
  }

  /* ---------- START TASK ---------- */
  const startPart = p => {
    setTexts(t => ({ ...t, [p.id]: '' }))
    setTimers(t => ({
      ...t,
      [p.id]: {
        phase: 'prep',
        prep: p.prep,
        speak: p.speak,
        running: true
      }
    }))
  }

  /* ---------- COPY TEXT ---------- */
  const copyText = async id => {
    if (typeof navigator === 'undefined') return // serverda ishlamasin
    if (!texts[id]) return
    await navigator.clipboard.writeText(texts[id])
    setLogs(l => [...l, `Task ${id}: text copied`])
  }

  /* ---------- UI ---------- */
  return (
    <div className="all">
      
      <header className="header forheight">
        <div className="container">
          <div className="header-content">
            <a href="/">
              <div className="logo">
                <div className="logo-icon">M</div>
                <div className="logo-text"> Mrakhmadjon IELTS</div>
              </div>
            </a>
            <nav className="nav">
              <ul>
                <li><a href="/">Home</a></li>
                
                <li><a href="/test">Tests</a></li>
                
                
                <li><a href="/learn/asospage">Learn</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

    <div className="wrap">
      
      <h1>CEFR Speaking Practice</h1>

      {PARTS.map(p => (
        <section key={p.id} className="card">
          <span className="badge">{p.level}</span>
          <h2>{p.title}</h2>
          <p>{p.desc}</p>

          {p.cue && (
            <div className="cue">
              <h4>{p.cue.title}</h4>
              <ol>
                {p.cue.points.map((x, i) => (
                  <li key={i}>{x}</li>
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

          <div className="btns">
            <button onClick={() => startPart(p)}>Start</button>
            <button onClick={() => stopRecording(p.id)}>Stop</button>
            {audios[p.id] && (
              <div className="voice">
                <p className="voice-title">🎙 Your recorded answer</p>
                <audio controls src={audios[p.id]} />
              </div>
            )}
          </div>

          <p className="timer">
            Phase: {timers[p.id]?.phase || '-'} | Prep:{' '}
            {timers[p.id]?.prep ?? '-'}s | Speak:{' '}
            {timers[p.id]?.speak ?? '-'}s
          </p>

          <textarea
            placeholder="Your answer..."
            value={texts[p.id] || ''}
            onChange={e =>
              setTexts(t => ({ ...t, [p.id]: e.target.value }))
            }
          />

          <button className="copy" onClick={() => copyText(p.id)}>
            📋 Copy My Answer
          </button>
        </section>
      ))}

      <div className="log">
        <h3>Session log</h3>
        {logs.map((l, i) => (
          <pre key={i}>{l}</pre>
        ))}
      </div>
</div>
      {/* ---------- STYLES ---------- */}
      <style jsx>{`
        /* ===== Premium SpeakingPage Styles (RWD + Audio Player) ===== */
        .wrap {
          max-width: 1080px;
          margin: 40px auto;
          padding: 0 20px;
          font-family: 'Inter', sans-serif;
          color: #e5e7eb;
          background: radial-gradient(circle at top, #0b0f14, #020617);
        }
        .wrap h1 {
          text-align: center;
          margin-bottom: 40px;
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: 0.6px;
          color: #a5f3fc;
          text-shadow: 0 2px 8px rgba(34,197,94,0.5);
        }
        .card {
          background: linear-gradient(145deg, #0c1118, #0a0d14);
          border-radius: 22px;
          padding: 28px;
          border: 1px solid rgba(34,197,94,0.3);
          box-shadow: 0 20px 40px rgba(0,255,127,0.15);
          margin-bottom: 30px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(34,197,94,0.35);
        }
        .badge {
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
        .btns {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
        }
        .btns button {
          flex: 1 1 100px;
          height: 40px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btns button:first-child {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #0f1114;
          box-shadow: 0 5px 15px rgba(34,197,94,0.3);
        }
        .btns button:first-child:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 25px rgba(34,197,94,0.4);
        }
        .btns button:last-child {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: #e5e7eb;
        }
        .btns button:last-child:hover {
          background: rgba(34,197,94,0.1);
        }
        .voice {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .voice-title {
          font-size: 0.85rem;
          color: #22c55e;
          font-weight: 600;
        }
        .voice audio {
          width: 100%;
          border-radius: 12px;
          outline: none;
          background: rgba(0,0,0,0.25);
          box-shadow: 0 4px 15px rgba(34,197,94,0.25);
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
        .copy {
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
        .copy:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 30px rgba(34,197,94,0.5);
        }
        .log {
          background: rgba(0,0,0,0.45);
          border-radius: 18px;
          padding: 20px;
          border: 1px solid rgba(34,197,94,0.2);
          box-shadow: 0 10px 30px rgba(0,255,127,0.15);
        }
        .log h3 {
          margin-bottom: 12px;
          color: #22c55e;
        }
        .log pre {
          font-size: 0.85rem;
          color: #9ca3af;
          padding: 6px 0;
          border-bottom: 1px dashed rgba(34,197,94,0.2);
        }
        .cue {
          margin-top: 18px;
          padding: 18px;
          border-radius: 16px;
          background: linear-gradient(145deg, rgba(34,197,94,0.05), rgba(0,0,0,0.3));
          border: 1px dashed rgba(34,197,94,0.4);
        }
        ul, ol {
          margin: 14px 0;
          padding-left: 20px;
        }
        li {
          margin-bottom: 8px;
          line-height: 1.5;
          color: #d1d5db;
        }
        @media (max-width: 768px) {
          .btns {
            flex-direction: column;
          }
          .btns button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
