'use client'
import React,{useEffect,useState} from "react";
import Header from "../header";
import Footer from "../footer";

/* ================= DATA ================= */
const RAW_DATA=[
 {t:"Present Simple",f:"S + V(s/es)",q:"She ___ daily.",o:["work","works","working"],a:"works"},
 {t:"Present Continuous",f:"S + am/is/are + V-ing",q:"They ___ now.",o:["play","are playing","played"],a:"are playing"},
 {t:"Past Simple",f:"S + V2",q:"He ___ the show yesterday.",o:["watch","watched","watches"],a:"watched"},
 {t:"Future Simple",f:"S + will + V",q:"We ___ travel.",o:["are","will","did"],a:"will"},
 {t:"If Type 1",f:"If + PS, will + V",q:"If it rains, I ___ home.",o:["stay","will stay","stayed"],a:"will stay"},
 {t:"Modal",f:"S + should + V",q:"You ___ study.",o:["should","did","are"],a:"should"},
 {t:"Passive",f:"S + be + V3",q:"The car ___ made.",o:["is","was","has"],a:"was"},
 {t:"Reported",f:"said + that",q:"He said he ___ tired.",o:["is","was","were"],a:"was"}
];

/* ================= ACHIEVEMENTS ================= */
const getAchievements=(score,answers,total)=>{
 let list=[];
 if(score>=10)list.push("🟢 Beginner");
 if(score>=30)list.push("🔵 Learner");
 if(score>=60)list.push("🟡 Advanced");
 if(score>=90)list.push("🔴 Grammar Master");
 if(Object.keys(answers).length===total &&
    Object.values(answers).every(v=>v==="correct"))
   list.push("⚡ Perfect Run");
 return list;
};

export default function GrammarPlatformPage(){
 const [user,setUser]=useState(null);
 const [name,setName]=useState("");
 const [open,setOpen]=useState(0);
 const [answers,setAnswers]=useState({});
 const [data]=useState(RAW_DATA);

 /* ===== LOAD USER ===== */
 useEffect(()=>{
  const saved=JSON.parse(localStorage.getItem("grammar-user"));
  if(saved)setUser(saved);
 },[]);

 
 /* ===== SAVE PROGRESS ===== */
 useEffect(()=>{
  if(user){
   localStorage.setItem("grammar-progress",
    JSON.stringify({answers,open})
   );
  }
 },[answers,open,user]);

 /* ===== SCORE ===== */
 const correct=Object.values(answers).filter(v=>v==="correct").length;
 const score=Math.round((correct/data.length)*100);
 const achievements=getAchievements(score,answers,data.length);

 /* ===== LOGIN PAGE ===== */
 if(!user){
  return(
   <div className="min-h-screen flex items-center justify-center bg-black text-white">
    <div className="bg-neutral-900 p-10 rounded-3xl w-80">
     <h2 className="text-3xl font-bold mb-6 text-center">Log-in(ismingiz)</h2>
     <input
      placeholder="Username"
      value={name}
      onChange={e=>setName(e.target.value)}
      className="w-full mb-4 px-4 py-2 rounded-xl bg-black border border-green-500"
     />
     <button
      onClick={()=>{
       localStorage.setItem("grammar-user",JSON.stringify({name}));
       setUser({name});
      }}
      className="w-full py-2 bg-green-600 rounded-xl font-bold">
      Enter Platform
     </button>
    </div>
   </div>
  )
 }

 /* ===== MAIN PLATFORM ===== */
 return(
  <div className="bg-black text-white">
   <Header/>

   <div className="max-w-5xl mx-auto px-4 py-10">
    <div className="flex justify-between items-center mb-6">
     <h1 className="text-4xl font-extrabold">
      Welcome, {user.name} !
     </h1>
     <button
      onClick={()=>{
       localStorage.removeItem("grammar-user");
       localStorage.removeItem("grammar-progress");
       setUser(null);
      }}
      className="border border-red-500 px-4 py-2 rounded-xl">
      Logout
     </button>
    </div>

    {/* SCORE */}
    <div className="mb-8">
     <div className="h-3 bg-gray-700 rounded-full">
      <div
       className="h-3 bg-green-500 rounded-full transition-all"
       style={{width:`${score}%`}}
      />
     </div>
     <p className="mt-2 text-green-400 font-bold">
      Overall Score: {score}%
     </p>
    </div>

    {/* ACHIEVEMENTS */}
    <div className="mb-10 bg-neutral-900 p-6 rounded-3xl">
     <h3 className="text-2xl font-bold mb-3">🏆 Achievements</h3>
     <div className="flex flex-wrap gap-3">
      {achievements.length
       ? achievements.map(a=>(
         <span key={a}
          className="px-4 py-2 bg-green-600 rounded-full">
          {a}
         </span>
       ))
       : <p className="opacity-50">No achievements yet</p>
      }
     </div>
    </div>

    {/* ACCORDION */}
    {data.map((x,i)=>(
     <div key={i}
      className={`mb-4 p-6 rounded-3xl border border-green-500/30
      ${i>open?"opacity-40 pointer-events-none":""}`}>
      <div className="flex justify-between cursor-pointer"
       onClick={()=>setOpen(i)}>
       <h2 className="text-2xl text-green-300 font-bold">{x.t}</h2>
       <span className="text-3xl">{open===i?"−":"+"}</span>
      </div>

      {open===i &&(
       <div className="mt-4">
        <pre className="text-green-200">{x.f}</pre>
        <p className="my-2">🧠 {x.q}</p>

        {x.o.map(opt=>(
         <button key={opt}
          onClick={()=>{
           setAnswers({...answers,[i]:opt===x.a?"correct":"wrong"});
           if(opt===x.a)setOpen(open+1);
          }}
          className="block w-full text-left px-4 py-2 mb-2 rounded-xl border border-green-500/40
           hover:bg-green-600">
          {opt}
         </button>
        ))}
       </div>
      )}
     </div>
    ))}
   </div>

   <Footer/>
  </div>
 )
}
