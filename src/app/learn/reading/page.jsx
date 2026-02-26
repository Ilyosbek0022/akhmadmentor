'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Reading.css'; 
import Header from '../header';
const ReadWell = () => {
  // ======================== DATA ========================
  const readingTexts = {
    A1: [
      {
        id: 'a1_1', title: 'My Daily Life', genre: 'fiction', genreClass: 'genre-fiction', banner: 'banner-green',
        time: '3 min', words: '~120', diff: 'Beginner',
        preview: 'Tom wakes up every morning at seven o\'clock. He brushes his teeth and eats breakfast.',
        body: `<p>Tom wakes up every morning at seven o'clock. He brushes his teeth and eats breakfast. He likes eggs and orange juice.</p><p>After breakfast, Tom goes to school. He walks because his school is near his house. At school, he studies English, maths, and science.</p><p>Tom comes home at three o'clock. He does his homework first. Then he plays football with his friends in the park.</p><p>In the evening, Tom eats dinner with his family. They talk about their day. Tom goes to bed at nine o'clock. He is happy.</p>`,
        vocab: [
          { word: 'wake up', pos: 'phrasal verb', def: 'Uyqudan turmoq', ex: 'I wake up at 7am every day.' },
          { word: 'breakfast', pos: 'noun', def: 'Nonushta — kunda birinchi ovqat', ex: 'She eats eggs for breakfast.' },
          { word: 'homework', pos: 'noun', def: 'Uy vazifasi', ex: 'Do your homework first!' },
        ],
        compQ: [
          { q: 'Tom qachon uyg\'onadi?', opts: ['6da', '7da', '8da', '9da'], ans: 1, exp: 'Matn aytadi: "at seven o\'clock."' },
          { q: 'Tom maktabga qanday boradi?', opts: ['Avtobus', 'Mashina', 'Piyoda', 'Velosiped'], ans: 2, exp: '"He walks because his school is near his house."' },
          { q: 'Tom kechqurun nima qiladi?', opts: ['Kitob o\'qiydi', 'Futbol o\'ynaydi', 'Oilasi bilan ovqatlanadi', 'Uxlaydi'], ans: 2, exp: '"Tom eats dinner with his family."' },
        ],
        skills: ['Basic comprehension', 'Vocabulary', 'Daily life'],
      },
      {
        id: 'a1_2', title: 'Animals in the Zoo', genre: 'nature', genreClass: 'genre-nature', banner: 'banner-teal',
        time: '3 min', words: '~110', diff: 'Beginner',
        preview: 'The zoo has many animals. There are lions, elephants, and monkeys.',
        body: `<p>The zoo has many animals. There are <span class="vocab-word" data-word="lion" data-pos="noun" data-def="Sher — katta yirtqich hayvon" data-ex="The lion is sleeping.">lions</span>, elephants, and monkeys. Lions are big and <span class="vocab-word" data-word="dangerous" data-pos="adjective" data-def="Xavfli — zarar yetkazishi mumkin" data-ex="Don't touch! It's dangerous.">dangerous</span>.</p><p>Elephants are very large. They have long <span class="vocab-word" data-word="trunk" data-pos="noun" data-def="Fil xartumi — uzoq burni" data-ex="The elephant uses its trunk to drink water.">trunks</span>. They eat grass and leaves. Monkeys are funny. They jump and play all day.</p><p>The zoo also has birds. Some birds are very colourful. Children love to see the parrots. Parrots can talk!</p><p>Going to the zoo is fun. You can learn about animals. You can take photos. It is a good day out for all the family.</p>`,
        vocab: [
          { word: 'dangerous', pos: 'adjective', def: 'Xavfli — zarar yetkazishi mumkin bo\'lgan', ex: 'The road is dangerous at night.' },
          { word: 'trunk', pos: 'noun', def: 'Fil xartumi', ex: 'The elephant lifted its trunk.' },
          { word: 'colourful', pos: 'adjective', def: 'Rangli, yorqin', ex: 'She wore a colourful dress.' },
        ],
        compQ: [
          { q: 'Fillar nima yeydi?', opts: ['Go\'sht', 'O\'t va barglar', 'Baliq', 'Meva'], ans: 1, exp: '"They eat grass and leaves."' },
          { q: 'Qaysi qush gapira oladi?', opts: ['Sarg\'aldoq', 'To\'ti', 'Qarg\'a', 'Burgut'], ans: 1, exp: '"Parrots can talk!"' },
        ],
        skills: ['Vocabulary', 'Nature', 'Comprehension'],
      },
    ],
    A2: [
      {
        id: 'a2_1', title: 'The History of Tea', genre: 'history', genreClass: 'genre-history', banner: 'banner-amber',
        time: '5 min', words: '~200', diff: 'Elementary',
        preview: 'Tea is one of the most popular drinks in the world. People drink it in almost every country.',
        body: `<p>Tea is one of the most popular drinks in the world. People drink it in almost every country. But where did tea come from?</p><p>Tea was discovered in <span class="vocab-word" data-word="ancient" data-pos="adjective" data-def="Qadimiy — juda eski davrga oid" data-ex="Ancient Rome was a powerful empire.">ancient</span> China about 5,000 years ago. According to legend, a Chinese emperor named Shen Nung was sitting under a tree when some leaves fell into his boiling water. He tasted the drink and liked it very much.</p><p>Tea became very popular in China. It was used as medicine before it became a common drink. Chinese people believed tea was good for health and could help you think more clearly.</p><p>In the 16th century, <span class="vocab-word" data-word="merchant" data-pos="noun" data-def="Savdogar — tovar sotib olib sotadigan kishi" data-ex="The merchant sold silk and spices.">merchants</span> from Europe started bringing tea to the West. It became especially popular in Britain. By the 18th century, tea was so important that the British even went to war over it!</p><p>Today, more than 3 billion cups of tea are drunk every day around the world. From green tea in Japan to mint tea in Morocco, every culture has its own special way of enjoying this ancient drink.</p>`,
        vocab: [
          { word: 'ancient', pos: 'adjective', def: 'Qadimiy — juda eski', ex: 'This is an ancient temple.' },
          { word: 'merchant', pos: 'noun', def: 'Savdogar', ex: 'The merchant traded silk.' },
          { word: 'legend', pos: 'noun', def: 'Afsona — tarixiy xalq hikoyasi', ex: 'According to legend, the hero was brave.' },
          { word: 'century', pos: 'noun', def: 'Asr — 100 yil', ex: 'The 21st century started in 2000.' },
        ],
        compQ: [
          { q: 'Choy qayerda kashf etilgan?', opts: ['Hindiston', 'Xitoy', 'Yaponiya', 'Misr'], ans: 1, exp: '"Tea was discovered in ancient China."' },
          { q: 'Avvaliga choy nima uchun ishlatilgan?', opts: ['Ichimlik uchun', 'Dori sifatida', 'Savdo uchun', 'Diniy marosim uchun'], ans: 1, exp: '"It was used as medicine before it became a common drink."' },
          { q: 'Har kuni necha million piyola choy ichiladi?', opts: ['1 million', '3 million', '3 milliard', '1 milliard'], ans: 2, exp: '"More than 3 billion cups of tea are drunk every day."' },
        ],
        skills: ['History', 'Vocabulary', 'Inference'],
      },
      {
        id: 'a2_2', title: 'City vs Village Life', genre: 'social', genreClass: 'genre-social', banner: 'banner-teal',
        time: '5 min', words: '~220', diff: 'Elementary',
        preview: 'Many people argue about whether it is better to live in a city or a village. Both have advantages and disadvantages.',
        body: `<p>Many people argue about whether it is better to live in a city or a village. Both have <span class="vocab-word" data-word="advantages" data-pos="noun" data-def="Afzalliklar — yaxshi tomonlar" data-ex="City life has many advantages.">advantages</span> and <span class="vocab-word" data-word="disadvantages" data-pos="noun" data-def="Kamchiliklar — yomon tomonlar" data-ex="However, there are also some disadvantages.">disadvantages</span>.</p><p>Cities are exciting places. There are many shops, restaurants, cinemas, and parks. You can find good jobs and good schools in cities. However, cities can also be noisy, expensive, and <span class="vocab-word" data-word="crowded" data-pos="adjective" data-def="Gavjum — juda ko'p odam bo'lgan" data-ex="The streets were crowded with tourists.">crowded</span>. The air quality is often poor because of traffic.</p><p>Villages are quiet and <span class="vocab-word" data-word="peaceful" data-pos="adjective" data-def="Tinch, osoyishta" data-ex="The village was peaceful and beautiful.">peaceful</span>. The air is clean and the environment is natural. However, there are fewer jobs, shops, and entertainment options. Young people often move to cities to find work.</p><p>Some people prefer a compromise — living in a small town. Small towns have some city conveniences but are less stressful than big cities.</p><p>In the end, the best place to live depends on your personality, your job, and your family situation. Both city and village life can make people happy if they choose wisely.</p>`,
        vocab: [
          { word: 'advantages', pos: 'noun', def: 'Afzalliklar, yaxshi tomonlar', ex: 'There are many advantages to studying online.' },
          { word: 'crowded', pos: 'adjective', def: 'Gavjum — juda ko\'p odam', ex: 'The bus was very crowded.' },
          { word: 'peaceful', pos: 'adjective', def: 'Tinch, osoyishta', ex: 'I love peaceful mornings.' },
          { word: 'compromise', pos: 'noun', def: 'Murosali yechim — ikki tomon o\'rtacha qabul qiladigan hal', ex: 'They found a compromise.' },
        ],
        compQ: [
          { q: 'Shaharda yashashning bir kamchiligi nima?', opts: ['Ko\'p ish joylari', 'Qimmat', 'Yaxshi maktablar', 'Ko\'p do\'konlar'], ans: 1, exp: '"Cities can also be noisy, expensive, and crowded."' },
          { q: 'Maqolaga ko\'ra, qayerda havo tozaroq?', opts: ['Shaharda', 'Qishloqda', 'Ikkalasida ham', 'Hech birida ham'], ans: 1, exp: '"The air is clean and the environment is natural" — qishloq haqida.' },
        ],
        skills: ['Compare & contrast', 'Vocabulary', 'Opinion'],
      },
    ],
    B1: [
      {
        id: 'b1_1', title: 'The Deep Ocean: Earth\'s Final Frontier', genre: 'science', genreClass: 'genre-science', banner: 'banner-blue',
        time: '7 min', words: '~350', diff: 'Intermediate',
        preview: 'Less than 20% of the world\'s oceans have been explored by humans. The deep sea remains one of the most mysterious environments on Earth.',
        body: `<p>Less than 20% of the world's oceans have been explored by humans. The deep sea remains one of the most <span class="vocab-word" data-word="mysterious" data-pos="adjective" data-def="Sirli — tushunish qiyin bo'lgan" data-ex="The forest was dark and mysterious.">mysterious</span> environments on Earth, home to creatures that seem almost alien in their <span class="vocab-word" data-word="adaptation" data-pos="noun" data-def="Moslashuv — muhitga mos bo'lish jarayoni" data-ex="Adaptation helps animals survive.">adaptations</span> to extreme conditions.</p><h3>Pressure and Darkness</h3><p>At depths below 1,000 metres, the pressure is crushing — over 100 times that at the surface. No sunlight penetrates these depths, creating a world of permanent darkness. Temperatures hover just above freezing. Despite these <span class="vocab-word" data-word="inhospitable" data-pos="adjective" data-def="Noqulay — yashash uchun mos bo'lmagan" data-ex="The desert is inhospitable in summer.">inhospitable</span> conditions, life thrives in remarkable ways.</p><h3>Bioluminescence: Nature's Light Show</h3><p>Perhaps the most <span class="vocab-word" data-word="extraordinary" data-pos="adjective" data-def="G'ayritabiiy — juda ajoyib" data-ex="She had an extraordinary talent.">extraordinary</span> adaptation is <strong>bioluminescence</strong> — the ability to produce light through chemical reactions. An estimated 90% of deep-sea creatures can generate their own light, using it to attract prey, communicate, or <span class="vocab-word" data-word="camouflage" data-pos="noun/verb" data-def="Kamuflyaj — yashirin qolish, qo'shilish" data-ex="The insect uses camouflage to hide.">camouflage</span> themselves against the faint light from above.</p><h3>Strange Life Forms</h3><p>The anglerfish dangles a bioluminescent lure from its head to attract prey in the darkness. Giant squid — once considered mythological — have been photographed alive for the first time only in the 21st century. Hydrothermal vents on the ocean floor support entire ecosystems that rely not on sunlight, but on <span class="vocab-word" data-word="chemosynthesis" data-pos="noun" data-def="Kemosintez — quyosh nuri o'rniga kimyoviy energiyadan foydalanish" data-ex="Vent bacteria use chemosynthesis.">chemosynthesis</span>.</p><p>As technology improves, our exploration of the deep ocean is accelerating. Every new dive reveals species unknown to science, reminding us that our own planet still holds extraordinary secrets waiting to be uncovered.</p>`,
        vocab: [
          { word: 'mysterious', pos: 'adjective', def: 'Sirli, tushunish qiyin', ex: 'The old house looked mysterious at night.' },
          { word: 'adaptation', pos: 'noun', def: 'Moslashuv jarayoni', ex: 'Polar bears have amazing cold adaptations.' },
          { word: 'bioluminescence', pos: 'noun', def: 'Biologik yorug\'lik — tirik organizmlar chiqaradigan yorug\'lik', ex: 'Fireflies produce bioluminescence.' },
          { word: 'inhospitable', pos: 'adjective', def: 'Noqulay — yashash uchun mos bo\'lmagan', ex: 'Antarctica is an inhospitable place.' },
          { word: 'extraordinary', pos: 'adjective', def: 'G\'ayritabiiy, ajoyib', ex: 'It was an extraordinary performance.' },
        ],
        compQ: [
          { q: 'Okean qanchasidan kamrog\'i o\'rganilgan?', opts: ['5%', '20%', '50%', '80%'], ans: 1, exp: '"Less than 20% of the world\'s oceans have been explored."' },
          { q: 'Bioluminessensiya nima uchun ishlatiladi?', opts: ['Faqat o\'lja jalb qilish uchun', 'Faqat kommunikatsiya uchun', 'O\'lja, kommunikatsiya va kamuflyaj uchun', 'Faqat kamuflyaj uchun'], ans: 2, exp: '"...to attract prey, communicate, or camouflage themselves."' },
          { q: 'Chuqur dengiz ekotizimlari nima asosida yashaydi?', opts: ['Quyosh nuri', 'Bioluminessensiya', 'Kemosintez', 'Iliq suv'], ans: 2, exp: '"...rely not on sunlight, but on chemosynthesis."' },
          { q: 'Maqolaning asosiy g\'oyasi nima?', opts: ['Baliqlarning xavfi haqida', 'Okean chuqurliklarining sirli va boy ekotizimlari haqida', 'Texnologiya rivojlanishi haqida', 'Qo\'ng\'ir baliqlar haqida'], ans: 1, exp: 'Maqolaning butun mazmuni chuqur okean sirli ekotizimlari haqida.' },
        ],
        skills: ['Main idea', 'Vocabulary', 'Inference', 'Detail'],
      },
      {
        id: 'b1_2', title: 'Social Media & Mental Health', genre: 'social', genreClass: 'genre-social', banner: 'banner-violet',
        time: '7 min', words: '~330', diff: 'Intermediate',
        preview: 'Over 4.9 billion people use social media worldwide. For many, it has become an essential part of daily life — a way to connect, share, and express themselves.',
        body: `<p>Over 4.9 billion people use social media worldwide. For many, it has become an essential part of daily life — a way to connect, share, and express themselves. But increasingly, researchers are examining the relationship between social media use and mental health.</p><h3>The Comparison Trap</h3><p>One of the most significant concerns is <span class="vocab-word" data-word="pervasive" data-pos="adjective" data-def="Keng tarqalgan — hamma joyga kirgan" data-ex="Smartphones have a pervasive influence.">pervasive</span> social comparison. Platforms encourage users to present <span class="vocab-word" data-word="curated" data-pos="adjective" data-def="Tanlab tayyorlangan — faqat yaxshi narsalar ko'rsatiladigan" data-ex="Her Instagram was carefully curated.">curated</span> versions of their lives — carefully selected highlights rather than authentic everyday reality. When young people constantly compare themselves to these idealised images, it can trigger feelings of <span class="vocab-word" data-word="inadequacy" data-pos="noun" data-def="Yetarli emaslik hissi" data-ex="He felt a sense of inadequacy.">inadequacy</span> and low self-esteem.</p><h3>Positive Uses</h3><p>However, social media is not <span class="vocab-word" data-word="inherently" data-pos="adverb" data-def="O'z tabiatiga ko'ra, mohiyatan" data-ex="Technology is not inherently bad.">inherently</span> harmful. Online communities can provide genuine support for people with mental health challenges, chronic illnesses, or minority identities who might otherwise feel isolated. During the pandemic, many people credited social media with helping them maintain connections and mental wellbeing.</p><h3>Finding Balance</h3><p>Research suggests that the relationship between social media and mental health is complex and highly individual. Passive scrolling tends to have more negative effects than active engagement — commenting, creating, and connecting. Setting intentional limits on screen time, following accounts that inspire rather than diminish, and taking regular breaks can all help maintain a healthier relationship with technology.</p>`,
        vocab: [
          { word: 'pervasive', pos: 'adjective', def: 'Keng tarqalgan, hamma joyga kirgan', ex: 'Fear was pervasive in the town.' },
          { word: 'curated', pos: 'adjective', def: 'Tanlab tayyorlangan, filtrlangan', ex: 'A curated selection of photos.' },
          { word: 'inadequacy', pos: 'noun', def: 'Yetarli emaslik hissi', ex: 'She felt inadequacy around experts.' },
          { word: 'inherently', pos: 'adverb', def: 'O\'z tabiatiga ko\'ra', ex: 'Change is not inherently bad.' },
        ],
        compQ: [
          { q: 'Ijtimoiy tarmoqning asosiy muammosi nima deb ta\'kidlangan?', opts: ['Vaqt behuda sarflanishi', 'Taqqoslash tuzoq', 'Maxfiylik', 'Internet tezligi'], ans: 1, exp: '"One of the most significant concerns is pervasive social comparison."' },
          { q: 'Passiv scrolling haqida nima aytilgan?', opts: ['U foydali', 'U boshqa tarmoqlarga qaraganda yaxshi', 'U faol ishtirokdan ko\'ra zararli', 'U neutral'], ans: 2, exp: '"Passive scrolling tends to have more negative effects than active engagement."' },
        ],
        skills: ['Main idea', 'Critical thinking', 'Inference'],
      },
      {
        id: 'b1_3', title: 'The Art of Slow Food', genre: 'history', genreClass: 'genre-history', banner: 'banner-amber',
        time: '6 min', words: '~290', diff: 'Intermediate',
        preview: 'In 1989, a small Italian man named Carlo Petrini started a revolution — not with weapons, but with pasta.',
        body: `<p>In 1989, a small Italian man named Carlo Petrini started a revolution — not with weapons, but with pasta. His movement, <strong>Slow Food</strong>, began as a protest against the opening of a McDonald's near Rome's famous Spanish Steps.</p><h3>Philosophy of Slow</h3><p>Petrini argued that fast food represented more than just unhealthy eating habits — it symbolised a <span class="vocab-word" data-word="homogenisation" data-pos="noun" data-def="Bir xillashtirish — madaniy xilma-xillikning yo'qolishi" data-ex="Globalisation leads to cultural homogenisation.">homogenisation</span> of culture and a disconnection from the natural world. His alternative was a return to <span class="vocab-word" data-word="artisanal" data-pos="adjective" data-def="Hunarmand tomonidan tayyorlangan, an'anaviy" data-ex="Artisanal bread is made by hand.">artisanal</span> food production, traditional recipes, and <span class="vocab-word" data-word="biodiversity" data-pos="noun" data-def="Biologik xilma-xillik" data-ex="The rainforest has incredible biodiversity.">biodiversity</span>.</p><h3>Global Impact</h3><p>Today, Slow Food has over 100,000 members in more than 160 countries. It runs a biennial gathering called Terra Madre — Mother Earth — where farmers, cooks, and food artisans from around the world meet to share knowledge and celebrate food traditions. The movement has helped save hundreds of <span class="vocab-word" data-word="indigenous" data-pos="adjective" data-def="Mahalliy, tub yerlik — bir joyga xos bo'lgan" data-ex="Indigenous plants are under threat.">indigenous</span> foods from extinction.</p><p>The Slow Food movement reminds us that food is not merely fuel — it is culture, community, and identity. In a world racing ever faster, perhaps the most radical act is to sit down, take a breath, and truly savour a meal.</p>`,
        vocab: [
          { word: 'artisanal', pos: 'adjective', def: 'Hunarmand tomonidan, an\'anaviy usulda tayyorlangan', ex: 'Artisanal cheese takes months to make.' },
          { word: 'biodiversity', pos: 'noun', def: 'Biologik xilma-xillik', ex: 'The Amazon has incredible biodiversity.' },
          { word: 'indigenous', pos: 'adjective', def: 'Mahalliy, tub yerlik', ex: 'Indigenous plants grow naturally here.' },
          { word: 'homogenisation', pos: 'noun', def: 'Bir xillashtirish jarayoni', ex: 'Cultural homogenisation is a concern.' },
        ],
        compQ: [
          { q: 'Slow Food harakati qachon boshlangan?', opts: ['1979', '1989', '1999', '2009'], ans: 1, exp: '"In 1989, a small Italian man named Carlo Petrini started..."' },
          { q: 'Harakatga nima sabab bo\'lgan?', opts: ['Italiya taomi mashhur bo\'lmaganligi', 'Rim yaqinida McDonald\'s ochilishi', 'Sog\'lom ovqatlanish qonuni', 'Fermerlar muammosi'], ans: 1, exp: '"...began as a protest against the opening of a McDonald\'s near Rome\'s famous Spanish Steps."' },
        ],
        skills: ['Main idea', 'Vocabulary', 'Detail'],
      },
    ],
    B2: [
      {
        id: 'b2_1', title: 'The Paradox of Choice: Why More is Less', genre: 'science', genreClass: 'genre-science', banner: 'banner-violet',
        time: '9 min', words: '~430', diff: 'Upper-Intermediate',
        preview: 'In the modern Western world, freedom and choice are revered as fundamental values. Yet psychologist Barry Schwartz has argued, controversially, that an abundance of choice can actually make us less happy.',
        body: `<p>In the modern Western world, freedom and choice are revered as fundamental values. Yet psychologist Barry Schwartz has argued, controversially, that an <span class="vocab-word" data-word="abundance" data-pos="noun" data-def="Mo'lchilik — juda ko'p miqdor" data-ex="There was an abundance of food at the feast.">abundance</span> of choice can actually make us less happy — a <span class="vocab-word" data-word="paradox" data-pos="noun" data-def="Paradoks — qarshilik ko'rinadigan, lekin haqiqiy narsa" data-ex="The paradox of exercise is that it gives you more energy.">paradox</span> he termed "the tyranny of choice."</p><h3>The Jam Experiment</h3><p>In a now-famous study, researchers set up tasting booths in a supermarket. One booth offered 24 varieties of jam; another offered just 6. While the larger selection attracted more browsers, the smaller selection was far more <span class="vocab-word" data-word="conducive" data-pos="adjective" data-def="Qulay — biror narsa uchun yaxshi sharoit yaratuvchi" data-ex="Silence is conducive to concentration.">conducive</span> to actual purchasing — shoppers from the small display were ten times more likely to buy. Too many options, it seems, leads to <span class="vocab-word" data-word="paralysis" data-pos="noun" data-def="Falajlik — harakat qila olmaslik" data-ex="Decision paralysis is a real problem.">paralysis</span>.</p><h3>The Opportunity Cost of Everything</h3><p>When we have many choices, making a decision carries what economists call <em>opportunity cost</em> — the value of all the options we didn't choose. This transforms even small decisions into potential regrets. We become so focused on the possibility of making the "wrong" choice that we <span class="vocab-word" data-word="ruminate" data-pos="verb" data-def="O'ylab yotmoq — biror narsani qayta-qayta o'ylamoq" data-ex="She tends to ruminate on past mistakes.">ruminate</span> over trivial choices — which restaurant to visit, which series to watch — with a <span class="vocab-word" data-word="disproportionate" data-pos="adjective" data-def="Mutanosib bo'lmagan — nisbatdan oshgan" data-ex="A disproportionate amount of time was spent.">disproportionate</span> level of anxiety.</p><h3>Maximisers vs. Satisficers</h3><p>Schwartz distinguishes between "maximisers" — those who seek the best possible option — and "satisficers" — those who settle for "good enough." Research consistently shows that satisficers report higher levels of happiness and well-being, despite — or perhaps because of — their willingness to accept imperfection.</p><p>The implication is <span class="vocab-word" data-word="counterintuitive" data-pos="adjective" data-def="Intuitsiyaga zid — kutilmagan, mantiqsiz ko'rinadigan" data-ex="The result was counterintuitive.">counterintuitive</span>: constraints can be liberating. Societies and individuals that deliberately limit their options may experience more satisfaction precisely because they avoid the psychological burden of infinite possibility.</p>`,
        vocab: [
          { word: 'abundance', pos: 'noun', def: 'Mo\'lchilik, juda ko\'p miqdor', ex: 'There was an abundance of flowers.' },
          { word: 'paradox', pos: 'noun', def: 'Paradoks — ziddiyatli, lekin to\'g\'ri fikr', ex: 'The paradox of solitude is connection.' },
          { word: 'conducive', pos: 'adjective', def: 'Qulay sharoit yaratuvchi', ex: 'Quiet is conducive to study.' },
          { word: 'ruminate', pos: 'verb', def: 'Qayta-qayta o\'ylamoq', ex: 'Don\'t ruminate on failures.' },
          { word: 'counterintuitive', pos: 'adjective', def: 'Kutilmagandek, intuitsiyaga zid', ex: 'The solution was counterintuitive.' },
        ],
        compQ: [
          { q: '"Jam eksperimenti" ning asosiy natijasi nima edi?', opts: ['Ko\'p variantlar ko\'proq sotuvga olib keldi', 'Kam variant ko\'proq sotuvga olib keldi', 'Ikkalasi ham teng samarali bo\'ldi', 'Hech qanday farq bo\'lmadi'], ans: 1, exp: '"shoppers from the small display were ten times more likely to buy."' },
          { q: 'Qaysi tip odamlar baxtliroq bo\'lishi aniqlangan?', opts: ['Maximisers', 'Satisficers', 'Ikkalasi ham teng', 'Tadqiqotchi ko\'rsatmagan'], ans: 1, exp: '"satisficers report higher levels of happiness and well-being."' },
          { q: 'Paradoks nimada?', opts: ['Ko\'p tanlov har doim yaxshi', 'Cheklovlar ozodlikka olib kelishi mumkin', 'Hamma tanlov bir xil', 'Satisficers ko\'proq harakat qiladi'], ans: 1, exp: '"constraints can be liberating."' },
        ],
        skills: ['Critical analysis', 'Academic vocab', 'Inference', 'Detail'],
      },
    ],
    C1: [
      {
        id: 'c1_1', title: 'The Neuroscience of Narrative: Why Stories Wire the Brain', genre: 'science', genreClass: 'genre-science', banner: 'banner-violet',
        time: '12 min', words: '~550', diff: 'Advanced',
        preview: 'For millennia, storytelling was considered the province of artists and entertainers. Over the past two decades, however, neuroscientists have begun to unravel precisely what happens in the brain when we encounter a narrative.',
        body: `<p>For millennia, storytelling was considered the province of artists and entertainers. Over the past two decades, however, neuroscientists have begun to <span class="vocab-word" data-word="unravel" data-pos="verb" data-def="Tushunib yechmoq — murakkab narsani aniqlashtirmoq" data-ex="Scientists are unravelling the mysteries of DNA.">unravel</span> precisely what happens in the brain when we encounter a narrative — and the findings have profound implications for education, therapy, and even political persuasion.</p><h3>Neural Coupling and Shared Reality</h3><p>Princeton neuroscientist Uri Hasson's research demonstrated that when a speaker tells a story and a listener comprehends it, their brains exhibit a phenomenon called <em>neural coupling</em> — the listener's brain activity begins to mirror the speaker's. The stronger the coupling, the more effective the communication. This suggests that stories don't merely transmit information; they create a <span class="vocab-word" data-word="synchronised" data-pos="adjective" data-def="Sinxronlashtirilgan — bir vaqtda sodir bo'ladigan" data-ex="Their movements were perfectly synchronised.">synchronised</span> mental experience shared between minds.</p><h3>Character Immersion and Empathy</h3><p>When we read fiction and <span class="vocab-word" data-word="immerse" data-pos="verb" data-def="Sho'ng'imoq — butunlay kirishib ketmoq" data-ex="She immersed herself in the novel.">immerse</span> ourselves in a character's perspective, we activate the same neural networks we use to understand real people's minds. This process, linked to what psychologists call "theory of mind," appears to measurably enhance real-world <span class="vocab-word" data-word="empathy" data-pos="noun" data-def="Empatiya — boshqa odamning his-tuyg'ularini tushunish" data-ex="Good leaders show empathy.">empathy</span>. Studies by Maja Djikic and Keith Oatley found that participants who had recently read literary fiction showed greater sensitivity to others' emotional states than those who had read non-fiction of equivalent complexity.</p><h3>The Neurochemistry of Engagement</h3><p>Compelling narratives trigger the release of <span class="vocab-word" data-word="oxytocin" data-pos="noun" data-def="Oksitotsin — ishonch va bog'liqlik gormonv" data-ex="Oxytocin is called the bonding hormone.">oxytocin</span>, a neurochemical associated with trust and social bonding. Paul Zak's research at Claremont Graduate University found that narratives with rising tension followed by resolution were particularly effective at stimulating oxytocin release, increasing prosocial behaviour and <span class="vocab-word" data-word="altruistic" data-pos="adjective" data-def="Fidokor — boshqalar uchun o'zini fido qiladigan" data-ex="Her altruistic motives were genuine.">altruistic</span> tendencies in participants.</p><h3>Implications and Ethical Considerations</h3><p>These findings carry significant <span class="vocab-word" data-word="ramifications" data-pos="noun" data-def="Oqibatlar, asoratlar — uzoq muddatli ta'sirlar" data-ex="The decision had serious ramifications.">ramifications</span>. If stories can alter neurochemistry, shape empathy, and synchronise minds, they become tools of considerable power — for healing and education, certainly, but also for <span class="vocab-word" data-word="propaganda" data-pos="noun" data-def="Propaganda — fikrni manipulyatsiya qilish" data-ex="Wartime propaganda shaped public opinion.">propaganda</span> and manipulation. The same mechanisms that allow a novelist to cultivate compassion can enable a demagogue to stoke fear.</p><p>Understanding the neuroscience of narrative thus becomes not merely an academic exercise, but an essential component of critical literacy in an age increasingly defined by the stories powerful actors choose to tell.</p>`,
        vocab: [
          { word: 'unravel', pos: 'verb', def: 'Tushunib yechmoq, aniqlashtirmoq', ex: 'They unravelled the mystery.' },
          { word: 'synchronised', pos: 'adjective', def: 'Bir vaqtda sodir bo\'ladigan, sinxronlashtirilgan', ex: 'Their efforts were synchronised.' },
          { word: 'empathy', pos: 'noun', def: 'Empatiya — boshqalar his-tuyg\'ularini tushunish', ex: 'True leadership requires empathy.' },
          { word: 'oxytocin', pos: 'noun', def: 'Ishonch va aloqa gormon', ex: 'Hugging releases oxytocin.' },
          { word: 'altruistic', pos: 'adjective', def: 'Fidokor, boshqalar uchun o\'z manfaatini qurbon qiladigan', ex: 'Her altruistic actions inspired many.' },
          { word: 'ramifications', pos: 'noun', def: 'Uzoq muddatli oqibatlar', ex: 'The policy had far-reaching ramifications.' },
        ],
        compQ: [
          { q: 'Neural coupling nima?', opts: ['Ikki miya bir-biriga yaqin turishi', 'Tinglovchi miyasi hikoyachi miyasining faoliyatini ko\'rsatishi', 'Hikoya yozish jarayoni', 'Miya kimyoviy reaktsiyasi'], ans: 1, exp: '"the listener\'s brain activity begins to mirror the speaker\'s"' },
          { q: 'Adabiy fantastika o\'qish nimaga yordam beradi?', opts: ['IQ darajasini oshiradi', 'Haqiqiy empatiyani oshiradi', 'Xotira kuchayadi', 'Miya tezligi oshadi'], ans: 1, exp: '"participants who had recently read literary fiction showed greater sensitivity to others\' emotional states"' },
          { q: 'Oksitotsin nima bilan bog\'liq?', opts: ['Aql va mantiq', 'Ishonch va ijtimoiy aloqa', 'Xotira va o\'rganish', 'G\'azab va stress'], ans: 1, exp: '"a neurochemical associated with trust and social bonding"' },
          { q: 'Maqola nima haqida ogohlantiryapti?', opts: ['Kitob o\'qishning zararli tomoni', 'Hikoyalarning manipulyatsiya qilish uchun ishlatilishi mumkinligi', 'Miya tadqiqotlarining cheklovlari', 'Empatiyaning ortiqcha bo\'lishi'], ans: 1, exp: '"the same mechanisms that allow a novelist to cultivate compassion can enable a demagogue to stoke fear"' },
        ],
        skills: ['Critical analysis', 'Academic vocabulary', 'Inference', 'Evaluation'],
      },
    ],
  };

  const strategies = [
    {
      num: '01', name: 'SQ3R Metodi', color: 'var(--amber)',
      desc: 'Survey, Question, Read, Recite, Review — o\'qishning eng samarali ilmiy metodlaridan biri.',
      steps: ['Survey: Sarlavha, rasmlar, bo\'limlarni ko\'rib chiqing.', 'Question: Har bo\'lim uchun savol yarating.', 'Read: Javob izlab o\'qing.', 'Recite: O\'z so\'zlaringiz bilan gapirib bering.', 'Review: Qayta o\'qing va mustahkamlang.'],
    },
    {
      num: '02', name: 'Skimming', color: 'var(--teal)',
      desc: 'Matnning asosiy g\'oyasini 30 soniya ichida aniqlash uchun.',
      steps: ['Sarlavha va kichik sarlavhalarni o\'qing.', 'Har paragrafning birinchi gapini o\'qing.', 'Bold va kursiv so\'zlarga diqqat bering.', 'Xulosa qismini o\'qing.', 'Asosiy fikrni formulalang.'],
    },
    {
      num: '03', name: 'Scanning', color: 'var(--blue)',
      desc: 'Matnda aniq ma\'lumot yoki javob izlash.',
      steps: ['Nima qidirayotganingizni aniq biling.', 'Ko\'zingizni Z yoki F shaklida harakatlantiring.', 'Raqam, nom, sana va kalimalar uchun to\'xtang.', 'Topganingizda to\'xtab o\'qing.', 'Natijani tekshiring.'],
    },
    {
      num: '04', name: 'Annotatsiya qilish', color: 'var(--violet)',
      desc: 'Matn bilan faol muloqot — highlight, izoh, savol.',
      steps: ['Asosiy fikrlarni belgilang.', 'Noma\'lum so\'zlarni doira ichiga oling.', 'Qiroatda savollar yozing.', 'Muhim iqtiboslarni ajratib oling.', 'Xulosa gapni yozing.'],
    },
    {
      num: '05', name: 'Predicting', color: 'var(--rose)',
      desc: 'O\'qishdan oldin va davomida bashorat qilish.',
      steps: ['Sarlavhadan nimani o\'qishingizni taxmin qiling.', 'Rasmlar nima haqida gapiradi?', 'O\'qiyotganingizda bashoratingizni tekshiring.', 'Yangi ma\'lumot bilan bashoratni yangilang.', 'Oxirida nima o\'rganganingizni aniqlang.'],
    },
    {
      num: '06', name: 'Text Structure', color: 'var(--green)',
      desc: 'Matn tuzilishini aniqlash — tushunishni ikki barobar oshiradi.',
      steps: ['Cause & Effect: "because", "as a result"', 'Compare & Contrast: "however", "on the other hand"', 'Problem & Solution: "the issue is", "a solution"', 'Chronological: "first", "then", "finally"', 'Description: "for example", "such as"'],
    },
  ];

  const quizQuestions = [
    { type: 'MAIN IDEA', q: 'Skimming strategiyasi asosan nima uchun ishlatiladi?', opts: ['Aniq raqam topish uchun', 'Matnning umumiy g\'oyasini tezda aniqlash uchun', 'Grammatika tahlil qilish uchun', 'So\'zlarni yodlash uchun'], ans: 1, exp: '"Skimming" matnning asosiy g\'oyasini sarlavhalar va birinchi gaplar orqali tezda aniqlash uchun ishlatiladi.' },
    { type: 'VOCABULARY', q: '"Bioluminescence" so\'zi nimani anglatadi?', opts: ['Suv osti texnologiyasi', 'Tirik organizmlarning biologik yorug\'lik ishlab chiqarishi', 'Dengiz o\'simliklarining rang berishi', 'Chuqur bosim ta\'siri'], ans: 1, exp: 'Bioluminescence — tirik organizmlar kimyoviy reaktsiyalar orqali yorug\'lik ishlab chiqarishi.' },
    { type: 'INFERENCE', q: 'Maqolaga ko\'ra, qaysi fikr to\'g\'ri?', opts: ['Ijtimoiy tarmoq har doim zararli', 'Passiv scrolling faol ishtirokdan zararli', 'Ko\'proq tanlov har doim yaxshiroq', 'Satisficers maximiserlardan ko\'proq harakat qiladi'], ans: 1, exp: '"Passive scrolling tends to have more negative effects than active engagement."' },
    { type: 'DETAIL', q: '"Jam eksperimentida" kichik assortiment qancha marta ko\'proq sotuvga olib keldi?', opts: ['3 marta', '5 marta', '10 marta', '2 marta'], ans: 2, exp: '"shoppers from the small display were ten times more likely to buy."' },
    { type: 'MAIN IDEA', q: 'SQ3R metodidagi "R" harflari nimani bildiradi?', opts: ['Read, Recall, Repeat', 'Read, Recite, Review', 'Research, Read, Reflect', 'Revise, Read, Record'], ans: 1, exp: 'SQ3R: Survey, Question, Read, Recite, Review.' },
    { type: 'VOCABULARY', q: '"Counterintuitive" so\'zi nimani anglatadi?', opts: ['Mantiqiy, kutilgan', 'Intuitsiyaga zid, kutilmagan natija', 'Matematik termin', 'Psixologik holatga oid'], ans: 1, exp: '"Counterintuitive" — kutilmagan, intuitsiyaga zid ko\'rinadigan.' },
    { type: 'CRITICAL THINKING', q: 'Neural coupling tadqiqoti nimani ko\'rsatdi?', opts: ['Miya har doim faol bo\'ladi', 'Hikoya aytish paytida tinglovchi miyasi hikoyachi miyasini ko\'rsatadi', 'O\'qish yozishdan afzal', 'Tinglovchi chalg\'iydi'], ans: 1, exp: '"the listener\'s brain activity begins to mirror the speaker\'s."' },
    { type: 'INFERENCE', q: 'Slow Food harakati nimani anglatadi?', opts: ['Tez ovqatlanishga ruxsat', 'An\'anaviy ovqat madaniyatini saqlab qolish', 'Italiyalik ovqatni targ\'ib qilish', 'Dietaga rioya qilish'], ans: 1, exp: 'Slow Food — an\'anaviy, sanoatlashmagan ovqat madaniyatini saqlash harakati.' },
    { type: 'DETAIL', q: 'Bioluminessensiyaga ega chuqur dengiz jonzotlari taxminan qancha foizni tashkil qiladi?', opts: ['50%', '70%', '90%', '30%'], ans: 2, exp: '"An estimated 90% of deep-sea creatures can generate their own light."' },
    { type: 'EVALUATION', q: 'Oksitotsin ko\'payganda qanday o\'zgarish kuzatildi?', opts: ['Xotira kuchaydi', 'Ijtimoiy va altruistik xulq-atvor kuchaydi', 'G\'azab pasaydi', 'Tezkor qaror qabul qilish yaxshilandi'], ans: 1, exp: '"increasing prosocial behaviour and altruistic tendencies in participants."' },
  ];

  const flashcards = {
    A2: [
      { word: 'approximately', pos: 'adverb', def: 'Taxminan, qo\'llama yo\'sinda', ex: 'There were approximately 200 people.' },
      { word: 'benefit', pos: 'noun', def: 'Foyda, manfaat', ex: 'Exercise has many health benefits.' },
      { word: 'involve', pos: 'verb', def: 'O\'z ichiga olmoq, bog\'liq bo\'lmoq', ex: 'The job involves a lot of travelling.' },
      { word: 'significant', pos: 'adjective', def: 'Muhim, ahamiyatli', ex: 'There was a significant difference.' },
      { word: 'environment', pos: 'noun', def: 'Atrof-muhit, tabiat', ex: 'We must protect the environment.' },
    ],
    B1: [
      { word: 'significant', pos: 'adjective', def: 'Muhim, katta ahamiyatga ega', ex: 'The research found significant results.' },
      { word: 'consequently', pos: 'adverb', def: 'Natijada, shuning uchun', ex: 'He didn\'t study; consequently, he failed.' },
      { word: 'perspective', pos: 'noun', def: 'Nuqtai nazar, ko\'rish burchagi', ex: 'From my perspective, this is wrong.' },
      { word: 'perceive', pos: 'verb', def: 'Idrok etmoq, anglash', ex: 'How do you perceive this situation?' },
      { word: 'phenomenon', pos: 'noun', def: 'Fenomen, g\'ayrioddiy hodisa', ex: 'Climate change is a global phenomenon.' },
      { word: 'controversial', pos: 'adjective', def: 'Bahs-munozarali, munozaraga sabab bo\'ladigan', ex: 'The topic was highly controversial.' },
      { word: 'adequate', pos: 'adjective', def: 'Yetarli, maqbul', ex: 'Is the salary adequate for your needs?' },
      { word: 'crucial', pos: 'adjective', def: 'Hal qiluvchi, muhim', ex: 'This is a crucial decision.' },
    ],
    B2: [
      { word: 'ambiguous', pos: 'adjective', def: 'Noaniq, ikki ma\'noli', ex: 'The instructions were ambiguous.' },
      { word: 'perpetuate', pos: 'verb', def: 'Davom ettirmoq, abadiylashtirmoq', ex: 'Stereotypes perpetuate inequality.' },
      { word: 'nuanced', pos: 'adjective', def: 'Nozik farqli, puxta tahlil qilingan', ex: 'A nuanced understanding is needed.' },
      { word: 'coherent', pos: 'adjective', def: 'Izchil, bog\'liq, mantiqli', ex: 'Write a coherent argument.' },
      { word: 'substantiate', pos: 'verb', def: 'Isbotlamoq, asoslamoq', ex: 'Please substantiate your claim.' },
      { word: 'implications', pos: 'noun', def: 'Oqibatlar, ta\'sirlar', ex: 'What are the policy implications?' },
    ],
    C1: [
      { word: 'obfuscate', pos: 'verb', def: 'Chalgʻitmoq, noaniq qilmoq', ex: 'Politicians often obfuscate the truth.' },
      { word: 'juxtapose', pos: 'verb', def: 'Yonma-yon qo\'yib taqqoslamoq', ex: 'The artist juxtaposed light and shadow.' },
      { word: 'tangential', pos: 'adjective', def: 'Mavzudan chetga chiqadigan, yonlama', ex: 'His comment was tangential to the topic.' },
      { word: 'permeate', pos: 'verb', def: 'Kirib bormoq, singmoq', ex: 'Fear permeated the entire society.' },
      { word: 'epistemological', pos: 'adjective', def: 'Bilish nazariyasiga oid', ex: 'This raises epistemological questions.' },
      { word: 'extrapolate', pos: 'verb', def: 'Mavjud ma\'lumotdan xulosa chiqarmoq', ex: 'We can extrapolate from this data.' },
    ],
  };

  const speedTexts = [
    'The ocean covers more than seventy percent of Earth\'s surface yet remains largely unexplored. Scientists estimate that over eighty percent of the ocean floor is unmapped. Strange creatures live in the dark depths where sunlight never reaches. Some glow in the dark using a process called bioluminescence. Others survive without oxygen using chemicals from underwater volcanoes called hydrothermal vents. Every expedition to the deep sea reveals species unknown to science. The ocean holds mysteries that may take centuries to fully understand.'.split(' '),
    'Ancient Rome was one of the most powerful empires in history. At its peak the Roman Empire controlled most of Europe North Africa and parts of the Middle East. The Romans built roads aqueducts and magnificent buildings many of which still stand today. Roman law influenced modern legal systems around the world. Latin the language of Rome evolved into French Spanish Italian Portuguese and Romanian. The fall of Rome in 476 AD marked the end of the ancient world and the beginning of the Middle Ages.'.split(' '),
    'Quantum mechanics is the branch of physics that deals with the behaviour of particles at the atomic and subatomic level. Unlike classical physics where objects have definite positions and speeds quantum particles exist in states of probability. The famous double-slit experiment demonstrated that particles can behave as both waves and particles simultaneously. Erwin Schrödinger proposed his famous thought experiment involving a cat to illustrate the paradox of quantum superposition. Quantum entanglement allows particles to instantaneously affect each other regardless of distance something Einstein called spooky action at a distance.'.split(' '),
    'Cities are exciting places to live. There are many shops parks restaurants and museums. Public transport makes it easy to move around. People from different countries and cultures live together in cities. This makes cities very interesting and diverse. However cities can also be noisy and expensive. Many people prefer the quiet life of a small town or village. Both city and country life have their advantages and disadvantages. The most important thing is to find the right place for you.'.split(' '),
  ];

  const tickers = [
    'Skimming — matnning asosiy g\'oyasini tezda aniqlash uchun sarlavhalar va birinchi gaplarni o\'qing.',
    'Scanning — faqat kerakli ma\'lumotni (sana, ism, raqam) qidiring, hamma narsani o\'qimang.',
    'Intensive Reading — qiyin matnni sekin o\'qib, har bir so\'zni tahlil qiling.',
    'Vocab context — noma\'lum so\'zni lug\'atsiz kontekstdan tushunishga harakat qiling.',
    'Daily Reading — har kuni 15 daqiqa ingliz tilida o\'qish yillar ichida katta o\'zgarish beradi.',
    'Prediction — o\'qishdan oldin sarlavhaga qarab nimani o\'qishingizni taxmin qiling.',
    'Note-taking — o\'qiyotganingizda asosiy fikrlarni qisqa iboralar bilan yozing.',
    'Re-read — tushunmagan qismni ikkinchi marta o\'qing, bu normal va samarali!',
  ];

  // ======================== STATE ========================
  const [currentReadLevel, setCurrentReadLevel] = useState('B1');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentText, setCurrentText] = useState(null);
  const [highlightMode, setHighlightMode] = useState(false);
  const [annotateMode, setAnnotateMode] = useState(false);
  const [articleFontSize, setArticleFontSize] = useState(1.05);
  const [articleDarkMode, setArticleDarkMode] = useState(false);
  const [compAnswered, setCompAnswered] = useState([]);
  const [compScore, setCompScore] = useState(0);
  const [compShowSummary, setCompShowSummary] = useState(false);
  const [annotationText, setAnnotationText] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [summaryFeedback, setSummaryFeedback] = useState({ show: false, message: '', type: '' });
  const [readingProgress, setReadingProgress] = useState(0);
  const [readingTimeLeft, setReadingTimeLeft] = useState('');

  // Speed Reading
  const [speedPlaying, setSpeedPlaying] = useState(false);
  const [speedWords, setSpeedWords] = useState([]);
  const [speedIdx, setSpeedIdx] = useState(0);
  const [speedWPM, setSpeedWPM] = useState(250);
  const [currentSpeedText, setCurrentSpeedText] = useState(0);
  const speedTimerRef = useRef(null);

  // Flashcards
  const [fcLevel, setFcLevel] = useState('B1');
  const [fcIdx, setFcIdx] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);

  // Quiz
  const [qIdx, setQIdx] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qAnswered, setQAnswered] = useState(false);
  const [qShowResult, setQShowResult] = useState(false);

  // Ticker
  const [tickerIdx, setTickerIdx] = useState(0);

  // Tooltip
  const [tooltip, setTooltip] = useState({ show: false, word: '', pos: '', def: '', x: 0, y: 0 });

  // ======================== EFFECTS ========================
  useEffect(() => {
    filterTexts('B1');
    renderStrategies();
    loadSpeedText();
    startTicker();
    // animate progress bars
    setTimeout(() => {
      document.querySelectorAll('.ring-fill').forEach(el => {
        const w = el.style.width; el.style.width = '0';
        setTimeout(() => { el.style.width = w; el.style.transition = 'width 1.4s cubic-bezier(0.4,0,0.2,1)'; }, 200);
      });
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modalOpen && currentText) {
      // Add event listeners for vocab tooltips
      const timer = setTimeout(() => {
        document.querySelectorAll('.vocab-word').forEach(el => {
          el.addEventListener('mouseenter', handleVocabMouseEnter);
          el.addEventListener('mouseleave', handleVocabMouseLeave);
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [modalOpen, currentText]);

  useEffect(() => {
    if (modalOpen) {
      const modal = document.getElementById('readingModal');
      const handleScroll = () => updateReadProgress(modal);
      modal?.addEventListener('scroll', handleScroll);
      return () => modal?.removeEventListener('scroll', handleScroll);
    }
  }, [modalOpen]);

  // Speed reading timer
  useEffect(() => {
    if (speedPlaying) {
      const delay = Math.round(60000 / speedWPM);
      speedTimerRef.current = setInterval(() => {
        setSpeedIdx(prev => {
          if (prev >= speedWords.length) {
            clearInterval(speedTimerRef.current);
            setSpeedPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    } else {
      clearInterval(speedTimerRef.current);
    }
    return () => clearInterval(speedTimerRef.current);
  }, [speedPlaying, speedWPM, speedWords.length]);

  // Ticker rotation
  const startTicker = () => {
    setInterval(() => {
      setTickerIdx(prev => (prev + 1) % tickers.length);
    }, 5000);
  };

  // ======================== FUNCTIONS ========================
  const goSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const filterTexts = (lvl) => {
    setCurrentReadLevel(lvl);
  };

  const openReading = (id) => {
    const text = Object.values(readingTexts).flat().find(t => t.id === id);
    if (text) {
      setCurrentText(text);
      setCompAnswered([]);
      setCompScore(0);
      setCompShowSummary(false);
      setAnnotationText('');
      setSummaryText('');
      setSummaryFeedback({ show: false, message: '', type: '' });
      setReadingProgress(0);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentText(null);
    setHighlightMode(false);
    setAnnotateMode(false);
    setTooltip({ show: false });
  };

  const toggleHighlight = () => {
    setHighlightMode(!highlightMode);
  };

  const toggleAnnotate = () => {
    setAnnotateMode(!annotateMode);
  };

  const toggleDarkMode = () => {
    setArticleDarkMode(!articleDarkMode);
  };

  const increaseFontSize = () => {
    setArticleFontSize(prev => Math.min(1.4, prev + 0.1));
  };

  const decreaseFontSize = () => {
    setArticleFontSize(prev => Math.max(0.85, prev - 0.1));
  };

  const handleVocabMouseEnter = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    setTooltip({
      show: true,
      word: el.dataset.word,
      pos: el.dataset.pos,
      def: el.dataset.def,
      x: Math.min(rect.left, window.innerWidth - 280),
      y: rect.top - 80,
    });
  };

  const handleVocabMouseLeave = () => {
    setTooltip({ show: false });
  };

  const updateReadProgress = (modal) => {
    if (!modal) return;
    const total = modal.scrollHeight - modal.clientHeight;
    const pct = total > 0 ? (modal.scrollTop / total) * 100 : 0;
    setReadingProgress(pct);
    const minsLeft = Math.max(0, Math.round((100 - pct) / 100 * 7));
    setReadingTimeLeft(minsLeft > 0 ? `≈ ${minsLeft} daqiqa qoldi` : 'Deyarli tugadi!');
  };

  const answerComp = (qi, oi) => {
    if (compAnswered.includes(qi) || !currentText) return;
    const newAnswered = [...compAnswered, qi];
    setCompAnswered(newAnswered);
    const q = currentText.compQ[qi];
    if (q.ans === oi) {
      setCompScore(prev => prev + 1);
    }
    if (newAnswered.length === currentText.compQ.length) {
      setCompShowSummary(true);
    }
  };

  const getCompOptionClass = (qi, oi) => {
    if (!compAnswered.includes(qi) || !currentText) return '';
    const q = currentText.compQ[qi];
    if (oi === q.ans) return 'correct';
    return 'wrong';
  };

  const isCompOptionDisabled = (qi) => {
    return compAnswered.includes(qi);
  };

  const revealVocab = (i) => {
    // Handled in UI with state
  };

  const checkSummary = () => {
    const words = summaryText.trim() ? summaryText.trim().split(/\s+/).length : 0;
    if (words < 10) {
      setSummaryFeedback({
        show: true,
        message: `⚠️ Juda qisqa (${words} so'z). Kamida 30-50 so'z yozing!`,
        type: 'error'
      });
    } else {
      setSummaryFeedback({
        show: true,
        message: `✅ Zo'r! ${words} so'z yozdingiz. Xulosa yozish o'qish tushunishingizni mustahkamlaydi.`,
        type: 'success'
      });
    }
  };

  const openSkillInfo = (skill) => {
    const info = {
      skimming: 'Skimming — sarlavhalar, kichik sarlavhalar va har paragrafning birinchi gaplarini o\'qib, matnning asosiy g\'oyasini 1-2 daqiqada aniqlash. IELTS va kundalik o\'qishda juda muhim!',
      scanning: 'Scanning — matnni butun o\'qimasdan, aniq ma\'lumot (raqam, sana, ism) izlash. Ko\'zingizni tez harakatlantiring, faqat kerakli narsada to\'xtang.',
      intensive: 'Intensive Reading — har bir so\'z va grammatik strukturani diqqat bilan tahlil qilish. Qiyin akademik matnlar uchun ideal. Sekin, lekin chuqur tushunish bilan.',
      extensive: 'Extensive Reading — zavq uchun ko\'p o\'qish. Til organik o\'sadi. Daraja bo\'yicha kitoblar, gazeta, blog — xohlaganingizni o\'qing. Miqdor muhim!',
    };
    alert('💡 ' + (info[skill] || 'Ma\'lumot yo\'q'));
  };

  const renderStrategies = () => {
    // Rendered directly in JSX
  };

  const updateWPM = (val) => {
    setSpeedWPM(parseInt(val));
  };

  const loadSpeedText = () => {
    setSpeedWords(speedTexts[currentSpeedText]);
    resetSpeed();
  };

  const handleSpeedTextChange = (e) => {
    setCurrentSpeedText(parseInt(e.target.value));
    setTimeout(() => loadSpeedText(), 10);
  };

  const toggleSpeed = () => {
    if (speedPlaying) {
      setSpeedPlaying(false);
    } else {
      if (speedIdx >= speedWords.length) setSpeedIdx(0);
      setSpeedPlaying(true);
    }
  };

  const resetSpeed = () => {
    setSpeedPlaying(false);
    setSpeedIdx(0);
  };

  const loadFlashcards = (lvl) => {
    setFcLevel(lvl);
    setFcIdx(0);
    setFcFlipped(false);
  };

  const flipCard = () => {
    setFcFlipped(!fcFlipped);
  };

  const nextCard = () => {
    const cards = flashcards[fcLevel] || [];
    setFcIdx((fcIdx + 1) % cards.length);
    setFcFlipped(false);
  };

  const prevCard = () => {
    const cards = flashcards[fcLevel] || [];
    setFcIdx((fcIdx - 1 + cards.length) % cards.length);
    setFcFlipped(false);
  };

  const renderQuiz = () => {
    setQIdx(0);
    setQScore(0);
    setQAnswered(false);
    setQShowResult(false);
  };

  const qAnswer = (i) => {
    if (qAnswered) return;
    setQAnswered(true);
    if (i === quizQuestions[qIdx].ans) {
      setQScore(prev => prev + 1);
    }
  };

  const qNext = () => {
    if (qIdx + 1 >= quizQuestions.length) {
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
    if (i === quizQuestions[qIdx].ans) return 'correct';
    return 'wrong';
  };

  // ======================== RENDER ========================
  const getLevelColor = (lvl) => {
    const colors = { A1: 'var(--green)', A2: 'var(--teal)', B1: 'var(--blue)', B2: 'var(--amber)', C1: 'var(--violet)' };
    return colors[lvl] || 'var(--amber)';
  };

  const currentCards = flashcards[fcLevel] || [];
  const currentCard = currentCards[fcIdx] || {};

  const getQuizResultEmoji = () => {
    const pct = Math.round((qScore / quizQuestions.length) * 100);
    if (pct >= 80) return '🏆';
    if (pct >= 60) return '🥈';
    return '📚';
  };

  const getQuizResultMsg = () => {
    const pct = Math.round((qScore / quizQuestions.length) * 100);
    if (pct >= 80) return 'Ajoyib! Siz reading ekspertsiz!';
    if (pct >= 60) return 'Yaxshi! Davom eting — maqsadga yaqinlashyapsiz.';
    return 'Ko\'proq o\'qing va mashq qiling. Har xato — dars!';
  };

  return (
    <div className="readwell">
      {/* NAV */}
      <Header/>
      {/* HERO */}
      <div className="hero au">
        <div>
          <div className="hero-eyebrow">Multilevel Reading System</div>
          <h1>O'qib tushunish<br />— bu <em>san'at</em></h1>
          <p className="hero-sub">A1 dan C1 gacha real matnlar, comprehension testlar, vocab flashcards, tezlik mashqlari va chuqur o'qish strategiyalari bilan ingliz tilini professional darajaga olib chiqing.</p>
          <div className="hero-btns">
            <button className="btn btn-amber" onClick={() => goSection('texts')}>O'qishni boshlash →</button>
            <button className="btn btn-ghost" onClick={() => goSection('speed')}>Tezlik testi</button>
          </div>
        </div>
        <div className="hero-stats-card au d1">
          <div className="hsc-title">Daraja progressingiz</div>
          <div className="level-rings">
            <div className="ring-row"><span className="ring-label">A1 Starter</span><div className="ring-bar"><div className="ring-fill fill-a1" style={{ width: '100%' }}></div></div><span className="ring-pct">100%</span></div>
            <div className="ring-row"><span className="ring-label">A2 Elementary</span><div className="ring-bar"><div className="ring-fill fill-a2" style={{ width: '85%' }}></div></div><span className="ring-pct">85%</span></div>
            <div className="ring-row"><span className="ring-label">B1 Intermediate</span><div className="ring-bar"><div className="ring-fill fill-b1" style={{ width: '62%' }}></div></div><span className="ring-pct">62%</span></div>
            <div className="ring-row"><span className="ring-label">B2 Upper-Int</span><div className="ring-bar"><div className="ring-fill fill-b2" style={{ width: '38%' }}></div></div><span className="ring-pct">38%</span></div>
            <div className="ring-row"><span className="ring-label">C1 Advanced</span><div className="ring-bar"><div className="ring-fill fill-c1" style={{ width: '15%' }}></div></div><span className="ring-pct">15%</span></div>
          </div>
          <div className="hsc-stats">
            <div className="hsc-stat"><div className="hsc-stat-num">34</div><div className="hsc-stat-label">Matn o'qildi</div></div>
            <div className="hsc-stat"><div className="hsc-stat-num">248</div><div className="hsc-stat-label">So'z o'rganildi</div></div>
            <div className="hsc-stat"><div className="hsc-stat-num">87%</div><div className="hsc-stat-label">Quiz aniqlik</div></div>
          </div>
        </div>
      </div>

      {/* TIPS TICKER */}
      <div className="container section-gap" style={{ paddingBottom: 0, marginBottom: 32 }}>
        <div className="tips-ticker">
          <span className="ticker-label">💡 Maslahat</span>
          <span className="ticker-text" id="tickerText">{tickers[tickerIdx]}</span>
        </div>
      </div>

      {/* READING TEXTS */}
      <div className="container section-gap" id="texts">
        <div className="section-head">
          <h2>O'quv Matnlari</h2>
          <div className="section-head-right">Daraja tanlang va matn oching</div>
        </div>

        <div className="level-tabs">
          {['A1', 'A2', 'B1', 'B2', 'C1'].map(lvl => (
            <button
              key={lvl}
              className={`ltab ${currentReadLevel === lvl ? `active-${lvl.toLowerCase()}` : ''}`}
              onClick={() => filterTexts(lvl)}
            >
              {lvl === 'A1' && '🟢'} {lvl === 'A2' && '🩵'} {lvl === 'B1' && '🔵'} {lvl === 'B2' && '🟡'} {lvl === 'C1' && '🟣'} {lvl} — {lvl === 'A1' ? 'Starter' : lvl === 'A2' ? 'Elementary' : lvl === 'B1' ? 'Intermediate' : lvl === 'B2' ? 'Upper-Int' : 'Advanced'}
            </button>
          ))}
        </div>

        <div className="reading-grid" id="readingGrid">
          {(readingTexts[currentReadLevel] || []).map((text, i) => (
            <div
              key={text.id}
              className="rcard au"
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => openReading(text.id)}
            >
              <div className={`rcard-banner ${text.banner}`}></div>
              <div className="rcard-body">
                <div className="rcard-meta">
                  <span className={`rcard-genre ${text.genreClass}`}>{text.genre}</span>
                  <span className="rcard-time">⏱ {text.time}</span>
                </div>
                <div className="rcard-title">{text.title}</div>
                <div className="rcard-preview">{text.preview}</div>
              </div>
              <div className="rcard-footer">
                <div className="rcard-skills">
                  {text.skills.map((s, idx) => (
                    <span key={idx} className="skill-tag">{s}</span>
                  ))}
                </div>
                <div className="rcard-arrow">→</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* READING SKILLS */}
      <div className="container skills-section" id="skills">
        <div className="section-head">
          <h2>O'qish Ko'nikmalari</h2>
          <div className="section-head-right">Har birini alohida rivojlantiring</div>
        </div>
        <div className="skills-grid">
          {[
            { icon: '⚡', name: 'Skimming', desc: 'Matnning asosiy g\'oyasini sarlavhalar va birinchi gaplar orqali tezda aniqlash.', progress: 75, color: 'var(--amber)', skill: 'skimming' },
            { icon: '🔍', name: 'Scanning', desc: 'Matnda aniq ma\'lumot, sana yoki ism kabi narsalarni tez topish qobiliyati.', progress: 58, color: 'var(--teal)', skill: 'scanning' },
            { icon: '🧠', name: 'Intensive Reading', desc: 'Har bir gap va so\'zni chuqur tahlil qilish. Grammatika va ma\'no uchun.', progress: 42, color: 'var(--violet)', skill: 'intensive' },
            { icon: '📚', name: 'Extensive Reading', desc: 'Ko\'p hajmli matnlarni zavq uchun o\'qish. Lug\'at va tushunish organik o\'sadi.', progress: 65, color: 'var(--green)', skill: 'extensive' },
          ].map((skill, i) => (
            <div key={i} className="skill-card" onClick={() => openSkillInfo(skill.skill)}>
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-desc">{skill.desc}</div>
              <div className="skill-progress-wrap">
                <div className="skill-progress-fill" style={{ width: `${skill.progress}%`, background: skill.color }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STRATEGIES */}
      <div className="container section-gap" id="strategies">
        <div className="section-head">
          <h2>O'qish Strategiyalari</h2>
          <div className="section-head-right">Professional reading metodlari</div>
        </div>
        <div className="strategies-grid" id="strategiesGrid">
          {strategies.map((s, i) => (
            <div key={i} className="strat-card">
              <div className="strat-num" style={{ color: s.color }}>STRATEGIYA {s.num}</div>
              <div className="strat-name" style={{ color: s.color }}>{s.name}</div>
              <div className="strat-desc">{s.desc}</div>
              <div className="strat-steps">
                {s.steps.map((step, j) => (
                  <div key={j} className="strat-step">
                    <div className="strat-step-num" style={{ background: s.color, color: '#0c0f14' }}>{j + 1}</div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SPEED READING */}
      <div className="container speed-section" id="speed">
        <div className="section-head">
          <h2>Tezlik O'qish Trenajyori</h2>
          <div className="section-head-right">WPM (Words Per Minute) oshiring</div>
        </div>
        <div className="speed-container">
          <div>
            <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.15rem', marginBottom: 12 }}>Nima bu?</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: 20 }}>
              RSVP (Rapid Serial Visual Presentation) — so'zlarni birin-ketin markazda ko'rsatadigan tezlik o'qish usuli. Odatdagi ko'z harakati yo'q bo'lgani uchun ancha tez o'qiladi.
            </p>
            <div className="speed-wpm">
              <label>WPM:</label>
              <input
                type="range"
                className="speed-slider"
                min="100"
                max="700"
                value={speedWPM}
                onChange={(e) => updateWPM(e.target.value)}
              />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--amber)', fontSize: '0.85rem', fontWeight: 600 }}>{speedWPM}</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text2)', display: 'block', marginBottom: 8 }}>Matn tanlang:</label>
              <select
                onChange={handleSpeedTextChange}
                value={currentSpeedText}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontFamily: "'Outfit', sans-serif", fontSize: '0.82rem', outline: 'none' }}
              >
                <option value="0">The Ocean's Depth (B1)</option>
                <option value="1">Ancient Rome (A2)</option>
                <option value="2">Quantum Physics (C1)</option>
                <option value="3">City Life (A1)</option>
              </select>
            </div>
            <div className="speed-controls">
              <button className="btn btn-amber" onClick={toggleSpeed}>
                {speedPlaying ? '⏸ Pauza' : speedIdx >= speedWords.length ? '▶ Qayta boshlash' : '▶ Boshlash'}
              </button>
              <button className="btn btn-ghost" onClick={resetSpeed}>↺ Reset</button>
            </div>
          </div>
          <div>
            <div className="speed-display">
              <div className="speed-word" id="speedWordDisplay">
                {speedIdx < speedWords.length ? speedWords[speedIdx] : speedIdx >= speedWords.length && speedWords.length > 0 ? '✓ Tugadi!' : '—'}
              </div>
              <div className="speed-stat" id="speedStat">
                {speedPlaying || speedIdx > 0 ? `${speedWPM} WPM` : 'Boshlash tugmasini bosing'}
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--amber)', borderRadius: 2, width: `${(speedIdx / speedWords.length) * 100}%`, transition: 'width 0.1s' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{speedIdx} / {speedWords.length}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>
                  {speedPlaying && speedIdx < speedWords.length ? `${Math.round((speedWords.length - speedIdx) / (speedWPM / 60))}s qoldi` : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLASHCARDS */}
      <div className="container flashcard-section" id="flashcards">
        <div className="section-head">
          <h2>Vocab Flashcards</h2>
          <div className="section-head-right">Bosish bilan aylantirasiz</div>
        </div>

        <div className="level-tabs" style={{ marginBottom: 28 }}>
          {['B1', 'A2', 'B2', 'C1'].map(lvl => (
            <button
              key={lvl}
              className={`ltab ${fcLevel === lvl ? `active-${lvl.toLowerCase()}` : ''}`}
              onClick={() => loadFlashcards(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="flashcard-wrap">
          <div className={`flashcard ${fcFlipped ? 'flipped' : ''}`} id="flashcard" onClick={flipCard}>
            <div className="fc-face">
              <div className="fc-type">SO'Z</div>
              <div className="fc-word" id="fcWord">{currentCard.word || '—'}</div>
              <div className="fc-hint" id="fcHint">{currentCard.pos || ''}</div>
            </div>
            <div className="fc-face fc-back">
              <div className="fc-type">TA'RIF</div>
              <div className="fc-def" id="fcDef">{currentCard.def || '—'}</div>
              <div className="fc-ex" id="fcEx">{currentCard.ex ? `"${currentCard.ex}"` : ''}</div>
            </div>
          </div>
          <div className="fc-click-hint">Karta bosing — aylantirasiz</div>
          <div className="fc-nav">
            <button className="fc-btn" onClick={prevCard}>← Oldingi</button>
            <span className="fc-counter" id="fcCounter">{fcIdx + 1} / {currentCards.length}</span>
            <button className="fc-btn" onClick={nextCard}>Keyingi →</button>
          </div>
        </div>
      </div>

      {/* QUIZ */}
      <div className="container quiz-section" id="quizsec">
        <div className="section-head">
          <h2>Reading Comprehension Quiz</h2>
          <div className="section-head-right">10 ta savol — turli tushunish darajalari</div>
        </div>
        <div className="quiz-box">
          {!qShowResult ? (
            <div id="quizMain">
              <div className="quiz-top">
                <div className="quiz-ptext" id="qProgressText">Savol {qIdx + 1} / {quizQuestions.length}</div>
                <div className="quiz-score-pill">🎯 <span id="qScore">{qScore}</span> ball</div>
              </div>
              <div className="quiz-type-label" id="qTypeLabel">{quizQuestions[qIdx].type}</div>
              <div className="quiz-q" id="qQuestion">{quizQuestions[qIdx].q}</div>
              <div className="quiz-opts" id="qOpts">
                {quizQuestions[qIdx].opts.map((opt, i) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  return (
                    <button
                      key={i}
                      className={`quiz-opt ${qAnswered ? getQOptionClass(i) : ''}`}
                      onClick={() => qAnswer(i)}
                      disabled={qAnswered}
                    >
                      <span className="okey">{letters[i]}</span>{opt}
                    </button>
                  );
                })}
              </div>
              {qAnswered && (
                <div className={`quiz-feedback-box show ${qAnswered && qIdx < quizQuestions.length ? (qIdx < quizQuestions.length ? 'g' : 'b') : ''}`} id="qFeedback">
                  {qAnswered && qIdx < quizQuestions.length ? (
                    <>
                      {qIdx < quizQuestions.length && (
                        <>
                          {quizQuestions[qIdx].ans === (() => {
                            for (let i = 0; i < 4; i++) if (document.activeElement?.id === `qopt_${i}`) return i;
                            return -1;
                          })() ? '✅ To\'g\'ri! ' : '❌ Xato. '}
                          {quizQuestions[qIdx].exp}
                        </>
                      )}
                    </>
                  ) : ''}
                </div>
              )}
              <div className="quiz-footer">
                <div className="quiz-dots" id="qDots">
                  {quizQuestions.map((_, i) => (
                    <div key={i} className={`qdot ${i < qIdx ? 'done' : i === qIdx ? 'active' : ''}`}></div>
                  ))}
                </div>
                {qAnswered && (
                  <button className="btn btn-amber" id="qNextBtn" onClick={qNext}>
                    Keyingi →
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="result-box show" id="qResult">
              <div className="res-emoji" id="resEmoji">{getQuizResultEmoji()}</div>
              <div className="res-score" id="resScore">{qScore}/{quizQuestions.length}</div>
              <div className="res-msg" id="resMsg">{getQuizResultMsg()}</div>
              <button className="btn btn-amber" onClick={qRestart}>Qayta boshlash</button>
            </div>
          )}
        </div>
      </div>

      <footer>
        <div className="footer-brand">ReadWell Academy</div>
        <div className="footer-note">A1–C1 · Multilevel Reading System · © 2025</div>
      </footer>

      {/* READING MODAL */}
      {modalOpen && currentText && (
        <div className="reading-modal open" id="readingModal">
          <div className="modal-inner">
            <div className="modal-toolbar">
              <button className="modal-close" onClick={closeModal}>← Orqaga</button>
              <div className="toolbar-center">
                <button className={`tool-btn ${highlightMode ? 'active-tool' : ''}`} id="toolHighlight" onClick={toggleHighlight}>🖊 Highlight</button>
                <button className={`tool-btn ${annotateMode ? 'active-tool' : ''}`} id="toolAnnotate" onClick={toggleAnnotate}>📝 Izoh</button>
                <button className="tool-btn" onClick={toggleDarkMode}>🌙 Rejim</button>
                <button className="tool-btn" onClick={increaseFontSize}>A+</button>
                <button className="tool-btn" onClick={decreaseFontSize}>A−</button>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--text3)' }} id="modalReadTime">
                {currentText.time} o'qish
              </div>
            </div>

            <div className="reading-progress-wrap">
              <div className="reading-progress-bar" id="readingProgressBar" style={{ width: `${readingProgress}%` }}></div>
            </div>
            <div className="reading-time-left" id="readingTimeLeft">{readingTimeLeft}</div>

            <div className="article-header">
              <div className="article-level-row">
                <span className="article-level-badge" id="artLevelBadge" style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: getLevelColor(currentText.id.split('_')[0].toUpperCase()),
                  border: `1px solid ${getLevelColor(currentText.id.split('_')[0].toUpperCase())}`,
                  padding: '5px 14px',
                  borderRadius: '100px',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}>
                  {currentText.id.split('_')[0].toUpperCase()}
                </span>
                <span className="article-genre-badge" id="artGenreBadge" style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text2)',
                  border: '1px solid var(--border)',
                  padding: '5px 14px',
                  borderRadius: '100px',
                  fontSize: '0.72rem',
                  fontWeight: 600
                }}>
                  {currentText.genre}
                </span>
              </div>
              <div className="article-title" id="artTitle">{currentText.title}</div>
              <div className="article-byline">
                <span id="artTime">⏱ {currentText.time}</span>
                <span id="artWords">📄 {currentText.words}</span>
                <span id="artDiff">{currentText.diff}</span>
              </div>
            </div>

            <div className={`annotation-panel ${annotateMode ? 'show' : ''}`} id="annotationPanel">
              <button className="ap-close" onClick={() => setAnnotateMode(false)}>✕</button>
              <div className="ap-label">📝 Izohingiz</div>
              <textarea
                className="sum-textarea"
                style={{ minHeight: '70px' }}
                placeholder="Bu matn bo'lagi haqida izoh yozing..."
                value={annotationText}
                onChange={(e) => setAnnotationText(e.target.value)}
              ></textarea>
            </div>

            <div
              className="article-body"
              id="articleBody"
              style={{ fontSize: `${articleFontSize}rem`, color: articleDarkMode ? 'rgba(232,228,220,0.6)' : 'rgba(232,228,220,0.88)' }}
              dangerouslySetInnerHTML={{ __html: currentText.body }}
            ></div>

            <div className="comprehension-section">
              <div className="comp-title">Tushunish Savollari</div>
              <div className="comp-sub">Matnni o'qib bo'lgach, quyidagi savollarga javob bering</div>
              <div id="compQuestions">
                {currentText.compQ.map((q, qi) => {
                  const keys = ['A', 'B', 'C', 'D'];
                  return (
                    <div key={qi} className="comp-question">
                      <div className="comp-q-text">{qi + 1}. {q.q}</div>
                      <div className="comp-options">
                        {q.opts.map((opt, oi) => (
                          <button
                            key={oi}
                            className={`comp-option ${getCompOptionClass(qi, oi)}`}
                            onClick={() => answerComp(qi, oi)}
                            disabled={isCompOptionDisabled(qi)}
                          >
                            <span className="comp-opt-key">{keys[oi]}</span>{opt}
                          </button>
                        ))}
                      </div>
                      {compAnswered.includes(qi) && (
                        <div className={`comp-feedback show ${q.ans === (() => {
                          for (let i = 0; i < 4; i++) if (document.activeElement?.id === `copt_${qi}_${i}`) return i;
                          return -1;
                        })() ? 'good' : 'bad'}`} id={`cfb_${qi}`}>
                          {compAnswered.includes(qi) ? (
                            <>
                              {q.ans === (() => {
                                for (let i = 0; i < 4; i++) if (document.activeElement?.id === `copt_${qi}_${i}`) return i;
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
              <div className={`score-summary ${compShowSummary ? 'show' : ''}`} id="compScoreSummary">
                <div className="ss-title">Natijangiz</div>
                <div className="ss-grid">
                  <div className="ss-item"><div className="ss-num" style={{ color: 'var(--green)' }} id="ssCorrect">{compScore}</div><div className="ss-label">To'g'ri</div></div>
                  <div className="ss-item"><div className="ss-num" style={{ color: 'var(--amber)' }} id="ssTotal">{currentText.compQ.length}</div><div className="ss-label">Jami</div></div>
                  <div className="ss-item"><div className="ss-num" style={{ color: 'var(--violet)' }} id="ssPct">{Math.round(compScore / currentText.compQ.length * 100)}%</div><div className="ss-label">Foiz</div></div>
                </div>
              </div>
            </div>

            <div className="vocab-quiz-section">
              <div className="vq-title">📚 Yangi So'zlar (Vocabulary)</div>
              <div className="vq-cards" id="vocabCards">
                {currentText.vocab.map((v, i) => (
                  <div key={i} className="vq-card" id={`vqc_${i}`}>
                    <div>
                      <div className="vq-word">{v.word}</div>
                      <div className="vq-sentence">{v.pos}</div>
                      <div className="vq-definition">{v.def}<br /><em style={{ color: 'var(--text3)', fontSize: '0.76rem' }}>"{v.ex}"</em></div>
                    </div>
                    <button className="vq-btn" onClick={() => {
                      const card = document.getElementById(`vqc_${i}`);
                      card?.classList.toggle('revealed');
                      if (card) {
                        card.querySelector('.vq-btn').textContent = card.classList.contains('revealed') ? 'Yashirish' : 'Ko\'rsatish';
                      }
                    }}>Ko'rsatish</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="summary-section">
              <div className="sum-title">✍️ Qisqacha Xulosa Yozing</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text3)', marginBottom: 14 }}>Matnni o'z so'zlaringiz bilan 3–5 gapda qisqacha yozing. Bu faol o'qish ko'nikmangizni mustahkamlaydi.</p>
              <textarea
                className="sum-textarea"
                id="summaryArea"
                placeholder="Matn haqida qisqacha xulosa..."
                value={summaryText}
                onChange={(e) => setSummaryText(e.target.value)}
              ></textarea>
              <div className="sum-actions">
                <button className="btn btn-amber" onClick={checkSummary}>Saqlash ✓</button>
                <button className="btn btn-ghost" onClick={() => setSummaryText('')}>Tozalash</button>
              </div>
              {summaryFeedback.show && (
                <div
                  style={{
                    display: 'block',
                    marginTop: 12,
                    padding: '12px 16px',
                    borderRadius: 8,
                    fontSize: '0.83rem',
                    lineHeight: 1.5,
                    background: summaryFeedback.type === 'error' ? 'rgba(232,88,88,0.08)' : 'rgba(94,201,126,0.08)',
                    borderLeft: `2px solid ${summaryFeedback.type === 'error' ? 'var(--rose)' : 'var(--green)'}`,
                    color: summaryFeedback.type === 'error' ? 'var(--rose)' : 'var(--green)'
                  }}
                  dangerouslySetInnerHTML={{ __html: summaryFeedback.message }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tooltip */}
      {tooltip.show && (
        <div className="tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <div className="tooltip-word">{tooltip.word}</div>
          <div className="tooltip-pos">{tooltip.pos}</div>
          <div className="tooltip-def">{tooltip.def}</div>
        </div>
      )}
    </div>
  );
};

export default ReadWell;