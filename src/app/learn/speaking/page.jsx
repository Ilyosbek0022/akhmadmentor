'use client'

import React, { useEffect, useRef, useState } from 'react'
import { startRec, stopRec } from '../../utils/recorder'
import Navbar from '../../components/Navbar'

const PARTS = [
  { id: 1, level: 'A2', title: 'Task 1 — Personal Information', desc: 'Answer simple questions about yourself.', questions: ['Can you introduce yourself?', 'Where do you live?', 'What do you do every day?', 'What do you do in your free time?'], prep: 5, speak: 45 },
  { id: 2, level: 'B1–B2', title: 'Task 2 — Long Turn', desc: 'Speak about the topic in an organized way.', cue: { title: 'Talk about a memorable experience', points: ['What happened?', 'When and where?', 'Who was with you?', 'Why do you remember it?'] }, prep: 60, speak: 120 },
  { id: 3, level: 'B2–C1', title: 'Task 3 — Discussion', desc: 'Give opinions and reasons.', questions: ['Why is communication important today?', 'How has technology changed speaking?', 'Should schools focus more on speaking?'], prep: 30, speak: 120 }
]

export default function SpeakingPageContent() {
  const [timers, setTimers] = useState({})
  const [texts, setTexts] = useState({})
  const [logs, setLogs] = useState([])
  const [audios, setAudios] = useState({})
  const recognitionRef = useRef({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return

    PARTS.forEach(p => {
      const rec = new SR()
      rec.lang = 'en-US'
      rec.continuous = true
      rec.interimResults = true

      rec.onresult = e => {
        let text = ''
        for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript
        setTexts(t => ({ ...t, [p.id]: text }))
      }

      recognitionRef.current[p.id] = rec
    })
  }, [])

  useEffect(() => {
    const i = setInterval(() => {
      PARTS.forEach(p => {
        const t = timers[p.id]
        if (!t?.running) return
        if (t.phase === 'prep') {
          if (t.prep <= 1) {
            setTimers(x => ({ ...x, [p.id]: { ...x[p.id], phase: 'speak' } }))
            startRecording(p.id)
          } else setTimers(x => ({ ...x, [p.id]: { ...x[p.id], prep: t.prep - 1 } }))
        }
        if (t.phase === 'speak') {
          if (t.speak <= 1) stopRecording(p.id)
          else setTimers(x => ({ ...x, [p.id]: { ...x[p.id], speak: t.speak - 1 } }))
        }
      })
    }, 1000)
    return () => clearInterval(i)
  }, [timers])

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

  const startPart = p => {
    setTexts(t => ({ ...t, [p.id]: '' }))
    setTimers(t => ({ ...t, [p.id]: { phase: 'prep', prep: p.prep, speak: p.speak, running: true } }))
  }

  const copyText = id => {
    if (typeof navigator === 'undefined') return
    const text = texts[id]
    if (!text) return
    navigator.clipboard.writeText(text).then(() => setLogs(l => [...l, `Task ${id}: text copied`]))
  }

  return (
    <div className="all">
       <header className="header forheight">
            <div className="container">
              <div className="header-content flex items-center justify-between">
                
                <a href="/">
                  <div className="logo flex items-center gap-2">
                    <div className="logo-icon">Mr</div>
                    <div className="logo-text">Akhmadjon IELTS</div>
                  </div>
                </a>
      
                <div className="flex items-center gap-6">
                  <nav className="nav">
                    <ul className="flex items-center gap-6">
                     <li><a href="/">Home</a></li>
                    <li><a href="/price">Price</a></li>
                    <li><a href="/test">Tests</a></li>
                    <li><a href="/locate">Location</a></li>
                    <li><a href="/contact">Log-in</a></li>
                    <li><a href="/signup">Sign-up</a></li>
                    <li><a href="/learn/glavniy">Learn</a></li>
                    </ul>
                  </nav>
      
                  
                  <Navbar />
                </div>
      
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
            {p.cue && <div className="cue"><h4>{p.cue.title}</h4><ol>{p.cue.points.map((x,i)=><li key={i}>{x}</li>)}</ol></div>}
            {p.questions && <ul>{p.questions.map((q,i)=><li key={i}>{q}</li>)}</ul>}
            <div className="btns">
              <button onClick={()=>startPart(p)}>Start</button>
              <button onClick={()=>stopRecording(p.id)}>Stop</button>
              {audios[p.id] && <div className="voice"><p className="voice-title">🎙 Your recorded answer</p><audio controls src={audios[p.id]} /></div>}
            </div>
            <p className="timer">Phase: {timers[p.id]?.phase||'-'} | Prep: {timers[p.id]?.prep??'-'}s | Speak: {timers[p.id]?.speak??'-'}s</p>
            <textarea placeholder="Your answer..." value={texts[p.id]||''} onChange={e=>setTexts(t=>({...t,[p.id]:e.target.value}))}/>
            <button className="copy" onClick={()=>copyText(p.id)}>📋 Copy My Answer</button>
          </section>
        ))}
        <div className="log"><h3>Session log</h3>{logs.map((l,i)=><pre key={i}>{l}</pre>)}</div>
      </div>

      <style jsx>{`
        /* Dizayn va RWD original saqlanadi */
      `}</style>
    </div>
  )
}
