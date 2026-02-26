'use client'
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './exercise.css';
import Header from '../header';

const EduVault = () => {
  // ===== DATA =====
  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const cefrData = {
    A1: {
      name: 'Beginner', color: '#69f0ae',
      desc: 'Basic greetings, numbers, simple sentences.',
      topics: ['Hello/Goodbye', 'Numbers 1-100', 'Colors & Days', 'Simple Present: I am, You are', 'Basic vocabulary: food, family']
    },
    A2: {
      name: 'Elementary', color: '#40c4ff',
      desc: 'Simple daily conversations, past tense, descriptions.',
      topics: ['Past Simple (regular verbs)', 'Describing people & places', 'Comparatives & Superlatives', 'Can/Can\'t for ability', 'Common vocabulary: work, hobbies']
    },
    B1: {
      name: 'Intermediate', color: '#ffab00',
      desc: 'Handle most travel situations, express opinions.',
      topics: ['Present Perfect vs Past Simple', 'Conditionals 1 & 2', 'Modal verbs: must, should, might', 'Passive voice (basic)', 'Vocabulary: news, environment, technology']
    },
    B2: {
      name: 'Upper-Intermediate', color: '#ff7043',
      desc: 'Interact with native speakers with fluency.',
      topics: ['All conditionals including 3rd', 'Reported speech (complex)', 'Passive voice (all tenses)', 'Subjunctive & unreal past', 'Academic vocabulary (AWL)']
    },
    C1: {
      name: 'Advanced', color: '#ce93d8',
      desc: 'Fluent, spontaneous, effective language use.',
      topics: ['Complex sentence structures', 'Nominalisation & formal register', 'Inversion & emphasis', 'Collocation & idioms', 'Academic writing style']
    },
    C2: {
      name: 'Mastery', color: '#f48fb1',
      desc: 'Express spontaneously with precision and nuance.',
      topics: ['Nuanced vocabulary & register', 'Stylistic variation', 'Discourse analysis', 'Rhetorical devices', 'Native-level idioms & phraseology']
    },
  };

  const vocabWords = [
    { w: 'Eloquent', p: '/ˈel.ə.kwənt/', d: 'Fluent or persuasive in speaking', e: '"She gave an eloquent speech."' },
    { w: 'Ambiguous', p: '/æmˈbɪɡ.ju.əs/', d: 'Open to more than one interpretation', e: '"The instructions were ambiguous."' },
    { w: 'Benevolent', p: '/bɪˈnev.ə.lənt/', d: 'Well-meaning and kindly', e: '"A benevolent leader."' },
    { w: 'Pragmatic', p: '/præɡˈmæt.ɪk/', d: 'Dealing with things practically', e: '"We need a pragmatic approach."' },
    { w: 'Resilient', p: '/rɪˈzɪl.i.ənt/', d: 'Able to recover quickly from difficulties', e: '"Children are surprisingly resilient."' },
    { w: 'Cynical', p: '/ˈsɪn.ɪ.kəl/', d: 'Distrustful of people\'s motives', e: '"He became cynical after the betrayal."' },
    { w: 'Inevitable', p: '/ɪˈnev.ɪ.tə.bəl/', d: 'Certain to happen; unavoidable', e: '"Change is inevitable."' },
    { w: 'Scrutinize', p: '/ˈskruː.tɪ.naɪz/', d: 'To examine closely and critically', e: '"The data was scrutinized carefully."' },
  ];

  const scrambleList = [
    { sc: 'TEBAED', word: 'DEBATE', hint: 'A formal discussion or argument 💬' },
    { sc: 'CIPRATCE', word: 'PRACTICE', hint: 'To do repeatedly to improve 🔄' },
    { sc: 'RCSIUO', word: 'CURIOUS', hint: 'Eager to learn or know things 🔍' },
    { sc: 'LGNAAUEG', word: 'LANGUAGE', hint: 'A system of communication 🗣️' },
    { sc: 'TRUEFU', word: 'FUTURE', hint: 'The time that is yet to come 🚀' },
  ];

  const matchPairs = [['happy', 'joyful'], ['angry', 'furious'], ['big', 'large'], ['fast', 'quick']];

  const speakPrompts = [
    "Describe your hometown. What do you like most about it?",
    "Talk about a person who has influenced your life greatly.",
    "Describe a time when you had to make a difficult decision.",
    "What are the advantages and disadvantages of social media?",
    "Describe your ideal job and why you would enjoy it.",
  ];

  const phrases = [
    { p: "In my opinion / From my perspective", u: "Opinion" },
    { p: "On the other hand / However", u: "Contrast" },
    { p: "For instance / For example / Such as", u: "Examples" },
    { p: "As a result / Consequently / Therefore", u: "Result" },
    { p: "In addition / Moreover / Furthermore", u: "Add idea" },
    { p: "To sum up / In conclusion / Overall", u: "Conclusion" },
  ];

  const testQs = [
    { q: 'Present Perfect of "go":', opts: ['has goed', 'have went', 'has gone ✓', 'is gone'], ans: 2 },
    { q: '"If I ___ you, I would apologize."', opts: ['am', 'were ✓', 'will be', 'had been'], ans: 1 },
    { q: 'Passive: "They built this bridge in 1950." →', opts: ['This bridge was built in 1950. ✓', 'This bridge is built in 1950.', 'This bridge built in 1950.', 'This bridge has been built.'], ans: 0 },
    { q: '"He said he ___ tired." (Reported)', opts: ['is', 'was ✓', 'were', 'be'], ans: 1 },
    { q: 'Correct preposition: "I\'m afraid ___ spiders."', opts: ['from', 'about', 'of ✓', 'for'], ans: 2 },
    { q: 'Article: "___ Mount Everest is the highest mountain."', opts: ['A', 'An', 'The ✓', '-'], ans: 2 },
    { q: 'To Be To: Formal instruction:', opts: ['You should wait here.', 'You are to wait here. ✓', 'You can wait here.', 'You might wait here.'], ans: 1 },
    { q: '"Unless you hurry, you ___ miss the train."', opts: ["won't", 'will ✓', 'would', 'might not'], ans: 1 },
  ];

  const conditionalData = [
    { type: 'Zero', formula: 'If + Present, Present', example: 'If you heat ice, it melts.', use: 'General truths' },
    { type: 'First', formula: 'If + Present, will + V', example: 'If it rains, I\'ll stay.', use: 'Real future possibility' },
    { type: 'Second', formula: 'If + Past, would + V', example: 'If I had money, I\'d travel.', use: 'Unreal present/future' },
    { type: 'Third', formula: 'If + had+V3, would+have+V3', example: 'If I had studied, I\'d have passed.', use: 'Unreal past' },
    { type: 'Mixed', formula: 'If + had+V3, would + V', example: 'If I\'d trained, I\'d be fit now.', use: 'Past cause, present result' },
  ];

  const creativePrompts = [
    '"The door had been locked for 20 years..."',
    '"She opened the letter and gasped..."',
    '"The last robot on Earth woke up..."',
    '"No one believed him until the day..."',
  ];

  const puzzles = [
    { words: ['The', 'cat', 'on', 'sat', 'the', 'mat'], answer: 'The cat sat on the mat' },
    { words: ['is', 'English', 'spoken', 'worldwide'], answer: 'English is spoken worldwide' },
    { words: ['have', 'I', 'finished', 'just', 'my', 'homework'], answer: 'I have just finished my homework' },
  ];

  const speedQs = [
    { q: '"went" is past of:', a: 'go' },
    { q: 'Plural of "child":', a: 'children' },
    { q: '"happy" antonym:', a: 'sad' },
    { q: 'Past of "write":', a: 'wrote' },
    { q: '3rd person of "have":', a: 'has' },
    { q: '"large" synonym:', a: 'big' },
  ];

  const hangmanWords = [
    { w: 'GRAMMAR', hint: 'The rules of language' },
    { w: 'CONDITIONAL', hint: 'If-clause structures' },
    { w: 'VOCABULARY', hint: 'Words and their meanings' },
    { w: 'PREPOSITION', hint: 'in, on, at, by...' },
    { w: 'ELOQUENT', hint: 'Speaking persuasively' },
  ];

  const hangArts = ['😊', '😟', '😰', '😱', '💀', '☠️'];

  const ieltsTips = [
    { icon: '📖', t: 'Reading', tip: 'Always skim first (2-3 min), then read questions, then scan for answers.' },
    { icon: '🎧', t: 'Listening', tip: 'Read questions BEFORE the audio plays. Write answers as you listen.' },
    { icon: '✍️', t: 'Writing Task 1', tip: 'Always describe trends, not just numbers. Use "whereas" and "while" for contrast.' },
    { icon: '✍️', t: 'Writing Task 2', tip: '4-paragraph structure: Intro, Body 1, Body 2, Conclusion. Always state your opinion clearly.' },
    { icon: '🗣️', t: 'Speaking', tip: "Don't memorize answers. Speak naturally, extend answers with examples and reasons." },
    { icon: '📝', t: 'Vocabulary', tip: 'Use paraphrasing. Replace question words in your answers (innovative = new and original).' },
  ];

  const academicVocab = [
    { w: 'Phenomenon', d: 'An observable event or circumstance', e: 'Climate change is a complex phenomenon.' },
    { w: 'Hypothesis', d: 'A proposed explanation for an observation', e: 'The hypothesis was supported by data.' },
    { w: 'Correlation', d: 'A mutual relationship between variables', e: 'There is a correlation between diet and health.' },
    { w: 'Significant', d: 'Important; large enough to be noticeable', e: 'The results showed significant improvement.' },
    { w: 'Constitute', d: 'To make up or form', e: 'Women constitute 52% of the population.' },
    { w: 'Consequently', d: 'As a result; therefore', e: 'He missed the train. Consequently, he was late.' },
  ];

  const bandTips = [
    { band: 'Band 5.0', color: 'var(--red)', desc: 'Limited vocabulary. Basic sentences. Frequent errors.' },
    { band: 'Band 6.0', color: 'var(--amber)', desc: 'Generally effective. Some errors in complex sentences.' },
    { band: 'Band 7.0', color: 'var(--green)', desc: 'Good range of grammar and vocabulary. Minor errors.' },
    { band: 'Band 8.0', color: 'var(--teal)', desc: 'Very high proficiency. Occasional minor errors.' },
    { band: 'Band 9.0', color: '#ce93d8', desc: 'Expert user. Fully operational command.' },
  ];

  // ===== STATE =====
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentCEFR, setCurrentCEFR] = useState('B1');
  const [activeNav, setActiveNav] = useState('Topics');
  const [activeTopic, setActiveTopic] = useState(null);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [vcIdx, setVcIdx] = useState(0);
  const [scIdx, setScIdx] = useState(0);
  const [scrambleInput, setScrambleInput] = useState('');
  const [scrambleFb, setScrambleFb] = useState({ show: false, message: '', type: '' });
  const [matchPairsList, setMatchPairsList] = useState([]);
  const [matchSelected, setMatchSelected] = useState(null);
  const [matchDoneCount, setMatchDoneCount] = useState(0);
  const [grammarFillAnswers, setGrammarFillAnswers] = useState({});
  const [grammarFillResult, setGrammarFillResult] = useState({ show: false, message: '', type: '' });
  const [transformInput, setTransformInput] = useState('');
  const [transformResult, setTransformResult] = useState({ show: false, message: '', type: '' });
  const [condFill1, setCondFill1] = useState('');
  const [condFill2, setCondFill2] = useState('');
  const [condFillResult, setCondFillResult] = useState({ show: false, message: '', type: '' });
  const [passiveFillAnswers, setPassiveFillAnswers] = useState({});
  const [passiveFillResult, setPassiveFillResult] = useState({ show: false, message: '', type: '' });
  const [reportedFill, setReportedFill] = useState('');
  const [reportedFillResult, setReportedFillResult] = useState({ show: false, message: '', type: '' });
  const [articleFillAnswers, setArticleFillAnswers] = useState({});
  const [articleFillResult, setArticleFillResult] = useState({ show: false, message: '', type: '' });
  const [tobToFill, setTobToFill] = useState('');
  const [tobToFillResult, setTobToFillResult] = useState({ show: false, message: '', type: '' });
  const [prepFillAnswers, setPrepFillAnswers] = useState({});
  const [prepFillResult, setPrepFillResult] = useState({ show: false, message: '', type: '' });
  const [tenseFill, setTenseFill] = useState('');
  const [tenseFillResult, setTenseFillResult] = useState({ show: false, message: '', type: '' });
  const [speakIdx, setSpeakIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [writingTask1, setWritingTask1] = useState('');
  const [writingTask2, setWritingTask2] = useState('');
  const [writingCreative, setWritingCreative] = useState('');
  const [writingFb1, setWritingFb1] = useState({ show: false, message: '', type: '' });
  const [writingFb2, setWritingFb2] = useState({ show: false, message: '', type: '' });
  const [writingFbCreative, setWritingFbCreative] = useState({ show: false, message: '', type: '' });
  const [writingTab, setWritingTab] = useState('task1');
  const [readingTab, setReadingTab] = useState('p1');
  const [testTab, setTestTab] = useState('general');
  const [ieltsMainTab, setIeltsMainTab] = useState('overview');
  const [creativePromptIdx, setCreativePromptIdx] = useState(0);
  const [audioPlaying1, setAudioPlaying1] = useState(false);
  const [audioPlaying2, setAudioPlaying2] = useState(false);
  const [ieltsListenAnswers, setIeltsListenAnswers] = useState({});
  const [ieltsListenResult, setIeltsListenResult] = useState({ show: false, message: '', type: '' });
  const [testIdx, setTestIdx] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [testAnswered, setTestAnswered] = useState(false);
  const [formulaBuildResult, setFormulaBuildResult] = useState({ show: false, message: '', type: '' });
  const [mxFillAnswer, setMxFillAnswer] = useState('');
  const [mxFillResult, setMxFillResult] = useState({ show: false, message: '', type: '' });
  const [chainWords, setChainWords] = useState([]);
  const [chainInput, setChainInput] = useState('');
  const [chainFb, setChainFb] = useState({ show: false, message: '', type: '' });
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [puzzleSelected, setPuzzleSelected] = useState([]);
  const [puzzleDisabled, setPuzzleDisabled] = useState([]);
  const [puzzleFb, setPuzzleFb] = useState({ show: false, message: '', type: '' });
  const [speedIdx, setSpeedIdx] = useState(0);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedTime, setSpeedTime] = useState(30);
  const [speedActive, setSpeedActive] = useState(false);
  const [speedInput, setSpeedInput] = useState('');
  const [speedFb, setSpeedFb] = useState({ show: false, message: '', type: '' });
  const [hangIdx, setHangIdx] = useState(0);
  const [hangGuessed, setHangGuessed] = useState([]);
  const [hangWrong, setHangWrong] = useState(0);
  const [hangFb, setHangFb] = useState({ show: false, message: '', type: '' });
  const [lScore, setLScore] = useState(6.5);
  const [rScore, setRScore] = useState(6.0);
  const [wScore, setWScore] = useState(6.0);
  const [sScore, setSScore] = useState(6.5);
  const [ieltsBand, setIeltsBand] = useState(null);

  // Client-side only flag
  const [isClient, setIsClient] = useState(false);

  // Refs for scroll reveal
  const revealRefs = useRef([]);

  // ===== EFFECTS =====
  useEffect(() => {
    setIsClient(true);
    initMatchGame();
    initHangman();

    // Scroll reveal observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
        }
      });
    }, { threshold: 0.08 });

    revealRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timer;
    if (speedActive && speedTime > 0) {
      timer = setTimeout(() => {
        setSpeedTime(prev => prev - 1);
      }, 1000);
    } else if (speedTime === 0) {
      setSpeedActive(false);
    }
    return () => clearTimeout(timer);
  }, [speedActive, speedTime]);

  // ===== FUNCTIONS =====
  const updateStats = (correct) => {
    setDone(prev => prev + 1);
    setStreak(prev => correct ? prev + 1 : 0);
    if (correct) {
      setScore(prev => prev + 10 + (streak > 3 ? 5 : 0));
    }
  };

  const scrollToSec = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const setCEFR = (lvl) => {
    setCurrentCEFR(lvl);
  };

  const cycleCEFR = () => {
    const idx = cefrLevels.indexOf(currentCEFR);
    const nextIdx = (idx + 1) % cefrLevels.length;
    setCurrentCEFR(cefrLevels[nextIdx]);
  };

  const openTopic = (id) => {
    if (activeTopic === id) {
      setActiveTopic(null);
    } else {
      setActiveTopic(id);
      setTimeout(() => {
        const panel = document.getElementById('panel-' + id);
        if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const renderVocab = () => {
    const f = vocabWords[vcIdx % vocabWords.length];
    return f;
  };

  const flipVocab = () => {
    setFcFlipped(!fcFlipped);
  };

  const nextVocab = () => {
    setVcIdx(prev => prev + 1);
    setFcFlipped(false);
  };

  const checkScramble = () => {
    const s = scrambleList[scIdx % scrambleList.length];
    const ok = scrambleInput.trim().toUpperCase() === s.word;
    setScrambleFb({
      show: true,
      message: ok ? '✅ Correct! Well done!' : `❌ Wrong. Answer: ${s.word}`,
      type: ok ? 'success' : 'error'
    });
    updateStats(ok);
    if (ok) {
      setTimeout(() => nextScramble(), 1000);
    }
  };

  const nextScramble = () => {
    setScIdx(prev => prev + 1);
    setScrambleInput('');
    setScrambleFb({ show: false, message: '', type: '' });
  };

  const initMatchGame = () => {
    const all = [...matchPairs.map(p => ({ t: p[0], g: 'left' })), ...matchPairs.map(p => ({ t: p[1], g: 'right' }))];
    all.sort(() => Math.random() - 0.5);
    setMatchPairsList(all);
    setMatchSelected(null);
    setMatchDoneCount(0);
  };

  const selectMatch = (item, index) => {
    if (item.matched) return;

    if (!matchSelected) {
      setMatchSelected({ ...item, index });
    } else {
      const pair = matchPairs.find(p =>
        (p[0] === matchSelected.t && p[1] === item.t) || (p[1] === matchSelected.t && p[0] === item.t)
      );
      if (pair) {
        setMatchPairsList(prev => prev.map((p, i) => {
          if (i === matchSelected.index || i === index) {
            return { ...p, matched: true };
          }
          return p;
        }));
        setMatchDoneCount(prev => prev + 2);
        updateStats(true);
      } else {
        updateStats(false);
      }
      setMatchSelected(null);
    }
  };

  const checkGrammarFill = () => {
    const expected = { gf1: 'has worked', gf2: 'had left', gf3: 'will be submitted' };
    let correct = 0;
    let total = 0;
    ['gf1', 'gf2', 'gf3'].forEach(id => {
      const val = grammarFillAnswers[id] || '';
      if (val.toLowerCase() === expected[id]) {
        correct++;
      }
      total++;
    });
    setGrammarFillResult({
      show: true,
      message: `${correct}/${total} correct!`,
      type: correct === total ? 'success' : correct > 0 ? 'partial' : 'error'
    });
    updateStats(correct === total);
  };

  const checkTransform = () => {
    const ok = transformInput.toLowerCase().includes('wish i had studied');
    setTransformResult({
      show: true,
      message: ok ? '✅ "I wish I had studied harder." — Correct!' : '💡 Expected: "I wish I had studied harder."',
      type: ok ? 'success' : 'partial'
    });
  };

  const checkCondFill = () => {
    const ok = condFill1.toLowerCase() === 'had studied' && condFill2.toLowerCase() === 'would have passed';
    setCondFillResult({
      show: true,
      message: ok ? '✅ Perfect Third Conditional!' : '💡 Answer: "had studied" ... "would have passed"',
      type: ok ? 'success' : 'partial'
    });
    updateStats(ok);
  };

  const checkPassive = () => {
    const expected = { pf1: 'is cleaned', pf2: 'has been stolen' };
    let correct = 0;
    ['pf1', 'pf2'].forEach(id => {
      if ((passiveFillAnswers[id] || '').toLowerCase() === expected[id]) correct++;
    });
    setPassiveFillResult({
      show: true,
      message: correct === 2 ? '✅ Both correct!' : correct === 1 ? '1/2 correct' : '❌ Check your answers.',
      type: correct === 2 ? 'success' : correct === 1 ? 'partial' : 'error'
    });
    updateStats(correct === 2);
  };

  const checkReportedFill = () => {
    const ok = reportedFill.toLowerCase().includes('was going');
    setReportedFillResult({
      show: true,
      message: ok ? '✅ Correct!' : '❌ Wrong. Answer: "was going"',
      type: ok ? 'success' : 'error'
    });
    updateStats(ok);
  };

  const checkArticleFill = () => {
    const expected = { art1: 'an', art2: 'the', art3: 'the' };
    let correct = 0;
    ['art1', 'art2', 'art3'].forEach(id => {
      if ((articleFillAnswers[id] || '').toLowerCase() === expected[id]) correct++;
    });
    setArticleFillResult({
      show: true,
      message: `${correct}/3 correct!`,
      type: correct === 3 ? 'success' : correct > 0 ? 'partial' : 'error'
    });
    updateStats(correct === 3);
  };

  const checkTobToFill = () => {
    const ok = tobToFill.toLowerCase() === 'are to';
    setTobToFillResult({
      show: true,
      message: ok ? '✅ Correct!' : '❌ Wrong. Answer: "are to"',
      type: ok ? 'success' : 'error'
    });
    updateStats(ok);
  };

  const checkPrepFill = () => {
    const expected = { pr1: 'in', pr2: 'on', pr3: 'at', pr4: 'at' };
    let correct = 0;
    ['pr1', 'pr2', 'pr3', 'pr4'].forEach(id => {
      if ((prepFillAnswers[id] || '').toLowerCase() === expected[id]) correct++;
    });
    setPrepFillResult({
      show: true,
      message: `${correct}/4 correct!`,
      type: correct === 4 ? 'success' : correct >= 2 ? 'partial' : 'error'
    });
    updateStats(correct >= 3);
  };

  const checkTenseFill = () => {
    const ok = tenseFill.toLowerCase() === 'were playing';
    setTenseFillResult({
      show: true,
      message: ok ? '✅ Correct!' : '❌ Wrong. Answer: "were playing"',
      type: ok ? 'success' : 'error'
    });
    updateStats(ok);
  };

  const nextSpeakPrompt = () => {
    setSpeakIdx(prev => (prev + 1) % speakPrompts.length);
    setIsRecording(false);
  };

  const toggleSpeak = () => {
    setIsRecording(!isRecording);
  };

  const wCount = (text) => {
    const words = text.trim().split(/\s+/).filter(w => w).length;
    return words;
  };

  const wTab = (tab) => {
    setWritingTab(tab);
  };

  const submitWriting = (type) => {
    let text = '';
    let setFb = null;
    let limit = 0;

    if (type === 'task1') {
      text = writingTask1;
      setFb = setWritingFb1;
      limit = 150;
    } else if (type === 'task2') {
      text = writingTask2;
      setFb = setWritingFb2;
      limit = 250;
    } else {
      text = writingCreative;
      setFb = setWritingFbCreative;
      limit = 200;
    }

    const wc = wCount(text);
    if (wc < 30) {
      setFb({ show: true, message: '✏️ Please write more before submitting!', type: 'partial' });
      return;
    }

    const hasCohesion = ['however', 'moreover', 'furthermore', 'in addition', 'consequently', 'therefore']
      .some(w => text.toLowerCase().includes(w));
    const tips = [];
    if (!hasCohesion) tips.push('💡 Add more cohesive devices (however, moreover, therefore)');
    if (wc < 100) tips.push('💡 Expand your answer with more examples and details');
    if (text.split('.').length < 3) tips.push('💡 Use more varied sentence structures');

    setFb({
      show: true,
      message: `<strong style="color:var(--green)">✅ Submitted! (${wc} words)</strong>${tips.length ? '<br>' + tips.join('<br>') : '<br>Well done!'}`,
      type: 'success'
    });
    updateStats(wc >= 50);
  };

  const newCreativePrompt = () => {
    setCreativePromptIdx(prev => (prev + 1) % creativePrompts.length);
  };

  const rTab = (tab) => {
    setReadingTab(tab);
  };

  const testTabHandler = (tab) => {
    setTestTab(tab);
    if (tab === 'general') {
      setTestIdx(0);
      setTestScore(0);
      setTestAnswered(false);
    }
  };

  const ieltsMain = (tab) => {
    setIeltsMainTab(tab);
  };

  const togglePlay = (num) => {
    if (num === 1) setAudioPlaying1(!audioPlaying1);
    if (num === 2) setAudioPlaying2(!audioPlaying2);
  };

  const checkIeltsListen = () => {
    const expected = { il1: 'johnson', il2: 'double', il3: '3' };
    let correct = 0;
    ['il1', 'il2', 'il3'].forEach(id => {
      if ((ieltsListenAnswers[id] || '').toLowerCase() === expected[id]) correct++;
    });
    setIeltsListenResult({
      show: true,
      message: `${correct}/3 correct! ${correct === 3 ? 'Perfect!' : 'Check answers: Johnson, double, 3'}`,
      type: correct === 3 ? 'success' : correct > 0 ? 'partial' : 'error'
    });
    updateStats(correct === 3);
  };

  const renderTest = () => {
    if (testIdx >= testQs.length) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏆</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--fm)', color: 'var(--green)' }}>
            {testScore}/{testQs.length}
          </div>
          <p style={{ color: 'var(--muted)', margin: '0.5rem 0' }}>Test complete!</p>
          <button className="restart-btn" onClick={() => { setTestIdx(0); setTestScore(0); setTestAnswered(false); }}>Restart</button>
        </div>
      );
    }
    return null;
  };

  const answerTest = (selected) => {
    if (testAnswered) return;
    const q = testQs[testIdx];
    setTestAnswered(true);
    if (selected === q.ans) {
      setTestScore(prev => prev + 1);
      updateStats(true);
    } else {
      updateStats(false);
    }
  };

  const nextTest = () => {
    setTestIdx(prev => prev + 1);
    setTestAnswered(false);
  };

  const checkFormulaBuild = (result) => {
    setFormulaBuildResult({
      show: true,
      message: result === 'correct' ? '✅ Correct! S + had + been + V-ing' : '❌ Wrong!',
      type: result
    });
    updateStats(result === 'correct');
  };

  const checkMxFill = () => {
    const ok = mxFillAnswer.toLowerCase() === 'discovery';
    setMxFillResult({
      show: true,
      message: ok ? '✅ Correct!' : '❌ Wrong. Answer: discovery',
      type: ok ? 'success' : 'error'
    });
    updateStats(ok);
  };

  const addChainWord = () => {
    const word = chainInput.trim().toLowerCase();
    if (!word) return;

    if (chainWords.length > 0) {
      const lastWord = chainWords[chainWords.length - 1];
      const lastLetter = lastWord[lastWord.length - 1];
      if (word[0] !== lastLetter) {
        setChainFb({
          show: true,
          message: `❌ Must start with "${lastLetter.toUpperCase()}"`,
          type: 'error'
        });
        return;
      }
    }

    if (chainWords.includes(word)) {
      setChainFb({
        show: true,
        message: '❌ Already used!',
        type: 'error'
      });
      return;
    }

    setChainWords(prev => [...prev, word]);
    setChainInput('');
    setChainFb({
      show: true,
      message: `✅ Next word must start with "${word[word.length - 1].toUpperCase()}"`,
      type: 'partial'
    });
    updateStats(true);
  };

  const newPuzzle = () => {
    setPuzzleIdx(prev => (prev + 1) % puzzles.length);
    setPuzzleSelected([]);
    setPuzzleDisabled([]);
    setPuzzleFb({ show: false, message: '', type: '' });
  };

  const addToPuzzle = (word) => {
    setPuzzleSelected(prev => [...prev, word]);
    setPuzzleDisabled(prev => [...prev, word]);
  };

  const checkPuzzle = () => {
    const p = puzzles[puzzleIdx % puzzles.length];
    const ans = puzzleSelected.join(' ');
    const ok = ans.toLowerCase() === p.answer.toLowerCase();
    setPuzzleFb({
      show: true,
      message: ok ? '✅ Correct sentence!' : '❌ Not quite. Try again!',
      type: ok ? 'success' : 'error'
    });
    updateStats(ok);
  };

  const startSpeedQuiz = () => {
    setSpeedIdx(0);
    setSpeedScore(0);
    setSpeedTime(30);
    setSpeedActive(true);
    setSpeedInput('');
    setSpeedFb({ show: false, message: '', type: '' });
  };

  const checkSpeedQ = () => {
    const q = speedQs[speedIdx % speedQs.length];
    const ok = speedInput.trim().toLowerCase() === q.a.toLowerCase();
    if (ok) {
      setSpeedScore(prev => prev + 2);
    }
    setSpeedFb({
      show: true,
      message: ok ? '✅ +2' : `❌ Answer: ${q.a}`,
      type: ok ? 'success' : 'error'
    });
    setSpeedIdx(prev => prev + 1);
    setSpeedInput('');
  };

  const renderSpeedQ = () => {
    const q = speedQs[speedIdx % speedQs.length];
    return q;
  };

  const initHangman = () => {
    setHangGuessed([]);
    setHangWrong(0);
    setHangFb({ show: false, message: '', type: '' });
  };

  const guessLetter = (l) => {
    if (hangGuessed.includes(l)) return;
    setHangGuessed(prev => [...prev, l]);
    const hw = hangmanWords[hangIdx % hangmanWords.length];
    if (!hw.w.includes(l)) {
      setHangWrong(prev => prev + 1);
    } else {
      // Check if won
      const allLetters = hw.w.split('');
      const allGuessed = [...hangGuessed, l];
      const won = allLetters.every(c => allGuessed.includes(c));
      if (won) {
        setHangFb({
          show: true,
          message: '🎉 You won!',
          type: 'success'
        });
        updateStats(true);
        setTimeout(() => {
          setHangIdx(prev => (prev + 1) % hangmanWords.length);
          initHangman();
        }, 1500);
      }
    }

    if (hangWrong >= 4) {
      setHangFb({
        show: true,
        message: `💀 Word was: ${hangmanWords[hangIdx % hangmanWords.length].w}`,
        type: 'error'
      });
      setTimeout(() => {
        setHangIdx(prev => (prev + 1) % hangmanWords.length);
        initHangman();
      }, 2000);
    }
  };
  

  const calcIELTS = () => {
    const avg = (lScore + rScore + wScore + sScore) / 4;
    const rounded = Math.round(avg * 2) / 2;
    setIeltsBand(rounded);
  };

  const renderCEFR = () => {
    const d = cefrData[currentCEFR];
    return (
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid var(--border)'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          <span style={{
            fontFamily: 'var(--fm)',
            fontSize: '2rem',
            fontWeight: 800,
            color: d.color
          }}>
            {currentCEFR}
          </span>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{d.name}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{d.desc}</div>
          </div>
        </div>
        <div className="sec-tag" style={{ marginBottom: '0.8rem' }}>
          Learning Objectives for {currentCEFR}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '0.6rem'
        }}>
          {d.topics.map((t, i) => (
            <div key={i} style={{
              background: 'var(--card)',
              borderRadius: '8px',
              padding: '0.7rem 1rem',
              fontSize: '0.85rem',
              borderLeft: `3px solid ${d.color}`
            }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ===== MEMOIZED VALUES (fixes hydration error) =====
  const currentVocab = useMemo(() => renderVocab(), [vcIdx]);
  const currentScramble = useMemo(() => scrambleList[scIdx % scrambleList.length], [scIdx]);
  const currentPuzzle = useMemo(() => puzzles[puzzleIdx % puzzles.length], [puzzleIdx]);
  const currentSpeedQ = useMemo(() => renderSpeedQ(), [speedIdx]);
  const currentHangman = useMemo(() => hangmanWords[hangIdx % hangmanWords.length], [hangIdx]);
  
  // Stable puzzle words - no random sort on server
  const puzzleWords = useMemo(() => {
    if (!isClient) return currentPuzzle.words;
    // Only shuffle on client after mount
    return [...currentPuzzle.words].sort(() => Math.random() - 0.5);
  }, [currentPuzzle, isClient]);

  const hangDisplay = useMemo(() => 
    currentHangman.w.split('').map(c => hangGuessed.includes(c) ? c : '_').join(' '), 
    [currentHangman, hangGuessed]
  );
  
  const hangArt = useMemo(() => 
    hangArts[Math.min(hangWrong, hangArts.length - 1)], 
    [hangWrong]
  );

  return (
    <div className="eduvault">
      <div className="ambient"></div>

      {/* NAV */}
    <Header/>
      {/* HERO */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-tag">⚡ Full English Learning Hub</div>
          <h1>Master English<br /><em>Exercises</em></h1>
          <p>Barcha mavzular bo'yicha professional exercises. IELTS tayyorgarlik, CEFR darajalari, mini-o'yinlar va interaktiv mashqlar.</p>
          <div className="cefr-row">
            {cefrLevels.map(lvl => (
              <button
                key={lvl}
                className={`cefr-btn ${currentCEFR === lvl ? 'sel' : ''}`}
                data-c={lvl}
                onClick={() => setCEFR(lvl)}
              >
                {lvl} {lvl === 'A1' ? 'Beginner' : lvl === 'A2' ? 'Elementary' : lvl === 'B1' ? 'Intermediate' : lvl === 'B2' ? 'Upper-Int' : lvl === 'C1' ? 'Advanced' : 'Mastery'}
              </button>
            ))}
          </div>
          <div className="scoreboard" style={{ justifyContent: 'center', maxWidth: 600, margin: '0 auto' }}>
            <div className="score-item"><div className="score-num">{score}</div><div className="score-label">Score</div></div>
            <div className="score-item"><div className="score-num">{done}</div><div className="score-label">Done</div></div>
            <div className="score-item"><div className="score-num">{streak}🔥</div><div className="score-label">Streak</div></div>
          </div>
        </div>
      </div>

      <div className="main">
        {/* TOPICS */}
        <div id="topics" className="sec reveal" ref={el => revealRefs.current[0] = el}>
          <div className="sec-hdr">
            <div>
              <div className="sec-tag">📚 Learning Topics</div>
              <div className="sec-title">Mavzuni tanlang</div>
            </div>
          </div>
          <div className="topic-grid">
            {[
              { id: 'vocabulary', icon: 'V', name: 'Vocabulary', sub: 'Words & Phrases' },
              { id: 'grammar', icon: 'G', name: 'Grammar', sub: 'Rules & Formulas' },
              { id: 'speaking', icon: 'S', name: 'Speaking', sub: 'Fluency Tasks' },
              { id: 'writing', icon: 'W', name: 'Writing', sub: 'Tasks 1 & 2' },
              { id: 'listening', icon: 'L', name: 'Listening', sub: 'Audio Mock' },
              { id: 'reading', icon: 'R', name: 'Reading', sub: 'Passages & Q' },
              { id: 'formulas', icon: 'F', name: 'Formulalar', sub: 'All Tenses' },
              { id: 'exercises', icon: 'E', name: 'Exercises', sub: 'Mixed Practice' },
              { id: 'conditional', icon: 'I', name: 'If Conditional', sub: '0,1,2,3,Mixed' },
              { id: 'zamonlar', icon: 'Z', name: 'Zamonlar', sub: '12 Tenses' },
              { id: 'passive', icon: 'P', name: 'Passive Voice', sub: 'All Forms' },
              { id: 'reported', icon: 'R', name: 'Reported Speech', sub: 'Direct→Indirect' },
              { id: 'article', icon: 'a', name: 'Articles', sub: 'a/an/the/∅' },
              { id: 'tobeto', icon: 'T', name: 'To Be To', sub: 'Modal Expr.' },
              { id: 'predlog', icon: 'P', name: 'Predlog', sub: 'Prepositions' },
              { id: 'tests', icon: 'T', name: 'Tests', sub: 'Full Mock Tests' },
            ].map(topic => (
              <div
                key={topic.id}
                className={`topic-card ${activeTopic === topic.id ? 'active-topic' : ''}`}
                onClick={() => openTopic(topic.id)}
              >
                <div className="topic-icon">{topic.icon}</div>
                <div className="topic-name">{topic.name}</div>
                <div className="topic-sub">{topic.sub}</div>
              </div>
            ))}
          </div>

          {/* TOPIC CONTENT PANELS */}
          <div style={{ marginTop: '2rem' }} id="topicPanels">
            {/* VOCABULARY */}
            {activeTopic === 'vocabulary' && isClient && (
              <div className="content-panel active" id="panel-vocabulary">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">📖 Vocabulary</div>
                    <div className="sec-title">Words & Flashcards</div>
                  </div>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Vocabulary Flashcard</span>
                      <span className="ex-type-badge badge-game">Flashcard</span>
                    </div>
                    <div className="ex-card-body">
                      <div
                        className={`vocab-card-wrap ${fcFlipped ? 'flipped' : ''}`}
                        id="vocabCard"
                        onClick={flipVocab}
                      >
                        <div className="vocab-card-inner">
                          <div className="vocab-front">
                            <div className="vocab-word">{currentVocab.w}</div>
                            <div className="vocab-phonetic">{currentVocab.p}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.8rem' }}>
                              Tap to see meaning
                            </div>
                          </div>
                          <div className="vocab-back">
                            <div className="vocab-def">{currentVocab.d}</div>
                            <div className="vocab-ex">{currentVocab.e}</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button className="check-btn" style={{ flex: 1 }} onClick={nextVocab}>Next Word →</button>
                      </div>
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Word Scramble</span>
                      <span className="ex-type-badge badge-game">Game 🎮</span>
                    </div>
                    <div className="ex-card-body">
                      <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                        Unscramble the word:
                      </div>
                      <div className="scramble-word">{currentScramble.sc}</div>
                      <div className="scramble-hint">Hint: {currentScramble.hint}</div>
                      <input
                        className="scramble-input"
                        value={scrambleInput}
                        onChange={(e) => setScrambleInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && checkScramble()}
                        placeholder="Type your answer..."
                      />
                      <div className="scramble-btns">
                        <button className="scr-btn scr-check" onClick={checkScramble}>✓ Check</button>
                        <button className="scr-btn scr-skip" onClick={nextScramble}>Skip →</button>
                      </div>
                      {scrambleFb.show && (
                        <div className="ex-feedback" style={{ color: scrambleFb.type === 'success' ? 'var(--green)' : 'var(--red)' }}>
                          {scrambleFb.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Synonym Match</span>
                      <span className="ex-type-badge badge-match">Matching</span>
                    </div>
                    <div className="ex-card-body">
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
                        Match each word with its synonym:
                      </p>
                      <div className="match-grid" id="matchGrid">
                        {matchPairsList.map((item, i) => (
                          <div
                            key={i}
                            className={`match-item ${item.matched ? 'matched' : ''} ${matchSelected?.index === i ? 'selected' : ''}`}
                            onClick={() => selectMatch(item, i)}
                          >
                            {item.t}
                          </div>
                        ))}
                      </div>
                      {matchDoneCount === matchPairs.length * 2 && (
                        <div className="ex-feedback" style={{ color: 'var(--green)' }}>
                          🎉 All matched! Perfect!
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">MCQ: Choose Correct Word</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="vocabQuizBody">
                      <div className="ex-q">
                        Choose the word that means <em>"showing a clever way of solving a problem"</em>:
                      </div>
                      <div className="options-list">
                        {['Ambiguous', 'Ingenious', 'Cynical', 'Verbose'].map((opt, i) => (
                          <button key={i} className="opt"> {opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GRAMMAR */}
            {activeTopic === 'grammar' && isClient && (
              <div className="content-panel active" id="panel-grammar">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">⚙️ Grammar</div>
                    <div className="sec-title">Grammar Exercises</div>
                  </div>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Fill in the Blank</span>
                      <span className="ex-type-badge badge-fill">Fill</span>
                    </div>
                    <div className="ex-card-body">
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                        Complete the sentences with the correct verb form:
                      </p>
                      <div id="grammarFill">
                        <div className="fill-sentence">
                          She _____ (work) here since 2020.
                          <input
                            className="fill-input"
                            value={grammarFillAnswers.gf1 || ''}
                            onChange={(e) => setGrammarFillAnswers(prev => ({ ...prev, gf1: e.target.value }))}
                            placeholder="has worked..."
                          />
                        </div>
                        <div className="fill-sentence">
                          By the time I arrived, they _____ (leave).
                          <input
                            className="fill-input"
                            value={grammarFillAnswers.gf2 || ''}
                            onChange={(e) => setGrammarFillAnswers(prev => ({ ...prev, gf2: e.target.value }))}
                            placeholder="had left..."
                          />
                        </div>
                        <div className="fill-sentence">
                          The report _____ (submit) tomorrow.
                          <input
                            className="fill-input"
                            value={grammarFillAnswers.gf3 || ''}
                            onChange={(e) => setGrammarFillAnswers(prev => ({ ...prev, gf3: e.target.value }))}
                            placeholder="will be submitted..."
                          />
                        </div>
                      </div>
                      <button className="check-btn" onClick={checkGrammarFill}>Check Answers</button>
                      {grammarFillResult.show && (
                        <div className={`ex-feedback ${grammarFillResult.type}`}>{grammarFillResult.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Error Correction</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="errorCorrBody">
                      <div className="ex-q">
                        Find the error: "She don't know the answer."
                        <br /><small style={{ color: 'var(--muted)' }}>💡 Third person singular present</small>
                      </div>
                      <div className="options-list">
                        {[
                          '"She not know"',
                          '"She doesn\'t know" ✓',
                          '"She didn\'t knows"',
                          '"She do not knows"'
                        ].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Sentence Transformation</span>
                      <span className="ex-type-badge badge-write">Write</span>
                    </div>
                    <div className="ex-card-body">
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
                        Original: "I regret not studying harder." → Use: <strong>WISH</strong>
                      </p>
                      <textarea
                        className="writing-area"
                        style={{ minHeight: '60px' }}
                        value={transformInput}
                        onChange={(e) => setTransformInput(e.target.value)}
                        placeholder="I wish I ..."
                      />
                      <button className="check-btn" onClick={checkTransform}>Check</button>
                      {transformResult.show && (
                        <div className={`ex-feedback ${transformResult.type}`}>{transformResult.message}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CONDITIONAL */}
            {activeTopic === 'conditional' && isClient && (
              <div className="content-panel active" id="panel-conditional">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">🔀 If Conditionals</div>
                    <div className="sec-title">0,1,2,3 & Mixed</div>
                  </div>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                  <table className="tbt-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Formula</th>
                        <th>Example</th>
                        <th>Use</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conditionalData.map((c, i) => (
                        <tr key={i}>
                          <td><strong>{c.type}</strong></td>
                          <td className="mono-g">{c.formula}</td>
                          <td>{c.example}</td>
                          <td>{c.use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Identify the Type</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="condQuiz1">
                      <div className="ex-q">
                        "If I <em>won</em> the lottery, I <em>would travel</em> the world." — This is:
                      </div>
                      <div className="options-list">
                        {['Zero Conditional', 'First Conditional', 'Second Conditional ✓', 'Third Conditional'].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Complete the Conditional</span>
                      <span className="ex-type-badge badge-fill">Fill</span>
                    </div>
                    <div className="ex-card-body" id="condFill">
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
                        Complete the 3rd conditional:
                      </p>
                      <div className="fill-sentence">
                        If she _____ (study) harder, she _____ (pass) the exam.
                      </div>
                      <input
                        className="fill-input"
                        value={condFill1}
                        onChange={(e) => setCondFill1(e.target.value)}
                        placeholder="had studied"
                        style={{ width: '120px', marginRight: '0.5rem' }}
                      />
                      <input
                        className="fill-input"
                        value={condFill2}
                        onChange={(e) => setCondFill2(e.target.value)}
                        placeholder="would have passed"
                        style={{ width: '160px' }}
                      />
                      <button className="check-btn" style={{ marginTop: '0.8rem' }} onClick={checkCondFill}>Check</button>
                      {condFillResult.show && (
                        <div className={`ex-feedback ${condFillResult.type}`}>{condFillResult.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Error Correction: Conditionals</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="condError">
                      <div className="ex-q">
                        Which sentence is correct?
                      </div>
                      <div className="options-list">
                        {[
                          '"If I would study, I pass."',
                          '"If I study, I will pass." ✓',
                          '"If I had study, I will pass."',
                          '"If I studied, I will pass."'
                        ].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PASSIVE VOICE */}
            {activeTopic === 'passive' && isClient && (
              <div className="content-panel active" id="panel-passive">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">🔄 Passive Voice</div>
                    <div className="sec-title">Active → Passive</div>
                  </div>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Active → Passive Transform</span>
                      <span className="ex-type-badge badge-fill">Fill</span>
                    </div>
                    <div className="ex-card-body">
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                        Convert to passive voice:
                      </p>
                      <div id="passiveFill">
                        <div className="fill-sentence">
                          <em>Active:</em> "They clean the office every day."<br />
                          <em>Passive:</em> "The office _____ every day."
                          <input
                            className="fill-input"
                            value={passiveFillAnswers.pf1 || ''}
                            onChange={(e) => setPassiveFillAnswers(prev => ({ ...prev, pf1: e.target.value }))}
                            placeholder="is cleaned..."
                          />
                        </div>
                        <div className="fill-sentence" style={{ marginTop: '0.8rem' }}>
                          <em>Active:</em> "Someone has stolen my wallet."<br />
                          <em>Passive:</em> "My wallet _____."
                          <input
                            className="fill-input"
                            value={passiveFillAnswers.pf2 || ''}
                            onChange={(e) => setPassiveFillAnswers(prev => ({ ...prev, pf2: e.target.value }))}
                            placeholder="has been stolen..."
                          />
                        </div>
                      </div>
                      <button className="check-btn" onClick={checkPassive}>Check Answers</button>
                      {passiveFillResult.show && (
                        <div className={`ex-feedback ${passiveFillResult.type}`}>{passiveFillResult.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Passive MCQ</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="passiveQuiz">
                      <div className="ex-q">
                        "The letter _____ yesterday." (Past Simple Passive)
                      </div>
                      <div className="options-list">
                        {[
                          'was written ✓',
                          'is written',
                          'were written',
                          'had written'
                        ].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* REPORTED SPEECH */}
            {activeTopic === 'reported' && isClient && (
              <div className="content-panel active" id="panel-reported">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">💬 Reported Speech</div>
                    <div className="sec-title">Direct → Indirect</div>
                  </div>
                </div>
                <div style={{
                  background: 'var(--card2)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  marginBottom: '1.5rem'
                }}>
                  <div className="sec-tag" style={{ marginBottom: '0.8rem' }}>Key Tense Changes</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.82rem' }}>
                    <div className="mono-g">Present Simple → Past Simple</div>
                    <div style={{ color: 'var(--muted)' }}>"I work" → He said he worked</div>
                    <div className="mono-g">Present Cont → Past Cont</div>
                    <div style={{ color: 'var(--muted)' }}>"I am going" → She said she was going</div>
                    <div className="mono-g">Past Simple → Past Perfect</div>
                    <div style={{ color: 'var(--muted)' }}>"I went" → He said he had gone</div>
                    <div className="mono-g">will → would</div>
                    <div style={{ color: 'var(--muted)' }}>"I will call" → She said she would call</div>
                    <div className="mono-g">can → could</div>
                    <div style={{ color: 'var(--muted)' }}>"I can swim" → He said he could swim</div>
                  </div>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Direct → Reported</span>
                      <span className="ex-type-badge badge-fill">Fill</span>
                    </div>
                    <div className="ex-card-body" id="reportedFill">
                      <div className="rs-original">Direct: "I am going to the market," she said.</div>
                      <div className="fill-sentence">
                        Reported: She said (that) she _____ to the market.
                        <input
                          className="fill-input"
                          value={reportedFill}
                          onChange={(e) => setReportedFill(e.target.value)}
                          placeholder="was going..."
                        />
                      </div>
                      <button className="check-btn" style={{ marginTop: '0.8rem' }} onClick={checkReportedFill}>Check</button>
                      {reportedFillResult.show && (
                        <div className={`ex-feedback ${reportedFillResult.type}`}>{reportedFillResult.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">MCQ: Reported Speech</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="reportedQuiz">
                      <div className="ex-q">
                        He said: "I can speak French." → Reported:
                      </div>
                      <div className="options-list">
                        {[
                          '"He said he can speak French."',
                          '"He said he could speak French." ✓',
                          '"He said he will speak French."',
                          '"He said he speaks French."'
                        ].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ARTICLES */}
            {activeTopic === 'article' && isClient && (
              <div className="content-panel active" id="panel-article">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">📝 Articles</div>
                    <div className="sec-title">a / an / the / ∅</div>
                  </div>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Article Fill-in</span>
                      <span className="ex-type-badge badge-fill">Fill</span>
                    </div>
                    <div className="ex-card-body" id="articleFill">
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
                        Choose the correct article (a/an/the/-):
                      </p>
                      <div className="fill-sentence">
                        I saw ___ elephant at the zoo.
                        <input
                          className="fill-input"
                          value={articleFillAnswers.art1 || ''}
                          onChange={(e) => setArticleFillAnswers(prev => ({ ...prev, art1: e.target.value }))}
                          placeholder="a/an/the/-"
                        />
                      </div>
                      <div className="fill-sentence">
                        ___ sun rises in the east.
                        <input
                          className="fill-input"
                          value={articleFillAnswers.art2 || ''}
                          onChange={(e) => setArticleFillAnswers(prev => ({ ...prev, art2: e.target.value }))}
                          placeholder="a/an/the/-"
                        />
                      </div>
                      <div className="fill-sentence">
                        She plays ___ piano very well.
                        <input
                          className="fill-input"
                          value={articleFillAnswers.art3 || ''}
                          onChange={(e) => setArticleFillAnswers(prev => ({ ...prev, art3: e.target.value }))}
                          placeholder="a/an/the/-"
                        />
                      </div>
                      <button className="check-btn" onClick={checkArticleFill}>Check</button>
                      {articleFillResult.show && (
                        <div className={`ex-feedback ${articleFillResult.type}`}>{articleFillResult.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Article MCQ</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="articleQuiz">
                      <div className="ex-q">
                        "I want to become ___ engineer." <br /><small style={{ color: 'var(--muted)' }}>💡 an + vowel sound</small>
                      </div>
                      <div className="options-list">
                        {[
                          '"a engineer"',
                          '"the engineer"',
                          '"an engineer" ✓',
                          '"engineer"'
                        ].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TO BE TO */}
            {activeTopic === 'tobeto' && isClient && (
              <div className="content-panel active" id="panel-tobeto">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">🔧 To Be To</div>
                    <div className="sec-title">Modal Expression</div>
                  </div>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                  <table className="tbt-table">
                    <thead>
                      <tr>
                        <th>Structure</th>
                        <th>Meaning</th>
                        <th>Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="mono-g">S + am/is/are + to + V</td>
                        <td>Official plan / formal instruction</td>
                        <td>The president is to visit France next week.</td>
                      </tr>
                      <tr>
                        <td className="mono-g">S + was/were + to + V</td>
                        <td>Planned action in the past</td>
                        <td>She was to have called, but she forgot.</td>
                      </tr>
                      <tr>
                        <td className="mono-g">S + is + not + to + V</td>
                        <td>Prohibition (formal)</td>
                        <td>You are not to use your phone here.</td>
                      </tr>
                      <tr>
                        <td className="mono-g">If + S + is to + V</td>
                        <td>Condition for purpose</td>
                        <td>If we are to succeed, we must work hard.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">To Be To MCQ</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="tobToQuiz">
                      <div className="ex-q">
                        "The prime minister _____ address the nation tomorrow." (Formal announcement)
                      </div>
                      <div className="options-list">
                        {[
                          'is going to',
                          'will',
                          'is to ✓',
                          'should'
                        ].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Fill in: To Be To</span>
                      <span className="ex-type-badge badge-fill">Fill</span>
                    </div>
                    <div className="ex-card-body" id="tobToFill">
                      <div className="fill-sentence">
                        If we _____ succeed, we must prepare. (If + To be to)
                        <input
                          className="fill-input"
                          value={tobToFill}
                          onChange={(e) => setTobToFill(e.target.value)}
                          placeholder="are to..."
                        />
                      </div>
                      <button className="check-btn" style={{ marginTop: '0.8rem' }} onClick={checkTobToFill}>Check</button>
                      {tobToFillResult.show && (
                        <div className={`ex-feedback ${tobToFillResult.type}`}>{tobToFillResult.message}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PREPOSITIONS */}
            {activeTopic === 'predlog' && isClient && (
              <div className="content-panel active" id="panel-predlog">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">📍 Predlog (Prepositions)</div>
                    <div className="sec-title">in / on / at / by / with...</div>
                  </div>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Choose the Preposition</span>
                      <span className="ex-type-badge badge-fill">Fill</span>
                    </div>
                    <div className="ex-card-body" id="prepFill">
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
                        Fill in the correct preposition:
                      </p>
                      <div className="fill-sentence">
                        She was born ___ 1998.
                        <input
                          className="fill-input"
                          value={prepFillAnswers.pr1 || ''}
                          onChange={(e) => setPrepFillAnswers(prev => ({ ...prev, pr1: e.target.value }))}
                          placeholder="in/on/at"
                        />
                      </div>
                      <div className="fill-sentence">
                        The meeting is ___ Monday.
                        <input
                          className="fill-input"
                          value={prepFillAnswers.pr2 || ''}
                          onChange={(e) => setPrepFillAnswers(prev => ({ ...prev, pr2: e.target.value }))}
                          placeholder="in/on/at"
                        />
                      </div>
                      <div className="fill-sentence">
                        He arrived ___ midnight.
                        <input
                          className="fill-input"
                          value={prepFillAnswers.pr3 || ''}
                          onChange={(e) => setPrepFillAnswers(prev => ({ ...prev, pr3: e.target.value }))}
                          placeholder="in/on/at"
                        />
                      </div>
                      <div className="fill-sentence">
                        She's good ___ mathematics.
                        <input
                          className="fill-input"
                          value={prepFillAnswers.pr4 || ''}
                          onChange={(e) => setPrepFillAnswers(prev => ({ ...prev, pr4: e.target.value }))}
                          placeholder="at/in/on"
                        />
                      </div>
                      <button className="check-btn" onClick={checkPrepFill}>Check</button>
                      {prepFillResult.show && (
                        <div className={`ex-feedback ${prepFillResult.type}`}>{prepFillResult.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Preposition MCQ</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="prepQuiz">
                      <div className="ex-q">
                        "I'm interested ___ learning new languages."
                      </div>
                      <div className="options-list">
                        {[
                          '"interested at"',
                          '"interested on"',
                          '"interested in" ✓',
                          '"interested with"'
                        ].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ZAMONLAR */}
            {activeTopic === 'zamonlar' && isClient && (
              <div className="content-panel active" id="panel-zamonlar">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">⏰ Zamonlar</div>
                    <div className="sec-title">12 English Tenses</div>
                  </div>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Identify the Tense</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="tenseQuiz">
                      <div className="ex-q">
                        "She has been waiting for 2 hours." — This tense is:
                      </div>
                      <div className="options-list">
                        {[
                          'Present Perfect',
                          'Past Continuous',
                          'Present Perfect Continuous ✓',
                          'Past Perfect Continuous'
                        ].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Correct Tense Fill-in</span>
                      <span className="ex-type-badge badge-fill">Fill</span>
                    </div>
                    <div className="ex-card-body" id="tenseFill">
                      <div className="fill-sentence">
                        They _____ (play) football when it started raining.
                        <input
                          className="fill-input"
                          value={tenseFill}
                          onChange={(e) => setTenseFill(e.target.value)}
                          placeholder="were playing..."
                        />
                      </div>
                      <button className="check-btn" style={{ marginTop: '0.8rem' }} onClick={checkTenseFill}>Check</button>
                      {tenseFillResult.show && (
                        <div className={`ex-feedback ${tenseFillResult.type}`}>{tenseFillResult.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Signal Words Match</span>
                      <span className="ex-type-badge badge-match">Match</span>
                    </div>
                    <div className="ex-card-body" id="signalMatch">
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
                        Match signal word → Tense:
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
                        <div>📌 <strong>already, yet, just</strong> → <span style={{ color: 'var(--green)' }}>Present Perfect</span></div>
                        <div>📌 <strong>while, at that moment</strong> → <span style={{ color: 'var(--blue)' }}>Past Continuous</span></div>
                        <div>📌 <strong>by the time, before</strong> → <span style={{ color: 'var(--amber)' }}>Past Perfect</span></div>
                        <div>📌 <strong>tomorrow, next week</strong> → <span style={{ color: 'var(--teal)' }}>Future Simple</span></div>
                        <div>📌 <strong>always, usually, never</strong> → <span style={{ color: 'var(--red)' }}>Present Simple</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SPEAKING */}
            {activeTopic === 'speaking' && isClient && (
              <div className="content-panel active" id="panel-speaking">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">🎙️ Speaking</div>
                    <div className="sec-title">Speaking Practice</div>
                  </div>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">IELTS Speaking Part 1</span>
                      <span className="ex-type-badge badge-listen">Speaking</span>
                    </div>
                    <div className="ex-card-body">
                      <div className="speaking-card" style={{ background: 'transparent', border: 'none', padding: 0 }}>
                        <div className="speak-prompt">{speakPrompts[speakIdx % speakPrompts.length]}</div>
                        <button className={`mic-btn ${isRecording ? 'recording' : ''}`} onClick={toggleSpeak}>🎤</button>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                          {isRecording ? '🔴 Recording... Click to stop' : 'Click mic to start'}
                        </div>
                        <div className="speak-tips">
                          <div className="speak-tip"><span>✓</span> 2 dakika gaping</div>
                          <div className="speak-tip"><span>✓</span> Examples keltiring</div>
                          <div className="speak-tip"><span>✓</span> Connectors: however, moreover, in addition</div>
                        </div>
                        <button className="check-btn" style={{ marginTop: '1rem', width: '100%' }} onClick={nextSpeakPrompt}>
                          Next Topic →
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Useful Phrases Bank</span>
                      <span className="ex-type-badge badge-game">Reference</span>
                    </div>
                    <div className="ex-card-body">
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
                        IELTS Speaking useful expressions:
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} id="phrasesBank">
                        {phrases.map((p, i) => (
                          <div key={i} style={{ background: 'var(--card2)', borderRadius: '8px', padding: '0.5rem 0.8rem', fontSize: '0.82rem' }}>
                            <span style={{ color: 'var(--green)', fontWeight: 700 }}>{p.p}</span>
                            <span style={{ color: 'var(--muted)' }}> ({p.u})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* WRITING */}
            {activeTopic === 'writing' && isClient && (
              <div className="content-panel active" id="panel-writing">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">✍️ Writing</div>
                    <div className="sec-title">IELTS Writing Tasks</div>
                  </div>
                </div>
                <div className="ielts-tabs">
                  {['task1', 'task2', 'creative'].map(tab => (
                    <button
                      key={tab}
                      className={`ielts-tab ${writingTab === tab ? 'active' : ''}`}
                      onClick={() => wTab(tab)}
                    >
                      {tab === 'task1' ? 'Task 1 (GT/Academic)' : tab === 'task2' ? 'Task 2 (Essay)' : 'Creative Writing'}
                    </button>
                  ))}
                </div>

                {/* Task 1 */}
                {writingTab === 'task1' && (
                  <div className="ielts-panel active" id="wtask1">
                    <div className="writing-prompt">
                      <div className="sec-tag" style={{ marginBottom: '0.5rem' }}>Task 1 — Academic: Describe a Graph</div>
                      <p>
                        The graph below shows the number of international students in three universities from 2010 to 2020.
                        Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
                        Write at least 150 words.
                      </p>
                    </div>
                    <div style={{
                      background: 'var(--card2)',
                      borderRadius: '10px',
                      padding: '1rem',
                      marginBottom: '1rem',
                      fontSize: '0.82rem',
                      color: 'var(--muted)'
                    }}>
                      📊 [Graph: University A peaked at 4,500 in 2015 | B grew steadily to 3,200 | C declined from 2,800 to 1,100]
                    </div>
                    <textarea
                      className="writing-area"
                      value={writingTask1}
                      onChange={(e) => setWritingTask1(e.target.value)}
                      placeholder="The graph illustrates..."
                    />
                    <div className="word-count">{wCount(writingTask1)} / 150 words</div>
                    <button className="submit-btn" onClick={() => submitWriting('task1')}>Submit & Get Tips</button>
                    {writingFb1.show && (
                      <div className={`ex-feedback ${writingFb1.type}`} dangerouslySetInnerHTML={{ __html: writingFb1.message }} />
                    )}
                  </div>
                )}

                {/* Task 2 */}
                {writingTab === 'task2' && (
                  <div className="ielts-panel active" id="wtask2">
                    <div className="writing-prompt">
                      <div className="sec-tag" style={{ marginBottom: '0.5rem' }}>Task 2 — Opinion Essay</div>
                      <p>
                        Some people believe that technology has made people less social. Others argue it has improved communication.
                        Discuss both views and give your opinion. Write at least 250 words.
                      </p>
                    </div>
                    <textarea
                      className="writing-area"
                      value={writingTask2}
                      onChange={(e) => setWritingTask2(e.target.value)}
                      placeholder="In today's world, technology plays a crucial role..."
                    />
                    <div className="word-count">{wCount(writingTask2)} / 250 words</div>
                    <button className="submit-btn" onClick={() => submitWriting('task2')}>Submit & Get Tips</button>
                    {writingFb2.show && (
                      <div className={`ex-feedback ${writingFb2.type}`} dangerouslySetInnerHTML={{ __html: writingFb2.message }} />
                    )}
                  </div>
                )}

                {/* Creative */}
                {writingTab === 'creative' && (
                  <div className="ielts-panel active" id="wcreative">
                    <div className="writing-prompt">
                      <div className="sec-tag" style={{ marginBottom: '0.5rem' }}>Creative Writing Prompt</div>
                      <p id="creativePrompt">
                        Write a short story (100-200 words) that begins with: <em>{creativePrompts[creativePromptIdx % creativePrompts.length]}</em>
                      </p>
                    </div>
                    <textarea
                      className="writing-area"
                      value={writingCreative}
                      onChange={(e) => setWritingCreative(e.target.value)}
                      placeholder="The door had been locked for 20 years..."
                    />
                    <div className="word-count">{wCount(writingCreative)} / 200 words</div>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                      <button className="submit-btn" onClick={() => submitWriting('creative')}>Submit</button>
                      <button className="check-btn" onClick={newCreativePrompt}>New Prompt</button>
                    </div>
                    {writingFbCreative.show && (
                      <div className={`ex-feedback ${writingFbCreative.type}`} dangerouslySetInnerHTML={{ __html: writingFbCreative.message }} />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* READING */}
            {activeTopic === 'reading' && isClient && (
              <div className="content-panel active" id="panel-reading">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">📖 Reading</div>
                    <div className="sec-title">Passages & Comprehension</div>
                  </div>
                </div>
                <div className="ielts-tabs">
                  {['p1', 'p2', 'ielts_r'].map(tab => (
                    <button
                      key={tab}
                      className={`ielts-tab ${readingTab === tab ? 'active' : ''}`}
                      onClick={() => rTab(tab)}
                    >
                      {tab === 'p1' ? 'Passage 1 (B1)' : tab === 'p2' ? 'Passage 2 (B2)' : 'IELTS Academic'}
                    </button>
                  ))}
                </div>

                {/* Passage 1 */}
                {readingTab === 'p1' && (
                  <div className="ielts-panel active" id="rp1">
                    <div className="passage-box">
                      <div className="passage-title">The Benefits of Reading</div>
                      Reading is one of the most beneficial activities a person can engage in. Research shows that regular reading
                      improves vocabulary, enhances concentration, and develops critical thinking skills. Unlike television or social media,
                      reading requires active mental engagement — the reader must create mental images and interpret meaning independently.<br /><br />
                      Studies conducted at universities in the UK and USA found that people who read for just 30 minutes a day have
                      significantly better memory retention and mental agility than non-readers. Moreover, fiction readers demonstrate
                      higher empathy levels, as they frequently imagine themselves in characters' situations.<br /><br />
                      In the digital age, reading habits have shifted from printed books to e-books and online articles. While some
                      educators worry about diminishing attention spans, others point out that reading in any format still provides
                      cognitive benefits. The key factor is consistency and choosing material that challenges the reader slightly
                      above their current level.
                    </div>
                    <div className="ex-grid" id="readQ1">
                      <div className="ex-card">
                        <div className="ex-card-hdr">
                          <span className="ex-card-title">Comprehension Q1</span>
                          <span className="ex-type-badge badge-quiz">Quiz</span>
                        </div>
                        <div className="ex-card-body" id="rq1b">
                          <div className="ex-q">
                            According to the passage, reading for 30 minutes a day improves:
                          </div>
                          <div className="options-list">
                            {[
                              'Only vocabulary',
                              'Memory retention and mental agility ✓',
                              'Physical health',
                              'Social skills'
                            ].map((opt, i) => (
                              <button key={i} className="opt">{opt}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ex-card">
                        <div className="ex-card-hdr">
                          <span className="ex-card-title">T/F/NG</span>
                          <span className="ex-type-badge badge-quiz">Quiz</span>
                        </div>
                        <div className="ex-card-body" id="rq1c">
                          <div className="ex-q">
                            "E-books provide NO cognitive benefits compared to printed books." — TRUE/FALSE/NOT GIVEN?
                          </div>
                          <div className="options-list">
                            {['TRUE', 'FALSE ✓', 'NOT GIVEN'].map((opt, i) => (
                              <button key={i} className="opt">{opt}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Passage 2 */}
                {readingTab === 'p2' && (
                  <div className="ielts-panel" id="rp2">
                    <div className="passage-box">
                      <div className="passage-title">Artificial Intelligence in Healthcare</div>
                      The integration of artificial intelligence into healthcare systems represents one of the most significant
                      technological developments of the 21st century. AI algorithms can now analyse medical imaging with a precision
                      that rivals — and in some domains surpasses — experienced radiologists. Machine learning models trained on
                      millions of patient records can identify patterns that human physicians might overlook.<br /><br />
                      However, the deployment of AI in clinical settings raises profound ethical questions. Issues of data privacy,
                      algorithmic bias, and accountability remain inadequately resolved. When an AI system makes an erroneous diagnosis,
                      the question of liability becomes legally complex: is the hospital, the software developer, or the attending
                      physician responsible?<br /><br />
                      Proponents argue that AI should be viewed as a diagnostic tool rather than a replacement for human judgement.
                      The physician-patient relationship, they contend, encompasses dimensions of empathy, contextual understanding,
                      and ethical reasoning that cannot be replicated by algorithms. The most effective approach, therefore, may be a
                      collaborative model in which AI handles data processing while human clinicians retain ultimate decision-making authority.
                    </div>
                    <div className="ex-grid" id="readQ2">
                      <div className="ex-card">
                        <div className="ex-card-hdr">
                          <span className="ex-card-title">Vocabulary in Context</span>
                          <span className="ex-type-badge badge-quiz">Quiz</span>
                        </div>
                        <div className="ex-card-body" id="rq2b">
                          <div className="ex-q">
                            The word "erroneous" (paragraph 2) most closely means:
                          </div>
                          <div className="options-list">
                            {['innovative', 'deliberate', 'incorrect ✓', 'complex'].map((opt, i) => (
                              <button key={i} className="opt">{opt}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* IELTS Reading */}
                {readingTab === 'ielts_r' && (
                  <div className="ielts-panel" id="rielts_r">
                    <div style={{
                      background: 'rgba(255,171,0,0.08)',
                      border: '1px solid rgba(255,171,0,0.2)',
                      borderRadius: '10px',
                      padding: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div className="sec-tag" style={{ marginBottom: '0.3rem' }}>
                        ⏱ IELTS Academic Reading — 60 minutes | 3 Passages | 40 Questions
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                        This is a timed simulation. Answer True/False/Not Given, matching headings, and multiple choice questions.
                      </p>
                    </div>
                    <div className="ex-grid" id="ieltsReadQ">
                      <div className="ex-card">
                        <div className="ex-card-hdr">
                          <span className="ex-card-title">IELTS: Matching Headings</span>
                          <span className="ex-type-badge badge-quiz">IELTS</span>
                        </div>
                        <div className="ex-card-body" id="ieltsRQ1">
                          <div className="ex-q">
                            Which heading best fits Paragraph 2 of the AI Healthcare passage?
                          </div>
                          <div className="options-list">
                            {[
                              'Benefits of AI diagnosis',
                              'Ethical challenges of AI in medicine ✓',
                              'History of healthcare technology',
                              'Patient satisfaction surveys'
                            ].map((opt, i) => (
                              <button key={i} className="opt">{opt}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ex-card">
                        <div className="ex-card-hdr">
                          <span className="ex-card-title">IELTS: T/F/NG</span>
                          <span className="ex-type-badge badge-quiz">IELTS</span>
                        </div>
                        <div className="ex-card-body" id="ieltsRQ2">
                          <div className="ex-q">
                            "Physicians will eventually be replaced by AI systems." — TRUE/FALSE/NOT GIVEN?
                          </div>
                          <div className="options-list">
                            {['TRUE', 'FALSE', 'NOT GIVEN ✓'].map((opt, i) => (
                              <button key={i} className="opt">{opt}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LISTENING */}
            {activeTopic === 'listening' && isClient && (
              <div className="content-panel active" id="panel-listening">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">🎧 Listening</div>
                    <div className="sec-title">Audio Comprehension</div>
                  </div>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Listening Exercise 1</span>
                      <span className="ex-type-badge badge-listen">Audio</span>
                    </div>
                    <div className="ex-card-body">
                      <div className="audio-player">
                        <button className="play-btn" onClick={() => togglePlay(1)}>
                          {audioPlaying1 ? '⏸' : '▶'}
                        </button>
                        <div className="audio-info">
                          <div className="audio-title">Conversation: Travel Plans</div>
                          <div className="audio-level">B1 Level — 2:15 min</div>
                          <div className="audio-bar">
                            <div className={`audio-fill ${audioPlaying1 ? 'playing' : ''}`}></div>
                          </div>
                        </div>
                      </div>
                      <div className="transcript">
                        📝 <em>Transcript (shown after answering): "Two friends discuss summer travel plans. Sarah wants to visit Japan while Tom prefers a beach holiday in Thailand..."</em>
                      </div>
                      <div id="listenQ1">
                        <div id="lq1b">
                          <div className="ex-q">
                            Where does Sarah want to go for summer?
                          </div>
                          <div className="options-list">
                            {['Thailand', 'Japan ✓', 'Europe', 'Australia'].map((opt, i) => (
                              <button key={i} className="opt">{opt}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">IELTS Listening — Section 1</span>
                      <span className="ex-type-badge badge-listen">IELTS</span>
                    </div>
                    <div className="ex-card-body">
                      <div className="audio-player">
                        <button className="play-btn" onClick={() => togglePlay(2)}>
                          {audioPlaying2 ? '⏸' : '▶'}
                        </button>
                        <div className="audio-info">
                          <div className="audio-title">Phone conversation: Hotel Booking</div>
                          <div className="audio-level">IELTS Section 1 — Form Filling</div>
                          <div className="audio-bar">
                            <div className={`audio-fill ${audioPlaying2 ? 'playing' : ''}`}></div>
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
                        Complete the booking form:
                      </div>
                      <div id="ieltsListenFill">
                        <div className="fill-sentence">
                          Guest Name:
                          <input
                            className="fill-input"
                            value={ieltsListenAnswers.il1 || ''}
                            onChange={(e) => setIeltsListenAnswers(prev => ({ ...prev, il1: e.target.value }))}
                            placeholder="surname..."
                          />
                        </div>
                        <div className="fill-sentence">
                          Room Type:
                          <input
                            className="fill-input"
                            value={ieltsListenAnswers.il2 || ''}
                            onChange={(e) => setIeltsListenAnswers(prev => ({ ...prev, il2: e.target.value }))}
                            placeholder="single/double..."
                          />
                        </div>
                        <div className="fill-sentence">
                          Number of nights:
                          <input
                            className="fill-input"
                            value={ieltsListenAnswers.il3 || ''}
                            onChange={(e) => setIeltsListenAnswers(prev => ({ ...prev, il3: e.target.value }))}
                            placeholder="number..."
                          />
                        </div>
                      </div>
                      <button className="check-btn" onClick={checkIeltsListen}>Check Answers</button>
                      {ieltsListenResult.show && (
                        <div className={`ex-feedback ${ieltsListenResult.type}`}>{ieltsListenResult.message}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TESTS */}
            {activeTopic === 'tests' && isClient && (
              <div className="content-panel active" id="panel-tests">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">📋 Full Tests</div>
                    <div className="sec-title">Mock Tests & Assessment</div>
                  </div>
                </div>
                <div className="ielts-tabs">
                  {['general', 'ielts_full'].map(tab => (
                    <button
                      key={tab}
                      className={`ielts-tab ${testTab === tab ? 'active' : ''}`}
                      onClick={() => testTabHandler(tab)}
                    >
                      {tab === 'general' ? 'General Grammar Test' : 'IELTS Mock (Mini)'}
                    </button>
                  ))}
                </div>

                {/* General Test */}
                {testTab === 'general' && (
                  <div className="ielts-panel active" id="tgeneral">
                    <div style={{
                      background: 'var(--card2)',
                      borderRadius: '10px',
                      padding: '1rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      gap: '2rem',
                      flexWrap: 'wrap'
                    }}>
                      <div><span style={{ fontFamily: 'var(--fm)', color: 'var(--green)' }}>{testQs.length}</span> <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Questions</span></div>
                      <div><span style={{ fontFamily: 'var(--fm)', color: 'var(--amber)' }}>Mixed</span> <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>All Topics</span></div>
                      <div><span style={{ fontFamily: 'var(--fm)', color: 'var(--blue)' }}>25 min</span> <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Suggested Time</span></div>
                    </div>
                    <div id="generalTest">
                      {testIdx < testQs.length ? (
                        <div>
                          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--fm)', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                            {testIdx + 1}/{testQs.length}
                          </div>
                          <div className="progress-wrap">
                            <div className="progress-bar" style={{ width: `${(testIdx / testQs.length) * 100}%` }}></div>
                          </div>
                          <div id="testQBody" style={{ marginTop: '1rem' }}>
                            <div className="ex-q">{testQs[testIdx].q}</div>
                            <div className="options-list">
                              {testQs[testIdx].opts.map((opt, i) => (
                                <button
                                  key={i}
                                  className="opt"
                                  onClick={() => answerTest(i)}
                                  disabled={testAnswered}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                            {testAnswered && (
                              <button className="ex-next show" onClick={nextTest}>Next</button>
                            )}
                          </div>
                        </div>
                      ) : (
                        renderTest()
                      )}
                    </div>
                  </div>
                )}

                {/* IELTS Full Test */}
                {testTab === 'ielts_full' && (
                  <div className="ielts-panel" id="tielts_full">
                    <div style={{
                      background: 'rgba(255,171,0,0.08)',
                      border: '1px solid rgba(255,171,0,0.2)',
                      borderRadius: '10px',
                      padding: '1.2rem',
                      marginBottom: '1rem'
                    }}>
                      <div className="sec-tag" style={{ marginBottom: '0.5rem' }}>🎯 IELTS Mini Mock Test</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                        This mini test covers Grammar, Vocabulary and Reading skills for IELTS Band 6.5-7.5
                      </p>
                    </div>
                    <div id="ieltsQ1">
                      <div className="ex-q">
                        IELTS Academic: The pie chart <em>illustrates</em> the... — "illustrates" here means:
                      </div>
                      <div className="options-list">
                        {['argues', 'shows ✓', 'proves', 'contradicts'].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FORMULAS */}
            {activeTopic === 'formulas' && isClient && (
              <div className="content-panel active" id="panel-formulas">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">📐 Formulalar</div>
                    <div className="sec-title">Tense Formula Practice</div>
                  </div>
                </div>
                <div className="ex-grid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Formula Identification</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="formulaQuiz">
                      <div className="ex-q">
                        "S + have/has + been + V-ing" — What tense is this?
                      </div>
                      <div className="options-list">
                        {[
                          'Present Perfect',
                          'Past Continuous',
                          'Present Perfect Continuous ✓',
                          'Future Perfect'
                        ].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Build the Formula</span>
                      <span className="ex-type-badge badge-game">Game 🎮</span>
                    </div>
                    <div className="ex-card-body" id="buildFormula">
                      <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
                        What is the Past Perfect Continuous formula?
                      </p>
                      <div className="options-list">
                        <button className="opt" onClick={() => checkFormulaBuild('wrong')}>
                          S + has + been + V-ing
                        </button>
                        <button className="opt" onClick={() => checkFormulaBuild('correct')}>
                          S + had + been + V-ing ✓
                        </button>
                        <button className="opt" onClick={() => checkFormulaBuild('wrong')}>
                          S + was + been + V-ing
                        </button>
                      </div>
                      {formulaBuildResult.show && (
                        <div className={`ex-feedback ${formulaBuildResult.type}`}>{formulaBuildResult.message}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EXERCISES */}
            {activeTopic === 'exercises' && isClient && (
              <div className="content-panel active" id="panel-exercises">
                <div className="sec-hdr">
                  <div>
                    <div className="sec-tag">🏋️ Exercises</div>
                    <div className="sec-title">Mixed Practice</div>
                  </div>
                </div>
                <div className="ex-grid" id="mixedExGrid">
                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Mixed Grammar MCQ 1</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="mx1">
                      <div className="ex-q">
                        "By 2030, scientists _____ a cure for cancer."
                      </div>
                      <div className="options-list">
                        {['will find', 'will have found ✓', 'have found', 'found'].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Mixed Grammar MCQ 2</span>
                      <span className="ex-type-badge badge-quiz">Quiz</span>
                    </div>
                    <div className="ex-card-body" id="mx2">
                      <div className="ex-q">
                        Which is a gerund construction?
                      </div>
                      <div className="options-list">
                        {[
                          '"She wants to swim."',
                          '"Swimming is good for health." ✓',
                          '"She will swim tomorrow."',
                          '"She swam yesterday."'
                        ].map((opt, i) => (
                          <button key={i} className="opt">{opt}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ex-card">
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">Vocabulary Gap Fill</span>
                      <span className="ex-type-badge badge-fill">Fill</span>
                    </div>
                    <div className="ex-card-body" id="mx3">
                      <div className="fill-sentence">
                        The scientist made a remarkable _____ that changed medicine.
                        <input
                          className="fill-input"
                          value={mxFillAnswer}
                          onChange={(e) => setMxFillAnswer(e.target.value)}
                          placeholder="discovery..."
                        />
                      </div>
                      <button className="check-btn" onClick={checkMxFill}>Check</button>
                      {mxFillResult.show && (
                        <div className={`ex-feedback ${mxFillResult.type}`}>{mxFillResult.message}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* IELTS SECTION */}
        <hr className="divider" />
        <div id="ielts" className="sec reveal" ref={el => revealRefs.current[1] = el}>
          <div className="sec-hdr">
            <div>
              <div className="sec-tag">🎯 IELTS Preparation</div>
              <div className="sec-title">Band 7+ Materials</div>
            </div>
          </div>
          <div className="ielts-tabs">
            {['overview', 'vocab', 'tips', 'writing_b'].map(tab => (
              <button
                key={tab}
                className={`ielts-tab ${ieltsMainTab === tab ? 'active' : ''}`}
                onClick={() => ieltsMain(tab)}
              >
                {tab === 'overview' ? 'Overview' : tab === 'vocab' ? 'Academic Vocab' : tab === 'tips' ? 'Band Score Tips' : 'Writing Bands'}
              </button>
            ))}
          </div>

          {/* Overview */}
          {ieltsMainTab === 'overview' && (
            <div id="ielts-overview" className="ielts-panel active">
              <div className="ex-grid">
                <div className="ex-card">
                  <div className="ex-card-hdr">
                    <span className="ex-card-title">IELTS Score Calculator</span>
                    <span className="ex-type-badge badge-quiz">Tool</span>
                  </div>
                  <div className="ex-card-body">
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                      Enter raw scores (0-9) for each section:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>Listening</div>
                        <input type="number" min="0" max="9" step="0.5" className="fill-input" style={{ width: '100%' }} value={lScore} onChange={(e) => setLScore(parseFloat(e.target.value))} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>Reading</div>
                        <input type="number" min="0" max="9" step="0.5" className="fill-input" style={{ width: '100%' }} value={rScore} onChange={(e) => setRScore(parseFloat(e.target.value))} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>Writing</div>
                        <input type="number" min="0" max="9" step="0.5" className="fill-input" style={{ width: '100%' }} value={wScore} onChange={(e) => setWScore(parseFloat(e.target.value))} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>Speaking</div>
                        <input type="number" min="0" max="9" step="0.5" className="fill-input" style={{ width: '100%' }} value={sScore} onChange={(e) => setSScore(parseFloat(e.target.value))} />
                      </div>
                    </div>
                    <button className="check-btn" style={{ width: '100%' }} onClick={calcIELTS}>Calculate Overall Band</button>
                    {ieltsBand && (
                      <div id="ieltsCalcResult" style={{ marginTop: '1rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--fm)', color: 'var(--green)' }}>
                        Overall Band: <span style={{ color: 'var(--amber)' }}>{ieltsBand}</span>
                        <br /><span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                          {ieltsBand >= 8 ? 'Expert 🏆' : ieltsBand >= 7 ? 'Good User ⭐' : ieltsBand >= 6 ? 'Competent User 👍' : ieltsBand >= 5 ? 'Modest User 📖' : 'Limited User 📝'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ex-card">
                  <div className="ex-card-hdr">
                    <span className="ex-card-title">IELTS Quick Tips</span>
                    <span className="ex-type-badge badge-game">Guide</span>
                  </div>
                  <div className="ex-card-body">
                    <div id="ieltsTipsList">
                      {ieltsTips.map((tip, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '1.3rem' }}>{tip.icon}</span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--green)', marginBottom: '0.2rem' }}>{tip.t}</div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{tip.tip}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Academic Vocab */}
          {ieltsMainTab === 'vocab' && (
            <div id="ielts-vocab" className="ielts-panel">
              <div className="ex-grid" id="academicVocabGrid">
                {academicVocab.map((v, i) => (
                  <div className="ex-card" key={i}>
                    <div className="ex-card-hdr">
                      <span className="ex-card-title">{v.w}</span>
                      <span className="ex-type-badge badge-game">AWL</span>
                    </div>
                    <div className="ex-card-body">
                      <div style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>{v.d}</div>
                      <div className="vocab-ex">"{v.e}"</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Band Tips */}
          {ieltsMainTab === 'tips' && (
            <div id="ielts-tips" className="ielts-panel">
              <div id="bandTipsList">
                {bandTips.map((t, i) => (
                  <div key={i} style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '1rem',
                    marginBottom: '0.8rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontFamily: 'var(--fm)', fontSize: '1.2rem', fontWeight: 800, color: t.color, minWidth: '80px' }}>
                      {t.band}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{t.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Writing Bands */}
          {ieltsMainTab === 'writing_b' && (
            <div id="ielts-writing_b" className="ielts-panel">
              <div id="writingBandTable">
                <div style={{ overflowX: 'auto' }}>
                  <table className="tbt-table">
                    <thead>
                      <tr>
                        <th>Criteria</th>
                        <th>Band 5</th>
                        <th>Band 6</th>
                        <th>Band 7</th>
                        <th>Band 8</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Task Achievement</td>
                        <td style={{ color: 'var(--red)' }}>Addresses task minimally</td>
                        <td style={{ color: 'var(--amber)' }}>Addresses main points</td>
                        <td style={{ color: 'var(--green)' }}>Covers all parts well</td>
                        <td style={{ color: 'var(--teal)' }}>Fully covers task</td>
                      </tr>
                      <tr>
                        <td>Coherence & Cohesion</td>
                        <td style={{ color: 'var(--red)' }}>Repetitive connectors</td>
                        <td style={{ color: 'var(--amber)' }}>Adequate cohesion</td>
                        <td style={{ color: 'var(--green)' }}>Clear progression</td>
                        <td style={{ color: 'var(--teal)' }}>Skillful cohesion</td>
                      </tr>
                      <tr>
                        <td>Lexical Resource</td>
                        <td style={{ color: 'var(--red)' }}>Limited range</td>
                        <td style={{ color: 'var(--amber)' }}>Adequate vocabulary</td>
                        <td style={{ color: 'var(--green)' }}>Good range, few errors</td>
                        <td style={{ color: 'var(--teal)' }}>Wide range, rare errors</td>
                      </tr>
                      <tr>
                        <td>Grammar</td>
                        <td style={{ color: 'var(--red)' }}>Many errors</td>
                        <td style={{ color: 'var(--amber)' }}>Some errors</td>
                        <td style={{ color: 'var(--green)' }}>Mix of simple/complex</td>
                        <td style={{ color: 'var(--teal)' }}>Wide range, minor errors</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GAMES SECTION */}
        <hr className="divider" />
        <div id="games" className="sec reveal" ref={el => revealRefs.current[2] = el}>
          <div className="sec-hdr">
            <div>
              <div className="sec-tag">🎮 Language Games</div>
              <div className="sec-title">Learn Through Play</div>
            </div>
          </div>
          <div className="ex-grid">
            <div className="ex-card">
              <div className="ex-card-hdr">
                <span className="ex-card-title">🏆 Word Chain Game</span>
                <span className="ex-type-badge badge-game">Game</span>
              </div>
              <div className="ex-card-body">
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1rem' }}>
                  Type a word that starts with the last letter of the previous word!
                </p>
                <div id="wordChain" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem', minHeight: '2.5rem' }}>
                  {chainWords.map((w, i) => (
                    <span key={i} style={{
                      background: i === chainWords.length - 1 ? 'var(--green)' : 'rgba(0,230,118,0.1)',
                      color: i === chainWords.length - 1 ? '#000' : 'var(--green)',
                      padding: '0.3rem 0.7rem',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.82rem'
                    }}>
                      {w}
                    </span>
                  ))}
                </div>
                <input
                  className="scramble-input"
                  value={chainInput}
                  onChange={(e) => setChainInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addChainWord()}
                  placeholder="Type a word..."
                />
                {chainFb.show && (
                  <div className={`ex-feedback ${chainFb.type}`} style={{ marginTop: '0.5rem' }}>
                    {chainFb.message}
                  </div>
                )}
                <button className="check-btn" style={{ marginTop: '0.5rem' }} onClick={addChainWord}>Add Word</button>
              </div>
            </div>

            <div className="ex-card">
              <div className="ex-card-hdr">
                <span className="ex-card-title">🧩 Grammar Puzzle</span>
                <span className="ex-type-badge badge-game">Game</span>
              </div>
              <div className="ex-card-body">
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>
                  Arrange words to form a correct sentence:
                </p>
                <div id="puzzleWords" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                  {puzzleWords.map((w, i) => (
                    <button
                      key={i}
                      className="opt"
                      style={{ padding: '0.4rem 0.8rem' }}
                      onClick={() => addToPuzzle(w)}
                      disabled={puzzleDisabled.includes(w)}
                    >
                      {w}
                    </button>
                  ))}
                </div>
                <div id="puzzleAnswer" style={{
                  minHeight: '2.5rem',
                  background: 'var(--card2)',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  border: '1px dashed var(--border)'
                }}>
                  {puzzleSelected.map((w, i) => (
                    <span key={i} style={{
                      background: 'rgba(0,230,118,0.1)',
                      color: 'var(--green)',
                      padding: '0.3rem 0.7rem',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.82rem'
                    }}>
                      {w}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
                  <button className="check-btn" onClick={checkPuzzle}>Check</button>
                  <button className="scr-btn scr-skip" onClick={newPuzzle}>New Puzzle</button>
                </div>
                {puzzleFb.show && (
                  <div className={`ex-feedback ${puzzleFb.type}`}>{puzzleFb.message}</div>
                )}
              </div>
            </div>

            <div className="ex-card">
              <div className="ex-card-hdr">
                <span className="ex-card-title">⚡ Speed Quiz</span>
                <span className="ex-type-badge badge-quiz">Game</span>
              </div>
              <div className="ex-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <span style={{ fontFamily: 'var(--fm)', color: 'var(--amber)' }}>⏱ {speedTime}s</span>
                  <span style={{ fontFamily: 'var(--fm)', color: 'var(--green)' }}>Score: {speedScore}</span>
                </div>
                <div className="progress-wrap">
                  <div className="progress-bar" style={{ width: `${(speedTime / 30) * 100}%` }}></div>
                </div>
                {speedActive ? (
                  <div id="speedQuizBody" style={{ marginTop: '1rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.8rem' }}>
                      {currentSpeedQ.q}
                    </div>
                    <input
                      className="scramble-input"
                      value={speedInput}
                      onChange={(e) => setSpeedInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && checkSpeedQ()}
                      placeholder="Type answer..."
                    />
                    <button className="check-btn" style={{ marginTop: '0.5rem', display: 'block' }} onClick={checkSpeedQ}>Submit</button>
                    {speedFb.show && (
                      <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: speedFb.type === 'success' ? 'var(--green)' : 'var(--red)' }}>
                        {speedFb.message}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, color: 'var(--green)' }}>
                    Time! Score: {speedScore}
                    <button className="check-btn" style={{ marginTop: '0.8rem', display: 'block', margin: '0.8rem auto' }} onClick={startSpeedQuiz}>
                      Play Again
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="ex-card">
              <div className="ex-card-hdr">
                <span className="ex-card-title">🔤 Hangman</span>
                <span className="ex-type-badge badge-game">Game</span>
              </div>
              <div className="ex-card-body">
                <div style={{ textAlign: 'center', fontSize: '2.5rem', margin: '0.5rem 0' }} id="hangmanArt">
                  {hangArt}
                </div>
                <div style={{ textAlign: 'center', fontFamily: 'var(--fm)', letterSpacing: '0.3em', fontSize: '1.4rem', color: 'var(--green)', margin: '0.8rem 0' }} id="hangmanWord">
                  {hangDisplay}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', textAlign: 'center', marginBottom: '0.8rem' }} id="hangmanHint">
                  Hint: {currentHangman.hint}
                </div>
                <div id="hangmanKeys" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', justifyContent: 'center' }}>
                  {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
                    <button
                      key={l}
                      className="opt"
                      style={{ padding: '0.3rem 0.5rem', minWidth: '32px' }}
                      onClick={() => guessLetter(l)}
                      disabled={hangGuessed.includes(l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                {hangFb.show && (
                  <div className={`ex-feedback ${hangFb.type}`} style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                    {hangFb.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CEFR SECTION */}
        <hr className="divider" />
        <div id="cefr" className="sec reveal" ref={el => revealRefs.current[3] = el}>
          <div className="sec-hdr">
            <div>
              <div className="sec-tag">📊 CEFR Levels</div>
              <div className="sec-title">Your Learning Path</div>
            </div>
          </div>
          <div id="cefrContent">
            {renderCEFR()}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <p>Made with ❤️ for English learners &nbsp;|&nbsp; <strong>EduVault Exercises</strong></p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Daily practice makes perfect! Keep going 🚀</p>
      </footer>
    </div>
  );
};

export default EduVault;