"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";



export default function NotFound() {
  return (
    <div className="notfound-root">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 14 }}
        className="card"
      >
        <div className="visual">
          <h1 className="code404">
            <motion.span
              initial={{ rotate: -6, scale: 0.98 }}
              animate={{ rotate: 6, scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 4 }}
            >
              <h2 className="turtiyuziturt">404</h2>
            </motion.span>
          </h1>
          <svg className="orb" viewBox="0 0 200 200" aria-hidden>
            <defs>
              <linearGradient id="g" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#4FD1C5" />
                <stop offset="100%" stopColor="#667EEA" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="78" stroke="url(#g)" strokeWidth="2" fill="none" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="content">
          <h2 className="title">Sahifa topilmadi</h2>
          <p className="desc">Siz qidirgan sahifa hozircha mavjud emas yoki boshqa joyga ko'chirilgan. Biz bu ustida ishlayapmiz.</p>

          <div className="actions">
            <Link href="/" className="btn primary">
              Bosh sahifaga qaytish
            </Link>

            <button
              className="btn ghost"
              onClick={() =>
                alert("Xatolik haqidagi ma'lumot qabul qilindi. Biz bilan bog'laning yoki keyinroq qayta urinib ko'ring.")
              }
            >
              Xatolikni bildirish
            </button>
          </div>

          <p className="hint">Agar siz saytdagi muhandis bo'lsangiz — iltimos konsolni tekshiring va <code>/app/not-found.jsx</code> faylini ko'rib chiqing.</p>
        </div>
      </motion.section>

      <style jsx>{`
        :root{
          --bg:#0b1020;
          --card:#0f1724;
          --muted:#9ca3af;
          --accent1:#4FD1C5;
          --accent2:#667EEA;
          --glass: rgba(255,255,255,0.04);
        }

        .notfound-root{
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background: radial-gradient(1200px 600px at 10% 10%, rgba(102,126,234,0.08), transparent 8%),
                      radial-gradient(1000px 500px at 90% 90%, rgba(79,209,197,0.06), transparent 8%),
                      var(--bg);
          padding:40px 20px;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: #eef2ff;
        }

        .card{
          width:100%;
          max-width:1100px;
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:32px;
          align-items:center;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border:1px solid rgba(255,255,255,0.04);
          box-shadow: 0 8px 30px rgba(2,6,23,0.7);
          padding:36px; 
          border-radius:16px;
          backdrop-filter: blur(6px) saturate(120%);
        }

        /* Visual column */
        .visual{
          display:flex;
          align-items:center;
          justify-content:center;
          position:relative;
          min-height:220px;
        }

        .code404{
          font-weight:800;
          font-size:6.5rem;
          margin:0;
          line-height:0.8;
          letter-spacing:-6px;
          background: linear-gradient(90deg, var(--accent1), var(--accent2));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 6px 30px rgba(102,126,234,0.12);
        }

        .orb{
          position:absolute;
          width:260px;
          height:260px;
          opacity:0.12;
          transform: translateY(-6px);
        }

        /* Content column */
        .content{
          padding:8px 6px;
        }

        .title{
          margin:0 0 8px 0;
          font-size:1.6rem;
          color: #eef2ff;
          font-weight:700;
        }

        .desc{
          margin:0 0 20px 0;
          color: var(--muted);
          line-height:1.6;
        }

        .actions{
          display:flex;
          gap:14px;
          align-items:center;
          margin-bottom:14px;
          flex-wrap:wrap;
        }

        .btn{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          padding:12px 18px;
          border-radius:999px;
          font-weight:600;
          border:1px solid transparent;
          cursor:pointer;
          transition: all .18s ease;
        }

        .btn.primary{
          background: linear-gradient(90deg, var(--accent1), var(--accent2));
          color: #041025;
          box-shadow: 0 6px 20px rgba(79,209,197,0.12);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .btn.primary:hover{ transform: translateY(-2px); filter:brightness(1.02); }

        .btn.ghost{
          background: transparent;
          color: var(--muted);
          border: 1px solid rgba(255,255,255,0.04);
        }

        .btn.ghost:hover{ background: var(--glass); color: #fff; }

        .hint{
          margin:0;
          color: #9aa4b2;
          font-size:0.86rem;
        }

        code{ background: rgba(255,255,255,0.03); padding:4px 8px; border-radius:6px; font-size:0.85rem; }

        /* Responsive */
        @media (max-width:900px){
          .card{ grid-template-columns: 1fr; padding:20px; gap:18px; }
          .code404{ font-size:5rem; }
          .orb{ width:200px; height:200px; }
        }

        @media (max-width:480px){
          .code404{ font-size:3.6rem; letter-spacing:-2px; }
          .card{ padding:16px; }
          .title{ font-size:1.25rem; }
        }
      `}</style>
    </div>
  );
}
