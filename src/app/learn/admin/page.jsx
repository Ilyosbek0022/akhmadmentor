'use client'
import React, { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";

export default function AdminLeaderboard(){
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem("grammar-users")) || [];
    setUsers(data.sort((a,b)=>b.score-a.score));
  },[]);

  return(
    <div className="all">
      <Header/>
    <div className="bg-black text-white min-h-screen">
      

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold mb-8">
          📊 Student Leaderboard
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-green-500/40 rounded-xl">
            <thead className="bg-green-600 text-black">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Name</th>
                <th className="p-3">Score %</th>
                <th className="p-3">Achievements</th>
                <th className="p-3">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u,i)=>(
                <tr key={i} className="text-center border-t border-green-500/20">
                  <td className="p-3 font-bold">{i+1}</td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3 text-green-400 font-bold">
                    {u.score}%
                  </td>
                  <td className="p-3">
                    {u.achievements.join(", ")}
                  </td>
                  <td className="p-3 opacity-70">
                    {u.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      
    </div>
    <Footer/>
    </div>
  )
}
