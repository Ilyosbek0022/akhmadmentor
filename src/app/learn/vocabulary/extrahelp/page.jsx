'use client'
import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   DATA
   ============================================================ */
const WORDS = [
  { id:1, word:"Eloquent", phonetic:"/ˈel.ə.kwənt/", pos:"adj", level:"B2", category:"Communication", meaning:"Fluent and persuasive in speaking or writing", uzbek:"Ta'sirchan, notiq", example:"She gave an eloquent speech that moved the entire audience.", synonyms:["articulate","fluent","expressive"], antonyms:["inarticulate","tongue-tied"], collocations:["eloquent speaker","eloquent silence","eloquent prose"], tip:"Think: EL(oquent) = 'el' kabi oqib ketuvchi so'z", family:{noun:"eloquence",adverb:"eloquently"} },
  { id:2, word:"Ambiguous", phonetic:"/æmˈbɪɡ.ju.əs/", pos:"adj", level:"B2", category:"Language", meaning:"Open to more than one interpretation; unclear", uzbek:"Noaniq, ikki ma'noli", example:"The contract contained several ambiguous clauses that caused confusion.", synonyms:["vague","unclear","equivocal"], antonyms:["clear","unambiguous","definite"], collocations:["ambiguous statement","ambiguous results","remain ambiguous"], tip:"AMBIguous → AMBI = 'both' (Latin). Like 'ambidextrous' — both hands!", family:{noun:"ambiguity",adverb:"ambiguously"} },
  { id:3, word:"Resilient", phonetic:"/rɪˈzɪl.i.ənt/", pos:"adj", level:"B2", category:"Character", meaning:"Able to recover quickly from difficulties; tough", uzbek:"Bardoshli, chidamli", example:"Children are surprisingly resilient and adapt quickly to change.", synonyms:["tough","adaptable","robust"], antonyms:["fragile","vulnerable","weak"], collocations:["resilient economy","prove resilient","resilient spirit"], tip:"ResiLIENT — like a LION 🦁 bouncing back!", family:{noun:"resilience",adverb:"resiliently"} },
  { id:4, word:"Pragmatic", phonetic:"/præɡˈmæt.ɪk/", pos:"adj", level:"C1", category:"Thinking", meaning:"Dealing with things sensibly and practically", uzbek:"Amaliy, pragmatik", example:"We need a pragmatic approach to solve this problem quickly.", synonyms:["practical","realistic","sensible"], antonyms:["idealistic","unrealistic","impractical"], collocations:["pragmatic approach","pragmatic solution","pragmatic thinker"], tip:"PRAGMA (Greek) = deed/action. Pragmatic people DO things, not just dream!", family:{noun:"pragmatism",adverb:"pragmatically"} },
  { id:5, word:"Inevitable", phonetic:"/ɪˈnev.ɪ.tə.bəl/", pos:"adj", level:"B2", category:"Certainty", meaning:"Certain to happen; unable to be avoided", uzbek:"Muqarrar, oldini olib bo'lmaydigan", example:"With such a diet and lifestyle, illness seemed inevitable.", synonyms:["unavoidable","certain","inescapable"], antonyms:["avoidable","preventable","uncertain"], collocations:["seem inevitable","inevitable consequence","inevitable result"], tip:"IN + EVIT(are) + ABLE — 'evitare' (Latin) = to avoid. CANNOT avoid!", family:{noun:"inevitability",adverb:"inevitably"} },
  { id:6, word:"Benevolent", phonetic:"/bɪˈnev.ə.lənt/", pos:"adj", level:"C1", category:"Character", meaning:"Well-meaning and kindly; generous", uzbek:"Xayrli, mehribon, saxiy", example:"The benevolent philanthropist donated millions to education.", synonyms:["kind","generous","charitable"], antonyms:["malevolent","cruel","unkind"], collocations:["benevolent ruler","benevolent smile","benevolent organization"], tip:"BENE (Latin) = good + VOL = wish. Benevolent = good-wisher!", family:{noun:"benevolence",adverb:"benevolently"} },
  { id:7, word:"Cynical", phonetic:"/ˈsɪn.ɪ.kəl/", pos:"adj", level:"B2", category:"Attitude", meaning:"Distrustful of people's motives; believing people are selfish", uzbek:"Shubhali, kinoyali, pesimistik", example:"Years of disappointment had made her cynical about politics.", synonyms:["skeptical","distrustful","pessimistic"], antonyms:["optimistic","trusting","idealistic"], collocations:["cynical view","become cynical","cynical attitude"], tip:"Cynics in ancient Greece mocked social norms. Now = doubter of goodness.", family:{noun:"cynicism",adverb:"cynically"} },
  { id:8, word:"Meticulous", phonetic:"/məˈtɪk.jʊ.ləs/", pos:"adj", level:"C1", category:"Work", meaning:"Showing great attention to detail; very careful", uzbek:"Sinchkov, juda diqqatli, aniq", example:"She was meticulous in her research, checking every single fact.", synonyms:["thorough","precise","scrupulous"], antonyms:["careless","sloppy","negligent"], collocations:["meticulous attention","meticulous planning","meticulous research"], tip:"METICulous → METIC = fear (Latin: metus). Fear of making mistakes = careful!", family:{noun:"meticulousness",adverb:"meticulously"} },
  { id:9, word:"Scrutinize", phonetic:"/ˈskruː.tɪ.naɪz/", pos:"verb", level:"C1", category:"Analysis", meaning:"To examine or inspect closely and thoroughly", uzbek:"Sinchiklab tekshirmoq, ko'zdan kechirmoq", example:"The committee scrutinized every aspect of the new proposal.", synonyms:["examine","inspect","analyze"], antonyms:["ignore","overlook","glance"], collocations:["closely scrutinize","scrutinize evidence","scrutinize data"], tip:"SCRUT = rubbish (Latin). Scrutinize = dig through rubbish to find something!", family:{noun:"scrutiny",adj:"scrutinizing"} },
  { id:10, word:"Mitigate", phonetic:"/ˈmɪt.ɪ.ɡeɪt/", pos:"verb", level:"C1", category:"Action", meaning:"To make less severe, serious, or painful", uzbek:"Yengillashtirmoq, kamaytirishmoq", example:"Trees help mitigate the effects of urban heat.", synonyms:["reduce","lessen","alleviate"], antonyms:["worsen","aggravate","intensify"], collocations:["mitigate risk","mitigate damage","mitigate effects"], tip:"MITI = soft (Latin). Mitigate = make soft/gentle the impact!", family:{noun:"mitigation",adj:"mitigating"} },
  { id:11, word:"Prolific", phonetic:"/prəˈlɪf.ɪk/", pos:"adj", level:"C1", category:"Productivity", meaning:"Producing many works, results, or offspring", uzbek:"Sermahsul, ko'p ishlab chiqaruvchi", example:"Shakespeare was one of the most prolific writers in history.", synonyms:["productive","fertile","abundant"], antonyms:["unproductive","barren","scarce"], collocations:["prolific writer","prolific scorer","prolific career"], tip:"PROLI = offspring (Latin: proles). Prolific = lots of offspring/output!", family:{noun:"prolificacy",adverb:"prolifically"} },
  { id:12, word:"Tenacious", phonetic:"/tɪˈneɪ.ʃəs/", pos:"adj", level:"C1", category:"Character", meaning:"Holding firmly to something; persistent and determined", uzbek:"Qat'iyatli, tutinuvchi, chidamli", example:"Her tenacious pursuit of justice finally paid off after 10 years.", synonyms:["persistent","determined","stubborn"], antonyms:["yielding","weak","irresolute"], collocations:["tenacious grip","tenacious defender","remain tenacious"], tip:"TENAC = hold (Latin: tenere). Tenacious = one who holds on tight!", family:{noun:"tenacity",adverb:"tenaciously"} },
  { id:13, word:"Exacerbate", phonetic:"/ɪɡˈzæs.ə.beɪt/", pos:"verb", level:"C1", category:"Change", meaning:"To make a problem, bad situation, or negative feeling worse", uzbek:"Yomonlashtirmoq, kuchaytirmoq", example:"Stress can exacerbate physical health problems.", synonyms:["worsen","aggravate","intensify"], antonyms:["improve","mitigate","alleviate"], collocations:["exacerbate problems","exacerbate tensions","greatly exacerbate"], tip:"EX + ACERB (bitter/sharp). Adding MORE bitterness = making worse!", family:{noun:"exacerbation"} },
  { id:14, word:"Ubiquitous", phonetic:"/juːˈbɪk.wɪ.təs/", pos:"adj", level:"C1", category:"Presence", meaning:"Present, appearing, or found everywhere", uzbek:"Hamma joyda mavjud bo'lgan", example:"Smartphones have become ubiquitous in modern society.", synonyms:["omnipresent","pervasive","universal"], antonyms:["rare","scarce","absent"], collocations:["ubiquitous presence","become ubiquitous","seemingly ubiquitous"], tip:"UBI (Latin) = where. Ubiquitous = 'where? EVERYWHERE!'", family:{noun:"ubiquity",adverb:"ubiquitously"} },
  { id:15, word:"Empathy", phonetic:"/ˈem.pə.θi/", pos:"noun", level:"B2", category:"Emotion", meaning:"The ability to understand and share feelings of another", uzbek:"Hamdardlik, his-tuyg'ularni tushunish", example:"Good leaders show empathy toward their team members.", synonyms:["compassion","understanding","sympathy"], antonyms:["indifference","coldness","apathy"], collocations:["show empathy","lack empathy","empathy for others"], tip:"EM + PATHY (Greek: pathos = feeling). To feel INTO someone else's experience!", family:{adj:"empathetic",verb:"empathize"} },
  { id:16, word:"Paradox", phonetic:"/ˈpær.ə.dɒks/", pos:"noun", level:"B2", category:"Logic", meaning:"A seemingly absurd statement that may be true; a self-contradiction", uzbek:"Paradoks, ziddiyatli fikr", example:"It's a paradox that the more choices we have, the less satisfied we feel.", synonyms:["contradiction","irony","anomaly"], antonyms:["truism","certainty"], collocations:["apparent paradox","pose a paradox","central paradox"], tip:"PARA (beyond) + DOXA (belief). Beyond normal belief = paradox!", family:{adj:"paradoxical",adverb:"paradoxically"} },
];

const CATEGORIES = ["All", "Communication", "Language", "Character", "Thinking", "Certainty", "Attitude", "Work", "Analysis", "Action", "Productivity", "Change", "Presence", "Emotion", "Logic"];
const LEVELS = ["All", "A1", "A2", "B1", "B2", "C1", "C2"];

