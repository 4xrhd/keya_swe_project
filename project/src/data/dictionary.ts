// ═══════════════════════════════════════════════════════════
// All In One Dictionary - Complete Offline Dataset
// ═══════════════════════════════════════════════════════════

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  flag: string;
}

export interface WordEntry {
  id: string;
  word: string;
  partOfSpeech: string;
  phonetic: string;
  definitions: string[];
  translations: Record<string, string>;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
}

export interface PhraseEntry {
  id: string;
  phrase: string;
  translations: Record<string, string>;
}

// ═══════════════════════════════════════════════════════════
// SUPPORTED LANGUAGES
// ═══════════════════════════════════════════════════════════

export const languages: Language[] = [
  { code: 'en', name: 'English (UK)', nativeName: 'British English', direction: 'ltr', flag: '🇬🇧' },
  { code: 'en-US', name: 'English (US)', nativeName: 'American English', direction: 'ltr', flag: '🇺🇸' },
  { code: 'bn', name: 'Bangla', nativeName: 'বাংলা', direction: 'ltr', flag: '🇧🇩' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', flag: '🇸🇦' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr', flag: '🇫🇷' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl', flag: '🇵🇰' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr', flag: '🇹🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', direction: 'ltr', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', direction: 'ltr', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', direction: 'ltr', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', direction: 'ltr', flag: '🇰🇷' },
];

// ═══════════════════════════════════════════════════════════
// DICTIONARY DATABASE - 35+ Words with Full Translations
// ═══════════════════════════════════════════════════════════

export const words: WordEntry[] = [
  {
    id: 'w001',
    word: 'love',
    partOfSpeech: 'noun, verb',
    phonetic: '/lʌv/',
    definitions: [
      'An intense feeling of deep affection and personal attachment.',
      'To feel a deep romantic or sexual attachment to someone.'
    ],
    translations: {
      bn: 'ভালোবাসা', hi: 'प्यार', ar: 'حب', es: 'amor', fr: 'amour',
      ur: 'محبت', tr: 'aşk', de: 'Liebe', pt: 'amor', ja: '愛', ko: '사랑'
    },
    examples: [
      'Love is the most powerful force in the world.',
      'She loves her family very much.',
      'Their love grew stronger every day.'
    ],
    synonyms: ['affection', 'devotion', 'fondness', 'adoration'],
    antonyms: ['hatred', 'loathing', 'animosity']
  },
  {
    id: 'w002',
    word: 'water',
    partOfSpeech: 'noun',
    phonetic: '/ˈwɔːtər/',
    definitions: [
      'A colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain.',
    ],
    translations: {
      bn: 'পানি', hi: 'पानी', ar: 'ماء', es: 'agua', fr: 'eau',
      ur: 'پانی', tr: 'su', de: 'Wasser', pt: 'água', ja: '水', ko: '물'
    },
    examples: [
      'Please give me a glass of water.',
      'Water is essential for life.',
      'The water in the river is very clear.'
    ],
    synonyms: ['liquid', 'fluid'],
    antonyms: []
  },
  {
    id: 'w003',
    word: 'fire',
    partOfSpeech: 'noun',
    phonetic: '/ˈfaɪər/',
    definitions: [
      'Combustion or burning, in which substances combine chemically with oxygen from the air.',
    ],
    translations: {
      bn: 'আগুন', hi: 'आग', ar: 'نار', es: 'fuego', fr: 'feu',
      ur: 'آگ', tr: 'ateş', de: 'Feuer', pt: 'fogo', ja: '火', ko: '불'
    },
    examples: [
      'The fire warmed us on the cold night.',
      'Fire can be both useful and dangerous.',
      'The firefighters quickly put out the fire.'
    ],
    synonyms: ['blaze', 'flame', 'inferno'],
    antonyms: []
  },
  {
    id: 'w004',
    word: 'earth',
    partOfSpeech: 'noun',
    phonetic: '/ɜːrθ/',
    definitions: [
      'The planet on which we live; the world.',
      'The substance of the land surface; soil.',
    ],
    translations: {
      bn: 'পৃথিবী', hi: 'पृथ्वी', ar: 'أرض', es: 'tierra', fr: 'terre',
      ur: 'زمین', tr: 'dünya', de: 'Erde', pt: 'terra', ja: '地球', ko: '지구'
    },
    examples: [
      'The Earth revolves around the Sun.',
      'We must protect our earth.',
      'The earth shook during the earthquake.'
    ],
    synonyms: ['ground', 'land', 'soil'],
    antonyms: []
  },
  {
    id: 'w005',
    word: 'air',
    partOfSpeech: 'noun',
    phonetic: '/ɛər/',
    definitions: [
      'The invisible gaseous substance surrounding the earth; a mixture of mainly oxygen and nitrogen.',
    ],
    translations: {
      bn: 'বাতাস', hi: 'हवा', ar: 'هواء', es: 'aire', fr: 'air',
      ur: 'ہوا', tr: 'hava', de: 'Luft', pt: 'ar', ja: '空気', ko: '공기'
    },
    examples: [
      'The air is fresh in the morning.',
      'We need clean air to breathe.',
      'The air feels cool today.'
    ],
    synonyms: ['breeze', 'atmosphere', 'wind'],
    antonyms: []
  },
  {
    id: 'w006',
    word: 'book',
    partOfSpeech: 'noun',
    phonetic: '/bʊk/',
    definitions: [
      'A written or printed work consisting of pages glued or sewn together along one side and bound in covers.',
    ],
    translations: {
      bn: 'বই', hi: 'किताब', ar: 'كتاب', es: 'libro', fr: 'livre',
      ur: 'کتاب', tr: 'kitap', de: 'Buch', pt: 'livro', ja: '本', ko: '책'
    },
    examples: [
      'I am reading an interesting book.',
      'This book has many beautiful pictures.',
      'She borrowed a book from the library.'
    ],
    synonyms: ['volume', 'publication', 'tome'],
    antonyms: []
  },
  {
    id: 'w007',
    word: 'house',
    partOfSpeech: 'noun',
    phonetic: '/haʊs/',
    definitions: [
      'A building for human habitation.',
    ],
    translations: {
      bn: 'বাড়ি', hi: 'घर', ar: 'بيت', es: 'casa', fr: 'maison',
      ur: 'گھر', tr: 'ev', de: 'Haus', pt: 'casa', ja: '家', ko: '집'
    },
    examples: [
      'They built a new house.',
      'The house is very big and beautiful.',
      'My house is near the school.'
    ],
    synonyms: ['home', 'residence', 'dwelling'],
    antonyms: []
  },
  {
    id: 'w008',
    word: 'friend',
    partOfSpeech: 'noun',
    phonetic: '/frɛnd/',
    definitions: [
      'A person with whom one has a bond of mutual affection.',
    ],
    translations: {
      bn: 'বন্ধু', hi: 'दोस्त', ar: 'صديق', es: 'amigo', fr: 'ami',
      ur: 'دوست', tr: 'arkadaş', de: 'Freund', pt: 'amigo', ja: '友達', ko: '친구'
    },
    examples: [
      'A true friend is a precious gift.',
      'She is my best friend.',
      'Friends make life more enjoyable.'
    ],
    synonyms: ['companion', 'buddy', 'pal'],
    antonyms: ['enemy', 'foe']
  },
  {
    id: 'w009',
    word: 'family',
    partOfSpeech: 'noun',
    phonetic: '/ˈfæmɪli/',
    definitions: [
      'A group consisting of parents and children living together in a household.',
    ],
    translations: {
      bn: 'পরিবার', hi: 'परिवार', ar: 'عائلة', es: 'familia', fr: 'famille',
      ur: 'خاندان', tr: 'aile', de: 'Familie', pt: 'família', ja: '家族', ko: '가족'
    },
    examples: [
      'Family is the most important thing in life.',
      'My family lives in a small town.',
      'We have a big family dinner on Sundays.'
    ],
    synonyms: ['relatives', 'household', 'kin'],
    antonyms: []
  },
  {
    id: 'w010',
    word: 'food',
    partOfSpeech: 'noun',
    phonetic: '/fuːd/',
    definitions: [
      'Any nutritious substance that people or animals eat or drink.',
    ],
    translations: {
      bn: 'খাবার', hi: 'खाना', ar: 'طعام', es: 'comida', fr: 'nourriture',
      ur: 'کھانا', tr: 'yemek', de: 'Essen', pt: 'comida', ja: '食べ物', ko: '음식'
    },
    examples: [
      'The food at this restaurant is delicious.',
      'We should not waste food.',
      'Healthy food is important for our body.'
    ],
    synonyms: ['meal', 'nourishment', 'sustenance'],
    antonyms: []
  },
  {
    id: 'w011',
    word: 'sun',
    partOfSpeech: 'noun',
    phonetic: '/sʌn/',
    definitions: [
      'The star around which the earth orbits.',
      'The light or warmth received from the sun.',
    ],
    translations: {
      bn: 'সূর্য', hi: 'सूरज', ar: 'شمس', es: 'sol', fr: 'soleil',
      ur: 'سورج', tr: 'güneş', de: 'Sonne', pt: 'sol', ja: '太陽', ko: '태양'
    },
    examples: [
      'The sun rises in the east.',
      'The sun is very bright today.',
      'We enjoyed the warm sun at the beach.'
    ],
    synonyms: ['star', 'daylight'],
    antonyms: ['moon']
  },
  {
    id: 'w012',
    word: 'moon',
    partOfSpeech: 'noun',
    phonetic: '/muːn/',
    definitions: [
      'The natural satellite of the earth, visible by reflected light from the sun.',
    ],
    translations: {
      bn: 'চাঁদ', hi: 'चाँद', ar: 'قمر', es: 'luna', fr: 'lune',
      ur: 'چاند', tr: 'ay', de: 'Mond', pt: 'lua', ja: '月', ko: '달'
    },
    examples: [
      'The moon looks beautiful tonight.',
      'The moon revolves around the Earth.',
      'We watched the full moon from the rooftop.'
    ],
    synonyms: ['satellite', 'lunar'],
    antonyms: ['sun']
  },
  {
    id: 'w013',
    word: 'star',
    partOfSpeech: 'noun',
    phonetic: '/stɑːr/',
    definitions: [
      'A fixed luminous point in the night sky which is a large remote incandescent body.',
    ],
    translations: {
      bn: 'তারা', hi: 'तारा', ar: 'نجم', es: 'estrella', fr: 'étoile',
      ur: 'ستارہ', tr: 'yıldız', de: 'Stern', pt: 'estrela', ja: '星', ko: '별'
    },
    examples: [
      'That star is the brightest in the sky.',
      'She wanted to be a movie star.',
      'Stars shine beautifully in the night sky.'
    ],
    synonyms: ['celestial body', 'luminary'],
    antonyms: []
  },
  {
    id: 'w014',
    word: 'tree',
    partOfSpeech: 'noun',
    phonetic: '/triː/',
    definitions: [
      'A woody perennial plant, typically having a single stem growing to a considerable height.',
    ],
    translations: {
      bn: 'গাছ', hi: 'पेड़', ar: 'شجرة', es: 'árbol', fr: 'arbre',
      ur: 'درخت', tr: 'ağaç', de: 'Baum', pt: 'árvore', ja: '木', ko: '나무'
    },
    examples: [
      'We planted a tree in the garden.',
      'The old tree provides shade in summer.',
      'Trees are important for the environment.'
    ],
    synonyms: ['plant', 'sapling'],
    antonyms: []
  },
  {
    id: 'w015',
    word: 'flower',
    partOfSpeech: 'noun',
    phonetic: '/ˈflaʊər/',
    definitions: [
      'The seed-bearing part of a plant, consisting of reproductive organs surrounded by brightly colored petals.',
    ],
    translations: {
      bn: 'ফুল', hi: 'फूल', ar: 'زهرة', es: 'flor', fr: 'fleur',
      ur: 'پھول', tr: 'çiçek', de: 'Blume', pt: 'flor', ja: '花', ko: '꽃'
    },
    examples: [
      'The flower garden is full of beautiful colors.',
      'She received a lovely flower bouquet.',
      'Spring is the season of flowers.'
    ],
    synonyms: ['bloom', 'blossom', 'petal'],
    antonyms: []
  },
  {
    id: 'w016',
    word: 'bird',
    partOfSpeech: 'noun',
    phonetic: '/bɜːrd/',
    definitions: [
      'A warm-blooded egg-laying vertebrate distinguished by the possession of feathers and wings.',
    ],
    translations: {
      bn: 'পাখি', hi: 'पक्षी', ar: 'طائر', es: 'pájaro', fr: 'oiseau',
      ur: 'پرندہ', tr: 'kuş', de: 'Vogel', pt: 'pássaro', ja: '鳥', ko: '새'
    },
    examples: [
      'The bird sang a beautiful song.',
      'Birds fly high in the sky.',
      'A little bird sat on the tree branch.'
    ],
    synonyms: ['fowl', 'avian'],
    antonyms: []
  },
  {
    id: 'w017',
    word: 'fish',
    partOfSpeech: 'noun',
    phonetic: '/fɪʃ/',
    definitions: [
      'A limbless cold-blooded vertebrate animal with gills and fins, living wholly in water.',
    ],
    translations: {
      bn: 'মাছ', hi: 'मछली', ar: 'سمكة', es: 'pez', fr: 'poisson',
      ur: 'مچھلی', tr: 'balık', de: 'Fisch', pt: 'peixe', ja: '魚', ko: '물고기'
    },
    examples: [
      'The fish swims in the river.',
      'We had fish for dinner last night.',
      'There are many types of fish in the sea.'
    ],
    synonyms: ['aquatic animal'],
    antonyms: []
  },
  {
    id: 'w018',
    word: 'happy',
    partOfSpeech: 'adjective',
    phonetic: '/ˈhæpi/',
    definitions: [
      'Feeling or showing pleasure or contentment.',
    ],
    translations: {
      bn: 'সুখী', hi: 'खुश', ar: 'سعيد', es: 'feliz', fr: 'heureux',
      ur: 'خوش', tr: 'mutlu', de: 'glücklich', pt: 'feliz', ja: '幸せ', ko: '행복한'
    },
    examples: [
      'I am very happy today.',
      'She gave a happy smile.',
      'Happy people spread positivity around them.'
    ],
    synonyms: ['joyful', 'cheerful', 'glad', 'delighted'],
    antonyms: ['sad', 'unhappy', 'miserable']
  },
  {
    id: 'w019',
    word: 'sad',
    partOfSpeech: 'adjective',
    phonetic: '/sæd/',
    definitions: [
      'Feeling or showing sorrow; unhappy.',
    ],
    translations: {
      bn: 'দুঃখী', hi: 'उदास', ar: 'حزين', es: 'triste', fr: 'triste',
      ur: 'اداس', tr: 'üzgün', de: 'traurig', pt: 'triste', ja: '悲しい', ko: '슬픈'
    },
    examples: [
      'He felt sad after hearing the news.',
      'The movie had a sad ending.',
      'Do not be sad, things will get better.'
    ],
    synonyms: ['unhappy', 'sorrowful', 'melancholy'],
    antonyms: ['happy', 'joyful', 'cheerful']
  },
  {
    id: 'w020',
    word: 'beautiful',
    partOfSpeech: 'adjective',
    phonetic: '/ˈbjuːtɪfʊl/',
    definitions: [
      'Pleasing the senses or mind aesthetically.',
    ],
    translations: {
      bn: 'সুন্দর', hi: 'सुंदर', ar: 'جميل', es: 'hermoso', fr: 'beau',
      ur: 'خوبصورت', tr: 'güzel', de: 'schön', pt: 'bonito', ja: '美しい', ko: '아름다운'
    },
    examples: [
      'What a beautiful sunset!',
      'She wore a beautiful dress to the party.',
      'Nature is truly beautiful in spring.'
    ],
    synonyms: ['gorgeous', 'lovely', 'stunning', 'attractive'],
    antonyms: ['ugly', 'hideous']
  },
  {
    id: 'w021',
    word: 'good',
    partOfSpeech: 'adjective',
    phonetic: '/ɡʊd/',
    definitions: [
      'To be desired or approved of; of a high quality or standard.',
    ],
    translations: {
      bn: 'ভালো', hi: 'अच्छा', ar: 'جيد', es: 'bueno', fr: 'bon',
      ur: 'اچھا', tr: 'iyi', de: 'gut', pt: 'bom', ja: '良い', ko: '좋은'
    },
    examples: [
      'This is a good book to read.',
      'She is a good student in class.',
      'Have a good day ahead!'
    ],
    synonyms: ['excellent', 'fine', 'great', 'wonderful'],
    antonyms: ['bad', 'poor', 'terrible']
  },
  {
    id: 'w022',
    word: 'bad',
    partOfSpeech: 'adjective',
    phonetic: '/bæd/',
    definitions: [
      'Of poor quality; not satisfactory; not as it should be.',
    ],
    translations: {
      bn: 'খারাপ', hi: 'बुरा', ar: 'سيء', es: 'malo', fr: 'mauvais',
      ur: 'برا', tr: 'kötü', de: 'schlecht', pt: 'mau', ja: '悪い', ko: '나쁜'
    },
    examples: [
      'The weather is bad today.',
      'Smoking is bad for health.',
      'That was a bad decision.'
    ],
    synonyms: ['terrible', 'awful', 'poor', 'dreadful'],
    antonyms: ['good', 'excellent', 'wonderful']
  },
  {
    id: 'w023',
    word: 'big',
    partOfSpeech: 'adjective',
    phonetic: '/bɪɡ/',
    definitions: [
      'Of considerable size or extent; large.',
    ],
    translations: {
      bn: 'বড়', hi: 'बड़ा', ar: 'كبير', es: 'grande', fr: 'grand',
      ur: 'بڑا', tr: 'büyük', de: 'groß', pt: 'grande', ja: '大きい', ko: '큰'
    },
    examples: [
      'The elephant is a very big animal.',
      'They live in a big house.',
      'He has big dreams for the future.'
    ],
    synonyms: ['large', 'huge', 'enormous', 'vast'],
    antonyms: ['small', 'tiny', 'little']
  },
  {
    id: 'w024',
    word: 'small',
    partOfSpeech: 'adjective',
    phonetic: '/smɔːl/',
    definitions: [
      'Of limited size; not large.',
    ],
    translations: {
      bn: 'ছোট', hi: 'छोटा', ar: 'صغير', es: 'pequeño', fr: 'petit',
      ur: 'چھوٹا', tr: 'küçük', de: 'klein', pt: 'pequeno', ja: '小さい', ko: '작은'
    },
    examples: [
      'The kitten is very small.',
      'She lives in a small apartment.',
      'Small steps lead to big changes.'
    ],
    synonyms: ['tiny', 'little', 'petite', 'miniature'],
    antonyms: ['big', 'large', 'huge']
  },
  {
    id: 'w025',
    word: 'time',
    partOfSpeech: 'noun',
    phonetic: '/taɪm/',
    definitions: [
      'The indefinite continued progress of existence and events in the past, present, and future.',
    ],
    translations: {
      bn: 'সময়', hi: 'समय', ar: 'وقت', es: 'tiempo', fr: 'temps',
      ur: 'وقت', tr: 'zaman', de: 'Zeit', pt: 'tempo', ja: '時間', ko: '시간'
    },
    examples: [
      'What time is it now?',
      'Time flies when you are having fun.',
      'We had a great time at the party.'
    ],
    synonyms: ['moment', 'period', 'era'],
    antonyms: []
  },
  {
    id: 'w026',
    word: 'world',
    partOfSpeech: 'noun',
    phonetic: '/wɜːrld/',
    definitions: [
      'The earth, together with all of its countries and peoples.',
    ],
    translations: {
      bn: 'বিশ্ব', hi: 'दुनिया', ar: 'عالم', es: 'mundo', fr: 'monde',
      ur: 'دنیا', tr: 'dünya', de: 'Welt', pt: 'mundo', ja: '世界', ko: '세계'
    },
    examples: [
      'She traveled around the world.',
      'The world is a beautiful place.',
      'World peace is everyone\'s wish.'
    ],
    synonyms: ['globe', 'earth', 'planet'],
    antonyms: []
  },
  {
    id: 'w027',
    word: 'life',
    partOfSpeech: 'noun',
    phonetic: '/laɪf/',
    definitions: [
      'The condition that distinguishes animals and plants from inorganic matter.',
      'The existence of an individual human being.',
    ],
    translations: {
      bn: 'জীবন', hi: 'जीवन', ar: 'حياة', es: 'vida', fr: 'vie',
      ur: 'زندگی', tr: 'hayat', de: 'Leben', pt: 'vida', ja: '人生', ko: '생명'
    },
    examples: [
      'Life is a journey, not a destination.',
      'She enjoys every moment of life.',
      'A healthy lifestyle is important for everyone.'
    ],
    synonyms: ['existence', 'being', 'living'],
    antonyms: ['death']
  },
  {
    id: 'w028',
    word: 'heart',
    partOfSpeech: 'noun',
    phonetic: '/hɑːrt/',
    definitions: [
      'A hollow muscular organ that pumps the blood through the circulatory system.',
      'The central or innermost part of something.',
    ],
    translations: {
      bn: 'হৃদয়', hi: 'दिल', ar: 'قلب', es: 'corazón', fr: 'cœur',
      ur: 'دل', tr: 'kalp', de: 'Herz', pt: 'coração', ja: '心臓', ko: '심장'
    },
    examples: [
      'She has a kind heart.',
      'My heart beats faster when I see you.',
      'Listen to your heart when making decisions.'
    ],
    synonyms: ['core', 'center', 'soul'],
    antonyms: []
  },
  {
    id: 'w029',
    word: 'mind',
    partOfSpeech: 'noun',
    phonetic: '/maɪnd/',
    definitions: [
      'The element of a person that enables them to be aware of the world and their experiences.',
    ],
    translations: {
      bn: 'মন', hi: 'दिमाग', ar: 'عقل', es: 'mente', fr: 'esprit',
      ur: 'دماغ', tr: 'zihin', de: 'Verstand', pt: 'mente', ja: '心', ko: '마음'
    },
    examples: [
      'Keep an open mind about new ideas.',
      'She has a brilliant mind.',
      'Peace of mind is priceless.'
    ],
    synonyms: ['intellect', 'brain', 'consciousness'],
    antonyms: []
  },
  {
    id: 'w030',
    word: 'school',
    partOfSpeech: 'noun',
    phonetic: '/skuːl/',
    definitions: [
      'An institution for educating children.',
      'Any place or means of learning.',
    ],
    translations: {
      bn: 'স্কুল', hi: 'स्कूल', ar: 'مدرسة', es: 'escuela', fr: 'école',
      ur: 'اسکول', tr: 'okul', de: 'Schule', pt: 'escola', ja: '学校', ko: '학교'
    },
    examples: [
      'The children go to school every day.',
      'Our school has a big playground.',
      'She excels in all her school subjects.'
    ],
    synonyms: ['academy', 'institution', 'educational'],
    antonyms: []
  },
  {
    id: 'w031',
    word: 'mother',
    partOfSpeech: 'noun',
    phonetic: '/ˈmʌðər/',
    definitions: [
      'A woman in relation to her child or children.',
    ],
    translations: {
      bn: 'মা', hi: 'माँ', ar: 'أم', es: 'madre', fr: 'mère',
      ur: 'ماں', tr: 'anne', de: 'Mutter', pt: 'mãe', ja: '母', ko: '어머니'
    },
    examples: [
      'My mother cooks the best food.',
      'A mother\'s love is unconditional.',
      'She became a mother last year.'
    ],
    synonyms: ['mom', 'mama', 'parent'],
    antonyms: ['father']
  },
  {
    id: 'w032',
    word: 'father',
    partOfSpeech: 'noun',
    phonetic: '/ˈfɑːðər/',
    definitions: [
      'A man in relation to his child or children.',
    ],
    translations: {
      bn: 'বাবা', hi: 'पिता', ar: 'أب', es: 'padre', fr: 'père',
      ur: 'باپ', tr: 'baba', de: 'Vater', pt: 'pai', ja: '父', ko: '아버지'
    },
    examples: [
      'My father is my role model.',
      'Father works hard for the family.',
      'He is a loving and caring father.'
    ],
    synonyms: ['dad', 'papa', 'parent'],
    antonyms: ['mother']
  },
  {
    id: 'w033',
    word: 'child',
    partOfSpeech: 'noun',
    phonetic: '/tʃaɪld/',
    definitions: [
      'A young human being below the age of puberty.',
    ],
    translations: {
      bn: 'শিশু', hi: 'बच्चा', ar: 'طفل', es: 'niño', fr: 'enfant',
      ur: 'بچہ', tr: 'çocuk', de: 'Kind', pt: 'criança', ja: '子供', ko: '아이'
    },
    examples: [
      'The child is playing in the park.',
      'Every child deserves a good education.',
      'She is an only child in the family.'
    ],
    synonyms: ['kid', 'youngster', 'young one'],
    antonyms: ['adult']
  },
  {
    id: 'w034',
    word: 'peace',
    partOfSpeech: 'noun',
    phonetic: '/piːs/',
    definitions: [
      'Freedom from disturbance; tranquility.',
      'The absence of war or conflict.',
    ],
    translations: {
      bn: 'শান্তি', hi: 'शांति', ar: 'سلام', es: 'paz', fr: 'paix',
      ur: 'امن', tr: 'barış', de: 'Frieden', pt: 'paz', ja: '平和', ko: '평화'
    },
    examples: [
      'We all want peace in the world.',
      'Inner peace is very important for happiness.',
      'The peace treaty was signed yesterday.'
    ],
    synonyms: ['harmony', 'calm', 'tranquility'],
    antonyms: ['war', 'conflict', 'chaos']
  },
  {
    id: 'w035',
    word: 'knowledge',
    partOfSpeech: 'noun',
    phonetic: '/ˈnɒlɪdʒ/',
    definitions: [
      'Facts, information, and skills acquired through experience or education.',
    ],
    translations: {
      bn: 'জ্ঞান', hi: 'ज्ञान', ar: 'معرفة', es: 'conocimiento', fr: 'connaissance',
      ur: 'علم', tr: 'bilgi', de: 'Wissen', pt: 'conhecimento', ja: '知識', ko: '지식'
    },
    examples: [
      'Knowledge is power.',
      'She has a great thirst for knowledge.',
      'Education brings knowledge and wisdom.'
    ],
    synonyms: ['wisdom', 'understanding', 'learning'],
    antonyms: ['ignorance']
  },
  {
    id: 'w036',
    word: 'hello',
    partOfSpeech: 'interjection',
    phonetic: '/həˈloʊ/',
    definitions: [
      'Used as a greeting or to begin a conversation.',
    ],
    translations: {
      bn: 'হ্যালো', hi: 'नमस्ते', ar: 'مرحبا', es: 'hola', fr: 'bonjour',
      ur: 'ہیلو', tr: 'merhaba', de: 'hallo', pt: 'olá', ja: 'こんにちは', ko: '안녕하세요'
    },
    examples: [
      'Hello, how are you today?',
      'She said hello to everyone in the room.',
      'Hello! Is anyone there?'
    ],
    synonyms: ['hi', 'hey', 'greetings'],
    antonyms: ['goodbye']
  },
  {
    id: 'w037',
    word: 'thank',
    partOfSpeech: 'verb',
    phonetic: '/θæŋk/',
    definitions: [
      'To express gratitude to someone.',
    ],
    translations: {
      bn: 'ধন্যবাদ', hi: 'धन्यवाद', ar: 'شكر', es: 'gracias', fr: 'merci',
      ur: 'شکریہ', tr: 'teşekkür', de: 'danke', pt: 'obrigado', ja: 'ありがとう', ko: '감사'
    },
    examples: [
      'Thank you for your kind help.',
      'She thanked him for the beautiful gift.',
      'I cannot thank you enough for what you did.'
    ],
    synonyms: ['appreciate', 'grateful'],
    antonyms: []
  },
  {
    id: 'w038',
    word: 'dream',
    partOfSpeech: 'noun, verb',
    phonetic: '/driːm/',
    definitions: [
      'A series of thoughts, images, and sensations occurring during sleep.',
      'To indulge in daydreams or fantasies about something greatly desired.',
    ],
    translations: {
      bn: 'স্বপ্ন', hi: 'सपना', ar: 'حلم', es: 'sueño', fr: 'rêve',
      ur: 'خواب', tr: 'rüya', de: 'Traum', pt: 'sonho', ja: '夢', ko: '꿈'
    },
    examples: [
      'I had a strange dream last night.',
      'Never stop chasing your dreams.',
      'She dreams of becoming a doctor one day.'
    ],
    synonyms: ['vision', 'fantasy', 'aspiration'],
    antonyms: ['reality']
  },
  {
    id: 'w039',
    word: 'music',
    partOfSpeech: 'noun',
    phonetic: '/ˈmjuːzɪk/',
    definitions: [
      'Vocal or instrumental sounds combined in such a way as to produce beauty of form and harmony.',
    ],
    translations: {
      bn: 'সংগীত', hi: 'संगीत', ar: 'موسيقى', es: 'música', fr: 'musique',
      ur: 'موسیقی', tr: 'müzik', de: 'Musik', pt: 'música', ja: '音楽', ko: '음악'
    },
    examples: [
      'Music is the universal language of mankind.',
      'She plays beautiful music on the piano.',
      'Listening to music helps me relax.'
    ],
    synonyms: ['melody', 'tune', 'harmony'],
    antonyms: []
  },
  {
    id: 'w040',
    word: 'rain',
    partOfSpeech: 'noun, verb',
    phonetic: '/reɪn/',
    definitions: [
      'Moisture condensed from the atmosphere that falls visibly in separate drops.',
      'To fall as rain from the clouds.',
    ],
    translations: {
      bn: 'বৃষ্টি', hi: 'बारिश', ar: 'مطر', es: 'lluvia', fr: 'pluie',
      ur: 'بارش', tr: 'yağmur', de: 'Regen', pt: 'chuva', ja: '雨', ko: '비'
    },
    examples: [
      'The rain is falling gently outside.',
      'We need rain for the crops to grow.',
      'She loves walking in the rain.'
    ],
    synonyms: ['downpour', 'drizzle', 'shower'],
    antonyms: ['drought']
  },
  {
    id: 'w041',
    word: 'sky',
    partOfSpeech: 'noun',
    phonetic: '/skaɪ/',
    definitions: [
      'The region of the atmosphere and outer space seen from the earth.',
    ],
    translations: {
      bn: 'আকাশ', hi: 'आसमान', ar: 'سماء', es: 'cielo', fr: 'ciel',
      ur: 'آسمان', tr: 'gökyüzü', de: 'Himmel', pt: 'céu', ja: '空', ko: '하늘'
    },
    examples: [
      'The sky is blue and clear today.',
      'Stars light up the night sky.',
      'Look at the beautiful colors in the sunset sky.'
    ],
    synonyms: ['heavens', 'firmament'],
    antonyms: []
  },
  {
    id: 'w042',
    word: 'ocean',
    partOfSpeech: 'noun',
    phonetic: '/ˈoʊʃən/',
    definitions: [
      'A very large expanse of sea, in particular each of the main areas of the Atlantic, Pacific, and Indian Oceans.',
    ],
    translations: {
      bn: 'মহাসাগর', hi: 'महासागर', ar: 'محيط', es: 'océano', fr: 'océan',
      ur: 'سمندر', tr: 'okyanus', de: 'Ozean', pt: 'oceano', ja: '海', ko: '바다'
    },
    examples: [
      'The ocean is vast and deep.',
      'We walked along the ocean shore.',
      'The Pacific is the largest ocean on Earth.'
    ],
    synonyms: ['sea', 'body of water'],
    antonyms: []
  },
  {
    id: 'w043',
    word: 'mountain',
    partOfSpeech: 'noun',
    phonetic: '/ˈmaʊntɪn/',
    definitions: [
      'A large natural elevation of the earth\'s surface rising abruptly from the surrounding level.',
    ],
    translations: {
      bn: 'পর্বত', hi: 'पहाड़', ar: 'جبل', es: 'montaña', fr: 'montagne',
      ur: 'پہاڑ', tr: 'dağ', de: 'Berg', pt: 'montanha', ja: '山', ko: '산'
    },
    examples: [
      'We climbed the mountain last weekend.',
      'The mountain was covered with snow.',
      'Mountain climbing is a challenging adventure.'
    ],
    synonyms: ['peak', 'hill', 'summit'],
    antonyms: ['valley']
  },
  {
    id: 'w044',
    word: 'garden',
    partOfSpeech: 'noun',
    phonetic: '/ˈɡɑːrdən/',
    definitions: [
      'A piece of ground, often near a house, used for growing flowers, fruit, or vegetables.',
    ],
    translations: {
      bn: 'বাগান', hi: 'बगीचा', ar: 'حديقة', es: 'jardín', fr: 'jardin',
      ur: 'باغ', tr: 'bahçe', de: 'Garten', pt: 'jardim', ja: '庭', ko: '정원'
    },
    examples: [
      'She spends every morning in the garden.',
      'The garden is full of colorful flowers.',
      'He planted vegetables in his garden.'
    ],
    synonyms: ['yard', 'lawn', 'park'],
    antonyms: []
  },
  {
    id: 'w045',
    word: 'light',
    partOfSpeech: 'noun, adjective',
    phonetic: '/laɪt/',
    definitions: [
      'The natural agent that stimulates sight and makes things visible.',
      'Having a considerable or sufficient amount of natural light.',
    ],
    translations: {
      bn: 'আলো', hi: 'रोशनी', ar: 'نور', es: 'luz', fr: 'lumière',
      ur: 'روشنی', tr: 'ışık', de: 'Licht', pt: 'luz', ja: '光', ko: '빛'
    },
    examples: [
      'The light shines brightly through the window.',
      'She turned on the light in the dark room.',
      'The morning light is soft and warm.'
    ],
    synonyms: ['brightness', 'glow', 'radiance'],
    antonyms: ['darkness', 'shadow']
  },
  {
    id: 'w037',
    word: 'random',
    partOfSpeech: 'adjective',
    phonetic: '/ˈrændəm/',
    definitions: [
      'Made, done, happening, or chosen without method or conscious decision.',
      'Governed by or characterizing equal probability for each item or outcome.'
    ],
    translations: {
      bn: 'এলোমেলো', hi: 'यादृच्छिक', ar: 'عشوائي', es: 'aleatorio', fr: 'aléatoire',
      ur: 'بے ترتیب', tr: 'rastgele', de: 'zufällig', pt: 'aleatório', ja: 'ランダム', ko: '무작위의'
    },
    examples: [
      'The computer generated a list of random numbers.',
      'We met by a random chance at the train station.',
      'The survey was sent to a random selection of students.'
    ],
    synonyms: ['accidental', 'haphazard', 'chance', 'arbitrary', 'unplanned'],
    antonyms: ['systematic', 'planned', 'deliberate', 'methodical']
  },
  {
    id: 'w038',
    word: 'range',
    partOfSpeech: 'noun, verb',
    phonetic: '/reɪndʒ/',
    definitions: [
      'The area of variation between upper and lower limits on a particular scale.',
      'A set of different things of the same general type.',
      'To vary or extend between specified limits.'
    ],
    translations: {
      bn: 'পরিসর', hi: 'दायरा', ar: 'مدى', es: 'rango', fr: 'gamme',
      ur: 'حد', tr: 'menzil', de: 'Bereich', pt: 'gama', ja: '範囲', ko: '범위'
    },
    examples: [
      'The price range is between ten and fifty dollars.',
      'Our store offers a wide range of products.',
      'Temperatures range from cold in winter to hot in summer.'
    ],
    synonyms: ['scope', 'span', 'limits', 'extent', 'variety', 'spectrum'],
    antonyms: ['extreme', 'limitation', 'point']
  },
  {
    id: 'w039',
    word: 'do',
    partOfSpeech: 'verb',
    phonetic: '/duː/',
    definitions: [
      'Perform, execute, or carry out an action, activity, or task.',
      'Achieve or complete something.'
    ],
    translations: {
      bn: 'করা', hi: 'करना', ar: 'يفعل', es: 'hacer', fr: 'faire',
      ur: 'کرنا', tr: 'yapmak', de: 'tun', pt: 'fazer', ja: 'する', ko: '하다'
    },
    examples: [
      'I will do my best to help you.',
      'What are you doing this weekend?',
      'She did a wonderful job on the presentation.'
    ],
    synonyms: ['perform', 'execute', 'carry out', 'accomplish', 'complete'],
    antonyms: ['neglect', 'undo', 'idle']
  },
  {
    id: 'w040',
    word: 'go',
    partOfSpeech: 'verb',
    phonetic: '/ɡoʊ/',
    definitions: [
      'Move from one place to another; travel.',
      'Leave or depart.'
    ],
    translations: {
      bn: 'যাওয়া', hi: 'जाना', ar: 'يذهب', es: 'ir', fr: 'aller',
      ur: 'جانا', tr: 'gitmek', de: 'gehen', pt: 'ir', ja: '行く', ko: '가다'
    },
    examples: [
      'Let us go to the park.',
      'Where did they go yesterday?',
      'She goes to school by bus.'
    ],
    synonyms: ['travel', 'move', 'proceed', 'depart', 'leave'],
    antonyms: ['stay', 'remain', 'arrive', 'stop']
  },
  {
    id: 'w041',
    word: 'make',
    partOfSpeech: 'verb, noun',
    phonetic: '/meɪk/',
    definitions: [
      'Create, construct, or produce something by combining parts or putting together materials.',
      'Cause something to exist or happen.'
    ],
    translations: {
      bn: 'তৈরি করা', hi: 'बनाना', ar: 'يصنع', es: 'hacer', fr: 'faire',
      ur: 'بنانا', tr: 'yapmak', de: 'machen', pt: 'fazer', ja: '作る', ko: '만들다'
    },
    examples: [
      'She loves to make delicious cakes.',
      'Can you make a paper airplane?',
      'Their music makes people happy.'
    ],
    synonyms: ['create', 'build', 'construct', 'produce', 'generate'],
    antonyms: ['destroy', 'break', 'ruin']
  },
  {
    id: 'w042',
    word: 'see',
    partOfSpeech: 'verb',
    phonetic: '/siː/',
    definitions: [
      'Perceive with the eyes; look at.',
      'Understand; perceive mindfully.'
    ],
    translations: {
      bn: 'দেখা', hi: 'देखना', ar: 'يرى', es: 'ver', fr: 'voir',
      ur: 'دیکھنا', tr: 'görmek', de: 'sehen', pt: 'ver', ja: '見る', ko: '보다'
    },
    examples: [
      'I can see a beautiful rainbow in the sky.',
      'Did you see the movie last night?',
      'Oh, I see what you mean!'
    ],
    synonyms: ['behold', 'view', 'observe', 'witness', 'perceive'],
    antonyms: ['ignore', 'miss', 'overlook']
  },
  {
    id: 'w043',
    word: 'know',
    partOfSpeech: 'verb',
    phonetic: '/noʊ/',
    definitions: [
      'Be aware of through observation, inquiry, or information.',
      'Be familiar or acquainted with a person or place.'
    ],
    translations: {
      bn: 'জানা', hi: 'जानنا', ar: 'يعرف', es: 'saber', fr: 'savoir',
      ur: 'جاننا', tr: 'bilmek', de: 'wissen', pt: 'saber', ja: '知る', ko: '알다'
    },
    examples: [
      'I know the answer to this question.',
      'Do you know a good place to eat?',
      'We have known each other for a long time.'
    ],
    synonyms: ['understand', 'comprehend', 'recognize', 'realize'],
    antonyms: ['ignore', 'misunderstand', 'be ignorant']
  },
  {
    id: 'w044',
    word: 'think',
    partOfSpeech: 'verb',
    phonetic: '/θɪŋk/',
    definitions: [
      'Have a particular opinion, belief, or idea about something.',
      'Direct one\'s mind toward someone or something; use one\'s mind.'
    ],
    translations: {
      bn: 'চিন্তা করা', hi: 'সোचना', ar: 'يفكر', es: 'pensar', fr: 'penser',
      ur: 'سوچنا', tr: 'دüşünmek', de: 'denken', pt: 'pensar', ja: '思う', ko: '생각하다'
    },
    examples: [
      'I think it is going to rain today.',
      'Please think carefully before making a choice.',
      'What do you think about our new plan?'
    ],
    synonyms: ['ponder', 'consider', 'reflect', 'contemplate', 'believe'],
    antonyms: ['forget', 'disregard']
  },
  {
    id: 'w045',
    word: 'take',
    partOfSpeech: 'verb',
    phonetic: '/teɪk/',
    definitions: [
      'Lay hold of something with one\'s hands; reach for and hold.',
      'Carry or conduct one thing or person from one place to another.'
    ],
    translations: {
      bn: 'নেওয়া', hi: 'लेना', ar: 'يأخذ', es: 'tomar', fr: 'prendre',
      ur: 'لینا', tr: 'almak', de: 'nehmen', pt: 'tomar', ja: '取る', ko: '취하다'
    },
    examples: [
      'Please take a piece of cake.',
      'It takes about an hour to get there.',
      'She took her bag and went out.'
    ],
    synonyms: ['grab', 'grasp', 'seize', 'carry', 'fetch'],
    antonyms: ['give', 'put', 'drop', 'refuse']
  },
  {
    id: 'w046',
    word: 'come',
    partOfSpeech: 'verb',
    phonetic: '/kʌm/',
    definitions: [
      'Move or travel toward or into a place thought of as near or familiar.',
      'Occur; happen.'
    ],
    translations: {
      bn: 'আসা', hi: 'आना', ar: 'يأتي', es: 'venir', fr: 'venir',
      ur: 'آنا', tr: 'gelmek', de: 'kommen', pt: 'vir', ja: '来る', ko: '오다'
    },
    examples: [
      'Please come inside the house.',
      'Winter comes after autumn.',
      'They came to visit us last week.'
    ],
    synonyms: ['arrive', 'approach', 'reach', 'appear'],
    antonyms: ['go', 'leave', 'depart']
  },
  {
    id: 'w047',
    word: 'say',
    partOfSpeech: 'verb',
    phonetic: '/seɪ/',
    definitions: [
      'Utter words so as to convey information, an opinion, a feeling or intention.',
      'Express in words; state.'
    ],
    translations: {
      bn: 'বলা', hi: 'कहना', ar: 'يقول', es: 'decir', fr: 'dire',
      ur: 'کہنا', tr: 'söylemek', de: 'sagen', pt: 'dizer', ja: '言う', ko: '말하다'
    },
    examples: [
      'What did she say to you?',
      'I want to say thank you for your help.',
      'They say it is a wonderful place.'
    ],
    synonyms: ['state', 'express', 'speak', 'utter', 'declare'],
    antonyms: ['be silent', 'mumble']
  },
  {
    id: 'w048',
    word: 'people',
    partOfSpeech: 'noun',
    phonetic: '/ˈpiːpl/',
    definitions: [
      'Human beings in general or considered collectively.',
      'The citizens of a country or members of a community.'
    ],
    translations: {
      bn: 'মানুষ', hi: 'लोग', ar: 'ناس', es: 'gente', fr: 'gens',
      ur: 'لوگ', tr: 'insanlar', de: 'Menschen', pt: 'pessoas', ja: '人々', ko: '사람들'
    },
    examples: [
      'There were many people at the concert.',
      'People have different viewpoints on this.',
      'He loves helping older people in his town.'
    ],
    synonyms: ['humanity', 'persons', 'citizens', 'public', 'crowd'],
    antonyms: []
  },
  {
    id: 'w049', word: 'work', partOfSpeech: 'noun, verb', phonetic: '/wɜːrk/',
    definitions: ['Activity involving mental or physical effort done in order to achieve a purpose.', 'Be engaged in physical or mental activity.'],
    translations: { bn: 'কাজ', hi: 'काम', ar: 'عمل', es: 'trabajo', fr: 'travail', ur: 'کام', tr: 'iş', de: 'Arbeit', pt: 'trabalho', ja: '仕事', ko: '일' },
    examples: ['Hard work always pays off.', 'She works at a hospital.', 'This machine works perfectly.'],
    synonyms: ['labor', 'toil', 'effort', 'task'], antonyms: ['rest', 'leisure', 'play']
  },
  {
    id: 'w050', word: 'give', partOfSpeech: 'verb', phonetic: '/ɡɪv/',
    definitions: ['Freely transfer the possession of something to someone.', 'Cause or allow someone to have something.'],
    translations: { bn: 'দেওয়া', hi: 'देना', ar: 'يعطي', es: 'dar', fr: 'donner', ur: 'دینا', tr: 'vermek', de: 'geben', pt: 'dar', ja: '与える', ko: '주다' },
    examples: ['Please give me that book.', 'She gave him a warm smile.', 'Give it your best effort.'],
    synonyms: ['provide', 'offer', 'grant', 'donate'], antonyms: ['take', 'receive', 'withhold']
  },
  {
    id: 'w051', word: 'tell', partOfSpeech: 'verb', phonetic: '/tɛl/',
    definitions: ['Communicate information, facts, or news to someone.', 'Express something in words.'],
    translations: { bn: 'বলা', hi: 'बताना', ar: 'يخبر', es: 'decir', fr: 'dire', ur: 'بتانا', tr: 'söylemek', de: 'erzählen', pt: 'contar', ja: '伝える', ko: '말하다' },
    examples: ['Tell me about your day.', 'She told him the truth.', 'Can you tell the difference?'],
    synonyms: ['inform', 'notify', 'reveal', 'disclose'], antonyms: ['conceal', 'hide']
  },
  {
    id: 'w052', word: 'help', partOfSpeech: 'verb, noun', phonetic: '/hɛlp/',
    definitions: ['Make it easier for someone to do something by offering assistance.', 'The action of helping someone.'],
    translations: { bn: 'সাহায্য', hi: 'मदद', ar: 'مساعدة', es: 'ayuda', fr: 'aide', ur: 'مدد', tr: 'yardım', de: 'Hilfe', pt: 'ajuda', ja: '助け', ko: '도움' },
    examples: ['Can you help me with this?', 'Your help means a lot to me.', 'She helped the old man cross the street.'],
    synonyms: ['assist', 'aid', 'support'], antonyms: ['hinder', 'obstruct']
  },
  {
    id: 'w053', word: 'want', partOfSpeech: 'verb', phonetic: '/wɒnt/',
    definitions: ['Have a desire to possess or do something.', 'Wish for something.'],
    translations: { bn: 'চাওয়া', hi: 'चाहना', ar: 'يريد', es: 'querer', fr: 'vouloir', ur: 'چاہنا', tr: 'istemek', de: 'wollen', pt: 'querer', ja: '欲しい', ko: '원하다' },
    examples: ['I want to learn a new language.', 'What do you want for dinner?', 'She wants to be a doctor.'],
    synonyms: ['desire', 'wish', 'crave', 'need'], antonyms: ['have', 'possess']
  },
  {
    id: 'w054', word: 'eat', partOfSpeech: 'verb', phonetic: '/iːt/',
    definitions: ['Put food into the mouth, chew, and swallow it.'],
    translations: { bn: 'খাওয়া', hi: 'खाना', ar: 'يأكل', es: 'comer', fr: 'manger', ur: 'کھانا', tr: 'yemek', de: 'essen', pt: 'comer', ja: '食べる', ko: '먹다' },
    examples: ['We eat dinner at seven.', 'She loves to eat fresh fruit.', 'Did you eat breakfast today?'],
    synonyms: ['consume', 'devour', 'dine'], antonyms: ['fast', 'starve']
  },
  {
    id: 'w055', word: 'run', partOfSpeech: 'verb, noun', phonetic: '/rʌn/',
    definitions: ['Move at a speed faster than a walk.', 'An act of running.'],
    translations: { bn: 'দৌড়ানো', hi: 'दौड़ना', ar: 'يركض', es: 'correr', fr: 'courir', ur: 'دوڑنا', tr: 'koşmak', de: 'laufen', pt: 'correr', ja: '走る', ko: '달리다' },
    examples: ['He runs every morning.', 'She ran to catch the bus.', 'The children love to run in the park.'],
    synonyms: ['sprint', 'dash', 'jog', 'race'], antonyms: ['walk', 'stop', 'stand']
  },
  {
    id: 'w056', word: 'walk', partOfSpeech: 'verb, noun', phonetic: '/wɔːk/',
    definitions: ['Move at a regular pace by lifting and setting down each foot in turn.'],
    translations: { bn: 'হাঁটা', hi: 'चलना', ar: 'يمشي', es: 'caminar', fr: 'marcher', ur: 'چلنا', tr: 'yürümek', de: 'gehen', pt: 'andar', ja: '歩く', ko: '걷다' },
    examples: ['Let us walk to the store.', 'She walks to school every day.', 'A walk in the park is refreshing.'],
    synonyms: ['stroll', 'stride', 'hike'], antonyms: ['run', 'stand', 'sit']
  },
  {
    id: 'w057', word: 'write', partOfSpeech: 'verb', phonetic: '/raɪt/',
    definitions: ['Mark letters, words, or symbols on a surface with a pen or pencil.', 'Compose a text or work of art.'],
    translations: { bn: 'লেখা', hi: 'लिखना', ar: 'يكتب', es: 'escribir', fr: 'écrire', ur: 'لکھنا', tr: 'yazmak', de: 'schreiben', pt: 'escrever', ja: '書く', ko: '쓰다' },
    examples: ['She writes beautiful poetry.', 'Please write your name here.', 'He wrote a letter to his friend.'],
    synonyms: ['compose', 'pen', 'author', 'draft'], antonyms: ['erase', 'read']
  },
  {
    id: 'w058', word: 'read', partOfSpeech: 'verb', phonetic: '/riːd/',
    definitions: ['Look at and comprehend the meaning of written or printed matter.'],
    translations: { bn: 'পড়া', hi: 'पढ़ना', ar: 'يقرأ', es: 'leer', fr: 'lire', ur: 'پڑھنا', tr: 'okumak', de: 'lesen', pt: 'ler', ja: '読む', ko: '읽다' },
    examples: ['I love to read books before bed.', 'She reads the newspaper every morning.', 'Can you read this sign?'],
    synonyms: ['peruse', 'study', 'scan'], antonyms: ['write', 'ignore']
  },
  {
    id: 'w059', word: 'speak', partOfSpeech: 'verb', phonetic: '/spiːk/',
    definitions: ['Say something in order to convey information or express a feeling.', 'Talk in a specified language.'],
    translations: { bn: 'কথা বলা', hi: 'बोलना', ar: 'يتكلم', es: 'hablar', fr: 'parler', ur: 'بولنا', tr: 'konuşmak', de: 'sprechen', pt: 'falar', ja: '話す', ko: '말하다' },
    examples: ['She speaks three languages fluently.', 'May I speak with the manager?', 'He spoke about his experiences.'],
    synonyms: ['talk', 'converse', 'communicate'], antonyms: ['listen', 'be silent']
  },
  {
    id: 'w060', word: 'listen', partOfSpeech: 'verb', phonetic: '/ˈlɪsən/',
    definitions: ['Give one\'s attention to a sound.', 'Make an effort to hear something.'],
    translations: { bn: 'শোনা', hi: 'सुनना', ar: 'يستمع', es: 'escuchar', fr: 'écouter', ur: 'سننا', tr: 'dinlemek', de: 'zuhören', pt: 'ouvir', ja: '聞く', ko: '듣다' },
    examples: ['Listen carefully to the instructions.', 'She listens to music while studying.', 'They listened to the story.'],
    synonyms: ['hear', 'attend', 'heed'], antonyms: ['ignore', 'speak']
  },
  {
    id: 'w061', word: 'play', partOfSpeech: 'verb, noun', phonetic: '/pleɪ/',
    definitions: ['Engage in activity for enjoyment rather than a serious purpose.', 'A dramatic work for the stage.'],
    translations: { bn: 'খেলা', hi: 'खेलना', ar: 'يلعب', es: 'jugar', fr: 'jouer', ur: 'کھیلنا', tr: 'oynamak', de: 'spielen', pt: 'jogar', ja: '遊ぶ', ko: '놀다' },
    examples: ['The children play in the garden.', 'She plays the piano beautifully.', 'We went to see a play at the theater.'],
    synonyms: ['enjoy', 'amuse', 'perform', 'game'], antonyms: ['work', 'study']
  },
  {
    id: 'w062', word: 'learn', partOfSpeech: 'verb', phonetic: '/lɜːrn/',
    definitions: ['Gain or acquire knowledge of or skill in something by study or experience.'],
    translations: { bn: 'শেখা', hi: 'सीखना', ar: 'يتعلم', es: 'aprender', fr: 'apprendre', ur: 'سیکھنا', tr: 'öğrenmek', de: 'lernen', pt: 'aprender', ja: '学ぶ', ko: '배우다' },
    examples: ['We learn something new every day.', 'She learned to swim at age five.', 'He wants to learn French.'],
    synonyms: ['study', 'master', 'acquire', 'absorb'], antonyms: ['forget', 'teach']
  },
  {
    id: 'w063', word: 'teach', partOfSpeech: 'verb', phonetic: '/tiːtʃ/',
    definitions: ['Show or explain to someone how to do something.', 'Impart knowledge to someone.'],
    translations: { bn: 'শেখানো', hi: 'सिखाना', ar: 'يعلم', es: 'enseñar', fr: 'enseigner', ur: 'سکھانا', tr: 'öğretmek', de: 'lehren', pt: 'ensinar', ja: '教える', ko: '가르치다' },
    examples: ['She teaches mathematics at a high school.', 'He taught me how to cook.', 'Experience teaches us patience.'],
    synonyms: ['instruct', 'educate', 'train', 'tutor'], antonyms: ['learn', 'study']
  },
  {
    id: 'w064', word: 'sleep', partOfSpeech: 'verb, noun', phonetic: '/sliːp/',
    definitions: ['A condition of body and mind in which the nervous system is relatively inactive.'],
    translations: { bn: 'ঘুম', hi: 'नींद', ar: 'ينام', es: 'dormir', fr: 'dormir', ur: 'سونا', tr: 'uyumak', de: 'schlafen', pt: 'dormir', ja: '眠る', ko: '자다' },
    examples: ['I need eight hours of sleep.', 'The baby is sleeping peacefully.', 'She slept through the alarm.'],
    synonyms: ['rest', 'slumber', 'nap', 'doze'], antonyms: ['wake', 'arise']
  },
  {
    id: 'w065', word: 'open', partOfSpeech: 'verb, adjective', phonetic: '/ˈoʊpən/',
    definitions: ['Move a door or window so as to allow access.', 'Not closed or blocked up.'],
    translations: { bn: 'খোলা', hi: 'खोलना', ar: 'يفتح', es: 'abrir', fr: 'ouvrir', ur: 'کھولنا', tr: 'açmak', de: 'öffnen', pt: 'abrir', ja: '開ける', ko: '열다' },
    examples: ['Please open the window.', 'The store is open until nine.', 'She opened the gift excitedly.'],
    synonyms: ['unlock', 'unfasten', 'uncover'], antonyms: ['close', 'shut', 'seal']
  },
  {
    id: 'w066', word: 'close', partOfSpeech: 'verb, adjective', phonetic: '/kloʊz/',
    definitions: ['Move so as to cover an opening.', 'Near in space or time.'],
    translations: { bn: 'বন্ধ', hi: 'बंद करना', ar: 'يغلق', es: 'cerrar', fr: 'fermer', ur: 'بند کرنا', tr: 'kapatmak', de: 'schließen', pt: 'fechar', ja: '閉じる', ko: '닫다' },
    examples: ['Please close the door.', 'The airport is close to the city.', 'They are close friends.'],
    synonyms: ['shut', 'seal', 'near', 'nearby'], antonyms: ['open', 'far', 'distant']
  },
  {
    id: 'w067', word: 'city', partOfSpeech: 'noun', phonetic: '/ˈsɪti/',
    definitions: ['A large town or populated area with a name and defined boundaries.'],
    translations: { bn: 'শহর', hi: 'शहर', ar: 'مدينة', es: 'ciudad', fr: 'ville', ur: 'شہر', tr: 'şehir', de: 'Stadt', pt: 'cidade', ja: '都市', ko: '도시' },
    examples: ['She lives in a big city.', 'The city is famous for its architecture.', 'They moved to the city for work.'],
    synonyms: ['town', 'metropolis', 'municipality'], antonyms: ['village', 'countryside']
  },
  {
    id: 'w068', word: 'country', partOfSpeech: 'noun', phonetic: '/ˈkʌntri/',
    definitions: ['A nation with its own government, occupying a particular territory.', 'Districts outside large towns or cities.'],
    translations: { bn: 'দেশ', hi: 'देश', ar: 'بلد', es: 'país', fr: 'pays', ur: 'ملک', tr: 'ülke', de: 'Land', pt: 'país', ja: '国', ko: '나라' },
    examples: ['Bangladesh is a beautiful country.', 'She loves the country life.', 'They traveled to many countries.'],
    synonyms: ['nation', 'state', 'land', 'homeland'], antonyms: ['city']
  },
  {
    id: 'w069', word: 'man', partOfSpeech: 'noun', phonetic: '/mæn/',
    definitions: ['An adult male human being.'],
    translations: { bn: 'পুরুষ', hi: 'आदमी', ar: 'رجل', es: 'hombre', fr: 'homme', ur: 'آدمی', tr: 'adam', de: 'Mann', pt: 'homem', ja: '男', ko: '남자' },
    examples: ['The man is reading a book.', 'He is a kind man.', 'A man and a woman were walking.'],
    synonyms: ['male', 'gentleman', 'fellow'], antonyms: ['woman']
  },
  {
    id: 'w070', word: 'woman', partOfSpeech: 'noun', phonetic: '/ˈwʊmən/',
    definitions: ['An adult female human being.'],
    translations: { bn: 'মহিলা', hi: 'महिला', ar: 'امرأة', es: 'mujer', fr: 'femme', ur: 'عورت', tr: 'kadın', de: 'Frau', pt: 'mulher', ja: '女', ko: '여자' },
    examples: ['The woman smiled warmly.', 'She is a strong woman.', 'A woman of great wisdom.'],
    synonyms: ['female', 'lady'], antonyms: ['man']
  },
  {
    id: 'w071', word: 'day', partOfSpeech: 'noun', phonetic: '/deɪ/',
    definitions: ['A period of twenty-four hours.', 'The time between sunrise and sunset.'],
    translations: { bn: 'দিন', hi: 'दिन', ar: 'يوم', es: 'día', fr: 'jour', ur: 'دن', tr: 'gün', de: 'Tag', pt: 'dia', ja: '日', ko: '날' },
    examples: ['Today is a beautiful day.', 'She works five days a week.', 'One day I will travel the world.'],
    synonyms: ['date', 'daytime'], antonyms: ['night']
  },
  {
    id: 'w072', word: 'night', partOfSpeech: 'noun', phonetic: '/naɪt/',
    definitions: ['The period of darkness between sunset and sunrise.'],
    translations: { bn: 'রাত', hi: 'रात', ar: 'ليل', es: 'noche', fr: 'nuit', ur: 'رات', tr: 'gece', de: 'Nacht', pt: 'noite', ja: '夜', ko: '밤' },
    examples: ['The stars shine at night.', 'Good night, sleep well.', 'They stayed up all night talking.'],
    synonyms: ['evening', 'darkness', 'nighttime'], antonyms: ['day', 'morning']
  },
  {
    id: 'w073', word: 'color', partOfSpeech: 'noun', phonetic: '/ˈkʌlər/',
    definitions: ['The property of visual perception corresponding to categories such as red, blue, green.'],
    translations: { bn: 'রং', hi: 'रंग', ar: 'لون', es: 'color', fr: 'couleur', ur: 'رنگ', tr: 'renk', de: 'Farbe', pt: 'cor', ja: '色', ko: '색' },
    examples: ['What is your favorite color?', 'The painting has vibrant colors.', 'Leaves change color in autumn.'],
    synonyms: ['hue', 'shade', 'tint', 'tone'], antonyms: []
  },
  {
    id: 'w074', word: 'money', partOfSpeech: 'noun', phonetic: '/ˈmʌni/',
    definitions: ['A current medium of exchange in the form of coins and banknotes.'],
    translations: { bn: 'টাকা', hi: 'पैसा', ar: 'مال', es: 'dinero', fr: 'argent', ur: 'پیسہ', tr: 'para', de: 'Geld', pt: 'dinheiro', ja: 'お金', ko: '돈' },
    examples: ['Money cannot buy happiness.', 'She saved money for the trip.', 'He earns good money at his job.'],
    synonyms: ['cash', 'currency', 'funds', 'wealth'], antonyms: ['debt']
  },
  {
    id: 'w075', word: 'year', partOfSpeech: 'noun', phonetic: '/jɪr/',
    definitions: ['The time taken by the earth to make one revolution around the sun.', 'A period of 365 days.'],
    translations: { bn: 'বছর', hi: 'साल', ar: 'سنة', es: 'año', fr: 'an', ur: 'سال', tr: 'yıl', de: 'Jahr', pt: 'ano', ja: '年', ko: '년' },
    examples: ['This year has been amazing.', 'She is twenty years old.', 'We visit every year.'],
    synonyms: ['annum', 'period'], antonyms: []
  },
  {
    id: 'w076', word: 'hand', partOfSpeech: 'noun', phonetic: '/hænd/',
    definitions: ['The end part of the arm beyond the wrist, including the palm and fingers.'],
    translations: { bn: 'হাত', hi: 'हाथ', ar: 'يد', es: 'mano', fr: 'main', ur: 'ہاتھ', tr: 'el', de: 'Hand', pt: 'mão', ja: '手', ko: '손' },
    examples: ['She held his hand gently.', 'Raise your hand if you know the answer.', 'He writes with his left hand.'],
    synonyms: ['palm', 'fist'], antonyms: ['foot']
  },
  {
    id: 'w077', word: 'name', partOfSpeech: 'noun, verb', phonetic: '/neɪm/',
    definitions: ['A word or set of words by which a person, animal, place, or thing is known.'],
    translations: { bn: 'নাম', hi: 'नाम', ar: 'اسم', es: 'nombre', fr: 'nom', ur: 'نام', tr: 'isim', de: 'Name', pt: 'nome', ja: '名前', ko: '이름' },
    examples: ['What is your name?', 'They named the baby after her grandmother.', 'He made a name for himself.'],
    synonyms: ['title', 'label', 'designation'], antonyms: []
  },
  {
    id: 'w078', word: 'place', partOfSpeech: 'noun, verb', phonetic: '/pleɪs/',
    definitions: ['A particular position, point, or area in space.', 'Put something in a particular position.'],
    translations: { bn: 'জায়গা', hi: 'जगह', ar: 'مكان', es: 'lugar', fr: 'lieu', ur: 'جگہ', tr: 'yer', de: 'Ort', pt: 'lugar', ja: '場所', ko: '장소' },
    examples: ['This is a beautiful place.', 'Find a quiet place to study.', 'She placed the book on the table.'],
    synonyms: ['location', 'spot', 'area', 'site'], antonyms: []
  }
];

// ═══════════════════════════════════════════════════════════
// COMMON PHRASES - For Sentence Translation
// ═══════════════════════════════════════════════════════════

export const phrases: PhraseEntry[] = [
  {
    id: 'p001',
    phrase: 'How are you?',
    translations: {
      bn: 'আপনি কেমন আছেন?', hi: 'आप कैसे हैं?', ar: 'كيف حالك؟',
      es: '¿Cómo estás?', fr: 'Comment allez-vous?', ur: 'آپ کیسے ہیں؟',
      tr: 'Nasılsın?', de: 'Wie geht es Ihnen?', pt: 'Como você está?',
      ja: 'お元気ですか？', ko: '어떻게 지내세요?'
    }
  },
  {
    id: 'p002',
    phrase: 'I love you',
    translations: {
      bn: 'আমি তোমাকে ভালোবাসি', hi: 'मैं तुमसे प्यार करता हूँ', ar: 'أحبك',
      es: 'Te quiero', fr: "Je t'aime", ur: 'میں تم سے محبت کرتا ہوں',
      tr: 'Seni seviyorum', de: 'Ich liebe dich', pt: 'Eu te amo',
      ja: '愛してる', ko: '사랑해요'
    }
  },
  {
    id: 'p003',
    phrase: 'Good morning',
    translations: {
      bn: 'সুপ্রভাত', hi: 'सुप्रभात', ar: 'صباح الخير',
      es: 'Buenos días', fr: 'Bonjour', ur: 'صبح بخیر',
      tr: 'Günaydın', de: 'Guten Morgen', pt: 'Bom dia',
      ja: 'おはようございます', ko: '좋은 아침'
    }
  },
  {
    id: 'p004',
    phrase: 'Thank you',
    translations: {
      bn: 'ধন্যবাদ', hi: 'धन्यवाद', ar: 'شكرا',
      es: 'Gracias', fr: 'Merci', ur: 'شکریہ',
      tr: 'Teşekkürler', de: 'Danke', pt: 'Obrigado',
      ja: 'ありがとう', ko: '감사합니다'
    }
  },
  {
    id: 'p005',
    phrase: 'What is your name?',
    translations: {
      bn: 'আপনার নাম কী?', hi: 'आपका नाम क्या है?', ar: 'ما اسمك؟',
      es: '¿Cómo te llamas?', fr: 'Comment vous appelez-vous?', ur: 'آپ کا نام کیا ہے؟',
      tr: 'Adınız nedir?', de: 'Wie heißen Sie?', pt: 'Qual é o seu nome?',
      ja: 'お名前は何ですか？', ko: '이름이 뭐예요?'
    }
  },
  {
    id: 'p006',
    phrase: 'I don\'t understand',
    translations: {
      bn: 'আমি বুঝতে পারছি না', hi: 'मुझे समझ नहीं आया', ar: 'لا أفهم',
      es: 'No entiendo', fr: 'Je ne comprends pas', ur: 'مجھے سمجھ نہیں آیا',
      tr: 'Anlamıyorum', de: 'Ich verstehe nicht', pt: 'Não entendo',
      ja: 'わかりません', ko: '이해가 안 돼요'
    }
  },
  {
    id: 'p007',
    phrase: 'Please help me',
    translations: {
      bn: 'দয়া করে আমাকে সাহায্য করুন', hi: 'कृपया मेरी मदद करें', ar: 'ساعدني من فضلك',
      es: 'Por favor ayúdame', fr: "Aidez-moi s'il vous plaît", ur: 'براہ کرم میری مدد کریں',
      tr: 'Lütfen bana yardım edin', de: 'Bitte helfen Sie mir', pt: 'Por favor me ajude',
      ja: '助けてください', ko: '도와주세요'
    }
  },
  {
    id: 'p008',
    phrase: 'Where is the bathroom?',
    translations: {
      bn: 'বাথরুম কোথায়?', hi: 'बाथरूम कहाँ है?', ar: 'أين الحمام؟',
      es: '¿Dónde está el baño?', fr: 'Où sont les toilettes?', ur: 'باتھ روم کہاں ہے؟',
      tr: 'Tuvalet nerede?', de: 'Wo ist die Toilette?', pt: 'Onde fica o banheiro?',
      ja: 'トイレはどこですか？', ko: '화장실이 어디에요?'
    }
  },
  {
    id: 'p009',
    phrase: 'How much does this cost?',
    translations: {
      bn: 'এটার দাম কত?', hi: 'यह कितने का है?', ar: 'كم يكلف هذا؟',
      es: '¿Cuánto cuesta esto?', fr: 'Combien ça coûte?', ur: 'یہ کتنے کا ہے؟',
      tr: 'Bu ne kadar?', de: 'Wie viel kostet das?', pt: 'Quanto custa isto?',
      ja: 'これはいくらですか？', ko: '이거 얼마예요?'
    }
  },
  {
    id: 'p010',
    phrase: 'Nice to meet you',
    translations: {
      bn: 'আপনার সাথে দেখা করে ভালো লাগলো', hi: 'आपसे मिलकर अच्छा लगा', ar: 'سررت بلقائك',
      es: 'Encantado de conocerte', fr: 'Enchanté de vous rencontrer', ur: 'آپ سے مل کر اچھا لگا',
      tr: 'Tanıştığıma memnun oldum', de: 'Freut mich Sie kennenzulernen', pt: 'Prazer em conhecê-lo',
      ja: 'はじめまして', ko: '만나서 반갑습니다'
    }
  },
  {
    id: 'p011',
    phrase: 'See you later',
    translations: {
      bn: 'পরে দেখা হবে', hi: 'बाद में मिलते हैं', ar: 'أراك لاحقا',
      es: 'Hasta luego', fr: 'À plus tard', ur: 'بعد میں ملتے ہیں',
      tr: 'Sonra görüşürüz', de: 'Bis später', pt: 'Até logo',
      ja: 'また後で', ko: '나중에 봐요'
    }
  },
  {
    id: 'p012',
    phrase: 'Have a good day',
    translations: {
      bn: 'আপনার দিনটি ভালো কাটুক', hi: 'आपका दिन शुभ हो', ar: 'يوم سعيد',
      es: 'Que tengas un buen día', fr: 'Bonne journée', ur: 'آپ کا دن اچھا گزرے',
      tr: 'İyi günler', de: 'Schönen Tag noch', pt: 'Tenha um bom dia',
      ja: '良い一日を', ko: '좋은 하루 되세요'
    }
  },
  {
    id: 'p013',
    phrase: 'I am hungry',
    translations: {
      bn: 'আমি ক্ষুধার্ত', hi: 'मुझे भूख लगी है', ar: 'أنا جائع',
      es: 'Tengo hambre', fr: "J'ai faim", ur: 'مجھے بھوک لگی ہے',
      tr: 'Açım', de: 'Ich habe Hunger', pt: 'Estou com fome',
      ja: 'お腹が空きました', ko: '배가 고파요'
    }
  },
  {
    id: 'p014',
    phrase: 'Where are you from?',
    translations: {
      bn: 'আপনি কোথা থেকে এসেছেন?', hi: 'आप कहाँ से हैं?', ar: 'من أين أنت؟',
      es: '¿De dónde eres?', fr: "D'où venez-vous?", ur: 'آپ کہاں سے ہیں؟',
      tr: 'Nerelisiniz?', de: 'Woher kommen Sie?', pt: 'De onde você é?',
      ja: 'どこから来ましたか？', ko: '어디서 왔어요?'
    }
  },
  {
    id: 'p015',
    phrase: 'What time is it?',
    translations: {
      bn: 'এখন কয়টা বাজে?', hi: 'कितने बजे हैं?', ar: 'كم الساعة؟',
      es: '¿Qué hora es?', fr: 'Quelle heure est-il?', ur: 'کتنے بجے ہیں؟',
      tr: 'Saat kaç?', de: 'Wie spät ist es?', pt: 'Que horas são?',
      ja: '今何時ですか？', ko: '몇 시예요?'
    }
  },
  {
    id: 'p016',
    phrase: 'I am sorry',
    translations: {
      bn: 'আমি দুঃখিত', hi: 'मुझे खेद है', ar: 'أنا آسف',
      es: 'Lo siento', fr: 'Je suis désolé', ur: 'معاف کیجئے گا',
      tr: 'Özür dilerim', de: 'Es tut mir leid', pt: 'Sinto muito',
      ja: 'ごめんなさい', ko: '죄송합니다'
    }
  },
  {
    id: 'p017',
    phrase: 'Congratulations',
    translations: {
      bn: 'অভিনন্দন', hi: 'बधाई', ar: 'تهانينا',
      es: 'Felicidades', fr: 'Félicitations', ur: 'مبارک ہو',
      tr: 'Tebrikler', de: 'Herzlichen Glückwunsch', pt: 'Parabéns',
      ja: 'おめでとうございます', ko: '축하합니다'
    }
  },
  {
    id: 'p018',
    phrase: 'Happy birthday',
    translations: {
      bn: 'শুভ জন্মদিন', hi: 'जन्मदिन मुबारक', ar: 'عيد ميلاد سعيد',
      es: 'Feliz cumpleaños', fr: 'Joyeux anniversaire', ur: 'سالگرہ مبارک',
      tr: 'Mutlu yıllar', de: 'Alles Gute zum Geburtstag', pt: 'Feliz aniversário',
      ja: 'お誕生日おめでとう', ko: '생일 축하합니다'
    }
  },
  {
    id: 'p019',
    phrase: 'Goodbye',
    translations: {
      bn: 'বিদায়', hi: 'अलविदा', ar: 'وداعا',
      es: 'Adiós', fr: 'Au revoir', ur: 'خدا حافظ',
      tr: 'Hoşça kal', de: 'Auf Wiedersehen', pt: 'Adeus',
      ja: 'さようなら', ko: '안녕히 가세요'
    }
  },
  {
    id: 'p020',
    phrase: 'I need help',
    translations: {
      bn: 'আমার সাহায্য দরকার', hi: 'मुझे मदद चाहिए', ar: 'أحتاج مساعدة',
      es: 'Necesito ayuda', fr: "J'ai besoin d'aide", ur: 'مجھے مدد چاہیے',
      tr: 'Yardıma ihtiyacım var', de: 'Ich brauche Hilfe', pt: 'Preciso de ajuda',
      ja: '助けが必要です', ko: '도움이 필요해요'
    }
  },
  {
    id: 'p021',
    phrase: 'Welcome',
    translations: {
      bn: 'স্বাগতম', hi: 'स्वागत है', ar: 'أهلا وسهلا',
      es: 'Bienvenido', fr: 'Bienvenue', ur: 'خوش آمدید',
      tr: 'Hoş geldiniz', de: 'Willkommen', pt: 'Bem-vindo',
      ja: 'ようこそ', ko: '환영합니다'
    }
  },
  {
    id: 'p022',
    phrase: 'Good night',
    translations: {
      bn: 'শুভ রাত্রি', hi: 'शुभ रात्रि', ar: 'تصبح على خير',
      es: 'Buenas noches', fr: 'Bonne nuit', ur: 'شب بخیر',
      tr: 'İyi geceler', de: 'Gute Nacht', pt: 'Boa noite',
      ja: 'おやすみなさい', ko: '안녕히 주무세요'
    }
  },
  {
    id: 'p023',
    phrase: 'Yes',
    translations: {
      bn: 'হ্যাঁ', hi: 'हाँ', ar: 'نعم',
      es: 'Sí', fr: 'Oui', ur: 'ہاں',
      tr: 'Evet', de: 'Ja', pt: 'Sim',
      ja: 'はい', ko: '네'
    }
  },
  {
    id: 'p024',
    phrase: 'No',
    translations: {
      bn: 'না', hi: 'नहीं', ar: 'لا',
      es: 'No', fr: 'Non', ur: 'نہیں',
      tr: 'Hayır', de: 'Nein', pt: 'Não',
      ja: 'いいえ', ko: '아니요'
    }
  },
  {
    id: 'p025',
    phrase: 'Please',
    translations: {
      bn: 'দয়া করে', hi: 'कृपया', ar: 'من فضلك',
      es: 'Por favor', fr: "S'il vous plaît", ur: 'براہ کرم',
      tr: 'Lütfen', de: 'Bitte', pt: 'Por favor',
      ja: 'お願いします', ko: '제발'
    }
  },
  {
    id: 'p026',
    phrase: 'I am learning',
    translations: {
      bn: 'আমি শিখছি', hi: 'मैं सीख रहा हूँ', ar: 'أنا أتعلم',
      es: 'Estoy aprendiendo', fr: "J'apprends", ur: 'میں سیکھ رہا ہوں',
      tr: 'Öğreniyorum', de: 'Ich lerne', pt: 'Estou aprendendo',
      ja: '学んでいます', ko: '배우고 있어요'
    }
  },
  {
    id: 'p027',
    phrase: 'What is this?',
    translations: {
      bn: 'এটা কী?', hi: 'यह क्या है?', ar: 'ما هذا؟',
      es: '¿Qué es esto?', fr: 'Qu\'est-ce que c\'est?', ur: 'یہ کیا ہے؟',
      tr: 'Bu ne?', de: 'Was ist das?', pt: 'O que é isto?',
      ja: 'これは何ですか？', ko: '이게 뭐예요?'
    }
  },
  {
    id: 'p028',
    phrase: 'I am fine',
    translations: {
      bn: 'আমি ভালো আছি', hi: 'मैं ठीक हूँ', ar: 'أنا بخير',
      es: 'Estoy bien', fr: 'Je vais bien', ur: 'میں ٹھیک ہوں',
      tr: 'Ben iyiyim', de: 'Mir geht es gut', pt: 'Estou bem',
      ja: '元気です', ko: '저는 괜찮아요'
    }
  },
  {
    id: 'p029',
    phrase: 'Can you help me?',
    translations: {
      bn: 'আপনি কি আমাকে সাহায্য করতে পারেন?', hi: 'क्या आप मेरी मदद कर सकते हैं?', ar: 'هل يمكنك مساعدتي؟',
      es: '¿Puedes ayudarme?', fr: 'Pouvez-vous m\'aider?', ur: 'کیا آپ میری مدد کر سکتے ہیں؟',
      tr: 'Bana yardım edebilir misiniz?', de: 'Können Sie mir helfen?', pt: 'Você pode me ajudar?',
      ja: '手伝ってくれますか？', ko: '도와주실 수 있나요?'
    }
  },
  {
    id: 'p030',
    phrase: 'I like this',
    translations: {
      bn: 'আমার এটা ভালো লাগে', hi: 'मुझे यह पसंद है', ar: 'أنا أحب هذا',
      es: 'Me gusta esto', fr: 'J\'aime ça', ur: 'مجھے یہ پسند ہے',
      tr: 'Bunu beğendim', de: 'Das gefällt mir', pt: 'Eu gosto disso',
      ja: 'これが好きです', ko: '이게 좋아요'
    }
  },
];

// ═══════════════════════════════════════════════════════════
// REVERSE INDEX - For searching in non-English languages
// ═══════════════════════════════════════════════════════════

export function buildReverseIndex(): Map<string, { word: WordEntry; lang: string }> {
  const index = new Map<string, { word: WordEntry; lang: string }>();
  for (const word of words) {
    // Index the English word
    index.set(word.word.toLowerCase(), { word, lang: 'en' });
    // Index all translations
    for (const [lang, translation] of Object.entries(word.translations)) {
      index.set(translation.toLowerCase(), { word, lang });
    }
  }
  return index;
}

export function buildPhraseIndex(): Map<string, PhraseEntry> {
  const index = new Map<string, PhraseEntry>();
  for (const phrase of phrases) {
    index.set(phrase.phrase.toLowerCase(), phrase);
    for (const translation of Object.values(phrase.translations)) {
      index.set(translation.toLowerCase(), phrase);
    }
  }
  return index;
}
