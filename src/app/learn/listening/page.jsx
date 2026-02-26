'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Listening.css'; // CSS styles will be moved to this file
import Header from '../header';

const ListenUp = () => {
  // ======================== DATA ========================
  const audioData = {
    A1: [
      {
        id: 'a1_1', title: 'My Morning Routine', type: 'Monologue', accent: 'British',
        accent_c: 'var(--lime)', level: 'A1', level_c: 'var(--lime)', acc: 'acc-lime',
        duration: '2:10', numTasks: 3,
        desc: 'Oddiy monolog — Emlining kundalik ertalab odatlari haqida. Juda sekin va aniq talaffuz.',
        tags: ['Daily life', 'Present Simple', 'Slow'],
        transcript: `Hello! My name is Emily. I am going to tell you about my morning routine.
I wake up at seven o'clock every morning. First, I go to the bathroom and brush my teeth. Then I wash my face with cold water. After that, I go to the kitchen and make breakfast.
I usually eat toast with butter and jam. I also drink a cup of tea with milk. I love my morning tea! It makes me feel happy.
After breakfast, I get dressed. I put on my school uniform. It is blue and white. I check my school bag. I need my books, my pencil case, and my lunch box.
At eight o'clock, my mum drives me to school. The journey takes ten minutes. I talk to my mum about my day. School starts at eight thirty. I really enjoy school. My favourite subject is art.`,
        gapWords: ['seven', 'breakfast', 'tea', 'school', 'art'],
        gapSentence: `I wake up at [BLANK] o'clock every morning. After that, I go to the kitchen and make [BLANK]. I also drink a cup of [BLANK] with milk. At eight o'clock, my mum drives me to [BLANK]. My favourite subject is [BLANK].`,
        dictSegment: `I wake up at seven o'clock every morning. First, I go to the bathroom and brush my teeth. Then I wash my face with cold water.`,
        compQ: [
          { q: 'Emily qachon uyg\'onadi?', opts: ['6da', '7da', '8da', '9da'], ans: 1, exp: '"I wake up at seven o\'clock every morning."' },
          { q: 'Emily ertalab nima ichadi?', opts: ['Kofe', 'Suv', 'Choy', 'Apelsin sharbati'], ans: 2, exp: '"I also drink a cup of tea with milk."' },
          { q: 'Emily maktabga qanday boradi?', opts: ['Piyoda', 'Avtobus bilan', 'Onasi mashinasida', 'Velosiped bilan'], ans: 2, exp: '"my mum drives me to school."' },
        ],
      },
      {
        id: 'a1_2', title: 'At the Supermarket', type: 'Dialogue', accent: 'American',
        accent_c: 'var(--cyan)', level: 'A1', level_c: 'var(--lime)', acc: 'acc-lime',
        duration: '2:30', numTasks: 3,
        desc: 'Supermarketda ikkita odam o\'rtasidagi oddiy dialog. Savol-javob tuzilmalari.',
        tags: ['Shopping', 'Dialogue', 'Numbers'],
        transcript: `Shop assistant: Good morning! Can I help you?
Customer: Yes, please. I am looking for bread.
Shop assistant: Bread is in aisle three, on the left.
Customer: Thank you. And where are the eggs?
Shop assistant: Eggs are in the fridge section. Turn right at the end of this aisle.
Customer: How much are the eggs?
Shop assistant: They are two pounds fifty for a box of twelve.
Customer: OK, and do you have any orange juice?
Shop assistant: Yes, we have fresh juice and carton juice. The fresh juice is in the fridge. The carton juice is on shelf four.
Customer: I'll take the carton, please. It's cheaper. How much is everything?
Shop assistant: Let me check... The bread is one pound. The eggs are two fifty. The juice is one pound twenty. That's four pounds seventy altogether.
Customer: Here you are. Keep the change.
Shop assistant: Thank you very much! Have a nice day!`,
        gapWords: ['bread', 'eggs', 'two', 'cheaper', 'four'],
        gapSentence: `I am looking for [BLANK]. Eggs are in the fridge section. They are [BLANK] pounds fifty for a box of twelve. I'll take the carton, please. It's [BLANK]. That's [BLANK] pounds seventy altogether.`,
        dictSegment: `Good morning! Can I help you? Yes, please. I am looking for bread. Bread is in aisle three, on the left.`,
        compQ: [
          { q: 'Nonushtani qayerdan topish mumkin?', opts: ['1-ravo', '2-ravo', '3-ravo', '4-ravo'], ans: 2, exp: '"Bread is in aisle three, on the left."' },
          { q: 'Tuxumning narxi qancha?', opts: ['£1.20', '£1.50', '£2.50', '£4.70'], ans: 2, exp: '"They are two pounds fifty for a box of twelve."' },
        ],
      },
    ],
    A2: [
      {
        id: 'a2_1', title: 'A Day in London', type: 'Tour Guide', accent: 'British',
        accent_c: 'var(--cyan)', level: 'A2', level_c: 'var(--cyan)', acc: 'acc-cyan',
        duration: '3:20', numTasks: 4,
        desc: 'Londonni kesib o\'tadigan ekskursiya gidi nutqi. Shahar ko\'rinishlari, tarix va maslahatlar.',
        tags: ['Travel', 'Descriptions', 'Past Simple'],
        transcript: `Welcome to London, everyone! My name is James, and I will be your guide today. Please stay close to the group, and don't hesitate to ask questions.
We are standing in front of Buckingham Palace. This is the official home of the British Royal Family. The palace has over 775 rooms! Every summer, the Queen opens part of the palace to visitors. The famous Changing of the Guard ceremony happens here every day at eleven o'clock.
Now let's walk along The Mall towards Trafalgar Square. The tall column you can see is Nelson's Column. It was built in 1843 to celebrate Admiral Nelson's victory at the Battle of Trafalgar. The four bronze lions at the base were added later, in 1867.
Trafalgar Square is one of the busiest places in London. Millions of tourists visit every year. On New Year's Eve, thousands of people gather here to celebrate. There are also free art exhibitions in the National Gallery, which you can see behind me.
Our next stop is the River Thames and the famous Tower Bridge. Many people call it London Bridge by mistake — but London Bridge is actually a different, much simpler bridge nearby. Tower Bridge was opened in 1894 and its towers are forty three metres tall. You can walk across the glass floor at the top for an amazing view of the city!`,
        gapWords: ['775', 'Guard', 'Nelson', 'Thames', '1894'],
        gapSentence: `The palace has over [BLANK] rooms! The Changing of the [BLANK] ceremony happens every day at eleven o'clock. The tall column is [BLANK]'s Column. Our next stop is the River [BLANK]. Tower Bridge was opened in [BLANK].`,
        dictSegment: `Welcome to London, everyone! My name is James, and I will be your guide today. We are standing in front of Buckingham Palace. This is the official home of the British Royal Family.`,
        compQ: [
          { q: 'Buckingham Saroyida necha xona bor?', opts: ['500', '650', '775', '900'], ans: 2, exp: '"The palace has over 775 rooms!"' },
          { q: 'Nelson\'s Column qachon qurilgan?', opts: ['1843', '1867', '1894', '1900'], ans: 0, exp: '"It was built in 1843 to celebrate Admiral Nelson\'s victory."' },
          { q: 'Tower Bridge ochilgan yil?', opts: ['1843', '1867', '1890', '1894'], ans: 3, exp: '"Tower Bridge was opened in 1894."' },
        ],
      },
    ],
    B1: [
      {
        id: 'b1_1', title: 'The Psychology of Habits', type: 'Podcast', accent: 'American',
        accent_c: 'var(--violet)', level: 'B1', level_c: 'var(--violet)', acc: 'acc-violet',
        duration: '5:15', numTasks: 5,
        desc: 'Inson odatlari va ularni qanday shakllantirish haqida qiziqarli podcast suhbati.',
        tags: ['Psychology', 'Discussion', 'Academic'],
        transcript: `Host: Welcome back to MindMatters podcast. Today we're talking about habits — why we form them, why they're so hard to break, and how we can use science to change our behaviour. Joining me is Dr Sarah Chen, a behavioural psychologist.
Dr Chen: Thanks for having me.
Host: So, let's start with the basics. What exactly is a habit?
Dr Chen: A habit is essentially a behaviour that has become automatic through repetition. When we repeat an action in a consistent context, the brain starts to encode it as a routine. What's fascinating is that habits are stored in a different part of the brain from conscious decision-making — they live in the basal ganglia.
Host: Why does the brain do this?
Dr Chen: Efficiency. The brain is incredibly energy-hungry, so it looks for shortcuts wherever it can. By turning repeated actions into automatic habits, the brain frees up cognitive resources for new challenges. It's brilliant, actually.
Host: But then why are bad habits so hard to break?
Dr Chen: Because the brain doesn't distinguish between good and bad habits — it just encodes what's repeated. And once a habit is formed, the neural pathway doesn't disappear even if you stop the behaviour. This is why people who quit smoking often feel cravings years later.
Host: That's quite sobering. So what's the best approach to changing habits?
Dr Chen: Research suggests the key is what we call habit stacking — linking a new behaviour to an existing habit. For example, if you want to meditate daily, you might do it immediately after brushing your teeth. Also, understanding the habit loop is crucial: there's a cue, a routine, and a reward. Change the routine while keeping the cue and reward, and you have a much better chance of success.
Host: Fascinating. Any final tips for listeners?
Dr Chen: Be patient. Research shows it takes an average of sixty-six days to form a new habit — not twenty-one as the popular myth suggests. And be kind to yourself when you slip up. A single missed day doesn't ruin a habit. What matters is getting back on track.`,
        gapWords: ['automatic', 'basal', 'efficiency', 'stacking', 'sixty-six'],
        gapSentence: `A habit is essentially a behaviour that has become [BLANK] through repetition. Habits are stored in the [BLANK] ganglia. The brain looks for shortcuts for [BLANK]. The key is habit [BLANK]. It takes an average of [BLANK] days to form a new habit.`,
        dictSegment: `A habit is essentially a behaviour that has become automatic through repetition. When we repeat an action in a consistent context, the brain starts to encode it as a routine.`,
        compQ: [
          { q: 'Odatlar miyaning qaysi qismida saqlanadi?', opts: ['Prefrontal cortex', 'Hippocampus', 'Basal ganglia', 'Cerebellum'], ans: 2, exp: '"they live in the basal ganglia."' },
          { q: 'Yangi odat hosil bo\'lishi uchun o\'rtacha qancha vaqt kerak?', opts: ['21 kun', '30 kun', '66 kun', '100 kun'], ans: 2, exp: '"it takes an average of sixty-six days to form a new habit."' },
          { q: '"Habit stacking" nima?', opts: ['Bir kunda ko\'p odat hosil qilish', 'Yangi odatni mavjud odatga bog\'lash', 'Yomon odatlarni tark etish', 'Odatlar ro\'yxatini tuzish'], ans: 1, exp: '"linking a new behaviour to an existing habit."' },
        ],
      },
      {
        id: 'b1_2', title: 'Climate Change Discussion', type: 'Debate', accent: 'Mixed',
        accent_c: 'var(--orange)', level: 'B1', level_c: 'var(--violet)', acc: 'acc-violet',
        duration: '4:50', numTasks: 4,
        desc: 'Iqlim o\'zgarishi bo\'yicha ikki tomonlama munozara. Argumentlar va qarama-qarshi fikrlar.',
        tags: ['Environment', 'Debate', 'Opinion'],
        transcript: `Moderator: Good evening. Tonight we're discussing climate change and what ordinary people can do about it. On my left is Anna, an environmental activist, and on my right is David, an economist.
Anna: Thank you. I want to be very clear — climate change is the single greatest threat humanity has ever faced. We are seeing unprecedented weather events: stronger hurricanes, longer droughts, rising sea levels. And the scientific consensus is overwhelming — over ninety-seven percent of climate scientists agree it is real and caused primarily by human activity.
David: I don't dispute the science. Climate change is real. But my concern is about the economic cost of the solutions being proposed. Transitioning to renewable energy too quickly could cause massive unemployment in traditional industries, raise energy prices for ordinary families, and destabilise economies, especially in developing countries.
Anna: But what's the cost of doing nothing? The World Bank estimates that climate inaction could push over two hundred million people into poverty by 2050. That's a far greater economic disaster. And renewables are now actually cheaper than fossil fuels in many markets.
David: And I agree we need to transition — but gradually, carefully. We need to bring people along, not leave workers behind. That means investment in job retraining, community support programmes, and international cooperation so that developing nations aren't penalised for trying to grow.
Moderator: Can you find any common ground?
Anna: Yes — carbon pricing. If we make polluting expensive, markets will naturally shift towards cleaner alternatives. David: Agreed. A well-designed carbon tax, with revenues returned to households, could work. The key is getting the policy right.`,
        gapWords: ['ninety-seven', 'two hundred', 'cheaper', 'carbon', 'retraining'],
        gapSentence: `Over [BLANK] percent of climate scientists agree climate change is real. Climate inaction could push over [BLANK] million people into poverty. Renewables are now [BLANK] than fossil fuels in many markets. A [BLANK] tax could work. Investment in job [BLANK] is needed.`,
        dictSegment: `Climate change is the single greatest threat humanity has ever faced. We are seeing unprecedented weather events: stronger hurricanes, longer droughts, rising sea levels.`,
        compQ: [
          { q: 'Olimlarning necha foizi iqlim o\'zgarishini insoniyat tomonidan keltirilgan deydi?', opts: ['90%', '95%', '97%', '99%'], ans: 2, exp: '"over ninety-seven percent of climate scientists agree."' },
          { q: 'Davening asosiy tashvishi nima?', opts: ['Fan', 'Iqtisodiy xarajatlar', 'Siyosat', 'Texnologiya'], ans: 1, exp: '"my concern is about the economic cost of the solutions."' },
        ],
      },
      {
        id: 'b1_3', title: 'Interview: Life as a Chef', type: 'Interview', accent: 'British',
        accent_c: 'var(--cyan)', level: 'B1', level_c: 'var(--violet)', acc: 'acc-violet',
        duration: '4:20', numTasks: 4,
        desc: 'Mashhur oshpaz bilan suhbat — karera, qiyinchiliklar va muvaffaqiyatlar haqida.',
        tags: ['Career', 'Interview', 'Inspiration'],
        transcript: `Interviewer: Marco, you've been a professional chef for twenty years. What first attracted you to cooking?
Marco: My grandmother, without question. She cooked everything from scratch — no packets, no shortcuts. Watching her transform simple ingredients into something magical, I was hooked from about the age of seven. Food for her wasn't just fuel, it was love, tradition, identity.
Interviewer: And when did you decide to make it a career?
Marco: Not until I was eighteen. Before that, I wanted to be an architect! But I got a part-time job in a restaurant kitchen, and within a week I knew. The energy, the teamwork, the creativity under pressure — it was addictive.
Interviewer: What's the biggest misconception people have about being a chef?
Marco: That it's glamorous. Television has a lot to answer for! The reality is twelve to sixteen hour days, very little sleep, weekends away from family, and physically exhausting work. Your feet ache, your hands get burned and cut. But when you see a table of people laughing and enjoying food you've created — there's nothing like it.
Interviewer: What advice would you give to young people who want to cook professionally?
Marco: Taste everything. Travel. Eat in as many different cultures as you can. And never stop learning — I still take masterclasses. Ego is the enemy in a kitchen. The best chefs I know are also the most humble.`,
        gapWords: ['grandmother', 'seven', 'architect', 'sixteen', 'humble'],
        gapSentence: `My [BLANK] first inspired me to cook. I was hooked from about the age of [BLANK]. Before cooking, I wanted to be an [BLANK]. Chefs work twelve to [BLANK] hour days. The best chefs are the most [BLANK].`,
        dictSegment: `My grandmother cooked everything from scratch — no packets, no shortcuts. Watching her transform simple ingredients into something magical, I was hooked from about the age of seven.`,
        compQ: [
          { q: 'Marco aslida kim bo\'lmoqchi edi?', opts: ['Shifokor', 'Arxitektor', 'Muhandis', 'O\'qituvchi'], ans: 1, exp: '"Before that, I wanted to be an architect!"' },
          { q: 'Marco oshpazlikka asosiy ilhom manbai?', opts: ['Restoran', 'Televideniye', 'Buvisi', 'Maktab'], ans: 2, exp: '"My grandmother, without question."' },
        ],
      },
    ],
    B2: [
      {
        id: 'b2_1', title: 'Artificial Intelligence & Society', type: 'Lecture', accent: 'American',
        accent_c: 'var(--orange)', level: 'B2', level_c: 'var(--orange)', acc: 'acc-orange',
        duration: '7:30', numTasks: 5,
        desc: 'AI ning jamiyatga ta\'siri haqida universitet ma\'ruzasi. Murakkab til va tushunchalar.',
        tags: ['Technology', 'Academic', 'Critical'],
        transcript: `Good morning, everyone. Today's lecture examines artificial intelligence not as a technical phenomenon, but as a social and ethical one. By the end of this session, I want you to question assumptions you may not even know you hold about intelligence, labour, and what it means to be human.
Let me begin with what AI actually is. Contrary to science fiction, current AI systems — even the most sophisticated ones — are not conscious, sentient, or self-aware. They are extraordinarily powerful pattern-recognition systems trained on vast quantities of human-generated data. When GPT produces a convincing essay or DALL-E creates a stunning image, it is not "thinking" — it is extrapolating patterns from billions of examples.
So why does this matter? Because the language we use shapes how we respond. If we treat AI as a kind of digital person, we risk both anthropomorphising it in ways that create false expectations, and failing to hold its human creators accountable for its outputs. The AI doesn't decide to be biased — the training data, the objectives set by engineers, the incentives of corporations: these are human choices.
Consider the labour market. McKinsey estimates that by 2030, up to eight hundred million jobs globally could be affected by automation. Now, technological unemployment is not new — the industrial revolution displaced millions from agricultural work. But AI is different in scope and speed. Previous automation displaced specific manual tasks. AI threatens cognitive tasks too — drafting, diagnosis, design, analysis.
The question is not whether displacement will happen, but whether we build social infrastructure to manage it. Universal basic income, massively expanded retraining programmes, reduced working hours — these are policy choices, not economic inevitabilities. We shape the world AI creates. The technology does not determine our response.`,
        gapWords: ['pattern-recognition', 'accountable', '800 million', 'cognitive', 'inevitable'],
        gapSentence: `Current AI systems are extraordinarily powerful [BLANK] systems. We risk failing to hold creators [BLANK] for AI outputs. McKinsey estimates up to [BLANK] jobs could be affected. AI threatens [BLANK] tasks too. Displacement is not economically [BLANK] — we shape our response.`,
        dictSegment: `Current AI systems — even the most sophisticated ones — are not conscious, sentient, or self-aware. They are extraordinarily powerful pattern-recognition systems trained on vast quantities of human-generated data.`,
        compQ: [
          { q: 'Ma\'ruzachi AI ni qanday ta\'riflaydi?', opts: ['Ongli va o\'z-o\'zidan xabardor', 'Sezgi egasi', 'Kuchli pattern-recognition tizimi', 'Digital inson'], ans: 2, exp: '"They are extraordinarily powerful pattern-recognition systems."' },
          { q: 'McKinsey 2030 yilga kelib qancha ish o\'rniga ta\'sir bo\'lishini taxmin qiladi?', opts: ['80 million', '800 million', '80 billion', '8 trillion'], ans: 1, exp: '"up to eight hundred million jobs globally could be affected."' },
        ],
      },
    ],
    C1: [
      {
        id: 'c1_1', title: 'Philosophy of Language — Wittgenstein', type: 'Seminar', accent: 'British',
        accent_c: 'var(--pink)', level: 'C1', level_c: 'var(--pink)', acc: 'acc-pink',
        duration: '9:00', numTasks: 6,
        desc: 'Ludwig Wittgenstein\'ning til falsafasi haqida magistratura seminari. Juda murakkab akademik ingliz tili.',
        tags: ['Philosophy', 'Academic', 'Dense'],
        transcript: `Today we're looking at Wittgenstein's later philosophy — specifically the Philosophical Investigations — and how it represents a radical departure from his earlier Tractatus. The shift is genuinely revolutionary, and misunderstanding it leads to misreading most of twentieth-century analytic philosophy.
In the Tractatus, Wittgenstein held that language has a logical structure that mirrors the structure of reality. Each meaningful proposition corresponds to a possible state of affairs in the world. Language, on this view, is essentially a picture of facts. The limits of language are the limits of the world.
By the time of the Investigations, Wittgenstein had completely abandoned this position. He now argued that meaning is not something hidden behind words — a mental image, a Platonic form, a logical structure — but is constituted by use. The famous slogan: meaning is use.
What does this mean in practice? Wittgenstein introduces the concept of language games — forms of life in which words get their meaning from the roles they play in human practices. The word "pain" doesn't mean anything by pointing inward at a private sensation. It means what it does because of the way we use it — in expressions of suffering, in comforting others, in medical contexts.
This has devastating implications for the idea of a private language — a language only I could understand, referring to my own inner experiences. Wittgenstein argues this is incoherent. Without a public practice of using words correctly, there is no distinction between using a word correctly and merely thinking one is using it correctly. Correctness requires a criterion, and criteria are necessarily social.
The consequences for philosophy of mind, cognitive science, and artificial intelligence are enormous. If meaning is constituted by participation in social practices — what AI researchers call "embodied cognition" — then a system that produces grammatically correct sentences without being embedded in forms of human life may be doing something quite different from meaning anything at all.`,
        gapWords: ['Tractatus', 'mirrors', 'language games', 'private', 'embodied'],
        gapSentence: `The [BLANK] held that language has a logical structure that [BLANK] the structure of reality. Wittgenstein introduces the concept of [BLANK]. The idea of a [BLANK] language is incoherent. Meaning requires [BLANK] cognition — participation in social practices.`,
        dictSegment: `Wittgenstein had completely abandoned this position. He now argued that meaning is not something hidden behind words, but is constituted by use. The famous slogan: meaning is use.`,
        compQ: [
          { q: 'Wittgenstein\'ning keyingi falsafasida "ma\'no" nima bilan bog\'liq?', opts: ['Logik tuzilma', 'Aqliy rasm', 'Foydalanish amaliyoti', 'Hissiy tajriba'], ans: 2, exp: '"meaning is not hidden behind words — but is constituted by use."' },
          { q: '"Xususiy til" (private language) imkonsiz nima uchun?', opts: ['Juda murakkab', 'To\'g\'ri ishlatish uchun ijtimoiy mezon kerak', 'Hamma tillar shaxsiy', 'Til mantiqiy emas'], ans: 1, exp: '"Correctness requires a criterion, and criteria are necessarily social."' },
        ],
      },
    ],
  };

  const phonetics = [
    { sym: '/iː/', name: 'Long EE', ex: 'see, tree, feet', type: 'VOWEL', color: 'var(--cyan)' },
    { sym: '/ɪ/', name: 'Short I', ex: 'sit, this, big', type: 'VOWEL', color: 'var(--cyan)' },
    { sym: '/e/', name: 'Short E', ex: 'bed, red, pet', type: 'VOWEL', color: 'var(--cyan)' },
    { sym: '/æ/', name: 'CAT vowel', ex: 'cat, bad, hat', type: 'VOWEL', color: 'var(--cyan)' },
    { sym: '/ɑː/', name: 'Long AH', ex: 'car, father, spa', type: 'VOWEL', color: 'var(--cyan)' },
    { sym: '/ɒ/', name: 'Short O', ex: 'hot, dog, top', type: 'VOWEL', color: 'var(--cyan)' },
    { sym: '/ɔː/', name: 'Long AW', ex: 'law, four, more', type: 'VOWEL', color: 'var(--cyan)' },
    { sym: '/ʊ/', name: 'Short OO', ex: 'book, put, foot', type: 'VOWEL', color: 'var(--cyan)' },
    { sym: '/uː/', name: 'Long OO', ex: 'blue, food, true', type: 'VOWEL', color: 'var(--cyan)' },
    { sym: '/ʌ/', name: 'Short U', ex: 'cup, run, love', type: 'VOWEL', color: 'var(--cyan)' },
    { sym: '/ə/', name: 'Schwa', ex: 'about, the, sofa', type: 'VOWEL', color: 'var(--lime)' },
    { sym: '/θ/', name: 'TH voiceless', ex: 'think, three, bath', type: 'CONSONANT', color: 'var(--violet)' },
    { sym: '/ð/', name: 'TH voiced', ex: 'this, mother, breathe', type: 'CONSONANT', color: 'var(--violet)' },
    { sym: '/ʃ/', name: 'SH sound', ex: 'she, fish, nation', type: 'CONSONANT', color: 'var(--violet)' },
    { sym: '/ʒ/', name: 'ZH sound', ex: 'vision, measure', type: 'CONSONANT', color: 'var(--violet)' },
    { sym: '/tʃ/', name: 'CH sound', ex: 'church, match', type: 'CONSONANT', color: 'var(--violet)' },
    { sym: '/dʒ/', name: 'J sound', ex: 'jump, age, just', type: 'CONSONANT', color: 'var(--violet)' },
    { sym: '/ŋ/', name: 'NG sound', ex: 'ring, singing, long', type: 'CONSONANT', color: 'var(--violet)' },
    { sym: '/r/', name: 'R sound', ex: 'red, car, right', type: 'CONSONANT', color: 'var(--orange)' },
    { sym: '/w/', name: 'W sound', ex: 'wet, we, always', type: 'CONSONANT', color: 'var(--orange)' },
  ];

  const challenges = [
    { num: '01', tag: 'Minimal pairs', tagClr: 'var(--cyan)', title: 'Minimal Pairs Mashqi', desc: 'Fonetik jihatdan o\'xshash so\'zlarni farqlash: ship/sheep, live/leave, bit/beat. Ularni eshiting va qaysi ekanini belgilang.', diff: 2, color: 'var(--cyan)' },
    { num: '02', tag: 'Dictation', tagClr: 'var(--lime)', title: 'Paragraph Diktation', desc: '60 soniyalik audio segment tinglang va aynan yozing. Tinish belgilariga diqqat qiling.', diff: 3, color: 'var(--lime)' },
    { num: '03', tag: 'Intonation', tagClr: 'var(--violet)', title: 'Intonatsiya Tahlili', desc: 'Bir xil gap boshqacha intonatsiya bilan turli ma\'no beradi. Har gal eshiting va ma\'noni aniqlang.', diff: 3, color: 'var(--violet)' },
    { num: '04', tag: 'Accent Train', tagClr: 'var(--orange)', title: 'British vs American', desc: 'Bir xil so\'zlarning British va American talaffuzini solishtiring. Farqlarni yozing.', diff: 2, color: 'var(--orange)' },
    { num: '05', tag: 'Note-taking', tagClr: 'var(--pink)', title: 'Lecture Note-taking', desc: '2 daqiqalik mini-ma\'ruza tinglang, faqat asosiy punktlarni qisqacha yozing. IELTS Listening uchun zarur.', diff: 4, color: 'var(--pink)' },
    { num: '06', tag: 'Shadow', tagClr: 'var(--lime)', title: 'Tezlik Shadow Reading', desc: '1.25× tezlikda audio bilan bir vaqtda gapiring. Artikulyatsiya va ritmni rivojlantiradi.', diff: 4, color: 'var(--lime)' },
    { num: '07', tag: 'Gap-fill', tagClr: 'var(--cyan)', title: 'Extended Gap-Fill', desc: '5 daqiqalik podcast tinglang, 15 ta bo\'sh joyni to\'ldiring. Kontekstdan foydalaning.', diff: 3, color: 'var(--cyan)' },
    { num: '08', tag: 'Inference', tagClr: 'var(--orange)', title: 'Implied Meaning', desc: 'Gapiruvchining aytmagan, lekin anglatgan narsalarini aniqlang. C1 darajasi uchun muhim.', diff: 5, color: 'var(--orange)' },
  ];

  const quizQs = [
    { type: 'STRATEGY', q: 'Active listening nima?', opts: ['Faqat eshitish', 'Ma\'no izlab maqsadli tinglash', 'Transkripsiya o\'qish', 'Bir vaqtda gapirish'], ans: 1, exp: 'Active listening — faqat ovozni eshitish emas, balki kontekst, his va ma\'noni faol izlash jarayoni.' },
    { type: 'PHONETICS', q: '/θ/ belgisi qanday tovushni bildiradi?', opts: ['S tovushi', 'Z tovushi', 'TH (think) tovushi', 'SH tovushi'], ans: 2, exp: '/θ/ — "think", "three", "bath" kabi so\'zlardagi ovoz chiqarilmaydigan TH tovushi.' },
    { type: 'STRATEGY', q: 'Prediction strategy listening\'da nima beradi?', opts: ['Diqqatni chalg\'itadi', 'Kontekst va kutish hosil qiladi', 'Tezlikni oshiradi', 'Lug\'at o\'rgatadi'], ans: 1, exp: 'Prediction — eshitishdan oldin mavzu haqida o\'ylash, bu miyani tayyorlaydi va tushunishni osonlashtiradi.' },
    { type: 'PHONETICS', q: '"Schwa" /ə/ nima?', opts: ['Inglizchada yo\'q tovush', 'Eng ko\'p uchraydigan ingliz unlisi', 'Faqat stress syllabada', 'Unli tovush emas'], ans: 1, exp: 'Schwa /ə/ — ingliz tilida eng ko\'p ishlatiladigan tovush. "about", "the", "sofa" kabi so\'zlarda uchraydi.' },
    { type: 'SKILLS', q: 'Dictation mashqining asosiy foydasi nima?', opts: ['Ko\'z ko\'rish tezligi', 'Tinglash, lug\'at va imlo birgalikda rivojlanadi', 'Faqat grammatika', 'Tezkor yozish'], ans: 1, exp: 'Dictation bir vaqtda tinglash qobiliyatini, lug\'atni va imlo ko\'nikmalarini rivojlantiradi.' },
    { type: 'ACCENT', q: 'RP (Received Pronunciation) nima?', opts: ['American ingliz tili', 'Avstraliya shevasi', 'Standart British ingliz tili', 'Shotlandiya shevasi'], ans: 2, exp: 'RP — Received Pronunciation, British Broadcasting Corporation (BBC) da ishlatiladigan standart britaniya talaffuzi.' },
    { type: 'STRATEGY', q: 'Note-taking paytida eng muhim narsa?', opts: ['Hamma narsani yozish', 'Faqat kalit so\'z va tushunchalarni yozish', 'Faqat raqamlarni yozish', 'Grammatikaga e\'tibor berish'], ans: 1, exp: 'Samarali note-taking — asosiy g\'oyalar, raqamlar va kalit so\'zlarni qisqacha yozish. Hamma narsani yozish imkonsiz.' },
    { type: 'PHONETICS', q: 'Minimal pair nima?', opts: ['Bir xil ma\'noli so\'zlar', 'Faqat bir tovushda farqlanadigan so\'zlar', 'Bir xil yoziladigan so\'zlar', 'Sinonimlar'], ans: 1, exp: 'Minimal pair — "ship/sheep", "bit/beat" kabi faqat bitta fonemada farqlanadigan so\'z juftligi.' },
    { type: 'STRATEGY', q: 'Shadow reading qaysi ko\'nikmani rivojlantiradi?', opts: ['Grammatika', 'O\'qish tezligi', 'Talaffuz, ritm va intonatsiya', 'Yozish'], ans: 2, exp: 'Shadow reading — audio bilan bir vaqtda gapirish, bu talaffuz, ritm, stress va intonatsiyani rivojlantiradi.' },
    { type: 'SKILLS', q: 'IELTS Listening\'da "Section 3" odatda nima?', opts: ['Intervyu', 'Monolog', 'Ikki-to\'rt kishi o\'rtasida akademik muhokama', 'Xabar'], ans: 2, exp: 'IELTS Section 3 — odatda universitet yoki o\'quv muhitidagi 2-4 kishi o\'rtasida akademik suhbat.' },
    { type: 'PHONETICS', q: '/ŋ/ tovushi qaysi so\'zlarda bor?', opts: ['ship, sheep', 'ring, singing, long', 'think, three', 'red, car'], ans: 1, exp: '/ŋ/ — "ring", "singing", "long" kabi -ng birikmalarida uchraydigan burun tovushi.' },
    { type: 'STRATEGY', q: 'Intonatsiya o\'rganish nima uchun muhim?', opts: ['Faqat formal nutq uchun', 'Ma\'no va his-tuyg\'uni tushunish uchun', 'Grammatika uchun', 'Lug\'at uchun'], ans: 1, exp: 'Intonatsiya — bir xil gap boshqa intonatsiya bilan boshqa ma\'no bildiradi. Ingliz tilida bu juda muhim.' },
  ];

  const tips = [
    'Active listening — faqat eshitish emas, balki ma\'no izlash. Har gal eshitishda yangi narsa topasiz!',
    'Birinchi tinglashda hamma narsani tushunish shart emas. Context yordamida asosiy g\'oyani aniqlang.',
    'Shadow reading — audio bilan bir vaqtda gapirish — talaffuzni tezda yaxshilaydi.',
    'Dictation yozganingizda tinish belgilarini ham qo\'shing — bu IELTS Writing\'ga ham yordam beradi.',
    'BBC Radio, TED Talks, Podcasts — har kuni 15 daqiqa real ingliz tili eshitish maqsad qiling.',
    '/θ/ va /ð/ tovushlarini mashq qiling — ko\'p o\'rganuvchilar uchun qiyin, lekin muhim farq!',
    'Skimming transcript — avval savollarni o\'qing, keyin audio tinglang.',
    'Sekin tezlikda boshlang (0.75×), keyin asta-sekin normal tezlikka o\'ting.',
  ];

  // ======================== STATE ========================
  const [currentLevel, setCurrentLevel] = useState('B1');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [pmPlaying, setPmPlaying] = useState(false);
  const [pmProgress, setPmProgress] = useState(0);
  const [pmSpeed, setPmSpeed] = useState(1);
  const [pmVolume, setPmVolume] = useState(1);
  const [pmWordIdx, setPmWordIdx] = useState(-1);
  const [autoScroll, setAutoScroll] = useState(true);
  const [pmDuration, setPmDuration] = useState(0);
  const [cqAnswered, setCqAnswered] = useState([]);
  const [cqScore, setCqScore] = useState(0);
  const [activePanel, setActivePanel] = useState(null);
  const [gapFillInputs, setGapFillInputs] = useState({});
  const [gapFillResult, setGapFillResult] = useState({ show: false, message: '', type: '' });
  const [dictationText, setDictationText] = useState('');
  const [dictationResult, setDictationResult] = useState({ show: false, html: '' });
  const [micActive, setMicActive] = useState(false);
  const [shadowMicActive, setShadowMicActive] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [tickerIdx, setTickerIdx] = useState(0);

  // Hero player state
  const [heroPlaying, setHeroPlaying] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);
  const [heroSpeed, setHeroSpeed] = useState(1);
  const heroDuration = 225;
  const heroSpeeds = [1, 1.25, 1.5, 0.75];
  const [heroSpeedIdx, setHeroSpeedIdx] = useState(0);

  // Quiz state
  const [qIdx, setQIdx] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qAnswered, setQAnswered] = useState(false);
  const [qShowResult, setQShowResult] = useState(false);

  // Refs - initialize as null on server
  const pmIntervalRef = useRef(null);
  const heroIntervalRef = useRef(null);
  const synthRef = useRef(null);
  
  // Initialize synth only on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // ======================== EFFECTS ========================
  useEffect(() => {
    renderAudioGrid(currentLevel);
    renderPhonetics();
    renderChallenges();
    startTips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pmPlaying) {
      pmIntervalRef.current = setInterval(() => {
        setPmProgress(prev => {
          const newProgress = prev + 1 / pmDuration;
          if (newProgress >= 1) {
            setPmPlaying(false);
            clearInterval(pmIntervalRef.current);
            if (synthRef.current) synthRef.current.cancel();
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    } else {
      clearInterval(pmIntervalRef.current);
    }
    return () => clearInterval(pmIntervalRef.current);
  }, [pmPlaying, pmDuration]);

  useEffect(() => {
    if (pmPlaying && currentAudio && synthRef.current) {
      const words = currentAudio.transcript.split(/\s+/);
      const idx = Math.floor(pmProgress * words.length);
      if (idx !== pmWordIdx && idx < words.length) {
        setPmWordIdx(idx);
        synthRef.current.cancel();
        const chunk = words.slice(idx, Math.min(idx + 5, words.length)).join(' ');
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = 'en-GB';
        utterance.rate = 0.88 * pmSpeed;
        utterance.volume = pmVolume;
        synthRef.current.speak(utterance);
        if (autoScroll) scrollTranscript(idx);
      }
    }
  }, [pmProgress, pmPlaying, currentAudio, pmWordIdx, pmSpeed, pmVolume, autoScroll]);

  useEffect(() => {
    if (heroPlaying) {
      heroIntervalRef.current = setInterval(() => {
        setHeroProgress(prev => {
          const newProgress = prev + 1 / heroDuration;
          if (newProgress >= 1) {
            setHeroPlaying(false);
            clearInterval(heroIntervalRef.current);
            if (synthRef.current) synthRef.current.cancel();
            return 0;
          }
          return newProgress;
        });
      }, 1000 / heroSpeed);
    } else {
      clearInterval(heroIntervalRef.current);
    }
    return () => clearInterval(heroIntervalRef.current);
  }, [heroPlaying, heroDuration, heroSpeed]);

  useEffect(() => {
    if (heroPlaying && synthRef.current) {
      const heroWords = "Hello my name is Emily and I will tell you about morning routines and habits that make life wonderful and productive in so many ways".split(' ');
      const idx = Math.floor(heroProgress * heroWords.length);
      if (idx < heroWords.length) {
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(heroWords[idx]);
        utterance.lang = 'en-GB';
        utterance.rate = 0.95 * heroSpeed;
        synthRef.current.speak(utterance);
      }
    }
  }, [heroProgress, heroPlaying, heroSpeed]);

  const startTips = () => {
    const interval = setInterval(() => {
      setTickerIdx(prev => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  };

  // ======================== FUNCTIONS ========================
  const goSec = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const filterAudio = (lv) => {
    setCurrentLevel(lv);
    renderAudioGrid(lv);
  };

  const renderAudioGrid = (lv) => {
    // This is handled in the JSX render
  };

  const renderPhonetics = () => {
    // Handled in JSX
  };

  const renderChallenges = () => {
    // Handled in JSX
  };

  const speakPhone = (word) => {
    if (!synthRef.current) {
      alert('Brauzeringiz TTS qo\'llamaydi.');
      return;
    }
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-GB';
    utterance.rate = 0.7;
    utterance.pitch = 1;
    synthRef.current.speak(utterance);
  };

  const startChallenge = (num) => {
    const msgs = {
      '01': 'Minimal pairs: ship/sheep, live/leave, bit/beat — ularni diqqat bilan eshiting va farqing! Audiolardan birini oching va fonetika qismiga e\'tibor bering.',
      '02': 'Dictation challenge: Istalgan B2-C1 audio oching → Dictation mode → 60 soniya segmentni eshiting va aynan yozing.',
      '03': 'Intonatsiya: "Really?" so\'zini savol, hayrat va shubha ohangida gapiring. Shadow mode\'da nusxa ko\'chiring.',
      '04': 'British vs American: "schedule", "aluminum", "laboratory" so\'zlarini ikkala aksent bilan eshiting va farqini yozing.',
      '05': 'Note-taking: B2 yoki C1 audiodan foydalaning. Faqat kalit so\'z va raqamlarni yozing. Keyin transcript bilan solishtiring.',
      '06': 'Shadow Reading: B1 yoki B2 audiodan foydalaning, tezlikni 1.25× ga qo\'ying va audio bilan bir vaqtda gapiring!',
      '07': 'Gap-Fill challenge: C1 audiodan foydalaning → Gap-Fill mode. Kontekstdan foydalaning.',
      '08': 'Inference: B2 "Climate Change" audioda — gapiruvchi nimani aytmagan lekin anglatgan? Transcriptni ko\'rmay javob bering.',
    };
    alert('💡 Topshiriq ' + num + ':\n\n' + (msgs[num] || 'Audiolardan birini oching va mashq boshlang!'));
  };

  const openAudio = (id) => {
    const audio = Object.values(audioData).flat().find(x => x.id === id);
    if (!audio) return;
    setCurrentAudio(audio);
    setPmProgress(0);
    setPmPlaying(false);
    setPmWordIdx(-1);
    setCqAnswered([]);
    setCqScore(0);
    setActivePanel(null);
    setGapFillInputs({});
    setGapFillResult({ show: false, message: '', type: '' });
    setDictationText('');
    setDictationResult({ show: false, html: '' });

    // Parse duration
    const parts = audio.duration.split(':');
    setPmDuration(parseInt(parts[0]) * 60 + parseInt(parts[1]));

    setModalOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closePlayer = () => {
    setPmPlaying(false);
    if (synthRef.current) synthRef.current.cancel();
    setModalOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const togglePlayer = () => {
    setPmPlaying(prev => !prev);
  };

  const seekAudio = (e, type) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const newProgress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setPmProgress(newProgress);
    setPmWordIdx(-1);
  };

  const pmSkip = (sec) => {
    setPmProgress(prev => Math.max(0, Math.min(1, prev + sec / pmDuration)));
    setPmWordIdx(-1);
  };

  const setSpeed = (s, btnRef) => {
    setPmSpeed(s);
  };

  const handleVolumeChange = (e) => {
    setPmVolume(parseFloat(e.target.value));
  };

  const toggleHero = () => {
    setHeroPlaying(prev => !prev);
  };

  const heroSkip = (sec) => {
    setHeroProgress(prev => Math.max(0, Math.min(1, prev + sec / heroDuration)));
  };

  const heroSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroProgress(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
  };

  const cycleHeroSpeed = () => {
    setHeroSpeedIdx(prev => (prev + 1) % heroSpeeds.length);
    setHeroSpeed(heroSpeeds[(heroSpeedIdx + 1) % heroSpeeds.length]);
  };

  const toggleTranscript = () => {
    setActivePanel(prev => prev === 'transcript' ? null : 'transcript');
  };

  const showGapFill = () => {
    setActivePanel(prev => prev === 'gapfill' ? null : 'gapfill');
  };

  const showDictation = () => {
    setActivePanel(prev => prev === 'dictation' ? null : 'dictation');
  };

  const showShadow = () => {
    setActivePanel(prev => prev === 'shadow' ? null : 'shadow');
  };

  const showComp = () => {
    setActivePanel(prev => prev === 'comp' ? null : 'comp');
  };

  const toggleAutoScroll = () => {
    setAutoScroll(prev => !prev);
  };

  const scrollTranscript = (idx) => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(`tw_${idx}`);
    const body = document.getElementById('transcriptBody');
    if (el && body) {
      body.scrollTop = el.offsetTop - body.clientHeight / 2;
    }
  };

  const seekToWord = (idx) => {
    if (!currentAudio) return;
    const words = currentAudio.transcript.split(/\s+/);
    setPmProgress(idx / words.length);
    setPmWordIdx(-1);
  };

  const handleGapInputChange = (idx, value) => {
    setGapFillInputs(prev => ({ ...prev, [idx]: value }));
  };

  const checkGapFill = () => {
    if (!currentAudio) return;
    const inputs = document.querySelectorAll('.gap-input');
    let correct = 0;
    inputs.forEach((inp, i) => {
      const ans = inp.value.trim().toLowerCase();
      const expected = inp.dataset.ans.toLowerCase();
      if (ans === expected || (expected.includes(ans) && ans.length > 2)) {
        inp.classList.add('correct');
        inp.classList.remove('wrong');
        correct++;
      } else {
        inp.classList.add('wrong');
        inp.classList.remove('correct');
      }
    });
    const pct = Math.round((correct / inputs.length) * 100);
    let type = 'bad';
    if (pct >= 80) type = 'good';
    else if (pct >= 50) type = 'partial';
    setGapFillResult({
      show: true,
      type,
      message: `${correct}/${inputs.length} to'g'ri (${pct}%). ${pct >= 80 ? 'Zo\'r natija!' : pct >= 50 ? 'Yaxshi boshlash. Qayta tinglang.' : 'Yana bir bor tinglang va urinib ko\'ring.'}`
    });
  };

  const resetGapFill = () => {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('.gap-input').forEach(inp => {
      inp.value = '';
      inp.classList.remove('correct', 'wrong');
    });
    setGapFillResult({ show: false, message: '', type: '' });
  };

  const showGapHint = () => {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('.gap-input').forEach(inp => {
      if (!inp.value) {
        inp.placeholder = inp.dataset.ans[0] + '_'.repeat(inp.dataset.ans.length - 1);
      }
    });
  };

  const playDictSegment = (slow = false) => {
    if (!currentAudio || !synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(currentAudio.dictSegment);
    utterance.lang = 'en-GB';
    utterance.rate = slow ? 0.55 : 0.82;
    utterance.volume = pmVolume;
    synthRef.current.speak(utterance);
  };

  const checkDictation = () => {
    if (!currentAudio) return;
    const userText = dictationText.trim().toLowerCase();
    const refText = currentAudio.dictSegment.trim().toLowerCase();
    const userWords = userText.split(/\s+/);
    const refWords = refText.replace(/[.!?,—]/g, '').split(/\s+/);

    let html = '';
    let correct = 0;
    refWords.forEach((rw, i) => {
      const uw = (userWords[i] || '').replace(/[.!?,]/g, '');
      if (uw === rw) {
        html += `<span class="word-ok">${rw} </span>`;
        correct++;
      } else if (uw) {
        html += `<span class="word-err" title="To'g'ri: ${rw}">${uw} </span>`;
      } else {
        html += `<span class="word-missing">[${rw}] </span>`;
      }
    });

    const pct = Math.round((correct / refWords.length) * 100);
    setDictationResult({
      show: true,
      html: `<div style="margin-bottom:10px;font-size:0.78rem;color:var(--text3);">To'g'ri: ${correct}/${refWords.length} (${pct}%) — <span style="color:var(--lime)">✓ To'g'ri</span> · <span style="color:var(--pink)">Xato</span> · <span style="color:var(--orange)">[Qoldirilgan]</span></div>` + html
    });
  };

  const showDictAnswer = () => {
    if (currentAudio) {
      setDictationText(currentAudio.dictSegment);
    }
  };

  const toggleMic = () => {
    if (typeof window === 'undefined') return;
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Brauzeringiz nutqni tanishni qo\'llamaydi. Chrome ishlatib ko\'ring.');
      return;
    }
    setMicActive(prev => !prev);
  };

  const toggleShadowMic = () => {
    setShadowMicActive(prev => !prev);
    if (!shadowMicActive) {
      alert('🎤 Mikrofon faollashdi! Audio bilan bir vaqtda gaping. Natijangiz tinish paytida ko\'rinadi.');
    }
  };

  const resetShadow = () => {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('.sh-word').forEach(s => s.classList.remove('sh-active'));
    setPmProgress(0);
    setPmWordIdx(-1);
  };

  const answerCQ = (qi, oi) => {
    if (cqAnswered.includes(qi) || !currentAudio) return;
    const newAnswered = [...cqAnswered, qi];
    setCqAnswered(newAnswered);
    const q = currentAudio.compQ[qi];
    if (oi === q.ans) {
      setCqScore(prev => prev + 1);
    }
  };

  const getCQOptionClass = (qi, oi) => {
    if (!cqAnswered.includes(qi) || !currentAudio) return '';
    const q = currentAudio.compQ[qi];
    if (oi === q.ans) return 'cor';
    return 'wr';
  };

  const isCQDisabled = (qi) => {
    return cqAnswered.includes(qi);
  };

  // Quiz functions
  const renderQuiz = () => {
    setQIdx(0);
    setQScore(0);
    setQAnswered(false);
    setQShowResult(false);
  };

  const qAnswer = (i) => {
    if (qAnswered) return;
    setQAnswered(true);
    if (i === quizQs[qIdx].ans) {
      setQScore(prev => prev + 1);
    }
  };

  const qNext = () => {
    if (qIdx + 1 >= quizQs.length) {
      setQShowResult(true);
    } else {
      setQIdx(prev => prev + 1);
      setQAnswered(false);
    }
  };

  const qRestart = () => {
    renderQuiz();
  };

  const getQOptionClass = (i) => {
    if (!qAnswered) return '';
    if (i === quizQs[qIdx].ans) return 'cor';
    return 'wr';
  };

  const getQuizResultEmoji = () => {
    const pct = Math.round((qScore / quizQs.length) * 100);
    if (pct >= 80) return '🏆';
    if (pct >= 60) return '🥈';
    return '📚';
  };

  const getQuizResultMsg = () => {
    const pct = Math.round((qScore / quizQs.length) * 100);
    if (pct >= 80) return 'Mukammal! Listening ekspertsiz!';
    if (pct >= 60) return 'Yaxshi natija. Yana o\'rganing!';
    return 'Ko\'proq mashq qiling. Har xato — bilim!';
  };

  // Helper
  const fmtTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = String(Math.floor(secs % 60)).padStart(2, '0');
    return m + ':' + s;
  };

  // Keyboard shortcuts - only on client
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (e) => {
      if (!modalOpen) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayer();
      }
      if (e.code === 'ArrowLeft') pmSkip(-10);
      if (e.code === 'ArrowRight') pmSkip(10);
      if (e.code === 'Escape') closePlayer();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  // ======================== RENDER ========================
  return (
    <div className="listenup">
      {/* Glow Background */}
      <div className="bg-glow">
        <div className="glow-orb glow-1"></div>
        <div className="glow-orb glow-2"></div>
        <div className="glow-orb glow-3"></div>
      </div>

      <div className="main">
      <Header/>

        {/* HERO */}
        <div className="hero au">
          <div>
            <div className="hero-eyebrow">Multilevel Listening Academy</div>
            <h1>Tinglab<br /><span className="c">tushunish</span> —<br /><span className="l">super kuch</span></h1>
            <p className="hero-sub">A1 dan C1 gacha real audio matnlar, gap-fill, dictation, shadow reading, fonetika mashqlari va AI bilan talaffuz tekshiruvi orqali ingliz tilini quloq bilan o'rganing.</p>
            <div className="hero-btns">
              <button className="btn btn-cyan" onClick={() => goSec('audioline')}>Tinglashni boshlash →</button>
              <button className="btn btn-outline" onClick={() => goSec('phoneticsec')}>Fonetika mashqi</button>
            </div>
          </div>

          {/* Hero mini player */}
          <div className="hero-player au d1">
            <div className="hp-label">DEMO PLAYER · B1 LEVEL</div>
            <div className="hp-title">Climate Change: A Global Challenge</div>
            <div className="hp-meta">3:45 · Academic · Podcast style</div>

            <div className="waveform-container" id="heroWave" onClick={heroSeek}>
              <div className="playhead" id="heroPlayhead" style={{ left: `${heroProgress * 100}%` }}></div>
              {Array(60).fill(0).map((_, i) => {
                const h = 12 + Math.random() * 46;
                const activePct = Math.floor(heroProgress * 60);
                return (
                  <div
                    key={i}
                    className={`waveform-bar ${i < activePct ? 'played' : i === activePct ? 'active' : ''}`}
                    style={{ height: h }}
                  ></div>
                );
              })}
            </div>

            <div className="hp-controls">
              <button className="hpbtn" onClick={() => heroSkip(-10)} title="10s orqaga">⏮</button>
              <button className="hpbtn play-main" id="heroPlayBtn" onClick={toggleHero}>
                {heroPlaying ? '⏸' : '▶'}
              </button>
              <button className="hpbtn" onClick={() => heroSkip(10)} title="10s oldinga">⏭</button>
              <span className="hp-time" id="heroTime">{fmtTime(heroProgress * heroDuration)} / {fmtTime(heroDuration)}</span>
              <button className="hp-speed" onClick={cycleHeroSpeed} id="heroSpeedBtn">{heroSpeed}×</button>
            </div>

            <div className="hp-tags">
              <span className="hp-tag" style={{ background: 'var(--cyan2)', color: 'var(--cyan)' }}>B1</span>
              <span className="hp-tag" style={{ background: 'var(--violet2)', color: 'var(--violet)' }}>Podcast</span>
              <span className="hp-tag" style={{ background: 'var(--lime2)', color: 'var(--lime)' }}>Academic</span>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-row au d2">
          <div className="stat-cell"><div className="sc-num" style={{ color: 'var(--cyan)' }}>24</div><div className="sc-label">Audio dars</div></div>
          <div className="stat-cell"><div className="sc-num" style={{ color: 'var(--lime)' }}>5</div><div className="sc-label">Daraja (A1–C1)</div></div>
          <div className="stat-cell"><div className="sc-num" style={{ color: 'var(--violet)' }}>8</div><div className="sc-label">Audio tur</div></div>
          <div className="stat-cell"><div className="sc-num" style={{ color: 'var(--orange)' }}>44</div><div className="sc-label">Fonetika belgisi</div></div>
          <div className="stat-cell"><div className="sc-num" style={{ color: 'var(--pink)' }}>12</div><div className="sc-label">Quiz savoli</div></div>
        </div>

        {/* TIPS BAR */}
        <div className="container" style={{ marginBottom: 0, paddingBottom: 0 }}>
          <div className="tips-bar">
            <div className="tb-icon">💡</div>
            <span className="tb-label">Maslahat</span>
            <span className="tb-text" id="tbText">{tips[tickerIdx]}</span>
          </div>
        </div>

        {/* AUDIO LIBRARY */}
        <div className="container sec-gap" id="audioline">
          <div className="sec-head">
            <h2>Audio Kutubxona</h2>
            <div className="sec-head-right">Daraja tanlang va tinglang</div>
          </div>

          <div className="lstrip">
            {['A1', 'A2', 'B1', 'B2', 'C1'].map(lvl => (
              <button
                key={lvl}
                className={`lchip ${currentLevel === lvl ? `active-${lvl.toLowerCase()}` : ''}`}
                onClick={() => filterAudio(lvl)}
              >
                {lvl === 'A1' && '🟢'} {lvl === 'A2' && '🔵'} {lvl === 'B1' && '🟣'} {lvl === 'B2' && '🟠'} {lvl === 'C1' && '🔴'} {lvl} — {lvl === 'A1' ? 'Starter' : lvl === 'A2' ? 'Elementary' : lvl === 'B1' ? 'Intermediate' : lvl === 'B2' ? 'Upper-Int' : 'Advanced'}
              </button>
            ))}
          </div>

          <div className="audio-grid" id="audioGrid">
            {(audioData[currentLevel] || []).map((a, i) => {
              const bars = Array(32).fill(0).map((_, j) => {
                const h = 8 + Math.random() * 20;
                return { height: h };
              });
              return (
                <div
                  key={a.id}
                  className="acard au"
                  style={{ animationDelay: `${i * 0.08}s` }}
                  onClick={() => openAudio(a.id)}
                >
                  <div className={`acard-accent ${a.acc}`}></div>
                  <div className="acard-body">
                    <div className="acard-top">
                      <div className="acard-badges">
                        <span className="abadge" style={{ background: 'rgba(255,255,255,0.06)', color: a.level_c }}>{a.level}</span>
                        <span className="abadge" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text3)' }}>{a.type}</span>
                        <span className="abadge" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text3)' }}>{a.accent}</span>
                      </div>
                      <div className="acard-num">#{String(i + 1).padStart(2, '0')}</div>
                    </div>
                    <div className="acard-title">{a.title}</div>
                    <div className="acard-desc">{a.desc}</div>
                    <div className="mini-wf">
                      {bars.map((b, idx) => (
                        <div key={idx} className="mwf-bar" style={{ height: b.height }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="acard-footer">
                    <div className="acard-duration">⏱ {a.duration}</div>
                    <div className="acard-tasks">{a.numTasks} ta mashq</div>
                    <button className="acard-playbtn">▶</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PHONETICS */}
        <div className="container phonetics-section" id="phoneticsec">
          <div className="sec-head">
            <h2>Fonetika — IPA Belgilar</h2>
            <div className="sec-head-right">Bosing va eshiting (TTS)</div>
          </div>
          <div className="ph-grid" id="phGrid">
            {phonetics.map((p, i) => (
              <div key={i} className="ph-card" onClick={() => speakPhone(p.ex.split(',')[0].trim())}>
                <div className="ph-type" style={{ color: p.color }}>{p.type}</div>
                <span className="ph-symbol" style={{ color: p.color }}>{p.sym}</span>
                <div className="ph-name">{p.name}</div>
                <div className="ph-example">{p.ex}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CHALLENGES */}
        <div className="container sec-gap" id="challengesec">
          <div className="sec-head">
            <h2>Listening Topshiriqlari</h2>
            <div className="sec-head-right">Turli ko'nikma va qiyinlik darajalari</div>
          </div>
          <div className="challenges-grid" id="challengesGrid">
            {challenges.map((c, i) => {
              const dots = Array(5).fill(0).map((_, j) => (
                <div key={j} className="cd-dot" style={{ background: j < c.diff ? c.color : 'rgba(255,255,255,0.1)' }}></div>
              ));
              return (
                <div key={i} className="challenge-card" data-num={c.num}>
                  <span className="cc-tag" style={{ background: 'rgba(255,255,255,0.06)', color: c.tagClr, border: `1px solid ${c.tagClr}33` }}>{c.tag}</span>
                  <div className="cc-title">{c.title}</div>
                  <div className="cc-desc">{c.desc}</div>
                  <div className="cc-difficulty">{dots}</div>
                  <button className="cc-action" onClick={() => startChallenge(c.num)}>Boshlash →</button>
                </div>
              );
            })}
          </div>
        </div>

        {/* QUIZ */}
        <div className="container quiz-section" id="quizsec">
          <div className="sec-head">
            <h2>Listening Knowledge Quiz</h2>
            <div className="sec-head-right">12 ta savol — listening strategiyalari va fonetika</div>
          </div>
          <div className="quiz-box">
            {!qShowResult ? (
              <div id="qMain">
                <div className="q-top">
                  <div className="q-prog" id="qProgText">Savol {qIdx + 1} / {quizQs.length}</div>
                  <div className="q-score">🎯 <span id="qSc">{qScore}</span> ball</div>
                </div>
                <div className="q-type" id="qType">{quizQs[qIdx].type}</div>
                <div className="q-text" id="qText">{quizQs[qIdx].q}</div>
                <div className="q-opts" id="qOpts">
                  {quizQs[qIdx].opts.map((opt, i) => {
                    const keys = ['A', 'B', 'C', 'D'];
                    return (
                      <button
                        key={i}
                        className={`q-opt ${qAnswered ? getQOptionClass(i) : ''}`}
                        onClick={() => qAnswer(i)}
                        disabled={qAnswered}
                      >
                        <span className="q-ok">{keys[i]}</span>{opt}
                      </button>
                    );
                  })}
                </div>
                {qAnswered && (
                  <div className={`q-fb show ${qAnswered && qIdx < quizQs.length ? (qIdx < quizQs.length ? 'g' : 'b') : ''}`} id="qFb">
                    {qAnswered && qIdx < quizQs.length ? (
                      <>
                        {quizQs[qIdx].ans === (() => {
                          for (let i = 0; i < 4; i++) if (document.activeElement?.id === `qo_${i}`) return i;
                          return -1;
                        })() ? '✅ To\'g\'ri! ' : '❌ Xato. '}
                        {quizQs[qIdx].exp}
                      </>
                    ) : ''}
                  </div>
                )}
                <div className="q-foot">
                  <div className="q-dots" id="qDots">
                    {quizQs.map((_, i) => (
                      <div key={i} className={`qdot ${i < qIdx ? 'done' : i === qIdx ? 'active' : ''}`}></div>
                    ))}
                  </div>
                  {qAnswered && (
                    <button className="btn btn-cyan" id="qNextBtn" onClick={qNext} style={{ padding: '10px 22px', fontSize: '0.8rem' }}>
                      Keyingi →
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="qres show" id="qRes">
                <div className="qres-emoji" id="qrEmoji">{getQuizResultEmoji()}</div>
                <div className="qres-score" id="qrScore">{qScore}/{quizQs.length}</div>
                <div className="qres-msg" id="qrMsg">{getQuizResultMsg()}</div>
                <button className="btn btn-cyan" onClick={qRestart}>Qayta boshlash</button>
              </div>
            )}
          </div>
        </div>

        <footer>
          <div className="f-brand">ListenUp</div>
          <div className="f-note">A1–C1 · Multilevel Listening Academy · © 2025</div>
        </footer>
      </div>

      {/* ========= PLAYER MODAL ========= */}
      {modalOpen && currentAudio && (
        <div className="player-modal open" id="playerModal">
          <div className="pm-inner">
            {/* TOPBAR */}
            <div className="pm-topbar">
              <button className="pm-back" onClick={closePlayer}>← Kutubxona</button>
              <div className="pm-toolbar">
                <button className={`pm-tool ${activePanel === 'transcript' ? 'on' : ''}`} id="toolTranscript" onClick={toggleTranscript}>📄 Transcript</button>
                <button className={`pm-tool ${activePanel === 'gapfill' ? 'on' : ''}`} id="toolGapFill" onClick={showGapFill}>✏️ Gap-Fill</button>
                <button className={`pm-tool ${activePanel === 'dictation' ? 'on' : ''}`} id="toolDict" onClick={showDictation}>🎙 Dictation</button>
                <button className={`pm-tool ${activePanel === 'shadow' ? 'on' : ''}`} id="toolShadow" onClick={showShadow}>🪞 Shadow</button>
                <button className={`pm-tool ${activePanel === 'comp' ? 'on' : ''}`} id="toolComp" onClick={showComp}>❓ Savol</button>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'var(--text3)' }} id="pmLevelBadge">{currentAudio.level}</div>
            </div>

            {/* PLAYER */}
            <div className="pm-player">
              <div className="pm-info">
                <div className="pm-level-row">
                  <span className="pm-lvlbadge" id="pmLevel" style={{ background: 'var(--cyan2)', color: 'var(--cyan)', border: '1px solid rgba(0,229,255,0.2)' }}>{currentAudio.level}</span>
                  <span className="pm-typebadge" id="pmType" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text3)', border: '1px solid var(--border)' }}>{currentAudio.type}</span>
                </div>
                <div className="pm-title" id="pmTitle">{currentAudio.title}</div>
                <div className="pm-sub" id="pmSub">{currentAudio.type} · {currentAudio.accent} Accent · {currentAudio.duration}</div>
              </div>

              <div className="big-waveform" id="bigWaveform" onClick={seekAudio}>
                <div className="bwf-playhead" id="bwfPlayhead" style={{ left: `${pmProgress * 100}%` }}></div>
                {Array(80).fill(0).map((_, i) => {
                  const h = 10 + Math.random() * 65;
                  const ap = Math.floor((pmProgress * 100) / 100 * 80);
                  return (
                    <div
                      key={i}
                      className={`bwf-bar ${i < ap - 1 ? 'played-bar' : i === ap ? 'curr-bar' : ''}`}
                      style={{ height: h }}
                    ></div>
                  );
                })}
              </div>

              <div className="progress-track" id="progressTrack" onClick={seekAudio}>
                <div className="progress-fill" id="progressFill" style={{ width: `${pmProgress * 100}%` }}></div>
              </div>

              <div className="pm-controls">
                <button className="ctrl-btn" onClick={() => pmSkip(-30)} title="30s orqaga">⏮ 30s</button>
                <button className="ctrl-btn" onClick={() => pmSkip(-10)} title="10s orqaga">−10</button>
                <button className="ctrl-btn ctrl-play" id="pmPlayBtn" onClick={togglePlayer}>
                  {pmPlaying ? '⏸' : '▶'}
                </button>
                <button className="ctrl-btn" onClick={() => pmSkip(10)} title="10s oldinga">+10</button>
                <button className="ctrl-btn" onClick={() => pmSkip(30)} title="30s oldinga">+30s ⏭</button>
              </div>

              <div className="pm-bottom">
                <div className="time-display" id="pmTime">{fmtTime(pmProgress * pmDuration)} / {fmtTime(pmDuration)}</div>
                <div className="speed-btns">
                  {[0.5, 0.75, 1, 1.25, 1.5].map(s => (
                    <button
                      key={s}
                      className={`spdbtn ${pmSpeed === s ? 'on' : ''}`}
                      onClick={() => setSpeed(s)}
                    >
                      {s}×
                    </button>
                  ))}
                </div>
                <div className="vol-row">
                  <span className="vol-label">🔊</span>
                  <input type="range" className="slim" id="volSlider" min="0" max="1" step="0.05" value={pmVolume} onChange={handleVolumeChange} />
                </div>
              </div>
            </div>

            {/* TRANSCRIPT */}
            {activePanel === 'transcript' && (
              <div id="transcriptBox" style={{ display: 'block' }}>
                <div className="transcript-box">
                  <div className="tb-head">
                    <div className="tb-title">📄 Transcript</div>
                    <div className="tb-actions">
                      <button className={`tba ${autoScroll ? 'on' : ''}`} id="tbAutoScroll" onClick={toggleAutoScroll}>Auto-scroll</button>
                      <button className="tba" onClick={() => setActivePanel(null)}>Yopish</button>
                    </div>
                  </div>
                  <div className="transcript-body" id="transcriptBody">
                    {currentAudio.transcript.split(/\s+/).map((w, i) => (
                      <span
                        key={i}
                        className={`t-word ${pmWordIdx === i ? 'current-word' : ''}`}
                        id={`tw_${i}`}
                        onClick={() => seekToWord(i)}
                      >
                        {w}{' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* GAP FILL */}
            {activePanel === 'gapfill' && (
              <div id="gapFillBox" style={{ display: 'block' }}>
                <div className="gap-fill-section">
                  <div className="sec-head" style={{ marginBottom: 14 }}>
                    <h2 style={{ fontSize: '1.2rem' }}>✏️ Gap-Fill Mashqi</h2>
                  </div>
                  <div className="gf-intro">Audiomi qayta tinglang va bo'sh joylarni to'ldiring. Javoblar transcript bilan tekshiriladi.</div>
                  <div className="gf-text" id="gapFillText">
                    {(() => {
                      let html = currentAudio.gapSentence;
                      currentAudio.gapWords.forEach((w, idx) => {
                        html = html.replace('[BLANK]', `<input class="gap-input" data-ans="${w.toLowerCase()}" placeholder="${'_'.repeat(Math.min(w.length, 8))}" id="gap_${idx}" spellcheck="false" value="${gapFillInputs[idx] || ''}" />`);
                      });
                      return <div dangerouslySetInnerHTML={{ __html: html }} />;
                    })()}
                  </div>
                  <div className="gf-actions">
                    <button className="btn btn-cyan" onClick={checkGapFill} style={{ padding: '10px 20px', fontSize: '0.82rem' }}>Tekshirish ✓</button>
                    <button className="btn btn-outline" onClick={resetGapFill} style={{ padding: '10px 18px', fontSize: '0.82rem' }}>Tozalash</button>
                    <button className="btn btn-outline" onClick={showGapHint} style={{ padding: '10px 18px', fontSize: '0.82rem' }}>Maslahat 💡</button>
                  </div>
                  {gapFillResult.show && (
                    <div className={`gf-result show ${gapFillResult.type}`} id="gfResult">
                      {gapFillResult.message}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DICTATION */}
            {activePanel === 'dictation' && (
              <div id="dictationBox" style={{ display: 'block' }}>
                <div className="dict-section">
                  <div className="sec-head" style={{ marginBottom: 14 }}>
                    <h2 style={{ fontSize: '1.2rem' }}>🎙 Dictation Mashqi</h2>
                  </div>
                  <div className="dict-box">
                    <div className="dict-intro">Audio segment tinglab, eshitgan narsangizni aynan yozing. Imlo va tinish belgilarini ham to'g'ri yozing.</div>
                    <div className="dict-controls">
                      <button className="btn btn-cyan" onClick={() => playDictSegment(false)} style={{ padding: '8px 18px', fontSize: '0.8rem' }} id="dictPlayBtn">▶ Segment tinglash</button>
                      <button className="btn btn-outline" onClick={() => playDictSegment(true)} style={{ padding: '8px 18px', fontSize: '0.8rem' }}>🐢 Sekin tinglash</button>
                      <button className={`mic-btn ${micActive ? 'recording' : ''}`} id="micBtn" title="Mikrofon bilan diktant" onClick={toggleMic}>🎤</button>
                    </div>
                    <textarea
                      className="dict-textarea"
                      id="dictTextarea"
                      placeholder="Bu yerga eshitgan narsangizni yozing..."
                      value={dictationText}
                      onChange={(e) => setDictationText(e.target.value)}
                    ></textarea>
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                      <button className="btn btn-cyan" onClick={checkDictation} style={{ padding: '9px 18px', fontSize: '0.8rem' }}>Tekshirish ✓</button>
                      <button className="btn btn-outline" onClick={() => setDictationText('')} style={{ padding: '9px 18px', fontSize: '0.8rem' }}>Tozalash</button>
                      <button className="btn btn-outline" onClick={showDictAnswer} style={{ padding: '9px 18px', fontSize: '0.8rem' }}>Javob ko'rish 👁</button>
                    </div>
                    {dictationResult.show && (
                      <div className="dict-result show" id="dictResult">
                        <div className="dict-comparison" id="dictComparison" dangerouslySetInnerHTML={{ __html: dictationResult.html }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SHADOW READING */}
            {activePanel === 'shadow' && (
              <div id="shadowBox" style={{ display: 'block' }}>
                <div className="shadow-section">
                  <div className="sec-head" style={{ marginBottom: 14 }}>
                    <h2 style={{ fontSize: '1.2rem' }}>🪞 Shadow Reading</h2>
                  </div>
                  <div className="shadow-box">
                    <div className="shadow-intro">
                      Shadow reading — audio bilan bir vaqtda gapirish. Talaffuz, ritm va intonatsiyani o'rganishning eng samarali usuli.<br />
                      <strong style={{ color: 'var(--cyan)' }}>Qanday:</strong> Audioni yoqing → matnga qarang → eshitgandan 0.5 soniya keyin gapirib boring.
                    </div>
                    <div className="shadow-highlight" id="shadowText">
                      {currentAudio.transcript.split(/\s+/).map((w, i) => (
                        <span key={i} className={`sh-word ${pmWordIdx === i ? 'sh-active' : ''}`} id={`sh_${i}`}>
                          {w}{' '}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <button className="btn btn-cyan" onClick={() => { togglePlayer(); }} style={{ padding: '9px 18px', fontSize: '0.8rem' }}>▶ Shadow boshlash</button>
                      <button className="btn btn-outline" onClick={resetShadow} style={{ padding: '9px 18px', fontSize: '0.8rem' }}>↺ Reset</button>
                      <button className={`mic-btn ${shadowMicActive ? 'recording' : ''}`} id="shadowMic" title="O'zingizni yozib oling" onClick={toggleShadowMic}>🎤</button>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>O'zingizni yozib oling</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* COMPREHENSION */}
            {activePanel === 'comp' && currentAudio.compQ && (
              <div id="compBox" style={{ display: 'block' }}>
                <div className="cq-section">
                  <div className="sec-head" style={{ marginBottom: 14 }}>
                    <h2 style={{ fontSize: '1.2rem' }}>❓ Tushunish Savollari</h2>
                  </div>
                  <div id="cqQuestions">
                    {currentAudio.compQ.map((q, qi) => {
                      const keys = ['A', 'B', 'C', 'D'];
                      return (
                        <div key={qi} className="cq-item">
                          <div className="cq-q">{qi + 1}. {q.q}</div>
                          <div className="cq-opts">
                            {q.opts.map((opt, oi) => (
                              <button
                                key={oi}
                                className={`cq-opt ${getCQOptionClass(qi, oi)}`}
                                id={`cqopt_${qi}_${oi}`}
                                onClick={() => answerCQ(qi, oi)}
                                disabled={isCQDisabled(qi)}
                              >
                                <span className="cq-key">{keys[oi]}</span>{opt}
                              </button>
                            ))}
                          </div>
                          {cqAnswered.includes(qi) && (
                            <div className={`cq-fb show ${cqAnswered.includes(qi) ? (q.ans === (() => {
                              for (let i = 0; i < 4; i++) if (document.activeElement?.id === `cqopt_${qi}_${i}`) return i;
                              return -1;
                            })() ? 'g' : 'b') : ''}`} id={`cqfb_${qi}`}>
                              {cqAnswered.includes(qi) ? (
                                <>
                                  {q.ans === (() => {
                                    for (let i = 0; i < 4; i++) if (document.activeElement?.id === `cqopt_${qi}_${i}`) return i;
                                    return -1;
                                  })() ? '✅ To\'g\'ri! ' : '❌ Xato. '}
                                  {q.exp}
                                </>
                              ) : ''}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {cqAnswered.length === currentAudio.compQ.length && (
                    <div id="cqScoreBox" style={{ display: 'block', marginTop: 20, padding: 20, background: 'var(--s2)', borderRadius: 10, textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: 'var(--cyan)' }} id="cqFinalScore">
                        {cqScore}/{currentAudio.compQ.length} ({Math.round((cqScore / currentAudio.compQ.length) * 100)}%)
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text3)', marginTop: 4 }} id="cqFinalMsg">
                        {Math.round((cqScore / currentAudio.compQ.length) * 100) >= 80 ? 'Ajoyib tushunish!' :
                         Math.round((cqScore / currentAudio.compQ.length) * 100) >= 50 ? 'Yaxshi! Yana bir marta tinglang.' :
                         'Transcript ko\'rib qayta urinib ko\'ring.'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListenUp;