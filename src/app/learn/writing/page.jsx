'use client';
import React, { useState, useEffect, useCallback } from 'react';
import './WritingAcademy.css';
import Header from '../header';
const WritingAcademy = () => {
  // ==================== DATA ====================
  const exercises = {
    A1: [
      { tag: 'grammar', tagClass: 'tag-grammar', title: 'Oddiy tavsif', desc: 'O\'zingizni yoki sevimli buyumingizni oddiy gaplar bilan tasvirlab yozing.', prompt: 'Write 5 sentences about your room. Use: "There is...", "I have...", "My room is..."', time: '10 min', words: '40–60', tips: [{ icon: '📌', t: 'Simple sentences', d: 'Subject + Verb + Object strukturasini ishlatib ko\'ring.' }, { icon: '🎨', t: 'Adjectives', d: 'big, small, red, old, new — ranglar va o\'lchamlar qo\'shing.' }, { icon: '✅', t: 'Check', d: 'Har bir gapda fe\'l borligiga ishonch hosil qiling.' }], sample: 'My room is small but cozy. There is a blue bed near the window. I have a wooden desk for studying.' },
      { tag: 'vocab', tagClass: 'tag-vocab', title: 'Rasm tavsifi', desc: 'Berilgan so\'zlar yordamida rasmni tasvirlab bering.', prompt: 'Describe your family. Who are they? What do they look like? What do they do?', time: '15 min', words: '50–80', tips: [{ icon: '👨‍👩‍👧', t: 'Family words', d: 'mother, father, sister, brother, grandmother kabi so\'zlarni ishlating.' }, { icon: '📏', t: 'Physical desc', d: 'tall, short, young, old, has brown hair — qiyofa tasvirla.' }, { icon: '❤️', t: 'Feelings', d: 'I love my family. She is kind. He is funny.' }], sample: 'My family has four members. My mother is tall with long hair. She works as a teacher. My father is funny and kind.' },
      { tag: 'structure', tagClass: 'tag-structure', title: 'Kun tartibi', desc: 'Bir kunlik kun tartibingizni sodda gaplarda yozing.', prompt: 'Write about your daily routine. Use time words: first, then, after that, finally.', time: '12 min', words: '60–80', tips: [{ icon: '⏰', t: 'Time words', d: '"First I wake up. Then I eat breakfast." — ketma-ketlik bildiruvchi so\'zlar ishlatib ko\'ring.' }, { icon: '🔢', t: 'Present Simple', d: 'Men har kuni nima qilishimni aytish uchun Present Simple ishlataman.' }, { icon: '📍', t: 'Specific times', d: 'At 7am, at noon, in the evening — aniq vaqt qo\'shing.' }], sample: 'First, I wake up at 7am. Then I brush my teeth and have breakfast. After that, I go to school.' },
    ],
    A2: [
      { tag: 'grammar', tagClass: 'tag-grammar', title: 'Qisqa xat yozish', desc: 'Do\'stingizga kanikul haqida qisqa xat yozing.', prompt: 'Write an informal letter to a friend about your holiday. Describe where you went, what you did, and how you felt.', time: '20 min', words: '80–100', tips: [{ icon: '📬', t: 'Opening/closing', d: '"Dear Tom, ... Best wishes, [Your name]" — rasmiy bo\'lmagan xat formatini ishlating.' }, { icon: '⏰', t: 'Past tense', d: 'went, saw, ate, felt — o\'tgan zamon fe\'llarini to\'g\'ri ishlating.' }, { icon: '🎭', t: 'Feelings', d: 'It was amazing! I really enjoyed... — his-tuyg\'ular qo\'shing.' }], sample: 'Dear Sara, I just got back from the seaside! I went there with my family last week. The weather was sunny and warm.' },
      { tag: 'vocab', tagClass: 'tag-vocab', title: 'Taqqoslash', desc: 'Ikkita shahar yoki mamlakatni taqqoslab yozing.', prompt: 'Compare two cities or countries you know. Use comparative adjectives: bigger, more interesting, less expensive, better than.', time: '20 min', words: '90–120', tips: [{ icon: '⚖️', t: 'Comparatives', d: 'bigger than, more beautiful than, less crowded than — qiyoslash strukturalari.' }, { icon: '🗺️', t: 'Categories', d: 'food, weather, people, transport — turli jihatlarni taqqosla.' }, { icon: '💡', t: 'Opinion', d: '"In my opinion, Istanbul is more exciting than..."' }], sample: 'London is bigger than Barcelona, but it is more expensive. Barcelona has warmer weather and better food, in my opinion.' },
      { tag: 'structure', tagClass: 'tag-structure', title: 'Hikoya tugatiish', desc: 'Berilgan boshlanishni davom ettiring.', prompt: 'Continue this story: "Last Saturday morning, I found something strange on my doorstep..."', time: '25 min', words: '100–130', tips: [{ icon: '📖', t: 'Narrative tenses', d: 'Past Simple + Past Continuous — "I was walking when I saw..."' }, { icon: '🎬', t: 'Plot', d: 'Problem → Action → Resolution — shu uch qismni o\'ylab yozing.' }, { icon: '🗨️', t: 'Dialogue', d: 'Gaplashuv qo\'shish voqeani jonlilashtiradi.' }], sample: 'Last Saturday morning, I found something strange on my doorstep. It was a small wooden box with no name on it. I picked it up carefully...' },
      { tag: 'style', tagClass: 'tag-style', title: 'Blog post', desc: 'Sevimli faoliyatingiz haqida qisqa blog post yozing.', prompt: 'Write a short blog post about your favourite hobby. Explain what it is, why you love it, and give tips to beginners.', time: '25 min', words: '100–140', tips: [{ icon: '✍️', t: 'Blog tone', d: 'Friendly and direct tone — o\'quvchiga murojaat qiling.' }, { icon: '📋', t: 'Structure', d: 'Intro → Why I love it → Tips → Conclusion.' }, { icon: '🏷️', t: 'Hook', d: 'Birinchi gapingiz qiziqarli bo\'lsin: "Did you know that..."' }], sample: 'Have you ever tried origami? I started folding paper three years ago and it completely changed how I think about art.' },
      { tag: 'creative', tagClass: 'tag-creative', title: 'Postcard', desc: 'Safari yoki sayohatchidan pochta kartochkasi yozing.', prompt: 'You are on holiday in a beautiful city. Write a postcard to your teacher (50–80 words). Include the weather, one thing you saw, and one thing you ate.', time: '15 min', words: '50–80', tips: [{ icon: '🌤', t: 'Weather', d: 'sunny, cloudy, hot, humid — ob-havo batafsil yozing.' }, { icon: '👁️', t: 'Sights', d: 'the magnificent cathedral, the bustling market...' }, { icon: '🍽️', t: 'Food', d: 'I tried the most amazing paella...' }], sample: 'Greetings from Seville! The weather is incredibly hot — 38°C every day! Yesterday I visited a stunning cathedral. I also tried traditional gazpacho soup.' },
      { tag: 'grammar', tagClass: 'tag-grammar', title: 'Shart gaplari', desc: 'If-gaplari yordamida orzular haqida yozing.', prompt: 'Write 6 sentences using First and Second Conditionals about your future plans and dreams.', time: '18 min', words: '80–100', tips: [{ icon: '1️⃣', t: '1st Conditional', d: '"If I pass the exam, I will..." — real imkoniyat.' }, { icon: '2️⃣', t: '2nd Conditional', d: '"If I had a million dollars, I would..." — xayoliy vaziyat.' }, { icon: '🔄', t: 'Mix them', d: 'Ikkalasini ham ishlating — contrast yarating.' }], sample: 'If I study hard, I will pass my English exam. If I had more time, I would travel around the world.' },
    ],
    B1: [
      { tag: 'structure', tagClass: 'tag-structure', title: 'Essay: For and Against', desc: 'Ikkala tomonni ko\'rib chiquvchi muvozanatli esse yozing.', prompt: '"Social media has more advantages than disadvantages." Write a for-and-against essay (180–220 words). Include an introduction, two body paragraphs, and a conclusion.', time: '35 min', words: '180–220', tips: [{ icon: '🏗️', t: 'Essay structure', d: 'Intro (hook+thesis) → For → Against → Conclusion.' }, { icon: '🔗', t: 'Connectors', d: 'Furthermore, However, On the other hand, In conclusion...' }, { icon: '⚖️', t: 'Balance', d: 'Har ikkala tomonni ham teng ko\'rsating.' }], sample: 'Social media has transformed how we communicate. While it offers connectivity and information access, it also raises serious concerns about mental health and privacy.' },
      { tag: 'style', tagClass: 'tag-style', title: 'Formal email', desc: 'Rasmiy murojaat xati yozing.', prompt: 'Write a formal email (150–180 words) to a university, asking about their English language courses. Include: why you are writing, what you want to know, and how they can contact you.', time: '30 min', words: '150–180', tips: [{ icon: '📧', t: 'Formal opening', d: '"Dear Sir/Madam," yoki "To whom it may concern,"' }, { icon: '🎯', t: 'Clear purpose', d: 'Birinchi paragrafda maqsadingizni aniq ayting.' }, { icon: '🙏', t: 'Formal close', d: '"I look forward to hearing from you. Yours faithfully,"' }], sample: 'Dear Sir/Madam, I am writing to enquire about the English language courses offered at your institution for the upcoming academic year.' },
      { tag: 'creative', tagClass: 'tag-creative', title: 'Hikoya yozish', desc: 'Qisqa syujetli hikoya yozing — boshlash, rivojlanish, yakunlash.', prompt: 'Write a short story (200–250 words) that begins with: "The last train had already gone." Use descriptive language and create tension.', time: '40 min', words: '200–250', tips: [{ icon: '🎭', t: 'Show, don\'t tell', d: '"Her hands shook" o\'rniga "She was nervous" deb yozmang.' }, { icon: '🌪️', t: 'Tension', d: 'Short sentences = fast pace. Qisqartiring, tezlashtiring.' }, { icon: '🎨', t: 'Sensory detail', d: 'Ko\'rish, eshitish, hid — 3 ta hiss tasvirini qo\'shing.' }], sample: 'The last train had already gone. Anna stood alone on the empty platform, the echo of her footsteps swallowed by the dark.' },
      { tag: 'grammar', tagClass: 'tag-grammar', title: 'Passive Voice', desc: 'Tarixiy voqeani Passive Voice yordamida tasvirlab bering.', prompt: 'Write 8 sentences about a historical event or invention using passive voice structures. Vary the tenses.', time: '25 min', words: '100–140', tips: [{ icon: '📜', t: 'Passive form', d: '"The telephone was invented by Bell in 1876."' }, { icon: '🔄', t: 'Mixed tenses', d: 'Was/were built, has been discovered, will be announced...' }, { icon: '📍', t: 'By-agent', d: '"by" + shaxs/narsa faqat muhim bo\'lganda qo\'shing.' }], sample: 'The pyramids were built over 4,000 years ago. It is believed that thousands of workers were employed in the construction.' },
    ],
    B2: [
      { tag: 'style', tagClass: 'tag-style', title: 'Opinion essay', desc: 'Aniq argumentlar bilan fikringizni himoya qiling.', prompt: 'Write an opinion essay (250–300 words): "University education should be free for all students." Present your view with supporting arguments, counterarguments, and a strong conclusion.', time: '45 min', words: '250–300', tips: [{ icon: '💡', t: 'Thesis statement', d: 'Kirish qismida pozitsiyangizni aniq bildiring.' }, { icon: '🧲', t: 'Refutation', d: 'Qarama-qarshi fikrni tan oling, keyin rad eting.' }, { icon: '🎯', t: 'Formal register', d: 'Contractions yo\'q. Formal lug\'at ishlating.' }], sample: 'The debate over university tuition fees has long divided opinion. I firmly believe that higher education should be accessible to all, regardless of financial background.' },
      { tag: 'creative', tagClass: 'tag-creative', title: 'Character sketch', desc: 'Murakkab, qarama-qarshiliklarga to\'la qahramon tasvirini yozing.', prompt: 'Write a character sketch (220–260 words) of an interesting person — real or fictional. Reveal character through action and dialogue, not just description.', time: '40 min', words: '220–260', tips: [{ icon: '🎭', t: 'Indirect characterisation', d: 'Nima deyishini va qanday harakat qilishini ko\'rsating.' }, { icon: '🔍', t: 'Contradiction', d: 'Hech kim to\'liq yaxshi yoki yomon emas — qo\'shing.' }, { icon: '🗣️', t: 'Voice', d: 'Dialogue uning shaxsini ochib beradi.' }], sample: 'Mrs. Chen never raised her voice. She didn\'t need to. One look over her glasses — that particular look — and the entire staff fell silent.' },
      { tag: 'grammar', tagClass: 'tag-grammar', title: 'Mixed Conditionals', desc: 'Murakkab shartli konstruktsiyalar bilan ishlang.', prompt: 'Write a paragraph (150–180 words) using mixed conditionals to reflect on past decisions and their present effects.', time: '30 min', words: '150–180', tips: [{ icon: '⏮️', t: 'Past → Present', d: '"If I had studied harder, I would be at university now."' }, { icon: '⏭️', t: 'Present → Past', d: '"If I were braver, I would have spoken up."' }, { icon: '💭', t: 'Reflection tone', d: 'Regret, pride, or wonder — bir his-tuyg\'uni markazga qo\'ying.' }], sample: 'If I had taken that job offer three years ago, my life would be completely different now. I would be living abroad, surrounded by new experiences.' },
    ],
    C1: [
      { tag: 'style', tagClass: 'tag-style', title: 'Academic report', desc: 'Ilmiy-tahliliy hisobot yozing.', prompt: 'Write an academic-style report (320–380 words) analysing the impact of artificial intelligence on the job market. Use hedging language, formal register, and varied sentence structures.', time: '60 min', words: '320–380', tips: [{ icon: '🔬', t: 'Hedging', d: '"It could be argued...", "Evidence suggests...", "This may indicate..."' }, { icon: '📊', t: 'Structure', d: 'Abstract → Introduction → Analysis → Conclusion → Recommendations.' }, { icon: '📚', t: 'Nominalisation', d: '"investigate" → "investigation"; "develop" → "development"' }], sample: 'This report examines the multifaceted implications of artificial intelligence on contemporary labour markets. Drawing on recent empirical evidence, it contends that while automation presents significant challenges, it simultaneously generates novel employment categories.' },
      { tag: 'creative', tagClass: 'tag-creative', title: 'Literary prose', desc: 'Adabiy darajada tavsiflovchi nasr yozing.', prompt: 'Write a literary prose piece (280–320 words) opening with: "Memory, like water, finds its own level." Explore a theme of loss, time, or identity through precise, evocative language.', time: '55 min', words: '280–320', tips: [{ icon: '🖋️', t: 'Register', d: 'Elevated diction — recherché, palimpsest, liminal kabi so\'zlar.' }, { icon: '🌀', t: 'Metaphor', d: 'Extended metaphors — bir tasvir butun parcha bo\'ylab cho\'zilsin.' }, { icon: '🎵', t: 'Rhythm', d: 'Gaplarning musiqasini his qiling — qisqa + uzun navbatlashuvi.' }], sample: 'Memory, like water, finds its own level. It pools in unexpected hollows — the scent of woodsmoke on a November evening, the particular weight of silence after an argument.' },
      { tag: 'grammar', tagClass: 'tag-grammar', title: 'Inversions va cleft sentences', desc: 'Murakkab grammatik strukturalar bilan yozing.', prompt: 'Write a persuasive article (280–320 words) about climate change using at least 3 inversions and 2 cleft sentences for emphasis.', time: '50 min', words: '280–320', tips: [{ icon: '🔄', t: 'Inversions', d: '"Not only did... but...", "Rarely have we witnessed...", "Under no circumstances should..."' }, { icon: '🎯', t: 'Cleft sentences', d: '"It is education that...", "What we need is...", "It was in 1950 that..."' }, { icon: '💪', t: 'Rhetoric', d: 'Tricolon, anaphora — nutq usullarini yozmada ishlating.' }], sample: 'Rarely in human history have we faced a crisis of such magnitude. Not only does climate change threaten ecosystems, but it also imperils the very foundations of civilised society.' },
    ]
  };

  const allWords = [
    { word: 'Furthermore', cat: 'connectors', lvl: 'B1' }, { word: 'Nevertheless', cat: 'connectors', lvl: 'B2' }, { word: 'In contrast', cat: 'connectors', lvl: 'B1' },
    { word: 'As a result', cat: 'connectors', lvl: 'A2' }, { word: 'However', cat: 'connectors', lvl: 'A2' }, { word: 'Moreover', cat: 'connectors', lvl: 'B1' },
    { word: 'Consequently', cat: 'connectors', lvl: 'B2' }, { word: 'In addition', cat: 'connectors', lvl: 'A2' }, { word: 'Despite this', cat: 'connectors', lvl: 'B1' },
    { word: 'In my opinion', cat: 'opinion', lvl: 'A2' }, { word: 'I firmly believe', cat: 'opinion', lvl: 'B1' }, { word: 'It could be argued', cat: 'opinion', lvl: 'B2' },
    { word: 'From my perspective', cat: 'opinion', lvl: 'B1' }, { word: 'It is widely accepted', cat: 'opinion', lvl: 'B2' }, { word: 'I am of the view that', cat: 'opinion', lvl: 'C1' },
    { word: 'Evidence suggests', cat: 'academic', lvl: 'C1' }, { word: 'This indicates that', cat: 'academic', lvl: 'B2' }, { word: 'According to', cat: 'academic', lvl: 'B1' },
    { word: 'It has been shown that', cat: 'academic', lvl: 'C1' }, { word: 'Research demonstrates', cat: 'academic', lvl: 'C1' }, { word: 'In conclusion', cat: 'connectors', lvl: 'A2' },
    { word: 'On the other hand', cat: 'connectors', lvl: 'B1' }, { word: 'Not only...but also', cat: 'connectors', lvl: 'B2' }, { word: 'Significantly', cat: 'academic', lvl: 'B2' },
  ];

  const quizQuestions = [
    { q: 'Qaysi gap to\'g\'ri rasmiy xat ochilishini ko\'rsatadi?', opts: ['Hey, how are you?', 'Dear Sir/Madam,', 'Yo, what\'s up?', 'Hi there!'], ans: 1, exp: 'Rasmiy xatlarda "Dear Sir/Madam," yoki "To Whom It May Concern," ishlatiladi.' },
    { q: '"Although it was raining, ___" — bo\'sh joyni to\'ldiring.', opts: ['but we went out.', 'we went out.', 'however we went out.', 'we went out, but.'], ans: 1, exp: '"Although" allaqachon qarama-qarshilik bildiradi, shuning uchun "but" qo\'shimcha kerak emas.' },
    { q: 'Passiv gap to\'g\'ri qaysi?', opts: ['Shakespeare wrote Hamlet.', 'Hamlet was written by Shakespeare.', 'Hamlet wrote Shakespeare.', 'Shakespeare writing Hamlet.'], ans: 1, exp: 'Passiv: Subject + was/were + past participle (+ by + agent).' },
    { q: 'B2 darajasida esse uchun qaysi connector eng formal?', opts: ['Also', 'Plus', 'Furthermore', 'And also'], ans: 2, exp: '"Furthermore" akademik yozishda eng formal bog\'lovchilerdan biri.' },
    { q: 'Qaysi gap inversion strukturasini to\'g\'ri ishlatadi?', opts: ['Never I have seen this.', 'Never have I seen such beauty.', 'I have never seen such beauty.', 'Such beauty I never seen.'], ans: 1, exp: 'Inversion: "Never + have/had + subject + verb" — gapni kuchaytirish uchun.' },
    { q: 'Conditional 2 qaysi?', opts: ['If it rains, I will stay.', 'If I won the lottery, I would travel.', 'If it had rained, I would have stayed.', 'If I win, I will be happy.'], ans: 1, exp: '2nd Conditional: If + past simple, would + infinitive — xayoliy vaziyat.' },
    { q: '"Show, don\'t tell" tamoyili nimani anglatadi?', opts: ['Ko\'proq rasmlar qo\'shish', 'His-tuyg\'ularni bevosita aytish o\'rniga harakatlar orqali ko\'rsatish', 'Faqat dialog ishlatish', 'Ko\'proq adjektiv ishlatish'], ans: 1, exp: '"She was sad" o\'rniga "Tears blurred her vision" — his-tuyg\'uni bevosita aytmasdan ko\'rsatish.' },
    { q: 'Qaysi jumla hedging language ishlatadi?', opts: ['AI will destroy all jobs.', 'AI is taking over the world.', 'It could be argued that AI may affect employment.', 'AI definitely changes everything.'], ans: 2, exp: '"It could be argued" va "may" — academic yozishda noaniqlikni bildiruvchi hedging expressions.' },
  ];

  const tips = [
    { icon: '📖', t: 'O\'qing ko\'proq', p: 'Yaxshi yozuvchi bo\'lish uchun avval ko\'p o\'qish kerak.', cls: 'icon-sage' },
    { icon: '✏️', t: 'Har kun yozing', p: '10 daqiqa kunlik yozuv amaliyoti — eng yaxshi mashq.', cls: 'icon-rust' },
    { icon: '📝', t: 'Revision qiling', p: 'Birinchi draft hech qachon mukammal emas — qayta yozing.', cls: 'icon-gold' },
    { icon: '🗂️', t: 'Outline yarating', p: 'Yozishdan oldin rejalashtiring — vaqt tejovchi siri.', cls: 'icon-sage' },
  ];

  const bigTips = [
    { n: '01', h: 'Murakkab gaplar o\'rniga aniq va lo\'nda yozing', p: 'Ko\'p talabalar murakkab konstruktsiyalar ishlatish orqali aqlli ko\'rinishga harakat qiladi. Aslida, sodda va aniq gaplar yozuvingizni kuchli qiladi. "Show, don\'t tell" tamoyilini eslab turing.', bad: 'It was very cold weather outside.', good: 'Ice glazed the windowpane. She pulled her coat tighter.' },
    { n: '02', h: 'Bog\'lovchilarni to\'g\'ri ishlating', p: 'Har bir paragrafda mantiqiy bog\'liqlik bo\'lishi kerak. "And" va "but" dan tashqari, "Furthermore", "Nevertheless", "As a consequence" kabi connectorlar essengizni professional ko\'rsatadi.', bad: 'I like coffee. I drink it every day. It helps me.', good: 'I drink coffee every morning; consequently, I feel more alert and focused throughout the day.' },
    { n: '03', h: 'Kirish va xulosa qismlari muhim', p: 'Ko\'plab talabalar asosiy qismga ko\'p vaqt sarflaydi, lekin kirish va xulosa qismlari yozuvingiz umumiy taassurotini belgilaydi. Kuchli hook bilan boshlang, kuchli xulosa bilan tugating.', bad: 'In this essay I will write about...', good: 'Imagine a world without internet. Surprisingly, 40% of the global population still lives in this reality.' },
    { n: '04', h: 'Tense consistency — izchillik', p: 'Yozuv davomida zamon izchilligini saqlang. Bir paragraf ichida Past va Present Simple orasida sakrash eng keng tarqalgan xatolardan biri.', bad: 'She walked into the room and sees a letter.', good: 'She walked into the room and saw a letter on the table.' },
    { n: '05', h: 'Lug\'at rang-barangligini oshiring', p: '"Said" so\'zini doim takrorlamasdan, "whispered", "insisted", "remarked", "pointed out" kabi variantlarni ishlating. Sinonimlar ro\'yxatini yarating va undan foydalaning.', bad: 'He said he was tired. She said she understood.', good: '"I\'m exhausted," he admitted. She nodded, understanding completely.' },
    { n: '06', h: 'Paragraf tuzilishi: PEEL', p: 'Point → Evidence → Explanation → Link. Har bir paragraf faqat bitta fikrni rivojlantirsin. Bu akademik va IELTS yozishda universal formula.', bad: 'My paragraph has many ideas mixed together without clear structure...', good: 'Point: Social media affects mental health. Evidence: Studies show... Explanation: This suggests... Link: Therefore...' },
  ];

  const tasks = [
    { title: 'Micro-story: 50 so\'z', desc: 'Aynan 50 ta so\'zdan iborat to\'liq hikoya yozing. Boshlash, rivojlanish va tugallanish bo\'lishi shart.', target: '50 words exactly', diff: 1 },
    { title: 'Synonym chain', desc: '"Happy" so\'zi uchun 8 ta sinonim toping va har birini gap ichida ishlating.', target: '8 unique synonyms', diff: 2 },
    { title: 'Rewrite the cliché', desc: '"It was a dark and stormy night" jumlasini 5 xil yangi usulda yozing.', target: '5 original rewrites', diff: 2 },
    { title: 'Cohesion mashqi', desc: 'Berilgan 5 ta tartibsiz gapni mantiqiy bog\'lovchilar bilan to\'g\'ri tartiblang.', target: '5 connectors used', diff: 2 },
    { title: 'IELTS Task 1', desc: 'Birorta grafik yoki jadval tasvirini 150 so\'zda tavsiflab bering.', target: '150 words minimum', diff: 3 },
    { title: 'C1 Hedging paragraph', desc: 'Iqlim o\'zgarishi haqida hedging language ishlatgan holda bir paragraf yozing.', target: '5+ hedging expressions', diff: 4 },
    { title: 'Inversion workout', desc: '"Never", "Rarely", "Not only", "Hardly", "Seldom" bilan boshlanadigan 5 ta gap yozing.', target: '5 inverted sentences', diff: 4 },
    { title: '1000-word challenge', desc: 'Bir mavzuda 1000 so\'zdan iborat strukturlangan esse yozing. Vaqt: 50 daqiqa.', target: '1000 words, 50 mins', diff: 5 },
  ];

  // ==================== STATE ====================
  const [currentLevel, setCurrentLevel] = useState('A2');
  const [openCardIdx, setOpenCardIdx] = useState(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [wordFilter, setWordFilter] = useState('all');
  const [tipIdx, setTipIdx] = useState(0);
  const [writingText, setWritingText] = useState('');
  const [writingFeedback, setWritingFeedback] = useState({ show: false, message: '', type: '' });
  const [showResult, setShowResult] = useState(false);

  // ==================== EFFECTS ====================
  useEffect(() => {
    // Animate progress bars after mount
    const timer = setTimeout(() => {
      document.querySelectorAll('.progress-fill').forEach(el => {
        const w = el.style.width;
        el.style.width = '0%';
        setTimeout(() => el.style.width = w, 100);
      });
    }, 400);

    // Rotate big tips
    const interval = setInterval(() => {
      setTipIdx((prev) => (prev + 1) % bigTips.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [bigTips.length]);

  // ==================== FUNCTIONS ====================
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const filterLevel = (lvl) => {
    setCurrentLevel(lvl);
    closeExpanded();
  };

  const openExercise = (idx) => {
    setOpenCardIdx(idx);
    setWritingText('');
    setWritingFeedback({ show: false, message: '', type: '' });
  };

  const closeExpanded = () => {
    setOpenCardIdx(null);
    setWritingText('');
    setWritingFeedback({ show: false, message: '', type: '' });
  };

  const checkWriting = () => {
    const text = writingText.trim();
    const wordCount = text ? text.split(/\s+/).filter(w => w).length : 0;

    if (wordCount < 10) {
      setWritingFeedback({
        show: true,
        message: `⚠️ Yozuv juda qisqa (${wordCount} so'z). Ko'proq yozing!`,
        type: 'error'
      });
    } else {
      setWritingFeedback({
        show: true,
        message: `✅ Ajoyib! ${wordCount} so'z yozdingiz. Grammatika va uslubni qayta tekshiring. Connectorlar ishlatdingizmi? Har bir paragraf bitta fikrni ifodalayaptimi?`,
        type: 'success'
      });
    }
  };

  const clearWriting = () => {
    setWritingText('');
    setWritingFeedback({ show: false, message: '', type: '' });
  };

  const showSample = (idx) => {
    const ex = exercises[currentLevel]?.[idx];
    if (ex) {
      setWritingFeedback({
        show: true,
        message: `📖 <strong>Namuna:</strong> "${ex.sample}..."`,
        type: 'sample'
      });
    }
  };

  const filterWords = (cat) => {
    setWordFilter(cat);
  };

  const answerQuiz = (i) => {
    if (answered) return;
    setAnswered(true);

    const q = quizQuestions[quizIdx];
    if (i === q.ans) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (quizIdx + 1 >= quizQuestions.length) {
      setShowResult(true);
    } else {
      setQuizIdx(prev => prev + 1);
      setAnswered(false);
    }
  };

  const restartQuiz = () => {
    setQuizIdx(0);
    setQuizScore(0);
    setAnswered(false);
    setShowResult(false);
  };

  const getFilteredWords = () => {
    if (wordFilter === 'all') return allWords;
    return allWords.filter(w => w.cat === wordFilter);
  };

  // ==================== RENDER ====================
  return (
    <div className="writing-academy">
      {/* GRAIN OVERLAY - handled in CSS */}

      {/* NAV */}
    <Header/>

      {/* HERO */}
      <div className="hero animate-in" id="hero">
        <div>
          <div className="hero-label">Multilevel Writing System Ahmadjon Akramov</div>
          <h1>Yozuvingizni<br /><em>yangi bosqichga</em><br />olib chiqing</h1>
          <p>A1 dan C1 gacha bo'lgan darajalar bo'yicha strukturlangan mashqlar, professional maslahatlar va interaktiv testlar orqali ingliz yozuvini mukammal o'rganing.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollToSection('exercises')}>Mashqlarni boshlash</button>
            <button className="btn-secondary" onClick={() => scrollToSection('quiz')}>Quiz ishlash →</button>
          </div>
        </div>
        <div className="hero-card animate-in delay-1">
          <div className="card-header">
            <div>
              <div className="card-level">Sizning progressingiz</div>
              <div className="card-title">B1 Intermediate</div>
            </div>
            <div className="card-xp">+240 XP</div>
          </div>
          <div className="progress-list">
            <div className="progress-item">
              <div className="progress-top">
                <span className="progress-name">Grammatika</span>
                <span className="progress-pct">72%</span>
              </div>
              <div className="progress-bar"><div className="progress-fill fill-rust" style={{ width: '72%' }}></div></div>
            </div>
            <div className="progress-item">
              <div className="progress-top">
                <span className="progress-name">Lug'at boyligʻi</span>
                <span className="progress-pct">58%</span>
              </div>
              <div className="progress-bar"><div className="progress-fill fill-gold" style={{ width: '58%' }}></div></div>
            </div>
            <div className="progress-item">
              <div className="progress-top">
                <span className="progress-name">Yozuv uslubi</span>
                <span className="progress-pct">45%</span>
              </div>
              <div className="progress-bar"><div className="progress-fill fill-sage" style={{ width: '45%' }}></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-bar animate-in delay-2">
        <div className="stat-item">
          <div className="stat-num">24+</div>
          <div className="stat-label">Mashq turlari</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">5</div>
          <div className="stat-label">Daraja (A1–C1)</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">40+</div>
          <div className="stat-label">Pro maslahatlar</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">120+</div>
          <div className="stat-label">Quiz savollari</div>
        </div>
      </div>

      {/* LEVEL CHIPS */}
      <div className="levels-strip" id="exercises">
        {['A1', 'A2', 'B1', 'B2', 'C1'].map(level => (
          <button
            key={level}
            className={`level-chip ${level.toLowerCase()} ${currentLevel === level ? 'active' : ''}`}
            onClick={() => filterLevel(level)}
          >
            {level} — {level === 'A1' ? 'Beginner' : level === 'A2' ? 'Elementary' : level === 'B1' ? 'Intermediate' : level === 'B2' ? 'Upper-Int' : 'Advanced'}
          </button>
        ))}
      </div>

      {/* EXERCISES */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Mashqlar to'plami</div>
          <div className="section-sub" id="levelDisplay">
            {currentLevel} darajasi · {exercises[currentLevel]?.length || 0} mashq
          </div>
        </div>

        <div className="ex-grid" id="exGrid">
          {exercises[currentLevel]?.map((ex, i) => (
            <div
              key={i}
              className="ex-card animate-in"
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => openExercise(i)}
            >
              <div className="ex-card-top">
                <div className={`ex-tag ${ex.tagClass}`}>{ex.tag}</div>
                <div className="ex-title">{ex.title}</div>
                <div className="ex-desc">{ex.desc}</div>
              </div>
              <div className="ex-card-bottom">
                <div className="ex-meta">
                  <div className="ex-meta-item">⏱ <span>{ex.time}</span></div>
                  <div className="ex-meta-item">📝 <span>{ex.words}</span></div>
                </div>
                <div className="ex-arrow">→</div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded exercise panel */}
        {openCardIdx !== null && exercises[currentLevel]?.[openCardIdx] && (
          <div className="ex-expanded open" style={{ gridColumn: '1 / -1' }}>
            {(() => {
              const ex = exercises[currentLevel][openCardIdx];
              return (
                <>
                  <div className="ex-exp-header">
                    <div>
                      <div className="ex-exp-title">{ex.title}</div>
                      <div className="ex-exp-level">{currentLevel} · {ex.tag}</div>
                    </div>
                    <button className="close-ex" onClick={closeExpanded}>✕</button>
                  </div>
                  <div className="ex-prompt">
                    <div className="ex-prompt-label">📝 Topshiriq</div>
                    <p>{ex.prompt}</p>
                  </div>
                  <textarea
                    className="writing-area"
                    placeholder="Bu yerga yozing..."
                    value={writingText}
                    onChange={(e) => setWritingText(e.target.value)}
                  ></textarea>
                  <div className="ex-tips">
                    {ex.tips.map((t, idx) => (
                      <div key={idx} className="tip-card">
                        <div className="tip-icon">{t.icon}</div>
                        <div className="tip-title">{t.t}</div>
                        <div className="tip-text">{t.d}</div>
                      </div>
                    ))}
                  </div>
                  <div className="ex-actions">
                    <button className="btn-primary" onClick={checkWriting}>Tekshirish ✓</button>
                    <button className="btn-secondary" onClick={clearWriting}>Tozalash</button>
                    <button className="btn-secondary" onClick={() => showSample(openCardIdx)}>Namuna ko'rish</button>
                  </div>
                  {writingFeedback.show && (
                    <div
                      style={{
                        marginTop: '16px',
                        padding: '16px 20px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        lineHeight: '1.6',
                        background: writingFeedback.type === 'error' ? 'rgba(200,75,47,0.08)' : writingFeedback.type === 'success' ? 'rgba(107,143,113,0.1)' : 'rgba(30,58,74,0.06)',
                        borderLeft: writingFeedback.type === 'error' ? '3px solid #c84b2f' : writingFeedback.type === 'success' ? '3px solid #6b8f71' : '3px solid #1e3a4a',
                        color: writingFeedback.type === 'error' ? '#8b2c18' : writingFeedback.type === 'success' ? '#3d6642' : '#1e3a4a'
                      }}
                      dangerouslySetInnerHTML={{ __html: writingFeedback.message }}
                    />
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* Word Bank */}
        <div className="wordbank" style={{ marginTop: '40px' }}>
          <div className="wb-header">
            <div className="wb-title">📚 Foydali so'z va iboralar</div>
            <div className="wb-filter">
              <button
                className={`wb-btn ${wordFilter === 'all' ? 'active' : ''}`}
                onClick={() => filterWords('all')}
              >
                Barchasi
              </button>
              <button
                className={`wb-btn ${wordFilter === 'connectors' ? 'active' : ''}`}
                onClick={() => filterWords('connectors')}
              >
                Bog'lovchilar
              </button>
              <button
                className={`wb-btn ${wordFilter === 'opinion' ? 'active' : ''}`}
                onClick={() => filterWords('opinion')}
              >
                Fikr bildirish
              </button>
              <button
                className={`wb-btn ${wordFilter === 'academic' ? 'active' : ''}`}
                onClick={() => filterWords('academic')}
              >
                Academic
              </button>
            </div>
          </div>
          <div className="words-flow" id="wordsFlow">
            {getFilteredWords().map((w, idx) => (
              <div key={idx} className="word-pill" title={w.lvl}>
                {w.word}<span className="word-level">{w.lvl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TIPS */}
      <div className="section" id="tips">
        <div className="section-header">
          <div className="section-title">Professional Maslahatlar</div>
          <div className="section-sub">Tajribali yozuvchilardan sirlar</div>
        </div>
        <div className="tips-grid">
          <div className="big-tip" id="bigTip">
            <div className="big-tip-num">Maslahat {bigTips[tipIdx].n} / 06</div>
            <h3>{bigTips[tipIdx].h}</h3>
            <p>{bigTips[tipIdx].p}</p>
            <div className="tip-example">
              <div className="bad">❌ {bigTips[tipIdx].bad}</div>
              <div className="good">✓ {bigTips[tipIdx].good}</div>
            </div>
          </div>
          <div className="tips-stack" id="tipsStack">
            {tips.map((t, i) => (
              <div key={i} className="small-tip" onClick={() => setTipIdx(i)}>
                <div className={`small-tip-icon ${t.cls}`}>{t.icon}</div>
                <div>
                  <h4>{t.t}</h4>
                  <p>{t.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUIZ */}
      <div className="section" id="quiz">
        <div className="section-header">
          <div className="section-title">Mini Quiz — Writing Knowledge</div>
          <div className="section-sub">Bilimingizni sinab ko'ring</div>
        </div>
        <div className="quiz-container">
          {!showResult ? (
            <div id="quizMain">
              <div className="quiz-header">
                <div className="quiz-progress-text" id="quizProgressText">
                  Savol {quizIdx + 1} / {quizQuestions.length}
                </div>
                <div className="quiz-score-badge">
                  🎯 Ball: <span id="quizScore">{quizScore}</span>
                </div>
              </div>
              <div className="quiz-q-num" id="quizQNum">
                SAVOL {String(quizIdx + 1).padStart(2, '0')}
              </div>
              <div className="quiz-question" id="quizQuestion">
                {quizQuestions[quizIdx].q}
              </div>
              <div className="quiz-options" id="quizOptions">
                {quizQuestions[quizIdx].opts.map((opt, i) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const q = quizQuestions[quizIdx];
                  const isCorrect = answered && i === q.ans;
                  const isWrong = answered && i !== q.ans && i === selectedOption; // We need to track selected option
                  // Since we don't track selected option separately, we'll handle styling differently
                  return (
                    <button
                      key={i}
                      className={`quiz-option ${answered && i === q.ans ? 'correct' : ''} ${answered && i !== q.ans && i === tempSelected ? 'wrong' : ''}`}
                      onClick={() => {
                        if (!answered) {
                          setTempSelected(i);
                          answerQuiz(i);
                        }
                      }}
                      disabled={answered}
                      id={`opt_${i}`}
                    >
                      <span className="opt-letter">{letters[i]}</span>{opt}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <div className={`quiz-feedback show ${selectedOption === quizQuestions[quizIdx].ans ? 'good' : 'bad'}`} id="quizFeedback">
                  {selectedOption === quizQuestions[quizIdx].ans ? '✅ To\'g\'ri! ' : '❌ Xato. '}
                  {quizQuestions[quizIdx].exp}
                </div>
              )}
              <div className="quiz-nav">
                <div className="quiz-dots" id="quizDots">
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`quiz-dot ${i < quizIdx ? 'done' : i === quizIdx ? 'active' : ''}`}
                    ></div>
                  ))}
                </div>
                {answered && (
                  <button className="btn-primary" id="quizNextBtn" onClick={nextQuestion}>
                    Keyingi →
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="result-screen show" id="resultScreen">
              <div className="result-emoji" id="resultEmoji">
                {Math.round((quizScore / quizQuestions.length) * 100) >= 87 ? '🥇' :
                 Math.round((quizScore / quizQuestions.length) * 100) >= 62 ? '🥈' : '📚'}
              </div>
              <div className="result-score" id="resultScore">{quizScore}/{quizQuestions.length}</div>
              <div className="result-msg" id="resultMsg">
                {Math.round((quizScore / quizQuestions.length) * 100) >= 87 ? 'Mukammal natija! Siz writing ekspertsiz!' :
                 Math.round((quizScore / quizQuestions.length) * 100) >= 62 ? 'Yaxshi natija! Bir oz ko\'proq mashq qiling.' :
                 'Davom eting! Har bir xato — yangi bilim.'}
              </div>
              <button className="btn-primary" onClick={restartQuiz}>Qayta boshlash</button>
            </div>
          )}
        </div>
      </div>

      {/* TASKS */}
      <div className="section" id="tasks">
        <div className="section-header">
          <div className="section-title">Mini Topshiriqlar</div>
          <div className="section-sub">Turli qiyinlik darajalari</div>
        </div>
        <div className="tasks-grid" id="tasksGrid">
          {tasks.map((t, i) => (
            <div key={i} className="task-card animate-in" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="task-num">0{i + 1}</div>
              <div className="task-difficulty">
                {Array(5).fill(0).map((_, d) => (
                  <div key={d} className={`diff-dot ${d < t.diff ? 'filled' : ''}`}></div>
                ))}
              </div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <div className="task-target">🎯 Maqsad: <strong>{t.target}</strong></div>
              <div className="task-action" onClick={() => alert('Topshiriqni daftaringizda yoki text editoringizda bajaring!')}>
                Boshlash <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <div className="footer-logo">Writing<span>Academy</span></div>
        <div className="footer-note">A1–C1 · Multilevel Writing System · © 2025</div>
      </footer>
    </div>
  );
};

export default WritingAcademy;