const TUTORS = [
  { id:"emma", name:"Emma Wilson", flag:"🇬🇧", accent:"British English", specialty:"Academic Vocabulary", level:"IELTS/C1-C2", color:"#e879f9", bg:"from-fuchsia-900/40 to-purple-900/40", avatar:"E", tip:"Focus on word families! Learning 'eloquent' also gives you 'eloquence' and 'eloquently' — 3 words for the price of 1!", lessonType:"Word Family Mastery" },
  { id:"jake", name:"Jake Morrison", flag:"🇺🇸", accent:"American English", specialty:"Colloquial Vocabulary", level:"B1-B2", color:"#38bdf8", bg:"from-sky-900/40 to-blue-900/40", avatar:"J", tip:"Context is everything! Never learn a word alone — always learn it in a sentence. Your brain remembers stories, not lists.", lessonType:"Contextual Learning" },
  { id:"priya", name:"Priya Sharma", flag:"🇮🇳", accent:"International English", specialty:"Business Vocabulary", level:"B2-C1", color:"#34d399", bg:"from-emerald-900/40 to-teal-900/40", avatar:"P", tip:"Use the SPIDER technique: Synonyms, Phonetics, Image, Definition, Example, Related words. Cover all angles!", lessonType:"SPIDER Method" },
  { id:"lars", name:"Lars Eriksen", flag:"🇸🇪", accent:"Scandinavian English", specialty:"Etymology & Roots", level:"C1-C2", color:"#fb923c", bg:"from-orange-900/40 to-amber-900/40", avatar:"L", tip:"Learn Latin/Greek roots and unlock hundreds of words at once! 'bene' = good unlocks: benefit, benevolent, beneficial, benediction...", lessonType:"Root Word Method" },
];

const QUIZ_QUESTIONS = [
  { q:"Which word means 'able to recover quickly from difficulties'?", opts:["Pragmatic","Resilient","Cynical","Meticulous"], ans:1 },
  { q:"'The contract was ___.' — Fill with the best vocabulary word:", opts:["ambiguous","prolific","ubiquitous","tenacious"], ans:0 },
  { q:"What is the noun form of 'eloquent'?", opts:["eloquentness","eloquency","eloquence","eloquenthood"], ans:2 },
  { q:"'Mitigate' is closest in meaning to:", opts:["worsen","reduce","ignore","intensify"], ans:1 },
  { q:"Which word comes from the Latin root meaning 'everywhere'?", opts:["empathy","paradox","ubiquitous","benevolent"], ans:2 },
  { q:"A 'cynical' person is MOST likely to:", opts:["Trust everyone","Question people's motives","Work very hard","Be very generous"], ans:1 },
  { q:"'Scrutinize' means:", opts:["To write carefully","To ignore completely","To examine closely","To speak eloquently"], ans:2 },
  { q:"The ANTONYM of 'benevolent' is:", opts:["kind","generous","malevolent","empathetic"], ans:2 },
  { q:"Which sentence uses 'exacerbate' correctly?", opts:["She exacerbated the situation by staying calm","Stress can exacerbate health problems","He exacerbated his vocabulary","The medicine exacerbated the cure"], ans:1 },
  { q:"'Meticulous' describes someone who is:", opts:["Very fast","Very careful about details","Very talkative","Very creative"], ans:1 },
];

const MEMORY_TIPS = [
  { icon:"🧠", title:"Spaced Repetition", desc:"Birinchi kun o'rganing → ertaga takrorlang → 3 kunda → 1 haftada → 1 oyda. Har takrorlashda miyaga chuqurroq o'rnashadi!", color:"#a78bfa" },
  { icon:"🖼️", title:"Visual Association", desc:"Har so'z uchun kuchli mental rasm chizing. 'Resilient' = ko'karib chiqqan o't + lion. Siz eslamasangiz ham rasm eslatadi!", color:"#34d399" },
  { icon:"📖", title:"Read In Context", desc:"So'zni yolg'iz o'rgamang — uni maqola, kitob, film subtitrlarida ko'ring. Real kontekst = real xotira!", color:"#38bdf8" },
  { icon:"✍️", title:"Write It Down", desc:"So'zni qo'l bilan 5 marta yozing va har safar gapga soling. Qo'l yozuvi miyani 3x kuchliroq aktivlashtiradi.", color:"#fb923c" },
  { icon:"🎵", title:"Rhythm & Rhyme", desc:"'E-LO-quent speaks well' — ritmli jumlalar yarating! Musiqa va ritm xotirani 7x yaxshilaydi.", color:"#f472b6" },
  { icon:"🗣️", title:"Teach It Back", desc:"O'rgangan so'zingizni do'stingizga tushuntiring! Tushuntirish jarayoni tushuning 90%ini mustahkamlaydi.", color:"#fbbf24" },
];

const IDIOMS = [
  { phrase:"Break the ice", meaning:"Start a conversation in an awkward situation", example:"He told a joke to break the ice at the party.", uzbek:"Muloqotni boshlash uchun muzni eritmoq" },
  { phrase:"Hit the nail on the head", meaning:"Describe exactly what is causing a situation/problem", example:"You hit the nail on the head with that analysis.", uzbek:"To'g'ri aytmoq, maqsadga urmoq" },
  { phrase:"Beat around the bush", meaning:"Avoid saying something directly", example:"Stop beating around the bush and tell me the truth!", uzbek:"Aylanib o'tmoq, to'g'ri gapirishdan qochmoq" },
  { phrase:"A penny for your thoughts", meaning:"Asking what someone is thinking about", example:"You look worried — a penny for your thoughts?", uzbek:"Nima o'ylayotganingizni ayting" },
  { phrase:"Bite the bullet", meaning:"Endure a painful or unpleasant situation", example:"I bit the bullet and apologized to my boss.", uzbek:"Qiyinchilikka toqat qilmoq" },
  { phrase:"Burn the midnight oil", meaning:"Work late into the night", example:"She burned the midnight oil to finish the project.", uzbek:"Kechasi kech qadar ishlaymoq" },
];

const COLLOCATIONS_DATA = [
  { verb:"make", nouns:["a decision","a mistake","progress","an effort","a suggestion","a contribution"], color:"#a78bfa" },
  { verb:"do", nouns:["damage","research","business","homework","justice","harm"], color:"#34d399" },
  { verb:"take", nouns:["action","responsibility","advantage","note","place","time"], color:"#38bdf8" },
  { verb:"give", nouns:["advice","a speech","permission","attention","credit","priority"], color:"#fb923c" },
];

/* ============================================================
   COMPONENTS
   ============================================================ */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,400&display=swap');

* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Outfit',sans-serif; background:#060810; color:#e8eaf6; overflow-x:hidden; }

:root {
  --bg:#060810; --s1:#0d1117; --s2:#161d2a; --s3:#1e2738;
  --acc:#a78bfa; --acc2:#34d399; --acc3:#f472b6; --acc4:#38bdf8;
  --gold:#fbbf24; --text:#e8eaf6; --muted:#5a6a8a;
  --border:rgba(167,139,250,0.15);
}

.glass { background:rgba(255,255,255,0.03); backdrop-filter:blur(12px); border:1px solid var(--border); }
.glow-purple { box-shadow:0 0 30px rgba(167,139,250,0.15); }
.glow-green { box-shadow:0 0 30px rgba(52,211,153,0.15); }

@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
@keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
@keyframes spin { to{transform:rotate(360deg)} }

.animate-float { animation:float 3s ease-in-out infinite; }
.animate-fadein { animation:fadeUp 0.4s ease forwards; }
.animate-spin { animation:spin 1s linear infinite; }

.progress-shimmer {
  background: linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.3) 50%, transparent 100%);
  background-size:200% 100%;
  animation: shimmer 1.5s infinite;
}

