'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './formulalar.css'; // CSS styles will be moved to this file
import Header from '../header';

const GrammarVault = () => {
  // ===================== DATA =====================
  const formulas = [
    // PRESENT
    {
      category: 'present', name: 'Present Simple', color: '#7c3aed',
      pos: 'S + V(s/es) + O', neg: "S + don't/doesn't + V + O", q: "Do/Does + S + V + O?",
      posEx: 'She works every day.', negEx: "He doesn't eat meat.", qEx: "Do you like coffee?",
      use: 'Odatiy harakatlar, haqiqatlar, muntazam voqealar uchun ishlatiladi.',
      signal: 'always, usually, often, sometimes, never, every day',
      tip: 'He/She/It uchun (+s/es) qo\'shishni unutmang! "She work<strong>s</strong>"'
    },
    {
      category: 'present', name: 'Present Continuous', color: '#06d6a0',
      pos: 'S + am/is/are + V-ing + O', neg: 'S + am/is/are + not + V-ing + O', q: 'Am/Is/Are + S + V-ing?',
      posEx: 'She is reading now.', negEx: 'They are not playing.', qEx: 'Are you sleeping?',
      use: 'Hozir bo\'layotgan harakatlar, vaqtinchalik vaziyatlar.',
      signal: 'now, right now, at the moment, currently, today',
      tip: 'am/is/are + -ing = hozir bo\'layotgan ish. "is + work<strong>ing</strong>"'
    },
    {
      category: 'present', name: 'Present Perfect', color: '#f72585',
      pos: 'S + have/has + V3(PP) + O', neg: "S + haven't/hasn't + V3 + O", q: 'Have/Has + S + V3?',
      posEx: 'I have visited Paris.', negEx: "She hasn't eaten yet.", qEx: 'Have you seen this?',
      use: 'Tajriba, yaqinda tugagan harakat, still/yet/already uchun.',
      signal: 'already, yet, just, ever, never, since, for',
      tip: 'V3 = past participle (irregular yodlash kerak). gone, seen, eaten'
    },
    {
      category: 'present', name: 'Present Perfect Continuous', color: '#ffd60a',
      pos: 'S + have/has + been + V-ing', neg: "S + haven't/hasn't + been + V-ing", q: 'Have/Has + S + been + V-ing?',
      posEx: 'She has been working since 8am.', negEx: "I haven't been sleeping well.", qEx: 'How long have you been waiting?',
      use: 'Uzoq vaqtdan beri davom etayotgan harakat.',
      signal: 'for, since, all day, how long',
      tip: '"been" so\'zi Present Perfect Continuous ning belgisi!'
    },

    // PAST
    {
      category: 'past', name: 'Past Simple', color: '#7c3aed',
      pos: 'S + V2(ed) + O', neg: "S + didn't + V(base) + O", q: 'Did + S + V(base) + O?',
      posEx: 'She worked yesterday.', negEx: "He didn't come.", qEx: 'Did you call him?',
      use: 'O\'tmishda tugagan aniq harakat.',
      signal: 'yesterday, last week, ago, in 2010, then',
      tip: 'Regular: +ed. Irregular: go→went, see→saw, eat→ate (yodlang!)'
    },
    {
      category: 'past', name: 'Past Continuous', color: '#06d6a0',
      pos: 'S + was/were + V-ing', neg: 'S + was/were + not + V-ing', q: 'Was/Were + S + V-ing?',
      posEx: 'She was sleeping at 9pm.', negEx: 'They were not listening.', qEx: 'Were you driving?',
      use: 'O\'tmishda ma\'lum vaqtda davom etayotgan harakat.',
      signal: 'at that moment, while, when, at 9pm last night',
      tip: 'when + Past Simple, while + Past Continuous!'
    },
    {
      category: 'past', name: 'Past Perfect', color: '#f72585',
      pos: 'S + had + V3(PP)', neg: "S + hadn't + V3", q: 'Had + S + V3?',
      posEx: 'She had left before he arrived.', negEx: "I hadn't seen him before.", qEx: 'Had you eaten?',
      use: 'O\'tmishdagi ikkita harakatdan AVVALROQ bo\'lgan birinchi harakat.',
      signal: 'before, after, already, by the time, when',
      tip: 'Past Simple\'dan OLDIN bo\'lgan ish = Past Perfect!'
    },
    {
      category: 'past', name: 'Past Perfect Continuous', color: '#ffd60a',
      pos: 'S + had + been + V-ing', neg: "S + hadn't + been + V-ing", q: 'Had + S + been + V-ing?',
      posEx: 'She had been running for 2 hours.', negEx: "He hadn't been working hard.", qEx: 'Had you been waiting long?',
      use: 'O\'tmishdagi boshqa harakatdan oldin davom etgan harakat.',
      signal: 'for, since, how long, before',
      tip: '"had been" + V-ing = o\'tmishdagi davomiy harakat (oldingi)'
    },

    // FUTURE
    {
      category: 'future', name: 'Future Simple (Will)', color: '#7c3aed',
      pos: 'S + will + V(base)', neg: "S + won't + V(base)", q: 'Will + S + V(base)?',
      posEx: 'She will call you.', negEx: "I won't go.", qEx: 'Will you help me?',
      use: 'Spontan qarorlar, va\'dalar, bashoratlar.',
      signal: 'tomorrow, next week, soon, in the future',
      tip: '"will" barcha sub\'ektlar uchun bir xil! will not = won\'t'
    },
    {
      category: 'future', name: 'Future (Be Going To)', color: '#06d6a0',
      pos: 'S + am/is/are + going to + V', neg: 'S + am/is/are + not + going to + V', q: 'Am/Is/Are + S + going to + V?',
      posEx: 'She is going to study tonight.', negEx: 'They are not going to come.', qEx: 'Are you going to travel?',
      use: 'Oldindan rejalashtirilgan harakatlar, ko\'rinadigan dalillarga asoslangan bashorat.',
      signal: 'tonight, this weekend, soon (planned)',
      tip: 'Plan bor → going to. Spontan → will!'
    },
    {
      category: 'future', name: 'Future Continuous', color: '#f72585',
      pos: 'S + will + be + V-ing', neg: "S + won't + be + V-ing", q: 'Will + S + be + V-ing?',
      posEx: 'She will be sleeping at midnight.', negEx: "I won't be working tomorrow.", qEx: 'Will you be using the car?',
      use: 'Kelgusida ma\'lum vaqtda davom etayotgan harakat.',
      signal: 'at this time tomorrow, at midnight, in 2 hours',
      tip: '"will be" + -ing = kelajakdagi davomiy harakat'
    },
    {
      category: 'future', name: 'Future Perfect', color: '#ffd60a',
      pos: 'S + will + have + V3', neg: "S + won't + have + V3", q: 'Will + S + have + V3?',
      posEx: 'She will have finished by 5pm.', negEx: "I won't have arrived yet.", qEx: 'Will you have eaten by then?',
      use: 'Kelajakdagi biror vaqtga qadar tugagan harakat.',
      signal: 'by tomorrow, by the time, by 5pm',
      tip: '"by" + vaqt = Future Perfect belgisi!'
    },
    {
      category: 'future', name: 'Future Perfect Continuous', color: '#7c3aed',
      pos: 'S + will + have + been + V-ing', neg: "S + won't + have + been + V-ing", q: 'Will + S + have + been + V-ing?',
      posEx: 'She will have been working for 10 years.', negEx: "They won't have been waiting long.", qEx: 'Will you have been studying?',
      use: 'Kelajakdagi vaqtga qadar davom etadigan harakat.',
      signal: 'by, for, how long',
      tip: 'Eng murakkab zamon! = Future Perfect + Continuous'
    },

    // MODALS
    {
      category: 'modal', name: 'Can / Could', color: '#06d6a0',
      pos: 'S + can/could + V(base)', neg: "S + can't/couldn't + V", q: 'Can/Could + S + V?',
      posEx: 'She can swim.', negEx: "He can't drive.", qEx: 'Could you help me?',
      use: 'Qobiliyat, ruxsat, iltimos.',
      signal: 'ability, permission, polite request',
      tip: '"Can" = present. "Could" = past OR politeness!'
    },
    {
      category: 'modal', name: 'Must / Have to', color: '#f72585',
      pos: 'S + must/have to + V', neg: "S + mustn't / don't have to + V", q: 'Must + S + V?',
      posEx: 'You must wear a seatbelt.', negEx: "You don't have to come.", qEx: 'Must I attend?',
      use: 'Majburiyat. mustn\'t = taqiq. don\'t have to = shart emas.',
      signal: 'obligation, prohibition, necessity',
      tip: '"mustn\'t" = taqiq! "don\'t have to" = majburiy emas!'
    },
    {
      category: 'modal', name: 'Should / Ought to', color: '#ffd60a',
      pos: 'S + should/ought to + V', neg: "S + shouldn't + V", q: 'Should + S + V?',
      posEx: 'You should rest.', negEx: "You shouldn't eat junk food.", qEx: 'Should I call her?',
      use: 'Maslahat, tavsiya, axloqiy majburiyat.',
      signal: 'advice, recommendation',
      tip: '"Should" = maslahat. Doktor gapirayotganda ishlatiladi!'
    },
    {
      category: 'modal', name: 'May / Might', color: '#7c3aed',
      pos: 'S + may/might + V', neg: 'S + may not/might not + V', q: 'May + S + V?',
      posEx: 'It may rain today.', negEx: "She might not come.", qEx: 'May I come in?',
      use: 'Ehtimol, imkoniyat, ruxsat so\'rash.',
      signal: 'possibility, permission',
      tip: '"might" = kamroq ehtimol (50% dan kam). "may" = biroz ko\'proq ehtimol'
    },
    {
      category: 'modal', name: 'Will / Would', color: '#06d6a0',
      pos: 'S + will/would + V', neg: "S + won't/wouldn't + V", q: 'Will/Would + S + V?',
      posEx: 'Would you like some tea?', negEx: "I wouldn't do that.", qEx: 'Would you mind?',
      use: '"Would" = nazokat, conditional, o\'tmish odati.',
      signal: 'polite request, conditional, past habit',
      tip: '"Would you like...?" = eng nazokat iltimos!'
    },
    {
      category: 'modal', name: 'Shall', color: '#f72585',
      pos: 'Shall + I/We + V?', neg: '—', q: 'Shall + I/We + V?',
      posEx: 'Shall we go?', negEx: "—", qEx: 'Shall I open the window?',
      use: 'Brit. inglizcha: taklif qilish, taklifnoma.',
      signal: 'suggestion, offer (British)',
      tip: '"Shall" faqat I/We bilan ishlatiladi!'
    },
    {
      category: 'modal', name: 'Need (Modal)', color: '#ffd60a',
      pos: 'S + need + V(base)', neg: "S + needn't + V", q: 'Need + S + V?',
      posEx: 'You need to study.', negEx: "You needn't worry.", qEx: 'Need I come?',
      use: 'Zaruriyat (modal sifatida formal inglizda).',
      signal: 'necessity, formal',
      tip: '"needn\'t" = "don\'t need to" — shart emas degan ma\'no'
    },

    // CONDITIONALS
    {
      category: 'conditional', name: 'Zero Conditional', color: '#7c3aed',
      pos: 'If + S + V(present), S + V(present)', neg: 'If + S + don\'t + V, S + don\'t + V', q: '—',
      posEx: 'If you heat water to 100°C, it boils.', negEx: 'If it doesn\'t rain, crops die.', qEx: '—',
      use: 'Haqiqatlar, qonuniyatlar, umum haqiqat.',
      signal: 'always, generally, when (general truth)',
      tip: 'Ikki tomonida ham Present Simple! Hamma vaqt rost.'
    },
    {
      category: 'conditional', name: 'First Conditional', color: '#06d6a0',
      pos: 'If + S + V(present), S + will + V', neg: "If + S + doesn't + V, S + won't + V", q: '—',
      posEx: "If it rains, I'll stay home.", negEx: "If you don't hurry, you'll be late.", qEx: '—',
      use: 'Real imkoniyat — kelajakda bo\'lishi mumkin.',
      signal: 'if, unless, as soon as',
      tip: '"if" + present → kelajak uchun "will". Real va ehtimoliy!'
    },
    {
      category: 'conditional', name: 'Second Conditional', color: '#f72585',
      pos: 'If + S + V(past), S + would + V', neg: "If + S + didn't + V, S + wouldn't + V", q: '—',
      posEx: "If I had a car, I'd drive everywhere.", negEx: "If she weren't busy, she'd help.", qEx: '—',
      use: 'Xayoliy, realsiz yoki ehtimolsiz vaziyatlar.',
      signal: "If I were..., If I had...",
      tip: '"were" barcha sub\'ektlar uchun! "If I were you..." — maslahat berish'
    },
    {
      category: 'conditional', name: 'Third Conditional', color: '#ffd60a',
      pos: 'If + S + had + V3, S + would + have + V3', neg: "If + S + hadn't + V3, S + wouldn't + have + V3", q: '—',
      posEx: "If I had studied, I would have passed.", negEx: "If she hadn't left, we'd have met.", qEx: '—',
      use: 'O\'tmishdagi realsiz (bo\'lmagan) vaziyatlar. Pushaymonlik.',
      signal: 'If only, I wish (past)',
      tip: '3rd conditional = afsos, pushaymonlik! Ikki past perfect ishlatiladi.'
    },
    {
      category: 'conditional', name: 'Mixed Conditional', color: '#7c3aed',
      pos: 'If + S + had + V3, S + would + V(now)', neg: '—', q: '—',
      posEx: "If I had studied medicine, I'd be a doctor now.", negEx: "—", qEx: '—',
      use: 'O\'tmishdagi shartni hozirgi natijalarga bog\'lash.',
      signal: 'now, currently, today',
      tip: 'Past action → Present result! Mix of 2nd & 3rd.'
    },
    {
      category: 'conditional', name: 'Unless (Conditional)', color: '#06d6a0',
      pos: 'Unless + S + V, S + will + V', neg: '—', q: '—',
      posEx: "Unless you study, you'll fail.", negEx: "—", qEx: '—',
      use: '"Agar ... bo\'lmasa" ma\'nosida.',
      signal: 'unless, except if',
      tip: '"Unless" = "If ... not". Salbiy ma\'no bilan positive shakl!'
    },

    // PASSIVE
    {
      category: 'passive', name: 'Present Simple Passive', color: '#f72585',
      pos: 'S + am/is/are + V3(PP)', neg: 'S + am/is/are + not + V3', q: 'Am/Is/Are + S + V3?',
      posEx: 'English is spoken here.', negEx: 'Books are not sold there.', qEx: 'Is this room cleaned daily?',
      use: 'Ish kim tomonidan qilinishi muhim emas yoki ma\'lum emas.',
      signal: 'by, generally, officially',
      tip: 'Active: They clean the room. → Passive: The room is cleaned.'
    },
    {
      category: 'passive', name: 'Past Simple Passive', color: '#ffd60a',
      pos: 'S + was/were + V3', neg: 'S + was/were + not + V3', q: 'Was/Were + S + V3?',
      posEx: 'The letter was written in 1990.', negEx: 'The car was not repaired.', qEx: 'Was he arrested?',
      use: 'O\'tmishdagi passiv harakat.',
      signal: 'yesterday, last year, in (year)',
      tip: 'was = singular, were = plural. "by + agent" ixtiyoriy!'
    },
    {
      category: 'passive', name: 'Present Perfect Passive', color: '#7c3aed',
      pos: 'S + have/has + been + V3', neg: "S + haven't/hasn't + been + V3", q: 'Have/Has + S + been + V3?',
      posEx: 'The report has been submitted.', negEx: "The wall hasn't been painted.", qEx: 'Has it been fixed?',
      use: 'Natijalari hozir ko\'rinib turgan passiv harakat.',
      signal: 'already, just, yet, recently',
      tip: '"been" qo\'shish = passive qilish! have + been + V3'
    },
    {
      category: 'passive', name: 'Future Simple Passive', color: '#06d6a0',
      pos: 'S + will + be + V3', neg: "S + won't + be + V3", q: 'Will + S + be + V3?',
      posEx: 'The building will be demolished.', negEx: "It won't be finished today.", qEx: 'Will you be informed?',
      use: 'Kelajakdagi passiv harakat.',
      signal: 'tomorrow, soon, next year',
      tip: '"will be" + V3 = kelajak passive!'
    },
    {
      category: 'passive', name: 'Modal Passive', color: '#f72585',
      pos: 'S + modal + be + V3', neg: 'S + modal + not + be + V3', q: 'Modal + S + be + V3?',
      posEx: 'This must be done immediately.', negEx: "It shouldn't be ignored.", qEx: 'Can it be fixed?',
      use: 'Modal fe\'l bilan passiv.',
      signal: 'modal verbs: can, must, should...',
      tip: 'Modal + be + V3 = modal passive formula!'
    },

    // QUESTION FORMS
    {
      category: 'question', name: 'Wh- Questions (Present)', color: '#7c3aed',
      pos: 'WH + do/does + S + V?', neg: '—', q: 'What / Where / When / Who / Why / How',
      posEx: 'Where do you live?', negEx: '—', qEx: 'Why does she cry?',
      use: 'Ma\'lumot so\'rash uchun savol tuziish.',
      signal: 'what, where, when, who, why, how',
      tip: 'WH so\'zi jumlaning boshida keladi!'
    },
    {
      category: 'question', name: 'Subject Questions', color: '#06d6a0',
      pos: 'WH + V(s/es)?', neg: '—', q: 'Who + V? / What + V?',
      posEx: 'Who lives here?', negEx: '—', qEx: 'What happened?',
      use: 'Sub\'ekt haqida so\'ralganda — do/does ishlatilmaydi!',
      signal: 'Who (subject), What (subject)',
      tip: 'Who/What sub\'ekt bo\'lsa, do/does qo\'shma! "Who CAME?" emas "Who did come?"'
    },
    {
      category: 'question', name: 'Tag Questions', color: '#f72585',
      pos: "S + V, auxiliary + 't + S?", neg: 'S + don\'t + V, do + S?', q: '—',
      posEx: "You like it, don't you?", negEx: "She can't swim, can she?", qEx: '—',
      use: 'Tasdiqlash yoki rozilikni so\'rash.',
      signal: 'Positive → negative tag. Negative → positive tag.',
      tip: 'Positive gapda negative tag, negative gapda positive tag!'
    },
    {
      category: 'question', name: 'Indirect Questions', color: '#ffd60a',
      pos: 'Could you tell me + where/what/how + S + V?', neg: '—', q: '—',
      posEx: 'Could you tell me where she lives?', negEx: '—', qEx: "Do you know what time it is?",
      use: 'Nazokat bilan so\'rash. Savol tartibida emas!',
      signal: 'Could you tell me..., Do you know..., I wonder...',
      tip: 'Indirect savolda to\'g\'ri tartib (S+V), teskari tartib emas!'
    },
  ];

  const quizQuestions = [
    { q: "Present Simple da He/She/It uchun qaysi formula to'g'ri?",
      hint: "Uchinchi shaxs yakkalik",
      options: ["S + V + O", "S + V(s/es) + O", "S + is + V + O", "S + do + V + O"],
      ans: 1 },
    { q: "'She _____ working now.' Bo'shliqa nima keladi?", hint: "Present Continuous",
      options: ["is", "are", "was", "has"], ans: 0 },
    { q: "Past Simple da 'go' fe'lining shakli qaysi?", hint: "Irregular verb",
      options: ["goed", "going", "went", "gone"], ans: 2 },
    { q: "Future Simple formula qaysi?", hint: "Will ishlatiladi",
      options: ["S + will + V", "S + is + V", "S + have + V", "S + did + V"], ans: 0 },
    { q: "'If you heat ice, it ___.' (Zero Conditional)", hint: "Haqiqat, qonuniyat",
      options: ["will melt", "melts", "melted", "has melted"], ans: 1 },
    { q: "Present Perfect formula qaysi?", hint: "Tajriba yoki natija",
      options: ["S + had + V3", "S + have/has + V3", "S + was + V3", "S + will + V3"], ans: 1 },
    { q: "Second Conditional formula?", hint: "Xayoliy vaziyat",
      options: ["If + present, will", "If + past, would", "If + had, would have", "If + present, would"], ans: 1 },
    { q: "Passive voice da Present Simple formulasi?", hint: "am/is/are + ...",
      options: ["S + V3", "S + am/is/are + V3", "S + was + V3", "S + have + V3"], ans: 1 },
    { q: "'Must not' va 'don't have to' o'rtasidagi farq?", hint: "Taqiq vs zaruriyat emas",
      options: ["Ikkalasi ham taqiq", "mustn't=taqiq, don't have to=shart emas", "Ikkalasi ham majburiy emas", "Ikkalasi ham bir xil"], ans: 1 },
    { q: "Tag question qoidasi qaysi?", hint: "Positive ↔ Negative",
      options: ["Positive → positive tag", "Negative → negative tag", "Positive → negative tag", "Barcha bir xil"], ans: 2 },
    { q: "'She had left before he arrived.' — Bu qaysi zamon?", hint: "O'tmishdagi avvalroq bo'lgan harakat",
      options: ["Past Simple", "Past Perfect", "Past Continuous", "Present Perfect"], ans: 1 },
    { q: "Indirect question da tartib qanday?", hint: "Savol tartibida emas",
      options: ["Auxiliary + S + V", "WH + V + S", "S + V (to'g'ri tartib)", "V + S + O"], ans: 2 },
    { q: "'May' va 'might' farqi?", hint: "Ehtimol darajasi",
      options: ["Farq yo'q", "may=past, might=present", "might=kamroq ehtimol", "may=taqiq"], ans: 2 },
    { q: "Future Perfect formula?", hint: "'By' bilan ishlatiladi",
      options: ["S + will + V", "S + will + have + V3", "S + have + V3", "S + will + be + V-ing"], ans: 1 },
    { q: "Third Conditional nima uchun ishlatiladi?", hint: "O'tmish haqida",
      options: ["Haqiqat", "Xayoliy kelajak", "O'tmishdagi realsiz vaziyat (afsos)", "Ruxsat so'rash"], ans: 2 },
    { q: "'Unless' qanday ma'noni anglatadi?", hint: "Shart",
      options: ["Agar...bo'lsa", "Agar...bo'lmasa", "Chunki", "Lekin"], ans: 1 },
    { q: "Subject question da nima farqli?", hint: "Who/What sub'ekt",
      options: ["do/does qo'shiladi", "do/does qo'shilmaydi", "will ishlatiladi", "past ishlatiladi"], ans: 1 },
    { q: "Modal Passive formula?", hint: "Can, must, should bilan",
      options: ["modal + V3", "modal + be + V3", "modal + have + V3", "modal + been + V3"], ans: 1 },
    { q: "Past Perfect Continuous formula?", hint: "had + been + ...",
      options: ["S + had + V3", "S + had + been + V-ing", "S + was + V-ing", "S + had + V-ing"], ans: 1 },
    { q: "Present Simple da 'she' uchun 'do'dan to'g'ri variant?", hint: "Auxilary verb 3rd person singular",
      options: ["do", "did", "does", "have"], ans: 2 },
  ];

  const flashcards = [
    { tense: 'Present Simple', formula: 'S + V(s/es) + O', hint: 'She works every day.' },
    { tense: 'Present Continuous', formula: 'S + am/is/are + V-ing', hint: 'They are studying now.' },
    { tense: 'Present Perfect', formula: 'S + have/has + V3', hint: 'I have visited Tokyo.' },
    { tense: 'Past Simple', formula: 'S + V2(ed) + O', hint: 'He called yesterday.' },
    { tense: 'Past Continuous', formula: 'S + was/were + V-ing', hint: 'She was sleeping.' },
    { tense: 'Past Perfect', formula: 'S + had + V3', hint: 'She had left already.' },
    { tense: 'Future Simple', formula: 'S + will + V(base)', hint: "It'll rain tomorrow." },
    { tense: 'Be Going To', formula: 'S + am/is/are + going to + V', hint: 'We are going to travel.' },
    { tense: 'First Conditional', formula: "If + Present, will + V", hint: "If it rains, I'll stay." },
    { tense: 'Second Conditional', formula: "If + Past, would + V", hint: "If I had time, I'd go." },
    { tense: 'Third Conditional', formula: "If + had + V3, would + have + V3", hint: "If I had known, I'd have called." },
    { tense: 'Passive (Present)', formula: 'S + am/is/are + V3', hint: 'English is spoken here.' },
  ];

  const memoryTricks = [
    { icon: '🎵', title: 'Rhyme & Rhythm', desc: 'Formulalarni qo\'shiq kabi aytib yodlang: "Subject, verb, object — that\'s all I need to say!" Ovozingiz va ritm yodlashni 3x tezlashtiradi.' },
    { icon: '🖍️', title: 'Color Coding', desc: 'Har bir zamonni <span class="highlight">har xil rang</span> bilan yozing: Present = yashil, Past = qizil, Future = ko\'k. Ko\'rgazmali xotira kuchli!' },
    { icon: '🗓️', title: 'Daily 5 Rule', desc: 'Har kuni <span class="highlight">5 ta yangi formula</span> yod oling. Formulani 3 marta yozing, 3 marta o\'qing, bitta gap tuzing. 10 kunda hammasi yodda!' },
    { icon: '🔁', title: 'Spaced Repetition', desc: 'Flashcard\'larni <span class="highlight">har kuni</span> qaytaring: bugun o\'rgansa, ertaga, 3 kunda, 1 haftada qaytaring. Miyaga chuqur joylashadi.' },
    { icon: '🗣️', title: 'Talk to Yourself', desc: 'Ko\'zguga qarab inglizcha gapiring! "I <span class="highlight">am learning</span> grammar. I <span class="highlight">have studied</span> this before." — Real vaziyatda ishlatish eng yaxshi usul.' },
    { icon: '📖', title: 'Story Method', desc: 'Formulalar asosida kichik hikoya tuzing: "Once, a boy <span class="highlight">was walking</span> (Past Cont.) when he <span class="highlight">saw</span> (Past Simple) a dragon." Hikoya yodlashni 2x osonlashtiradi.' },
    { icon: '🧩', title: 'Chunking', desc: 'Formulani bo\'laklarga ajrating: "S + [will] + [have + been] + [V-ing]". Har qavsdagi qismni alohida yodlang, keyin birlashtiring.' },
    { icon: '🤝', title: 'Pair Practice', desc: 'Do\'stingiz bilan <span class="highlight">savol-javob</span> o\'yining: biri formula aytsа, ikkinchisi misol gapiradi. Musobaqa o\'yini yodlashni juda qiziqarli qiladi!' },
    { icon: '✍️', title: 'Write & Erase', desc: 'Formulani qo\'lda yozing, keyin o\'chiring va <span class="highlight">qayta yozing</span>. 5 marta takrorlang. Qo\'l yozuvi miyani kuchliroq aktivlashtiradi.' },
  ];

  // ===================== STATE =====================
  const [activeTab, setActiveTab] = useState('all');
  const [activeSearch, setActiveSearch] = useState('');
  const [expandedCards, setExpandedCards] = useState([]);
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [quizPool, setQuizPool] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qAnswered, setQAnswered] = useState(false);
  const [qShowResult, setQShowResult] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Refs for scroll reveal
  const revealRefs = useRef([]);

  // ===================== EFFECTS =====================
  useEffect(() => {
    // Initialize quiz
    startQuiz();

    // Scroll reveal observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ===================== FUNCTIONS =====================
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleCard = (index) => {
    setExpandedCards(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filterCards = useCallback(() => {
    return formulas.filter(f => {
      const matchTab = activeTab === 'all' || f.category === activeTab;
      const search = activeSearch.toLowerCase();
      const matchSearch = !search ||
        f.name.toLowerCase().includes(search) ||
        f.pos.toLowerCase().includes(search) ||
        (f.neg && f.neg.toLowerCase().includes(search)) ||
        (f.q && f.q.toLowerCase().includes(search));
      return matchTab && matchSearch;
    });
  }, [activeTab, activeSearch]);

  const renderCards = () => {
    const filtered = filterCards();
    return filtered;
  };

  const handleFilterTab = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (e) => {
    setActiveSearch(e.target.value);
  };

  const renderCheat = () => {
    // Handled in JSX
  };

  const renderMemory = () => {
    // Handled in JSX
  };

  const flipCard = () => {
    setFcFlipped(!fcFlipped);
  };

  const fcNav = (dir) => {
    setFcIndex((fcIndex + dir + flashcards.length) % flashcards.length);
    setFcFlipped(false);
  };

  const startQuiz = () => {
    // Randomize and take first 10
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizPool(shuffled);
    setQIdx(0);
    setQScore(0);
    setQAnswered(false);
    setQShowResult(false);
  };

  const selectAnswer = (selected) => {
    if (qAnswered) return;
    setQAnswered(true);
    if (selected === quizPool[qIdx].ans) {
      setQScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (qIdx + 1 >= quizPool.length) {
      setQShowResult(true);
    } else {
      setQIdx(prev => prev + 1);
      setQAnswered(false);
    }
  };

  const closeModal = (e) => {
    if (e.target.id === 'modal') {
      setModalOpen(false);
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  // ===================== RENDER =====================
  const filteredFormulas = renderCards();
  const currentFC = flashcards[fcIndex];
  const pct = quizPool.length > 0 ? (qIdx / quizPool.length) * 100 : 0;

  return (
    <div className="grammarvault">
    <Header/>
      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">⚡ Ingliz tili grammatikasi</div>
        <h1>Master Every<br /><span>English Formula</span><br />Like a Pro</h1>
        <p>Barcha ingliz tili grammatik formulalari — Present, Past, Future, Conditionals, Modals va yana ko'plari. Quiz, Flashcard va Memory tricks bilan o'rganing.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollToSection('formulas')}>📚 Formulalarni ko'rish</button>
          <button className="btn-secondary" onClick={() => scrollToSection('quiz')}>🧠 Quiz boshlash</button>
        </div>
        <div className="stats">
          <div className="stat"><div className="stat-num">50+</div><div className="stat-label">Grammar Formulas</div></div>
          <div className="stat"><div className="stat-num">4</div><div className="stat-label">Tense Groups</div></div>
          <div className="stat"><div className="stat-num">20</div><div className="stat-label">Quiz Questions</div></div>
          <div className="stat"><div className="stat-num">∞</div><div className="stat-label">Memory Tips</div></div>
        </div>
      </div>

      {/* FORMULAS SECTION */}
      <section id="formulas" className="reveal" ref={el => revealRefs.current[0] = el}>
        <div className="section-header">
          <div className="section-tag">📖 Grammar Formulas</div>
          <div className="section-title">Barcha Ingliz Tili Formulalari</div>
        </div>

        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="Search formula or tense... (e.g. past perfect)" value={activeSearch} onChange={handleSearch} />
        </div>

        <div className="tabs" id="tabsBar">
          {['all', 'present', 'past', 'future', 'modal', 'conditional', 'passive', 'question'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleFilterTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="formulas-grid" id="formulasGrid">
          {filteredFormulas.length > 0 ? filteredFormulas.map((f, i) => (
            <div className="formula-card" key={`${f.category}-${i}`} onClick={() => toggleCard(i)}>
              <div className="card-top">
                <div className="tense-name">{f.name}</div>
                <span className="tense-tag tag-positive">{f.category}</span>
              </div>
              <div className="formula-box">{f.pos}</div>
              <div className="formula-box neg">{f.neg}</div>
              <div className="formula-box q">{f.q}</div>
              <div className="example-text">"{f.posEx}"</div>
              <div className={`card-expand ${expandedCards.includes(i) ? 'open' : ''}`}>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.7rem', lineHeight: 1.6 }}>📌 <strong>Ishlatilishi:</strong> {f.use}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.7rem' }}>⏱ <strong>Signal words:</strong> <em>{f.signal}</em></p>
                <div className="memory-tip">💡 <strong>Tip:</strong> <span dangerouslySetInnerHTML={{ __html: f.tip }} /></div>
                <div style={{ marginTop: '0.7rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
                  ❌ {f.negEx}<br />❓ {f.qEx}
                </div>
              </div>
            </div>
          )) : <p style={{ color: 'var(--muted)', textAlign: 'center', gridColumn: '1/-1', padding: '3rem' }}>Natija topilmadi.</p>}
        </div>
      </section>

      {/* QUIZ */}
      <section id="quiz" className="reveal" style={{ background: 'rgba(124,58,237,0.05)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} ref={el => revealRefs.current[1] = el}>
        <div className="section-header">
          <div className="section-tag">🧠 Mini Quiz</div>
          <div className="section-title">O'z bilimingizni sinab ko'ring</div>
        </div>
        <div className="quiz-wrapper">
          <div className="quiz-box" id="quizBox">
            {!qShowResult ? (
              quizPool.length > 0 && qIdx < quizPool.length ? (
                <>
                  <div className="quiz-progress">
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }}></div></div>
                    <div className="quiz-score">✅ {qScore} | ❌ {qIdx - qScore}</div>
                  </div>
                  <div className="quiz-question">{quizPool[qIdx].q}</div>
                  <div className="quiz-hint" style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>💡 Maslahat: {quizPool[qIdx].hint}</div>
                  <div className="quiz-options">
                    {quizPool[qIdx].options.map((opt, i) => (
                      <button
                        key={i}
                        className={`opt-btn ${qAnswered ? (i === quizPool[qIdx].ans ? 'correct' : (i === qIdx ? 'wrong' : '')) : ''}`}
                        onClick={() => selectAnswer(i)}
                        disabled={qAnswered}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="quiz-feedback" style={{ color: qAnswered ? (qIdx < quizPool.length ? 'var(--accent2)' : 'var(--accent3)') : '' }}>
                    {qAnswered && qIdx < quizPool.length && (
                      <>
                        {quizPool[qIdx].ans === (() => {
                          for (let i = 0; i < 4; i++) if (document.activeElement?.textContent === quizPool[qIdx].options[i]) return i;
                          return -1;
                        })() ? "✅ To'g'ri!" : `❌ Xato. To'g'ri: "${quizPool[qIdx].options[quizPool[qIdx].ans]}"`}
                      </>
                    )}
                  </div>
                  <button className={`quiz-next ${qAnswered ? 'show' : ''}`} onClick={nextQuestion}>Keyingi savol →</button>
                </>
              ) : null
            ) : (
              <div className="quiz-result">
                <div className="result-emoji">
                  {Math.round((qScore / quizPool.length) * 100) >= 80 ? '🏆' : Math.round((qScore / quizPool.length) * 100) >= 60 ? '😊' : '📚'}
                </div>
                <div className="result-score">{qScore}/{quizPool.length}</div>
                <p style={{ color: 'var(--muted)', margin: '0.5rem 0' }}>{Math.round((qScore / quizPool.length) * 100)}% to'g'ri javob</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text)' }}>
                  {Math.round((qScore / quizPool.length) * 100) >= 80 ? "Ajoyib! Siz grammatikani yaxshi bilasiz!" :
                    Math.round((qScore / quizPool.length) * 100) >= 60 ? "Yaxshi! Biroz ko'proq mashq qiling." :
                      "Ko'proq o'qing va qaytadan urinib ko'ring!"}
                </p>
                <button className="restart-btn" onClick={startQuiz}>🔄 Qayta boshlash</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FLASHCARDS */}
      <section id="flashcards" className="reveal" ref={el => revealRefs.current[2] = el}>
        <div className="section-header">
          <div className="section-tag">🃏 Flashcards</div>
          <div className="section-title">Kartochkalar bilan yodlang</div>
        </div>
        <div className="flashcard-section">
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Kartochkani bosing → formula ko'rinadi. O'qing, eslab qoling!</p>
          <div className="fc-counter" id="fcCounter">{fcIndex + 1} / {flashcards.length}</div>
          <div className={`flashcard ${fcFlipped ? 'flipped' : ''}`} id="flashcard" onClick={flipCard}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <div className="fc-label">Tense nomi</div>
                <div className="fc-tense" id="fcTense">{currentFC.tense}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.5rem' }}>Bosing → formula ko'rish uchun</div>
              </div>
              <div className="flashcard-back">
                <div className="fc-label">Formula (Positive)</div>
                <div className="fc-formula" id="fcFormula">{currentFC.formula}</div>
                <div className="fc-hint" id="fcHint">{currentFC.hint}</div>
              </div>
            </div>
          </div>
          <div className="fc-controls">
            <button className="fc-btn fc-prev" onClick={() => fcNav(-1)}>← Oldingi</button>
            <button className="fc-btn fc-next" onClick={() => fcNav(1)}>Keyingi →</button>
          </div>
        </div>
      </section>

      {/* MEMORY TRICKS */}
      <section id="memory" className="reveal" style={{ background: 'rgba(6,214,160,0.03)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} ref={el => revealRefs.current[3] = el}>
        <div className="section-header">
          <div className="section-tag">🧲 Memory Tricks</div>
          <div className="section-title">Formulalarni Tez Yodlash Usullari</div>
        </div>
        <div className="memory-grid" id="memoryGrid">
          {memoryTricks.map((m, i) => (
            <div className="memory-card" key={i}>
              <div className="memory-icon">{m.icon}</div>
              <div className="memory-title">{m.title}</div>
              <div className="memory-desc" dangerouslySetInnerHTML={{ __html: m.desc }} />
            </div>
          ))}
        </div>
      </section>

      {/* CHEATSHEET */}
      <section id="cheatsheet" className="reveal" ref={el => revealRefs.current[4] = el}>
        <div className="section-header">
          <div className="section-tag">📋 Quick Cheatsheet</div>
          <div className="section-title">Barcha Formulalar Jadvali</div>
        </div>
        <div className="cheatsheet-table">
          <table id="cheatTable">
            <thead>
              <tr>
                <th>Tense / Structure</th>
                <th>Positive Formula</th>
                <th>Negative Formula</th>
                <th>Question Formula</th>
                <th>Signal Words</th>
              </tr>
            </thead>
            <tbody id="cheatBody">
              {formulas.map((f, i) => (
                <tr key={i}>
                  <td><strong>{f.name}</strong></td>
                  <td className="mono">{f.pos}</td>
                  <td className="mono neg">{f.neg}</td>
                  <td className="mono q">{f.q}</td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{f.signal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>Made with ❤️ for Uzbek English learners &nbsp;|&nbsp; <strong>GrammarVault</strong></p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Formulalarni katta ovozda o'qing va kuniga 5 ta yod oling 🚀</p>
      </footer>

      {/* MODAL */}
      <div className={`modal-overlay ${modalOpen ? 'open' : ''}`} id="modal" onClick={closeModal}>
        <div className="modal" id="modalContent">
          <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
          <div id="modalBody" dangerouslySetInnerHTML={{ __html: modalContent }} />
        </div>
      </div>
    </div>
  );
};

export default GrammarVault;