::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-track { background:transparent; }
::-webkit-scrollbar-thumb { background:var(--border); border-radius:99px; }
`;

/* ---------- Badge ---------- */
const Badge = ({ children, color = "#a78bfa", size = "sm" }) => (
  <span style={{
    display:"inline-flex", alignItems:"center", padding: size === "sm" ? "2px 8px" : "4px 12px",
    borderRadius:"999px", fontSize: size === "sm" ? "0.65rem" : "0.75rem",
    fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase",
    background:`${color}20`, color, border:`1px solid ${color}40`,
    fontFamily:"'JetBrains Mono', monospace"
  }}>
    {children}
  </span>
);

/* ---------- Tab Bar ---------- */
const TabBar = ({ tabs, active, onChange, accent = "#a78bfa" }) => (
  <div style={{ display:"flex", gap:"0.3rem", flexWrap:"wrap", marginBottom:"1.5rem" }}>
    {tabs.map(t => (
      <button key={t} onClick={() => onChange(t)} style={{
        padding:"0.45rem 1rem", borderRadius:"8px",
        border: active === t ? "none" : "1px solid rgba(255,255,255,0.08)",
        background: active === t ? accent : "rgba(255,255,255,0.04)",
        color: active === t ? "#000" : "rgba(255,255,255,0.5)",
        fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:"0.8rem",
        cursor:"pointer", transition:"all 0.2s",
      }}>
        {t}
      </button>
    ))}
  </div>
);

/* ============================================================
   MAIN APP
   ============================================================ */
export default function VocabVault() {
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [savedWords, setSavedWords] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [wordsLearned, setWordsLearned] = useState(0);

  const sections = [
    { id:"home", icon:"🏠", label:"Home" },
    { id:"dictionary", icon:"📖", label:"Dictionary" },
    { id:"flashcards", icon:"🃏", label:"Flashcards" },
    { id:"tutors", icon:"👩‍🏫", label:"Tutors" },
    { id:"quiz", icon:"🧠", label:"Quiz" },
    { id:"games", icon:"🎮", label:"Games" },
    { id:"idioms", icon:"💬", label:"Idioms" },
    { id:"collocations", icon:"🔗", label:"Collocations" },
    { id:"memory", icon:"✨", label:"Memory Tips" },
    { id:"progress", icon:"📊", label:"Progress" },
  ];

  const toggleSave = (id) => {
    setSavedWords(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredWords = WORDS.filter(w => {
    const q = searchQuery.toLowerCase();
    const matchQ = !q || w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q) || w.uzbek.toLowerCase().includes(q);
    const matchCat = selectedCategory === "All" || w.category === selectedCategory;
    const matchLvl = selectedLevel === "All" || w.level === selectedLevel;
    return matchQ && matchCat && matchLvl;
  });

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight:"100vh", background:"var(--bg)", position:"relative" }}>
        {/* Ambient background */}
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
          background:`radial-gradient(ellipse 80% 60% at 15% 10%, rgba(167,139,250,0.08) 0%, transparent 60%),
                      radial-gradient(ellipse 60% 40% at 85% 80%, rgba(52,211,153,0.06) 0%, transparent 60%),
                      radial-gradient(ellipse 40% 30% at 50% 50%, rgba(244,114,182,0.04) 0%, transparent 60%)` }}
        />

        {/* NAV */}
        <nav style={{
          position:"fixed", top:0, left:0, right:0, zIndex:100,
          background:"rgba(6,8,16,0.92)", backdropFilter:"blur(20px)",
          borderBottom:"1px solid rgba(167,139,250,0.12)",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"0 1.5rem", height:"58px"
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.8rem" }}>
            <div style={{
              width:32, height:32, borderRadius:8,
              background:"linear-gradient(135deg,#a78bfa,#34d399)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"1rem"
            }}>📚</div>
            <span style={{ fontFamily:"'Fraunces',serif", fontSize:"1.25rem", fontWeight:900, color:"#e8eaf6", letterSpacing:"-0.02em" }}>
              Vocab<span style={{ color:"#a78bfa" }}>Vault</span>
            </span>
          </div>

          <div style={{ display:"flex", gap:"0.2rem", overflowX:"auto" }}>
            {sections.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                padding:"0.35rem 0.75rem", borderRadius:"7px", border:"none",
                background: activeSection === s.id ? "rgba(167,139,250,0.2)" : "transparent",
                color: activeSection === s.id ? "#a78bfa" : "rgba(255,255,255,0.4)",
                fontSize:"0.75rem", fontWeight:700, cursor:"pointer",
                fontFamily:"'Outfit',sans-serif", transition:"all 0.2s",
                whiteSpace:"nowrap"
              }}>
                <span style={{ marginRight:"0.3rem" }}>{s.icon}</span>
                <span style={{ display:"none" }}>{s.label}</span>
              </button>
            ))}
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:"0.8rem" }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.75rem", color:"#fbbf24" }}>
              ⭐ {totalScore}
            </div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.75rem", color:"#34d399" }}>
              📚 {wordsLearned}
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main style={{ paddingTop:"58px", position:"relative", zIndex:1 }}>
          {activeSection === "home" && <HomeSection setActiveSection={setActiveSection} totalScore={totalScore} wordsLearned={wordsLearned} savedWords={savedWords} />}
          {activeSection === "dictionary" && <DictionarySection words={filteredWords} allWords={WORDS} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} savedWords={savedWords} toggleSave={toggleSave} />}
          {activeSection === "flashcards" && <FlashcardsSection words={WORDS} setWordsLearned={setWordsLearned} setTotalScore={setTotalScore} />}
          {activeSection === "tutors" && <TutorsSection />}
          {activeSection === "quiz" && <QuizSection setTotalScore={setTotalScore} />}
          {activeSection === "games" && <GamesSection setTotalScore={setTotalScore} />}
          {activeSection === "idioms" && <IdiomsSection />}
          {activeSection === "collocations" && <CollocationsSection />}
          {activeSection === "memory" && <MemorySection />}
          {activeSection === "progress" && <ProgressSection totalScore={totalScore} wordsLearned={wordsLearned} savedWords={savedWords} />}
        </main>
      </div>
    </>
  );
}

/* ============================================================
   HOME SECTION
   ============================================================ */
function HomeSection({ setActiveSection, totalScore, wordsLearned, savedWords }) {
  const stats = [
    { label:"Total Words", value:"200+", icon:"📖", color:"#a78bfa" },
    { label:"Your Score", value:totalScore, icon:"⭐", color:"#fbbf24" },
    { label:"Words Learned", value:wordsLearned, icon:"🧠", color:"#34d399" },
    { label:"Saved", value:savedWords.length, icon:"🔖", color:"#f472b6" },
  ];

  const features = [
    { id:"dictionary", icon:"📖", title:"Dictionary", desc:"200+ so'z, ta'rif, misol, sinonim", color:"#a78bfa" },
    { id:"flashcards", icon:"🃏", title:"Flashcards", desc:"Interaktiv kartochkalar bilan yodlang", color:"#34d399" },
    { id:"tutors", icon:"👩‍🏫", title:"AI Tutors", desc:"4 ta professional o'qituvchi bilan dars", color:"#38bdf8" },
    { id:"quiz", icon:"🧠", title:"Smart Quiz", desc:"10 savol, real vaqtda baho", color:"#fb923c" },
    { id:"games", icon:"🎮", title:"Word Games", desc:"Hangman, scramble, match o'yinlar", color:"#f472b6" },
    { id:"idioms", icon:"💬", title:"Idioms", desc:"Ingliz tili iboralari va maqollar", color:"#fbbf24" },
    { id:"collocations", icon:"🔗", title:"Collocations", desc:"So'z birikmalari — make/do/take/give", color:"#a3e635" },
    { id:"memory", icon:"✨", title:"Memory Tips", desc:"Yodlash texnikasi va usullari", color:"#e879f9" },
  ];

  return (
    <div style={{ padding:"3rem 1.5rem", maxWidth:1200, margin:"0 auto" }}>
      {/* HERO */}
      <div style={{ textAlign:"center", marginBottom:"4rem", padding:"3rem 0" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem",
          background:"rgba(167,139,250,0.1)", border:"1px solid rgba(167,139,250,0.25)",
          borderRadius:"999px", padding:"0.4rem 1.2rem", marginBottom:"1.5rem" }}>
          <span style={{ color:"#a78bfa", fontSize:"0.7rem", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>
            ⚡ Professional Vocabulary Learning
          </span>
        </div>

        <h1 style={{
          fontFamily:"'Fraunces',serif", fontSize:"clamp(2.5rem,7vw,5.5rem)",
          fontWeight:900, lineHeight:1.05, letterSpacing:"-0.03em",
          marginBottom:"1.2rem"
        }}>
          Master English<br />
          <span style={{ background:"linear-gradient(135deg,#a78bfa 0%,#f472b6 50%,#34d399 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Vocabulary
          </span>
        </h1>

        <p style={{ fontSize:"1.05rem", color:"rgba(232,234,246,0.6)", maxWidth:520, margin:"0 auto 2rem", lineHeight:1.7 }}>
          Flashcards, Quiz, Games, AI Tutors va Memory Tips bilan ingliz tilini professional darajada o'rganing. IELTS C2 gacha!
        </p>

        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => setActiveSection("flashcards")} style={{
            padding:"0.85rem 2.5rem", borderRadius:"12px", border:"none",
            background:"linear-gradient(135deg,#a78bfa,#7c3aed)",
            color:"#fff", fontWeight:800, fontSize:"1rem",
            cursor:"pointer", fontFamily:"'Outfit',sans-serif",
            boxShadow:"0 8px 30px rgba(167,139,250,0.3)", transition:"transform 0.2s"
          }}
            onMouseEnter={e => e.target.style.transform="translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform="none"}
          >
            🃏 Start Flashcards
          </button>
          <button onClick={() => setActiveSection("quiz")} style={{
            padding:"0.85rem 2.5rem", borderRadius:"12px",
            border:"1.5px solid rgba(52,211,153,0.4)",
            background:"rgba(52,211,153,0.08)", color:"#34d399",
            fontWeight:800, fontSize:"1rem", cursor:"pointer",
            fontFamily:"'Outfit',sans-serif", transition:"all 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(52,211,153,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(52,211,153,0.08)"; }}
          >
            🧠 Take Quiz
          </button>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:"1rem", marginBottom:"3rem" }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)",
            borderRadius:"16px", padding:"1.5rem 1rem", textAlign:"center"
          }}>
            <div style={{ fontSize:"1.5rem", marginBottom:"0.5rem" }}>{s.icon}</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"1.8rem", fontWeight:700, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.4)", marginTop:"0.3rem", textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* WORD OF THE DAY */}
      <WordOfTheDay />

      {/* FEATURES GRID */}
      <div style={{ marginTop:"3rem" }}>
        <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"1.8rem", fontWeight:700, marginBottom:"1.5rem" }}>
          Everything You Need 🚀
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1rem" }}>
          {features.map(f => (
            <div key={f.id} onClick={() => setActiveSection(f.id)} style={{
              background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:"16px", padding:"1.5rem", cursor:"pointer", transition:"all 0.25s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`${f.color}40`; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.background=`${f.color}08`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="none"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}
            >
              <div style={{ fontSize:"2rem", marginBottom:"0.8rem" }}>{f.icon}</div>
              <div style={{ fontWeight:800, fontSize:"1rem", color:f.color, marginBottom:"0.3rem" }}>{f.title}</div>
              <div style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.4)", lineHeight:1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Word of the Day ---------- */
function WordOfTheDay() {
  const w = WORDS[new Date().getDate() % WORDS.length];
  const [revealed, setRevealed] = useState(false);
  return (
    <div style={{
      background:"linear-gradient(135deg,rgba(167,139,250,0.1),rgba(52,211,153,0.08))",
      border:"1px solid rgba(167,139,250,0.2)", borderRadius:"20px", padding:"2rem",
      marginBottom:"1rem"
    }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem", marginBottom:"1rem" }}>
        <div>
          <div style={{ fontSize:"0.7rem", fontWeight:800, color:"#a78bfa", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.3rem" }}>
            ✨ Word of the Day
          </div>
          <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:"2.5rem", fontWeight:900, color:"#e8eaf6", letterSpacing:"-0.02em" }}>{w.word}</h3>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.85rem", color:"rgba(255,255,255,0.4)", marginTop:"0.2rem" }}>{w.phonetic}</div>
        </div>
        <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
          <Badge color="#a78bfa">{w.pos}</Badge>
          <Badge color="#34d399">{w.level}</Badge>
          <Badge color="#38bdf8">{w.category}</Badge>
        </div>
      </div>
      <p style={{ fontSize:"1rem", color:"rgba(232,234,246,0.8)", lineHeight:1.7, marginBottom:"0.8rem" }}>
        <strong style={{ color:"#a78bfa" }}>📝 </strong>{w.meaning}
      </p>
      {!revealed ? (
        <button onClick={() => setRevealed(true)} style={{
          padding:"0.5rem 1.2rem", background:"rgba(167,139,250,0.15)",
          border:"1px solid rgba(167,139,250,0.3)", borderRadius:"8px",
          color:"#a78bfa", fontWeight:700, fontSize:"0.85rem", cursor:"pointer", fontFamily:"'Outfit',sans-serif"
        }}>
          Show Example & Tips →
        </button>
      ) : (
        <div style={{ animation:"fadeUp 0.3s ease" }}>
          <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:"10px", padding:"0.8rem 1rem", marginBottom:"0.8rem" }}>
            <span style={{ color:"#fbbf24", fontWeight:700 }}>💡 Example: </span>
            <em style={{ color:"rgba(232,234,246,0.7)", fontStyle:"italic" }}>"{w.example}"</em>
          </div>
          <div style={{ background:"rgba(52,211,153,0.08)", borderRadius:"10px", padding:"0.8rem 1rem", marginBottom:"0.8rem" }}>
            <span style={{ color:"#34d399", fontWeight:700 }}>🇺🇿 Uzbek: </span>
            <span style={{ color:"rgba(232,234,246,0.7)" }}>{w.uzbek}</span>
          </div>
          <div style={{ background:"rgba(244,114,182,0.08)", borderRadius:"10px", padding:"0.8rem 1rem" }}>
            <span style={{ color:"#f472b6", fontWeight:700 }}>🧠 Memory Tip: </span>
            <span style={{ color:"rgba(232,234,246,0.7)" }}>{w.tip}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   DICTIONARY SECTION
   ============================================================ */
function DictionarySection({ words, allWords, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, selectedLevel, setSelectedLevel, savedWords, toggleSave }) {
  const [expandedWord, setExpandedWord] = useState(null);

  return (
    <div style={{ padding:"2rem 1.5rem", maxWidth:1200, margin:"0 auto" }}>
      <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"2rem", fontWeight:900, marginBottom:"0.5rem" }}>
        📖 Vocabulary Dictionary
      </h2>
      <p style={{ color:"rgba(255,255,255,0.4)", marginBottom:"1.5rem", fontSize:"0.9rem" }}>
        {words.length} words found — click any word to see full details
      </p>

      {/* SEARCH */}
      <div style={{ position:"relative", marginBottom:"1rem" }}>
        <span style={{ position:"absolute", left:"1rem", top:"50%", transform:"translateY(-50%)", fontSize:"1.1rem" }}>🔍</span>
        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search word, meaning, or Uzbek translation..."
          style={{
            width:"100%", padding:"0.8rem 1rem 0.8rem 3rem",
            background:"rgba(255,255,255,0.04)", border:"1.5px solid rgba(255,255,255,0.1)",
            borderRadius:"12px", color:"#e8eaf6", fontSize:"0.95rem",
            fontFamily:"'Outfit',sans-serif", outline:"none"
          }}
          onFocus={e => e.target.style.borderColor="rgba(167,139,250,0.5)"}
          onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"}
        />
      </div>

      {/* FILTERS */}
      <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", marginBottom:"1.5rem" }}>
        <div style={{ display:"flex", gap:"0.3rem", flexWrap:"wrap" }}>
          {LEVELS.map(l => (
            <button key={l} onClick={() => setSelectedLevel(l)} style={{
              padding:"0.35rem 0.8rem", borderRadius:"7px", border:"1px solid rgba(255,255,255,0.1)",
              background: selectedLevel === l ? "#38bdf8" : "transparent",
              color: selectedLevel === l ? "#000" : "rgba(255,255,255,0.5)",
              fontSize:"0.75rem", fontWeight:800, cursor:"pointer",
              fontFamily:"'JetBrains Mono',monospace", transition:"all 0.15s"
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div style={{ display:"flex", gap:"0.3rem", flexWrap:"wrap", marginBottom:"1.5rem" }}>
        {CATEGORIES.slice(0, 8).map(c => (
          <button key={c} onClick={() => setSelectedCategory(c)} style={{
            padding:"0.35rem 0.9rem", borderRadius:"7px",
            border: selectedCategory === c ? "none" : "1px solid rgba(255,255,255,0.08)",
            background: selectedCategory === c ? "#a78bfa" : "rgba(255,255,255,0.04)",
            color: selectedCategory === c ? "#000" : "rgba(255,255,255,0.5)",
            fontSize:"0.78rem", fontWeight:700, cursor:"pointer",
            fontFamily:"'Outfit',sans-serif", transition:"all 0.15s"
          }}>{c}</button>
        ))}
      </div>

      {/* WORDS GRID */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:"1rem" }}>
        {words.map(w => (
          <WordCard key={w.id} word={w} expanded={expandedWord === w.id}
            onToggle={() => setExpandedWord(expandedWord === w.id ? null : w.id)}
            saved={savedWords.includes(w.id)} onSave={() => toggleSave(w.id)}
          />
        ))}
      </div>

      {words.length === 0 && (
        <div style={{ textAlign:"center", padding:"4rem", color:"rgba(255,255,255,0.3)" }}>
          <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>🔍</div>
          <p>No words found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}

function WordCard({ word: w, expanded, onToggle, saved, onSave }) {
  const lvlColor = { A1:"#34d399", A2:"#38bdf8", B1:"#fbbf24", B2:"#fb923c", C1:"#a78bfa", C2:"#f472b6" };
  return (
    <div style={{
      background:"rgba(255,255,255,0.03)", border:`1px solid ${expanded ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.06)"}`,
      borderRadius:"16px", overflow:"hidden", transition:"all 0.25s",
      boxShadow: expanded ? "0 8px 30px rgba(167,139,250,0.1)" : "none"
    }}>
      {/* Card Header */}
      <div onClick={onToggle} style={{ padding:"1.2rem", cursor:"pointer" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.6rem" }}>
          <div>
            <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:"1.5rem", fontWeight:900, color:"#e8eaf6", letterSpacing:"-0.01em" }}>{w.word}</h3>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.75rem", color:"rgba(255,255,255,0.35)" }}>{w.phonetic}</span>
          </div>
          <div style={{ display:"flex", gap:"0.4rem", alignItems:"center" }}>
            <Badge color={lvlColor[w.level] || "#a78bfa"}>{w.level}</Badge>
            <button onClick={e => { e.stopPropagation(); onSave(); }} style={{
              background:"none", border:"none", cursor:"pointer", fontSize:"1.1rem",
              color: saved ? "#fbbf24" : "rgba(255,255,255,0.3)", transition:"all 0.2s"
            }}>
              {saved ? "⭐" : "☆"}
            </button>
          </div>
        </div>
        <div style={{ display:"flex", gap:"0.4rem", marginBottom:"0.6rem" }}>
          <Badge color="#34d399" size="xs">{w.pos}</Badge>
          <Badge color="#38bdf8" size="xs">{w.category}</Badge>
        </div>
        <p style={{ fontSize:"0.88rem", color:"rgba(232,234,246,0.7)", lineHeight:1.6 }}>{w.meaning}</p>
        <p style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.35)", marginTop:"0.3rem" }}>🇺🇿 {w.uzbek}</p>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"1.2rem", animation:"fadeUp 0.3s ease" }}>
          {/* Example */}
          <div style={{ background:"rgba(251,191,36,0.08)", borderRadius:"10px", padding:"0.8rem 1rem", marginBottom:"0.8rem", borderLeft:"3px solid #fbbf24" }}>
            <span style={{ fontSize:"0.7rem", fontWeight:800, color:"#fbbf24", textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:"0.3rem" }}>Example</span>
            <em style={{ fontSize:"0.85rem", color:"rgba(232,234,246,0.75)", lineHeight:1.6 }}>"{w.example}"</em>
          </div>

          {/* Synonyms & Antonyms */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem", marginBottom:"0.8rem" }}>
            <div style={{ background:"rgba(52,211,153,0.07)", borderRadius:"8px", padding:"0.7rem" }}>
              <div style={{ fontSize:"0.65rem", fontWeight:800, color:"#34d399", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.4rem" }}>Synonyms</div>
              <div style={{ display:"flex", gap:"0.3rem", flexWrap:"wrap" }}>
                {w.synonyms.map(s => <span key={s} style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.6)", background:"rgba(255,255,255,0.05)", padding:"2px 7px", borderRadius:"4px" }}>{s}</span>)}
              </div>
            </div>
            <div style={{ background:"rgba(244,114,182,0.07)", borderRadius:"8px", padding:"0.7rem" }}>
              <div style={{ fontSize:"0.65rem", fontWeight:800, color:"#f472b6", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.4rem" }}>Antonyms</div>
              <div style={{ display:"flex", gap:"0.3rem", flexWrap:"wrap" }}>
                {w.antonyms.map(a => <span key={a} style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.6)", background:"rgba(255,255,255,0.05)", padding:"2px 7px", borderRadius:"4px" }}>{a}</span>)}
              </div>
            </div>
          </div>

          {/* Collocations */}
          <div style={{ background:"rgba(56,189,248,0.07)", borderRadius:"8px", padding:"0.7rem", marginBottom:"0.8rem" }}>
            <div style={{ fontSize:"0.65rem", fontWeight:800, color:"#38bdf8", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.4rem" }}>Collocations</div>
            <div style={{ display:"flex", gap:"0.3rem", flexWrap:"wrap" }}>
              {w.collocations.map(c => <span key={c} style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.6)", background:"rgba(255,255,255,0.05)", padding:"2px 7px", borderRadius:"4px" }}>{c}</span>)}
            </div>
          </div>

          {/* Word Family */}
          <div style={{ background:"rgba(167,139,250,0.07)", borderRadius:"8px", padding:"0.7rem", marginBottom:"0.8rem" }}>
            <div style={{ fontSize:"0.65rem", fontWeight:800, color:"#a78bfa", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.4rem" }}>Word Family</div>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              {Object.entries(w.family).map(([k, v]) => (
                <span key={k} style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.6)" }}>
                  <span style={{ color:"#a78bfa", fontWeight:700 }}>{k}:</span> {v}
                </span>
              ))}
            </div>
          </div>

          {/* Memory Tip */}
          <div style={{ background:"rgba(251,191,36,0.06)", borderRadius:"8px", padding:"0.7rem", borderLeft:"3px solid #fbbf24" }}>
            <span style={{ fontSize:"0.7rem", fontWeight:800, color:"#fbbf24", textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:"0.3rem" }}>🧠 Memory Tip</span>
            <p style={{ fontSize:"0.82rem", color:"rgba(232,234,246,0.7)" }}>{w.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   FLASHCARDS SECTION
   ============================================================ */
function FlashcardsSection({ words, setWordsLearned, setTotalScore }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState("meaning"); // meaning, example, family
  const [known, setKnown] = useState([]);
  const [unknown, setUnknown] = useState([]);
  const [showStats, setShowStats] = useState(false);

  const w = words[index % words.length];

  const handleKnow = () => {
    setKnown(p => [...p, w.id]);
    setWordsLearned(p => p + 1);
    setTotalScore(p => p + 10);
    nextCard();
  };
  const handleUnknown = () => {
    setUnknown(p => [...p, w.id]);
    nextCard();
  };
  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => setIndex(p => (p + 1) % words.length), 200);
  };
  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => setIndex(p => (p - 1 + words.length) % words.length), 200);
  };
  const total = known.length + unknown.length;
  const progress = total > 0 ? (known.length / total) * 100 : 0;

  return (
    <div style={{ padding:"2rem 1.5rem", maxWidth:800, margin:"0 auto" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.5rem", flexWrap:"wrap", gap:"1rem" }}>
        <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"1.8rem", fontWeight:900 }}>🃏 Flashcards</h2>
        <div style={{ display:"flex", gap:"0.5rem" }}>
          {["meaning","example","family"].map(m => (
            <button key={m} onClick={() => { setMode(m); setFlipped(false); }} style={{
              padding:"0.35rem 0.8rem", borderRadius:"7px",
              border: mode === m ? "none" : "1px solid rgba(255,255,255,0.1)",
              background: mode === m ? "#a78bfa" : "rgba(255,255,255,0.04)",
              color: mode === m ? "#000" : "rgba(255,255,255,0.5)",
              fontSize:"0.75rem", fontWeight:700, cursor:"pointer",
              fontFamily:"'Outfit',sans-serif", textTransform:"capitalize"
            }}>{m}</button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom:"1.5rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.78rem", color:"rgba(255,255,255,0.4)", marginBottom:"0.4rem" }}>
          <span>Card {index + 1} / {words.length}</span>
          <span>✅ {known.length} known &nbsp; ❌ {unknown.length} unsure</span>
        </div>
        <div style={{ height:5, background:"rgba(255,255,255,0.08)", borderRadius:"999px", overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#a78bfa,#34d399)", borderRadius:"999px", transition:"width 0.4s" }} />
        </div>
      </div>

      {/* CARD */}
      <div onClick={() => setFlipped(p => !p)} style={{
        height:300, perspective:1000, cursor:"pointer", marginBottom:"1.5rem"
      }}>
        <div style={{
          position:"relative", width:"100%", height:"100%",
          transformStyle:"preserve-3d", transition:"transform 0.5s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}>
          {/* Front */}
          <div style={{
            position:"absolute", inset:0, backfaceVisibility:"hidden",
            background:"linear-gradient(135deg,rgba(167,139,250,0.1),rgba(52,211,153,0.06))",
            border:"1px solid rgba(167,139,250,0.25)", borderRadius:"20px",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem",
            textAlign:"center"
          }}>
            <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1rem" }}>
              <Badge color="#a78bfa">{w.pos}</Badge>
              <Badge color="#34d399">{w.level}</Badge>
            </div>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"3rem", fontWeight:900, letterSpacing:"-0.02em", color:"#e8eaf6", marginBottom:"0.5rem" }}>{w.word}</h2>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.9rem", color:"rgba(255,255,255,0.4)", marginBottom:"1rem" }}>{w.phonetic}</div>
            <div style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.3)" }}>Tap to reveal →</div>
          </div>
          {/* Back */}
          <div style={{
            position:"absolute", inset:0, backfaceVisibility:"hidden",
            transform:"rotateY(180deg)",
            background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:"20px", padding:"1.5rem",
            display:"flex", flexDirection:"column", justifyContent:"center"
          }}>
            {mode === "meaning" && (
              <>
                <div style={{ fontSize:"0.7rem", fontWeight:800, color:"#a78bfa", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.5rem" }}>Meaning</div>
                <p style={{ fontSize:"1.1rem", lineHeight:1.6, color:"#e8eaf6", marginBottom:"0.8rem" }}>{w.meaning}</p>
                <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.5)" }}>🇺🇿 {w.uzbek}</p>
                <div style={{ marginTop:"1rem", background:"rgba(251,191,36,0.08)", borderRadius:"8px", padding:"0.7rem" }}>
                  <p style={{ fontSize:"0.82rem", color:"rgba(232,234,246,0.7)", fontStyle:"italic" }}>"{w.example}"</p>
                </div>
              </>
            )}
            {mode === "example" && (
              <>
                <div style={{ fontSize:"0.7rem", fontWeight:800, color:"#fbbf24", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.8rem" }}>Use It In Context</div>
                <p style={{ fontSize:"1rem", lineHeight:1.7, color:"#e8eaf6", fontStyle:"italic", marginBottom:"1rem" }}>"{w.example}"</p>
                <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
                  {w.collocations.map(c => <span key={c} style={{ fontSize:"0.78rem", background:"rgba(251,191,36,0.1)", color:"#fbbf24", padding:"3px 8px", borderRadius:"5px" }}>{c}</span>)}
                </div>
              </>
            )}
            {mode === "family" && (
              <>
                <div style={{ fontSize:"0.7rem", fontWeight:800, color:"#34d399", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.8rem" }}>Word Family</div>
                {Object.entries(w.family).map(([k, v]) => (
                  <div key={k} style={{ display:"flex", gap:"0.8rem", marginBottom:"0.5rem", alignItems:"center" }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem", color:"#34d399", minWidth:60, textTransform:"uppercase" }}>{k}</span>
                    <span style={{ fontSize:"1rem", fontWeight:700, color:"#e8eaf6" }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop:"0.8rem", background:"rgba(244,114,182,0.08)", borderRadius:"8px", padding:"0.7rem" }}>
                  <p style={{ fontSize:"0.8rem", color:"rgba(232,234,246,0.6)" }}>🧠 {w.tip}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{ display:"flex", gap:"0.8rem", justifyContent:"center" }}>
        <button onClick={prevCard} style={{ padding:"0.7rem 1.5rem", borderRadius:"10px", border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.6)", fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>← Prev</button>
        {flipped && (
          <>
            <button onClick={handleUnknown} style={{ padding:"0.7rem 1.5rem", borderRadius:"10px", border:"none", background:"rgba(244,114,182,0.2)", color:"#f472b6", fontWeight:800, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>❌ Still Learning</button>
            <button onClick={handleKnow} style={{ padding:"0.7rem 1.5rem", borderRadius:"10px", border:"none", background:"rgba(52,211,153,0.2)", color:"#34d399", fontWeight:800, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>✅ I Know This!</button>
          </>
        )}
        <button onClick={nextCard} style={{ padding:"0.7rem 1.5rem", borderRadius:"10px", border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.6)", fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Next →</button>
      </div>
    </div>
  );
}

/* ============================================================
   TUTORS SECTION
   ============================================================ */
function TutorsSection() {
  const [activeTutor, setActiveTutor] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const tutorMessages = {
    emma: ["Great choice! Let's master academic vocabulary. Start with word families — learning one root unlocks many words!", "Remember: 'bene' in Latin means 'good'. So benevolent = good-wishing, beneficial = good-doing. Can you think of more?", "Excellent! Now let's practice: use 'eloquent' in a sentence about a leader you admire."],
    jake: ["Hey! Context is KEY. Don't memorize lists — read news, watch shows, notice words in real use.", "Try this: when you hear a new word, immediately use it in a text message to a friend. Real use = real learning!", "Awesome attitude! Here's my rule: see a word 7 times in different contexts before you 'own' it."],
    priya: ["Welcome! My SPIDER method will transform your learning. S=Synonyms, P=Phonetics, I=Image, D=Definition, E=Example, R=Related words.", "Business vocabulary tip: 'leverage', 'streamline', 'synergy' — these appear in every business context. Master them first!", "For IELTS, focus on the Academic Word List (AWL). These 570 word families appear in 10%+ of all academic texts!"],
    lars: ["Fascinating! Etymology is the superpower of vocabulary. Once you know 'tena' = hold, you understand: tenacious, tenant, tenement, detention!", "Greek roots to memorize: 'path' = feeling (empathy, sympathy, apathy), 'log' = word (dialogue, monologue, prologue)", "Latin 'uni' = one unlocks: uniform, unique, universe, unity, unicorn. One root = infinite words!"],
  };

  const handleSend = () => {
    if (!chatInput.trim() || !activeTutor) return;
    const msgs = tutorMessages[activeTutor.id];
    const response = msgs[chatMessages.filter(m=>m.role==="assistant").length % msgs.length];
    setChatMessages(p => [
      ...p,
      { role:"user", text:chatInput },
      { role:"assistant", text:response, tutor:activeTutor }
    ]);
    setChatInput("");
  };

  return (
    <div style={{ padding:"2rem 1.5rem", maxWidth:1100, margin:"0 auto" }}>
      <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"2rem", fontWeight:900, marginBottom:"0.5rem" }}>👩‍🏫 Vocabulary Tutors</h2>
      <p style={{ color:"rgba(255,255,255,0.4)", marginBottom:"2rem", fontSize:"0.9rem" }}>Choose your tutor style and get personalized vocabulary lessons</p>

      {/* TUTOR CARDS */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
        {TUTORS.map(t => (
          <div key={t.id} onClick={() => { setActiveTutor(t); setChatMessages([]); }} style={{
            background: activeTutor?.id === t.id ? `linear-gradient(135deg,${t.color}20,${t.color}08)` : "rgba(255,255,255,0.03)",
            border:`1.5px solid ${activeTutor?.id === t.id ? t.color+"60" : "rgba(255,255,255,0.07)"}`,
            borderRadius:"16px", padding:"1.5rem", cursor:"pointer", transition:"all 0.25s"
          }}
            onMouseEnter={e => { if(activeTutor?.id!==t.id){ e.currentTarget.style.borderColor=`${t.color}30`; e.currentTarget.style.transform="translateY(-2px)"; } }}
            onMouseLeave={e => { if(activeTutor?.id!==t.id){ e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="none"; } }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"0.8rem" }}>
              <div style={{ width:48, height:48, borderRadius:"50%", background:`${t.color}25`, border:`2px solid ${t.color}50`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", fontWeight:800, color:t.color, fontFamily:"'Fraunces',serif" }}>{t.avatar}</div>
              <div>
                <div style={{ fontWeight:800, fontSize:"0.95rem" }}>{t.name}</div>
                <div style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.4)" }}>{t.flag} {t.accent}</div>
              </div>
            </div>
            <Badge color={t.color}>{t.level}</Badge>
            <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.5)", marginTop:"0.7rem", lineHeight:1.5 }}>{t.specialty}</p>
            <div style={{ marginTop:"0.7rem", background:`${t.color}12`, borderRadius:"8px", padding:"0.5rem 0.7rem", fontSize:"0.75rem", color:t.color, fontWeight:700 }}>
              📌 {t.lessonType}
            </div>
          </div>
        ))}
      </div>

      {/* CHAT with selected tutor */}
      {activeTutor && (
        <div style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${activeTutor.color}30`, borderRadius:"20px", overflow:"hidden" }}>
          {/* Chat header */}
          <div style={{ padding:"1rem 1.5rem", borderBottom:`1px solid ${activeTutor.color}20`, display:"flex", alignItems:"center", gap:"1rem", background:`${activeTutor.color}08` }}>
            <div style={{ width:40, height:40, borderRadius:"50%", background:`${activeTutor.color}25`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", fontWeight:800, color:activeTutor.color, fontFamily:"'Fraunces',serif" }}>{activeTutor.avatar}</div>
            <div>
              <div style={{ fontWeight:800 }}>{activeTutor.name}</div>
              <div style={{ fontSize:"0.75rem", color:`${activeTutor.color}90` }}>● Online now — {activeTutor.lessonType}</div>
            </div>
          </div>

          {/* Tip bubble */}
          <div style={{ padding:"1rem 1.5rem" }}>
            <div style={{ background:`${activeTutor.color}12`, border:`1px solid ${activeTutor.color}25`, borderRadius:"12px", padding:"1rem", marginBottom:"1rem" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:800, color:activeTutor.color, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.4rem" }}>💡 Today's Tip</div>
              <p style={{ fontSize:"0.88rem", color:"rgba(232,234,246,0.8)", lineHeight:1.6 }}>{activeTutor.tip}</p>
            </div>

            {/* Messages */}
            <div style={{ minHeight:150, maxHeight:300, overflowY:"auto", marginBottom:"1rem", display:"flex", flexDirection:"column", gap:"0.8rem" }}>
              {chatMessages.length === 0 && (
                <div style={{ textAlign:"center", padding:"2rem", color:"rgba(255,255,255,0.3)", fontSize:"0.85rem" }}>
                  Ask {activeTutor.name} about vocabulary, learning tips, or any English question!
                </div>
              )}
              {chatMessages.map((m, i) => (
                <div key={i} style={{ display:"flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth:"75%", padding:"0.7rem 1rem", borderRadius:"12px",
                    background: m.role === "user" ? "#a78bfa30" : `${activeTutor.color}15`,
                    border: m.role === "user" ? "1px solid #a78bfa40" : `1px solid ${activeTutor.color}25`,
                    fontSize:"0.88rem", lineHeight:1.6,
                    color: m.role === "user" ? "rgba(232,234,246,0.9)" : "rgba(232,234,246,0.85)"
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ display:"flex", gap:"0.6rem" }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder={`Ask ${activeTutor.name.split(" ")[0]} a question...`}
                style={{
                  flex:1, padding:"0.75rem 1rem",
                  background:"rgba(255,255,255,0.05)", border:`1.5px solid ${activeTutor.color}30`,
                  borderRadius:"10px", color:"#e8eaf6", fontSize:"0.88rem",
                  fontFamily:"'Outfit',sans-serif", outline:"none"
                }}
              />
              <button onClick={handleSend} style={{
                padding:"0.75rem 1.5rem", borderRadius:"10px", border:"none",
                background:activeTutor.color, color:"#000", fontWeight:800, cursor:"pointer",
                fontFamily:"'Outfit',sans-serif", fontSize:"0.88rem"
              }}>Send →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   QUIZ SECTION
   ============================================================ */
function QuizSection({ setTotalScore }) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [finished, setFinished] = useState(false);
  const [wrongOnes, setWrongOnes] = useState([]);

  const q = QUIZ_QUESTIONS[qIdx];

  const handleAnswer = (i) => {
    if (answered !== null) return;
    setAnswered(i);
    if (i === q.ans) {
      setScore(p => p + 10);
      setTotalScore(p => p + 10);
    } else {
      setWrongOnes(p => [...p, qIdx]);
    }
  };

  const next = () => {
    if (qIdx + 1 >= QUIZ_QUESTIONS.length) setFinished(true);
    else { setQIdx(p => p + 1); setAnswered(null); }
  };

  const restart = () => { setQIdx(0); setScore(0); setAnswered(null); setFinished(false); setWrongOnes([]); };

  const pct = Math.round((qIdx / QUIZ_QUESTIONS.length) * 100);

  if (finished) {
    const finalPct = Math.round((score / (QUIZ_QUESTIONS.length * 10)) * 100);
    return (
      <div style={{ padding:"3rem 1.5rem", maxWidth:600, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:"4rem", marginBottom:"1rem" }}>
          {finalPct >= 80 ? "🏆" : finalPct >= 60 ? "⭐" : "📚"}
        </div>
        <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"2.5rem", fontWeight:900, marginBottom:"0.5rem" }}>
          {finalPct >= 80 ? "Excellent!" : finalPct >= 60 ? "Good Job!" : "Keep Practicing!"}
        </h2>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"3rem", fontWeight:700, color:"#a78bfa", margin:"1rem 0" }}>
          {score} / {QUIZ_QUESTIONS.length * 10}
        </div>
        <p style={{ color:"rgba(255,255,255,0.5)", marginBottom:"2rem" }}>{finalPct}% correct — {wrongOnes.length} questions to review</p>
        <button onClick={restart} style={{ padding:"0.85rem 2.5rem", borderRadius:"12px", border:"none", background:"linear-gradient(135deg,#a78bfa,#7c3aed)", color:"#fff", fontWeight:800, fontSize:"1rem", cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
          🔄 Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding:"2rem 1.5rem", maxWidth:700, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem", flexWrap:"wrap", gap:"0.5rem" }}>
        <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"1.8rem", fontWeight:900 }}>🧠 Vocabulary Quiz</h2>
        <div style={{ display:"flex", gap:"0.8rem", alignItems:"center" }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.85rem", color:"#34d399" }}>✅ {score} pts</span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.85rem", color:"rgba(255,255,255,0.4)" }}>{qIdx + 1}/{QUIZ_QUESTIONS.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ height:5, background:"rgba(255,255,255,0.08)", borderRadius:"999px", overflow:"hidden", marginBottom:"2rem" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#a78bfa,#34d399)", transition:"width 0.4s", borderRadius:"999px" }} />
      </div>

      {/* Question */}
      <div style={{ background:"rgba(167,139,250,0.06)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:"16px", padding:"1.5rem 2rem", marginBottom:"1.5rem" }}>
        <div style={{ fontSize:"0.7rem", fontWeight:800, color:"#a78bfa", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.7rem" }}>Question {qIdx + 1}</div>
        <p style={{ fontSize:"1.1rem", lineHeight:1.6, color:"#e8eaf6" }}>{q.q}</p>
      </div>

      {/* Options */}
      <div style={{ display:"flex", flexDirection:"column", gap:"0.7rem", marginBottom:"1.5rem" }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.04)";
          let border = "1px solid rgba(255,255,255,0.1)";
          let color = "rgba(232,234,246,0.85)";
          if (answered !== null) {
            if (i === q.ans) { bg = "rgba(52,211,153,0.15)"; border = "1.5px solid #34d399"; color = "#34d399"; }
            else if (i === answered && i !== q.ans) { bg = "rgba(244,114,182,0.12)"; border = "1.5px solid #f472b6"; color = "#f472b6"; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} disabled={answered !== null} style={{
              padding:"1rem 1.2rem", borderRadius:"12px", border, background: bg,
              color, fontFamily:"'Outfit',sans-serif", fontSize:"0.95rem", fontWeight:600,
              textAlign:"left", cursor: answered !== null ? "default" : "pointer",
              transition:"all 0.2s"
            }}
              onMouseEnter={e => { if(answered === null) { e.currentTarget.style.borderColor="rgba(167,139,250,0.4)"; e.currentTarget.style.background="rgba(167,139,250,0.08)"; } }}
              onMouseLeave={e => { if(answered === null) { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; } }}
            >
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.75rem", color:"rgba(255,255,255,0.3)", marginRight:"0.8rem" }}>{String.fromCharCode(65+i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered !== null && (
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.8rem" }}>
          <div style={{ fontSize:"0.9rem", fontWeight:700, color: answered === q.ans ? "#34d399" : "#f472b6" }}>
            {answered === q.ans ? "✅ Correct! +10 points" : `❌ Wrong — correct: "${q.opts[q.ans]}"`}
          </div>
          <button onClick={next} style={{
            padding:"0.6rem 1.8rem", borderRadius:"10px", border:"none",
            background:"#a78bfa", color:"#000", fontWeight:800, fontSize:"0.9rem",
            cursor:"pointer", fontFamily:"'Outfit',sans-serif"
          }}>
            {qIdx + 1 < QUIZ_QUESTIONS.length ? "Next →" : "Finish 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   GAMES SECTION
   ============================================================ */
function GamesSection({ setTotalScore }) {
  const [game, setGame] = useState("scramble");

  return (
    <div style={{ padding:"2rem 1.5rem", maxWidth:1000, margin:"0 auto" }}>
      <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"2rem", fontWeight:900, marginBottom:"0.5rem" }}>🎮 Word Games</h2>
      <p style={{ color:"rgba(255,255,255,0.4)", marginBottom:"1.5rem", fontSize:"0.9rem" }}>Learn vocabulary through play!</p>

      <TabBar tabs={["scramble","hangman","match","chain"]} active={game} onChange={setGame} accent="#f472b6" />

      {game === "scramble" && <ScrambleGame setTotalScore={setTotalScore} />}
      {game === "hangman" && <HangmanGame setTotalScore={setTotalScore} />}
      {game === "match" && <MatchGame setTotalScore={setTotalScore} />}
      {game === "chain" && <ChainGame setTotalScore={setTotalScore} />}
    </div>
  );
}

function ScrambleGame({ setTotalScore }) {
  const words = WORDS.map(w => ({ word:w.word, hint:w.meaning.slice(0,50)+"..." }));
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  const scramble = (w) => w.split("").sort(() => Math.random()-0.5).join("");
  const [scrambled, setScrambled] = useState(() => scramble(words[0].word));

  const check = () => {
    if (input.toUpperCase() === words[idx % words.length].word) {
      setFeedback("correct");
      setScore(p => p + 5);
      setTotalScore(p => p + 5);
      setTimeout(next, 1000);
    } else {
      setFeedback("wrong");
    }
  };

  const next = () => {
    const ni = (idx + 1) % words.length;
    setIdx(ni);
    setScrambled(scramble(words[ni].word));
    setInput("");
    setFeedback(null);
  };

  return (
    <div style={{ background:"rgba(244,114,182,0.04)", border:"1px solid rgba(244,114,182,0.15)", borderRadius:"20px", padding:"2rem", textAlign:"center", maxWidth:500, margin:"0 auto" }}>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.8rem", color:"rgba(255,255,255,0.4)", marginBottom:"0.5rem" }}>Score: {score}</div>
      <div style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.4)", marginBottom:"1.5rem" }}>Hint: {words[idx % words.length].hint}</div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"3rem", fontWeight:700, color:"#f472b6", letterSpacing:"0.2em", marginBottom:"1.5rem" }}>{scrambled}</div>
      <input value={input} onChange={e => setInput(e.target.value.toUpperCase())} onKeyDown={e => e.key === "Enter" && check()}
        placeholder="Type the correct word..."
        style={{ width:"100%", padding:"0.8rem", background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(244,114,182,0.3)", borderRadius:"10px", color:"#e8eaf6", fontFamily:"'JetBrains Mono',monospace", fontSize:"1rem", textAlign:"center", outline:"none", marginBottom:"1rem" }}
      />
      <div style={{ display:"flex", gap:"0.8rem", justifyContent:"center" }}>
        <button onClick={check} style={{ padding:"0.65rem 2rem", borderRadius:"10px", border:"none", background:"#f472b6", color:"#000", fontWeight:800, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Check ✓</button>
        <button onClick={next} style={{ padding:"0.65rem 1.5rem", borderRadius:"10px", border:"1px solid rgba(255,255,255,0.15)", background:"transparent", color:"rgba(255,255,255,0.5)", fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Skip →</button>
      </div>
      {feedback && (
        <div style={{ marginTop:"1rem", fontWeight:700, color: feedback === "correct" ? "#34d399" : "#f472b6" }}>
          {feedback === "correct" ? "🎉 Correct! +5 pts" : `❌ Try again! (${words[idx % words.length].word})`}
        </div>
      )}
    </div>
  );
}

function HangmanGame({ setTotalScore }) {
  const wordList = WORDS.map(w => ({ word:w.word, hint:w.meaning }));
  const [idx, setIdx] = useState(0);
  const [guessed, setGuessed] = useState([]);
  const [wrong, setWrong] = useState(0);

  const w = wordList[idx % wordList.length];
  const maxWrong = 6;
  const arts = ["😊","😟","😰","😱","💀","☠️","👻"];

  const guess = (l) => {
    if (guessed.includes(l)) return;
    const ng = [...guessed, l];
    setGuessed(ng);
    if (!w.word.includes(l)) setWrong(p => p + 1);
    else if (w.word.split("").every(c => ng.includes(c))) {
      setTotalScore(p => p + 15);
      setTimeout(() => { setIdx(p => p + 1); setGuessed([]); setWrong(0); }, 1500);
    }
  };

  const won = w.word.split("").every(c => guessed.includes(c));
  const lost = wrong >= maxWrong;

  return (
    <div style={{ maxWidth:500, margin:"0 auto", textAlign:"center" }}>
      <div style={{ fontSize:"4rem", marginBottom:"0.5rem" }}>{arts[Math.min(wrong, arts.length-1)]}</div>
      <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"10px", padding:"0.7rem 1rem", marginBottom:"0.5rem", fontSize:"0.82rem", color:"rgba(255,255,255,0.5)" }}>💡 {w.hint.slice(0,60)}...</div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"2.5rem", fontWeight:700, letterSpacing:"0.3em", color: won ? "#34d399" : "#e8eaf6", margin:"1.2rem 0" }}>
        {w.word.split("").map((c, i) => <span key={i} style={{ borderBottom:"2px solid rgba(255,255,255,0.3)", padding:"0 4px" }}>{guessed.includes(c) ? c : " "}</span>)}
      </div>
      <div style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.4)", marginBottom:"1rem" }}>Wrong: {wrong}/{maxWrong}</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.3rem", justifyContent:"center" }}>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => (
          <button key={l} onClick={() => guess(l)} disabled={guessed.includes(l) || won || lost} style={{
            width:36, height:36, borderRadius:7, border:"1px solid rgba(255,255,255,0.12)",
            background: guessed.includes(l) ? (w.word.includes(l) ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.05)") : "rgba(255,255,255,0.06)",
            color: guessed.includes(l) ? (w.word.includes(l) ? "#34d399" : "rgba(255,255,255,0.2)") : "#e8eaf6",
            fontFamily:"'JetBrains Mono',monospace", fontWeight:700, fontSize:"0.78rem", cursor: guessed.includes(l) ? "default" : "pointer"
          }}>{l}</button>
        ))}
      </div>
      {(won || lost) && (
        <div style={{ marginTop:"1rem" }}>
          <div style={{ fontWeight:800, fontSize:"1.1rem", color: won ? "#34d399" : "#f472b6" }}>
            {won ? "🎉 Correct! +15 pts" : `💀 Word was: ${w.word}`}
          </div>
        </div>
      )}
    </div>
  );
}

function MatchGame({ setTotalScore }) {
  const pairs = WORDS.slice(0,6).map(w => ({ id:w.id, word:w.word, match:w.meaning.slice(0,40)+"..." }));
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState([]);
  const [shaking, setShaking] = useState(null);

  const allItems = [
    ...pairs.map(p => ({ key:`w-${p.id}`, text:p.word, type:"word", id:p.id })),
    ...pairs.map(p => ({ key:`m-${p.id}`, text:p.match, type:"meaning", id:p.id }))
  ].sort(() => Math.random()-0.5);

  const [items] = useState(allItems);

  const handleClick = (item) => {
    if (matched.includes(item.id)) return;
    if (!selected) { setSelected(item); return; }
    if (selected.key === item.key) { setSelected(null); return; }
    if (selected.id === item.id && selected.type !== item.type) {
      setMatched(p => [...p, item.id]);
      setTotalScore(p => p + 8);
      setSelected(null);
    } else {
      setShaking(item.key);
      setTimeout(() => { setShaking(null); setSelected(null); }, 500);
    }
  };

  return (
    <div>
      <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.4)", marginBottom:"1rem" }}>Match each word with its meaning! Score: {matched.length * 8} pts</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
        {items.map(item => (
          <button key={item.key} onClick={() => handleClick(item)} style={{
            padding:"0.8rem 1rem", borderRadius:"10px", textAlign:"left",
            border:`1.5px solid ${matched.includes(item.id) ? "#34d399" : selected?.key === item.key ? "#fbbf24" : "rgba(255,255,255,0.1)"}`,
            background: matched.includes(item.id) ? "rgba(52,211,153,0.1)" : selected?.key === item.key ? "rgba(251,191,36,0.1)" : "rgba(255,255,255,0.04)",
            color: matched.includes(item.id) ? "#34d399" : selected?.key === item.key ? "#fbbf24" : "rgba(232,234,246,0.8)",
            fontFamily:"'Outfit',sans-serif", fontSize:"0.82rem", fontWeight:600,
            cursor: matched.includes(item.id) ? "default" : "pointer",
            transition:"all 0.2s",
            transform: shaking === item.key ? "translateX(-4px)" : "none"
          }}>
            {item.text}
          </button>
        ))}
      </div>
      {matched.length === pairs.length && (
        <div style={{ marginTop:"1.5rem", textAlign:"center", fontSize:"1.2rem", fontWeight:800, color:"#34d399" }}>
          🎊 All matched! Perfect score!
        </div>
      )}
    </div>
  );
}

function ChainGame({ setTotalScore }) {
  const [chain, setChain] = useState([]);
  const [input, setInput] = useState("");
  const [fb, setFb] = useState("");
  const [score, setScore] = useState(0);

  const lastLetter = chain.length > 0 ? chain[chain.length-1].slice(-1).toLowerCase() : "";

  const add = () => {
    const w = input.trim().toLowerCase();
    if (!w) return;
    if (chain.length > 0 && w[0] !== lastLetter) {
      setFb(`❌ Must start with "${lastLetter.toUpperCase()}"`);
      return;
    }
    if (chain.includes(w)) { setFb("❌ Word already used!"); return; }
    if (w.length < 3) { setFb("❌ Minimum 3 letters!"); return; }
    setChain(p => [...p, w]);
    setScore(p => p + 3);
    setTotalScore(p => p + 3);
    setInput("");
    setFb(`✅ Next word must start with "${w.slice(-1).toUpperCase()}"`);
  };

  return (
    <div style={{ maxWidth:600, margin:"0 auto" }}>
      <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.4)", marginBottom:"1rem" }}>Type a word → next word starts with last letter. Score: {score} pts</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem", minHeight:50, marginBottom:"1rem", padding:"0.8rem", background:"rgba(255,255,255,0.03)", borderRadius:"10px", border:"1px solid rgba(255,255,255,0.07)" }}>
        {chain.length === 0 && <span style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.85rem" }}>Start typing to build the chain...</span>}
        {chain.map((w, i) => (
          <span key={i} style={{ padding:"0.3rem 0.8rem", borderRadius:"6px", background: i === chain.length-1 ? "#a78bfa30" : "rgba(255,255,255,0.07)", color: i === chain.length-1 ? "#a78bfa" : "rgba(255,255,255,0.6)", fontSize:"0.85rem", fontWeight:700 }}>
            {w}{i < chain.length-1 && <span style={{ color:"rgba(255,255,255,0.2)", margin:"0 4px" }}>→</span>}
          </span>
        ))}
      </div>
      {lastLetter && (
        <div style={{ fontSize:"0.82rem", color:"#fbbf24", marginBottom:"0.5rem", fontWeight:700 }}>
          Next word must start with: <span style={{ fontSize:"1.2rem", fontFamily:"'JetBrains Mono',monospace" }}>{lastLetter.toUpperCase()}</span>
        </div>
      )}
      <div style={{ display:"flex", gap:"0.6rem" }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && add()}
          placeholder="Type a word..."
          style={{ flex:1, padding:"0.75rem", background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(167,139,250,0.3)", borderRadius:"10px", color:"#e8eaf6", fontFamily:"'Outfit',sans-serif", fontSize:"0.95rem", outline:"none" }}
        />
        <button onClick={add} style={{ padding:"0.75rem 1.5rem", borderRadius:"10px", border:"none", background:"#a78bfa", color:"#000", fontWeight:800, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>Add</button>
      </div>
      {fb && <div style={{ marginTop:"0.5rem", fontSize:"0.85rem", fontWeight:700, color: fb.startsWith("✅") ? "#34d399" : "#f472b6" }}>{fb}</div>}
    </div>
  );
}

/* ============================================================
   IDIOMS SECTION
   ============================================================ */
function IdiomsSection() {
  const [revealed, setRevealed] = useState({});
  return (
    <div style={{ padding:"2rem 1.5rem", maxWidth:1000, margin:"0 auto" }}>
      <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"2rem", fontWeight:900, marginBottom:"0.5rem" }}>💬 English Idioms</h2>
      <p style={{ color:"rgba(255,255,255,0.4)", marginBottom:"2rem", fontSize:"0.9rem" }}>Click to reveal meaning and example</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"1rem" }}>
        {IDIOMS.map((idiom, i) => (
          <div key={i} onClick={() => setRevealed(p => ({ ...p, [i]:!p[i] }))} style={{
            background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"16px", padding:"1.5rem", cursor:"pointer", transition:"all 0.25s"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(251,191,36,0.3)"; e.currentTarget.style.background="rgba(251,191,36,0.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}
          >
            <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:"1.2rem", fontWeight:700, color:"#fbbf24", marginBottom:"0.5rem" }}>
              "{idiom.phrase}"
            </h3>
            {!revealed[i] ? (
              <p style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.3)" }}>Click to reveal →</p>
            ) : (
              <div style={{ animation:"fadeUp 0.3s ease" }}>
                <p style={{ fontSize:"0.88rem", color:"rgba(232,234,246,0.8)", marginBottom:"0.6rem", lineHeight:1.6 }}>{idiom.meaning}</p>
                <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.5)", fontStyle:"italic", marginBottom:"0.5rem" }}>"{idiom.example}"</p>
                <div style={{ background:"rgba(52,211,153,0.08)", borderRadius:"6px", padding:"0.4rem 0.7rem" }}>
                  <span style={{ fontSize:"0.75rem", color:"#34d399" }}>🇺🇿 {idiom.uzbek}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   COLLOCATIONS SECTION
   ============================================================ */
function CollocationsSection() {
  const [active, setActive] = useState("make");

  const current = COLLOCATIONS_DATA.find(c => c.verb === active);

  return (
    <div style={{ padding:"2rem 1.5rem", maxWidth:900, margin:"0 auto" }}>
      <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"2rem", fontWeight:900, marginBottom:"0.5rem" }}>🔗 Collocations</h2>
      <p style={{ color:"rgba(255,255,255,0.4)", marginBottom:"2rem", fontSize:"0.9rem" }}>
        The most common verb + noun combinations in English
      </p>

      <div style={{ display:"flex", gap:"0.5rem", marginBottom:"2rem" }}>
        {COLLOCATIONS_DATA.map(c => (
          <button key={c.verb} onClick={() => setActive(c.verb)} style={{
            padding:"0.5rem 1.5rem", borderRadius:"10px", border: active === c.verb ? "none" : "1px solid rgba(255,255,255,0.12)",
            background: active === c.verb ? current?.color || "#a78bfa" : "rgba(255,255,255,0.05)",
            color: active === c.verb ? "#000" : "rgba(255,255,255,0.5)",
            fontFamily:"'Fraunces',serif", fontWeight:800, fontSize:"1rem", cursor:"pointer"
          }}>{c.verb}</button>
        ))}
      </div>

      {current && (
        <div>
          <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:"2rem", fontWeight:900, color:current.color, marginBottom:"1.5rem" }}>
            "{current.verb} + ..."
          </h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"0.8rem" }}>
            {current.nouns.map((noun, i) => (
              <div key={i} style={{
                background:`${current.color}10`, border:`1px solid ${current.color}25`,
                borderRadius:"12px", padding:"1rem 1.2rem"
              }}>
                <span style={{ fontFamily:"'Fraunces',serif", fontWeight:700, color:current.color, fontSize:"1.1rem" }}>{current.verb} </span>
                <span style={{ fontWeight:700, fontSize:"1.1rem" }}>{noun}</span>
                <div style={{ marginTop:"0.4rem", fontSize:"0.75rem", color:"rgba(255,255,255,0.35)" }}>
                  e.g. "We need to {current.verb} {noun}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   MEMORY TIPS SECTION
   ============================================================ */
function MemorySection() {
  return (
    <div style={{ padding:"2rem 1.5rem", maxWidth:1000, margin:"0 auto" }}>
      <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"2rem", fontWeight:900, marginBottom:"0.5rem" }}>✨ Memory Techniques</h2>
      <p style={{ color:"rgba(255,255,255,0.4)", marginBottom:"2rem", fontSize:"0.9rem" }}>
        Proven science-backed methods to memorize vocabulary 10x faster
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1.2rem", marginBottom:"3rem" }}>
        {MEMORY_TIPS.map((tip, i) => (
          <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${tip.color}25`, borderRadius:"16px", padding:"1.5rem", transition:"all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=`${tip.color}50`; e.currentTarget.style.transform="translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=`${tip.color}25`; e.currentTarget.style.transform="none"; }}
          >
            <div style={{ fontSize:"2rem", marginBottom:"0.8rem" }}>{tip.icon}</div>
            <h3 style={{ fontWeight:800, fontSize:"1rem", color:tip.color, marginBottom:"0.5rem" }}>{tip.title}</h3>
            <p style={{ fontSize:"0.85rem", color:"rgba(232,234,246,0.65)", lineHeight:1.7 }}>{tip.desc}</p>
          </div>
        ))}
      </div>

      {/* STUDY SCHEDULE */}
      <div style={{ background:"rgba(167,139,250,0.06)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:"20px", padding:"2rem" }}>
        <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:"1.5rem", fontWeight:700, marginBottom:"1.5rem" }}>
          📅 Optimal Study Schedule
        </h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:"0.8rem" }}>
          {[
            { day:"Day 1", action:"Learn 10 new words", color:"#34d399" },
            { day:"Day 2", action:"Review Day 1 words", color:"#38bdf8" },
            { day:"Day 4", action:"Review again", color:"#fbbf24" },
            { day:"Day 7", action:"Weekly review", color:"#a78bfa" },
            { day:"Day 14", action:"Bi-weekly check", color:"#f472b6" },
            { day:"Day 30", action:"Monthly review", color:"#fb923c" },
          ].map((s, i) => (
            <div key={i} style={{ background:`${s.color}10`, border:`1px solid ${s.color}25`, borderRadius:"12px", padding:"1rem", textAlign:"center" }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.8rem", color:s.color, fontWeight:700, marginBottom:"0.4rem" }}>{s.day}</div>
              <div style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.6)" }}>{s.action}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PROGRESS SECTION
   ============================================================ */
function ProgressSection({ totalScore, wordsLearned, savedWords }) {
  const level = totalScore < 50 ? "Beginner" : totalScore < 150 ? "Elementary" : totalScore < 300 ? "Intermediate" : totalScore < 500 ? "Advanced" : "Master";
  const nextLevelScore = totalScore < 50 ? 50 : totalScore < 150 ? 150 : totalScore < 300 ? 300 : totalScore < 500 ? 500 : 999;
  const progress = (totalScore / nextLevelScore) * 100;

  const achievements = [
    { icon:"🎯", title:"First Steps", desc:"Complete your first flashcard", unlocked:wordsLearned > 0 },
    { icon:"📚", title:"Word Collector", desc:"Learn 5 words", unlocked:wordsLearned >= 5 },
    { icon:"⭐", title:"Point Scorer", desc:"Earn 50 points", unlocked:totalScore >= 50 },
    { icon:"🔖", title:"Bookworm", desc:"Save 3 words", unlocked:savedWords.length >= 3 },
    { icon:"🏆", title:"Quiz Champion", desc:"Earn 100 points", unlocked:totalScore >= 100 },
    { icon:"🚀", title:"Vocabulary Master", desc:"Earn 300 points", unlocked:totalScore >= 300 },
  ];

  return (
    <div style={{ padding:"2rem 1.5rem", maxWidth:900, margin:"0 auto" }}>
      <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:"2rem", fontWeight:900, marginBottom:"2rem" }}>📊 Your Progress</h2>

      {/* Level Card */}
      <div style={{ background:"linear-gradient(135deg,rgba(167,139,250,0.12),rgba(52,211,153,0.08))", border:"1px solid rgba(167,139,250,0.25)", borderRadius:"20px", padding:"2rem", marginBottom:"2rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <div style={{ fontSize:"0.7rem", fontWeight:800, color:"#a78bfa", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.3rem" }}>Current Level</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:"2rem", fontWeight:900 }}>{level}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"2rem", fontWeight:700, color:"#fbbf24" }}>{totalScore}</div>
            <div style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.4)" }}>Total Score</div>
          </div>
        </div>
        <div style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.4)", marginBottom:"0.5rem" }}>
          Progress to next level: {totalScore} / {nextLevelScore}
        </div>
        <div style={{ height:8, background:"rgba(255,255,255,0.08)", borderRadius:"999px", overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${Math.min(progress, 100)}%`, background:"linear-gradient(90deg,#a78bfa,#34d399)", transition:"width 0.6s" }} />
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
        {[
          { label:"Words Learned", value:wordsLearned, icon:"🧠", color:"#34d399" },
          { label:"Total Score", value:totalScore, icon:"⭐", color:"#fbbf24" },
          { label:"Words Saved", value:savedWords.length, icon:"🔖", color:"#f472b6" },
          { label:"Current Level", value:level, icon:"🏅", color:"#a78bfa" },
        ].map(s => (
          <div key={s.label} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"14px", padding:"1.2rem", textAlign:"center" }}>
            <div style={{ fontSize:"1.5rem", marginBottom:"0.5rem" }}>{s.icon}</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"1.6rem", fontWeight:700, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.35)", marginTop:"0.3rem", textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:"1.4rem", fontWeight:700, marginBottom:"1rem" }}>🏆 Achievements</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:"0.8rem" }}>
        {achievements.map((a, i) => (
          <div key={i} style={{
            background: a.unlocked ? "rgba(251,191,36,0.06)" : "rgba(255,255,255,0.02)",
            border:`1px solid ${a.unlocked ? "rgba(251,191,36,0.3)" : "rgba(255,255,255,0.06)"}`,
            borderRadius:"12px", padding:"1rem", display:"flex", gap:"0.8rem", alignItems:"center",
            opacity: a.unlocked ? 1 : 0.5
          }}>
            <div style={{ fontSize:"1.5rem", filter: a.unlocked ? "none" : "grayscale(1)" }}>{a.icon}</div>
            <div>
              <div style={{ fontWeight:700, fontSize:"0.88rem", color: a.unlocked ? "#fbbf24" : "rgba(255,255,255,0.5)" }}>{a.title}</div>
              <div style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.4)" }}>{a.desc}</div>
            </div>
            {a.unlocked && <div style={{ marginLeft:"auto", color:"#34d399", fontSize:"0.9rem" }}>✓</div>}
          </div>
        ))}
      </div>
    </div>
  );
}