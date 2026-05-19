// ═══════════════════════════════════════════════════════════
// All In One Dictionary - Core Engine
// ═══════════════════════════════════════════════════════════

import {
  words,
  phrases,
  languages,
  buildReverseIndex,
  buildPhraseIndex,
  type WordEntry,
  type PhraseEntry,
  type Language,
} from '../data/dictionary';

// ═══════════════════════════════════════════════════════════
// CACHED INDEXES - Built once, reused for fast lookup
// ═══════════════════════════════════════════════════════════

let reverseIndex: Map<string, { word: WordEntry; lang: string }> | null = null;
let phraseIndex: Map<string, PhraseEntry> | null = null;
let wordList: string[] | null = null;
let allSearchableTerms: string[] | null = null;

function getReverseIndex() {
  if (!reverseIndex) reverseIndex = buildReverseIndex();
  return reverseIndex;
}

function getPhraseIndex() {
  if (!phraseIndex) phraseIndex = buildPhraseIndex();
  return phraseIndex;
}

export function getWordList(): string[] {
  if (!wordList) {
    wordList = words.map(w => w.word.toLowerCase());
  }
  return wordList;
}

export function getAllSearchableTerms(): string[] {
  if (!allSearchableTerms) {
    const terms = new Set<string>();
    for (const w of words) {
      terms.add(w.word.toLowerCase());
      for (const t of Object.values(w.translations)) {
        terms.add(t.toLowerCase());
      }
    }
    for (const p of phrases) {
      terms.add(p.phrase.toLowerCase());
    }
    allSearchableTerms = Array.from(terms).sort();
  }
  return allSearchableTerms;
}

// ═══════════════════════════════════════════════════════════
// LANGUAGE DETECTION ENGINE
// ═══════════════════════════════════════════════════════════

const UNICODE_RANGES: { lang: string; name: string; regex: RegExp }[] = [
  { lang: 'bn', name: 'Bangla', regex: /[\u0980-\u09FF]/ },
  { lang: 'hi', name: 'Hindi', regex: /[\u0900-\u097F]/ },
  { lang: 'ar', name: 'Arabic', regex: /[\u0600-\u06FF\u0750-\u077F]/ },
  { lang: 'ur', name: 'Urdu', regex: /[\u0600-\u06FF\u0750-\u077F]/ },
  { lang: 'ja', name: 'Japanese', regex: /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/ },
  { lang: 'ko', name: 'Korean', regex: /[\uAC00-\uD7AF\u1100-\u11FF]/ },
  { lang: 'zh', name: 'Chinese', regex: /[\u4E00-\u9FFF]/ },
  { lang: 'de', name: 'German', regex: /[äöüßÄÖÜ]/ },
  { lang: 'es', name: 'Spanish', regex: /[ñ¿¡áéíóú]/ },
  { lang: 'fr', name: 'French', regex: /[àâçéèêëîïôùûüÿœæ]/ },
  { lang: 'pt', name: 'Portuguese', regex: /[ãõçáéíóúâêîôû]/ },
  { lang: 'tr', name: 'Turkish', regex: /[çğıöşüİĞÖŞÜ]/ },
];

export function detectLanguage(text: string): string {
  if (!text.trim()) return 'en';

  const trimmed = text.trim();

  // Check Unicode ranges first
  const langCounts: Record<string, number> = {};
  for (const char of trimmed) {
    for (const range of UNICODE_RANGES) {
      if (range.regex.test(char)) {
        langCounts[range.lang] = (langCounts[range.lang] || 0) + 1;
        break;
      }
    }
  }

  // Find the most common non-Latin script
  let maxLang = '';
  let maxCount = 0;
  for (const [lang, count] of Object.entries(langCounts)) {
    if (count > maxCount) {
      maxCount = count;
      maxLang = lang;
    }
  }

  if (maxCount > 0) {
    // Special case: Arabic vs Urdu - check if it's in our database
    if (maxLang === 'ar' || maxLang === 'ur') {
      const lower = trimmed.toLowerCase();
      const idx = getReverseIndex();
      for (const [key, val] of idx.entries()) {
        if (key === lower && (val.lang === 'ar' || val.lang === 'ur')) {
          return val.lang;
        }
      }
      // Default to Arabic for Arabic script
      return 'ar';
    }
    return maxLang;
  }

  // If no special characters detected, check database for exact match
  const lower = trimmed.toLowerCase();
  const idx = getReverseIndex();
  if (idx.has(lower)) {
    return idx.get(lower)!.lang;
  }

  // Default to English for Latin script
  return 'en';
}

export function getLanguageInfo(code: string): Language | undefined {
  return languages.find(l => l.code === code);
}

export function getAllLanguages(): Language[] {
  return languages;
}

// ═══════════════════════════════════════════════════════════
// SEARCH ENGINE - Fast autocomplete & fuzzy search
// ═══════════════════════════════════════════════════════════

export interface SearchResult {
  word: string;
  type: 'word' | 'phrase';
  preview?: string;
  language?: string;
}

export function searchAutocomplete(query: string, limit: number = 10): SearchResult[] {
  if (!query || query.length < 1) return [];

  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];
  const seen = new Set<string>();

  // Priority 1: Exact prefix matches on English words
  for (const w of words) {
    if (w.word.toLowerCase().startsWith(q) && !seen.has(w.word)) {
      seen.add(w.word);
      results.push({
        word: w.word,
        type: 'word',
        preview: w.definitions[0]?.substring(0, 60) + (w.definitions[0]?.length > 60 ? '...' : ''),
        language: 'en',
      });
    }
  }

  // Priority 2: Prefix matches on translations
  for (const w of words) {
    for (const [lang, translation] of Object.entries(w.translations)) {
      const key = `${lang}:${translation}`;
      if (translation.toLowerCase().startsWith(q) && !seen.has(key)) {
        seen.add(key);
        results.push({
          word: translation,
          type: 'word',
          preview: `→ ${w.word}: ${w.definitions[0]?.substring(0, 40)}...`,
          language: lang,
        });
      }
    }
  }

  // Priority 3: Phrase matches
  for (const p of phrases) {
    if (p.phrase.toLowerCase().includes(q) && !seen.has(`phrase:${p.phrase}`)) {
      seen.add(`phrase:${p.phrase}`);
      results.push({
        word: p.phrase,
        type: 'phrase',
        language: 'en',
      });
    }
  }

  // Priority 4: Contains matches
  for (const w of words) {
    if (w.word.toLowerCase().includes(q) && !seen.has(w.word)) {
      seen.add(w.word);
      results.push({
        word: w.word,
        type: 'word',
        preview: w.definitions[0]?.substring(0, 60) + (w.definitions[0]?.length > 60 ? '...' : ''),
        language: 'en',
      });
    }
  }

  return results.slice(0, limit);
}

export function getEnglishCandidates(word: string): string[] {
  const candidates: string[] = [word];
  const lower = word.toLowerCase().trim();

  // Common English irregular inflections mapped to base forms
  const irregulars: Record<string, string> = {
    // do / done / did
    'done': 'do', 'did': 'do', 'doing': 'do', 'does': 'do',
    // go / went / gone
    'went': 'go', 'gone': 'go', 'going': 'go', 'goes': 'go',
    // make / made
    'made': 'make', 'making': 'make', 'makes': 'make',
    // see / saw / seen
    'saw': 'see', 'seen': 'see', 'seeing': 'see', 'sees': 'see',
    // know / knew / known
    'knew': 'know', 'known': 'know', 'knowing': 'know', 'knows': 'know',
    // think / thought
    'thought': 'think', 'thinking': 'think', 'thinks': 'think',
    // take / took / taken
    'took': 'take', 'taken': 'take', 'taking': 'take', 'takes': 'take',
    // come / came
    'came': 'come', 'coming': 'come', 'comes': 'come',
    // say / said
    'said': 'say', 'saying': 'say', 'says': 'say',
    // find / found
    'found': 'find', 'finding': 'find', 'finds': 'find',
    // give / gave / given
    'gave': 'give', 'given': 'give', 'giving': 'give', 'gives': 'give',
    // tell / told
    'told': 'tell', 'telling': 'tell', 'tells': 'tell',
    // eat / ate / eaten
    'ate': 'eat', 'eaten': 'eat', 'eating': 'eat', 'eats': 'eat',
    // run / ran
    'ran': 'run', 'running': 'run', 'runs': 'run',
    // write / wrote / written
    'wrote': 'write', 'written': 'write', 'writing': 'write', 'writes': 'write',
    // read (past tense same spelling but included for completeness)
    'reading': 'read', 'reads': 'read',
    // speak / spoke / spoken
    'spoke': 'speak', 'spoken': 'speak', 'speaking': 'speak', 'speaks': 'speak',
    // sleep / slept
    'slept': 'sleep', 'sleeping': 'sleep', 'sleeps': 'sleep',
    // teach / taught
    'taught': 'teach', 'teaching': 'teach', 'teaches': 'teach',
    // men / women (irregular plurals)
    'men': 'man', 'women': 'woman', 'children': 'child',
  };

  if (irregulars[lower]) {
    candidates.push(irregulars[lower]);
  }

  if (lower.endsWith('s') && !lower.endsWith('ss')) {
    // e.g. ranges -> range, apples -> apple, boxes -> boxe -> box
    if (lower.endsWith('ies')) {
      candidates.push(lower.slice(0, -3) + 'y');
    } else if (lower.endsWith('es')) {
      candidates.push(lower.slice(0, -1)); // e.g. ranges -> range
      candidates.push(lower.slice(0, -2)); // e.g. boxes -> box
    } else {
      candidates.push(lower.slice(0, -1)); // e.g. cats -> cat
    }
  }

  if (lower.endsWith('ed')) {
    candidates.push(lower.slice(0, -1)); // e.g. loved -> love
    candidates.push(lower.slice(0, -2)); // e.g. walked -> walk
  }

  if (lower.endsWith('ing')) {
    candidates.push(lower.slice(0, -3)); // e.g. walking -> walk
    candidates.push(lower.slice(0, -3) + 'e'); // e.g. loving -> love
  }

  return Array.from(new Set(candidates));
}

export function findWord(query: string): WordEntry | null {
  const q = query.toLowerCase().trim();

  // Direct English word match
  const directMatch = words.find(w => w.word.toLowerCase() === q);
  if (directMatch) return directMatch;

  // Try candidate inflections/stems for English
  const candidates = getEnglishCandidates(q);
  for (const candidate of candidates) {
    const candidateMatch = words.find(w => w.word.toLowerCase() === candidate);
    if (candidateMatch) return candidateMatch;
  }

  // Reverse lookup - find English word from translation
  const idx = getReverseIndex();
  const entry = idx.get(q);
  if (entry) return entry.word;

  // Partial match
  const partialMatch = words.find(w =>
    w.word.toLowerCase().startsWith(q) ||
    Object.values(w.translations).some(t => t.toLowerCase().startsWith(q))
  );
  return partialMatch || null;
}

export function findPhrase(query: string): PhraseEntry | null {
  const q = query.toLowerCase().trim();
  const pidx = getPhraseIndex();

  // Direct match
  if (pidx.has(q)) return pidx.get(q)!;

  // Fuzzy phrase match
  for (const p of phrases) {
    if (p.phrase.toLowerCase().includes(q) || q.includes(p.phrase.toLowerCase())) {
      return p;
    }
  }

  return null;
}

// ═══════════════════════════════════════════════════════════
// TRANSLATION ENGINE
// ═══════════════════════════════════════════════════════════

export interface TranslationResult {
  translated: string;
  sourceLanguage: string;
  targetLanguage: string;
  isWord: boolean;
  wordDetails?: WordEntry;
  alternatives?: string[];
}

export function translate(
  text: string,
  fromLang: string,
  toLang: string
): TranslationResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return { translated: '', sourceLanguage: fromLang, targetLanguage: toLang, isWord: false };
  }

  // Auto-detect language if 'auto'
  let sourceLang = fromLang;
  if (fromLang === 'auto') {
    sourceLang = detectLanguage(trimmed);
  }

  // If same language, return as-is
  if (sourceLang === toLang) {
    return {
      translated: trimmed,
      sourceLanguage: sourceLang,
      targetLanguage: toLang,
      isWord: false,
    };
  }

  // Try phrase translation first
  const phraseResult = translatePhrase(trimmed, sourceLang, toLang);
  if (phraseResult) {
    return phraseResult;
  }

  // Try single word translation
  const wordResult = translateWord(trimmed, sourceLang, toLang);
  if (wordResult) {
    return wordResult;
  }

  // Fallback: word-by-word translation for sentences
  const sentenceResult = translateSentenceWordByWord(trimmed, sourceLang, toLang);
  return sentenceResult;
}

// ═══════════════════════════════════════════════════════════
// FREE TRANSLATION API (MyMemory) - Online Fallback
// ═══════════════════════════════════════════════════════════

// Map internal language codes to MyMemory API BCP-47 codes
function getApiLangCode(code: string): string {
  const map: Record<string, string> = {
    en: 'en', 'en-US': 'en', bn: 'bn', hi: 'hi', ar: 'ar',
    es: 'es', fr: 'fr', ur: 'ur', tr: 'tr', de: 'de',
    pt: 'pt', ja: 'ja', ko: 'ko',
  };
  return map[code] || code;
}

export async function translateWithAPI(
  text: string,
  fromLang: string,
  toLang: string
): Promise<string | null> {
  try {
    const src = getApiLangCode(fromLang);
    const tgt = getApiLangCode(toLang);
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${src}|${tgt}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();
    if (data?.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      // MyMemory returns the original text when it can't translate
      if (translated.toLowerCase() === text.toLowerCase()) return null;
      return translated;
    }
    return null;
  } catch {
    // Network error, timeout, or offline — silently fail
    return null;
  }
}

/**
 * Async translate: tries offline first, then falls back to the free API.
 * Returns the result and whether it came from the API.
 */
export async function translateAsync(
  text: string,
  fromLang: string,
  toLang: string
): Promise<TranslationResult & { fromAPI?: boolean }> {
  const trimmed = text.trim();
  if (!trimmed) {
    return { translated: '', sourceLanguage: fromLang, targetLanguage: toLang, isWord: false };
  }

  // Auto-detect language if 'auto'
  let sourceLang = fromLang;
  if (fromLang === 'auto') {
    sourceLang = detectLanguage(trimmed);
  }

  // If same language, return as-is
  if (sourceLang === toLang) {
    return { translated: trimmed, sourceLanguage: sourceLang, targetLanguage: toLang, isWord: false };
  }

  // 1. Try offline phrase
  const phraseResult = translatePhrase(trimmed, sourceLang, toLang);
  if (phraseResult) return phraseResult;

  // 2. Try offline single word
  const wordResult = translateWord(trimmed, sourceLang, toLang);
  if (wordResult) return wordResult;

  // 3. Try offline word-by-word for sentences
  const sentenceResult = translateSentenceWordByWord(trimmed, sourceLang, toLang);

  // Check if the offline result actually translated anything meaningful
  // (if it just returned the original text back, try the API)
  const offlineWorked = sentenceResult.translated.toLowerCase() !== trimmed.toLowerCase();
  if (offlineWorked) return sentenceResult;

  // 4. Fallback to free API
  const apiResult = await translateWithAPI(trimmed, sourceLang, toLang);
  if (apiResult) {
    return {
      translated: apiResult,
      sourceLanguage: sourceLang,
      targetLanguage: toLang,
      isWord: false,
      fromAPI: true,
    };
  }

  // 5. Return offline result even if imperfect
  return sentenceResult;
}

function translatePhrase(
  text: string,
  fromLang: string,
  toLang: string
): TranslationResult | null {
  const lower = text.toLowerCase();
  const pidx = getPhraseIndex();

  const isFromEnglish = fromLang === 'en' || fromLang === 'en-US';
  const isToEnglish = toLang === 'en' || toLang === 'en-US';

  // Direct phrase match
  if (pidx.has(lower)) {
    const phrase = pidx.get(lower)!;
    const translated = isToEnglish ? phrase.phrase : (phrase.translations[toLang] || phrase.phrase);
    return {
      translated,
      sourceLanguage: fromLang,
      targetLanguage: toLang,
      isWord: false,
    };
  }

  // Check if it's a known phrase in another language
  for (const p of phrases) {
    const translations = Object.entries(p.translations);
    for (const [lang, trans] of translations) {
      if ((lang === fromLang || (lang === 'en' && fromLang === 'en-US')) && trans.toLowerCase() === lower) {
        const translated = isToEnglish ? p.phrase : (p.translations[toLang] || p.phrase);
        return {
          translated,
          sourceLanguage: fromLang,
          targetLanguage: toLang,
          isWord: false,
        };
      }
    }
  }

  return null;
}

function translateWord(
  text: string,
  fromLang: string,
  toLang: string
): TranslationResult | null {
  const lower = text.toLowerCase();
  const isFromEnglish = fromLang === 'en' || fromLang === 'en-US';
  const isToEnglish = toLang === 'en' || toLang === 'en-US';

  // English to target
  if (isFromEnglish) {
    const candidates = getEnglishCandidates(lower);
    for (const candidate of candidates) {
      const word = words.find(w => w.word.toLowerCase() === candidate);
      if (word) {
        const translated = isToEnglish ? word.word : (word.translations[toLang] || text);
        return {
          translated,
          sourceLanguage: fromLang,
          targetLanguage: toLang,
          isWord: true,
          wordDetails: word,
          alternatives: Object.entries(word.translations)
            .filter(([lang]) => lang !== toLang)
            .slice(0, 3)
            .map(([, t]) => t),
        };
      }
    }
  }

  // Any language to any language (via English pivot)
  const idx = getReverseIndex();
  const entry = idx.get(lower);
  if (entry) {
    const word = entry.word;
    if (isFromEnglish || entry.lang === fromLang) {
      const translated = isToEnglish ? word.word : (word.translations[toLang] || word.word);
      return {
        translated,
        sourceLanguage: fromLang,
        targetLanguage: toLang,
        isWord: true,
        wordDetails: word,
      };
    }
  }

  return null;
}

// Common function words for better sentence translation
const COMMON_WORDS: Record<string, Record<string, string>> = {
  // Pronouns
  'i': { bn: 'আমি', hi: 'मैं', ar: 'أنا', es: 'yo', fr: 'je', ur: 'میں', tr: 'ben', de: 'ich', pt: 'eu', ja: '私', ko: '나는' },
  'you': { bn: 'আপনি', hi: 'आप', ar: 'أنت', es: 'tú', fr: 'tu', ur: 'آپ', tr: 'sen', de: 'du', pt: 'você', ja: 'あなた', ko: '당신' },
  'he': { bn: 'সে', hi: 'वह', ar: 'هو', es: 'él', fr: 'il', ur: 'وہ', tr: 'o', de: 'er', pt: 'ele', ja: '彼', ko: '그' },
  'she': { bn: 'সে', hi: 'वह', ar: 'هي', es: 'ella', fr: 'elle', ur: 'وہ', tr: 'o', de: 'sie', pt: 'ela', ja: '彼女', ko: '그녀' },
  'it': { bn: 'এটি', hi: 'यह', ar: 'هو', es: 'eso', fr: 'il', ur: 'یہ', tr: 'o', de: 'es', pt: 'isso', ja: 'それ', ko: '그것' },
  'we': { bn: 'আমরা', hi: 'हम', ar: 'نحن', es: 'nosotros', fr: 'nous', ur: 'ہم', tr: 'biz', de: 'wir', pt: 'nós', ja: '私たち', ko: '우리' },
  'they': { bn: 'তারা', hi: 'वे', ar: 'هم', es: 'ellos', fr: 'ils', ur: 'وہ', tr: 'onlar', de: 'sie', pt: 'eles', ja: '彼ら', ko: '그들' },
  'me': { bn: 'আমাকে', hi: 'मुझे', ar: 'أنا', es: 'me', fr: 'moi', ur: 'مجھے', tr: 'bana', de: 'mich', pt: 'me', ja: '私に', ko: '나를' },
  'my': { bn: 'আমার', hi: 'मेरा', ar: 'لي', es: 'mi', fr: 'mon', ur: 'میرا', tr: 'benim', de: 'mein', pt: 'meu', ja: '私の', ko: '나의' },
  'your': { bn: 'আপনার', hi: 'आपका', ar: 'لك', es: 'tu', fr: 'ton', ur: 'آپ کا', tr: 'senin', de: 'dein', pt: 'seu', ja: 'あなたの', ko: '당신의' },
  'our': { bn: 'আমাদের', hi: 'हमारा', ar: 'لنا', es: 'nuestro', fr: 'notre', ur: 'ہمارا', tr: 'bizim', de: 'unser', pt: 'nosso', ja: '私たちの', ko: '우리의' },
  'his': { bn: 'তার', hi: 'उसका', ar: 'له', es: 'su', fr: 'son', ur: 'اس کا', tr: 'onun', de: 'sein', pt: 'seu', ja: '彼の', ko: '그의' },
  'her': { bn: 'তার', hi: 'उसकी', ar: 'لها', es: 'su', fr: 'son', ur: 'اس کی', tr: 'onun', de: 'ihr', pt: 'seu', ja: '彼女の', ko: '그녀의' },
  'their': { bn: 'তাদের', hi: 'उनका', ar: 'لهم', es: 'su', fr: 'leur', ur: 'ان کا', tr: 'onların', de: 'ihr', pt: 'seu', ja: '彼らの', ko: '그들의' },
  // Be verbs
  'is': { bn: 'হয়', hi: 'है', ar: 'هو', es: 'es', fr: 'est', ur: 'ہے', tr: 'dır', de: 'ist', pt: 'é', ja: 'です', ko: '이다' },
  'am': { bn: 'আছি', hi: 'हूँ', ar: 'أنا', es: 'soy', fr: 'suis', ur: 'ہوں', tr: 'im', de: 'bin', pt: 'sou', ja: 'です', ko: '입니다' },
  'are': { bn: 'আছেন', hi: 'हैं', ar: 'هم', es: 'son', fr: 'êtes', ur: 'ہیں', tr: 'sın', de: 'sind', pt: 'são', ja: 'です', ko: '입니다' },
  'was': { bn: 'ছিল', hi: 'था', ar: 'كان', es: 'fue', fr: 'était', ur: 'تھا', tr: 'dı', de: 'war', pt: 'foi', ja: 'でした', ko: '이었다' },
  'were': { bn: 'ছিলেন', hi: 'थे', ar: 'كانوا', es: 'eran', fr: 'étaient', ur: 'تھے', tr: 'ydı', de: 'waren', pt: 'eram', ja: 'でした', ko: '이었다' },
  'be': { bn: 'হওয়া', hi: 'होना', ar: 'يكون', es: 'ser', fr: 'être', ur: 'ہونا', tr: 'olmak', de: 'sein', pt: 'ser', ja: 'である', ko: '이다' },
  // Articles
  'the': { bn: '', hi: '', ar: 'ال', es: 'el', fr: 'le', ur: '', tr: '', de: 'der', pt: 'o', ja: '', ko: '' },
  'a': { bn: 'একটি', hi: 'एक', ar: 'أ', es: 'un', fr: 'un', ur: 'ایک', tr: 'bir', de: 'ein', pt: 'um', ja: '一つの', ko: '하나의' },
  'an': { bn: 'একটি', hi: 'एक', ar: 'أ', es: 'un', fr: 'un', ur: 'ایک', tr: 'bir', de: 'ein', pt: 'um', ja: '一つの', ko: '하나의' },
  // Common verbs
  'have': { bn: 'আছে', hi: 'है', ar: 'لدي', es: 'tener', fr: 'avoir', ur: 'ہے', tr: 'sahip', de: 'haben', pt: 'ter', ja: '持つ', ko: '가지다' },
  'has': { bn: 'আছে', hi: 'है', ar: 'لديه', es: 'tiene', fr: 'a', ur: 'ہے', tr: 'sahip', de: 'hat', pt: 'tem', ja: '持つ', ko: '가지다' },
  'had': { bn: 'ছিল', hi: 'था', ar: 'كان', es: 'tuvo', fr: 'avait', ur: 'تھا', tr: 'vardı', de: 'hatte', pt: 'teve', ja: '持っていた', ko: '가졌다' },
  'do': { bn: 'করা', hi: 'करना', ar: 'فعل', es: 'hacer', fr: 'faire', ur: 'کرنا', tr: 'yapmak', de: 'tun', pt: 'fazer', ja: 'する', ko: '하다' },
  'does': { bn: 'করে', hi: 'करता', ar: 'يفعل', es: 'hace', fr: 'fait', ur: 'کرتا', tr: 'yapar', de: 'tut', pt: 'faz', ja: 'する', ko: '한다' },
  'did': { bn: 'করেছিল', hi: 'किया', ar: 'فعل', es: 'hizo', fr: 'fit', ur: 'کیا', tr: 'yaptı', de: 'tat', pt: 'fez', ja: 'した', ko: '했다' },
  'will': { bn: 'হবে', hi: 'होगा', ar: 'سوف', es: 'irá', fr: 'ira', ur: 'گا', tr: 'acak', de: 'wird', pt: 'irá', ja: 'だろう', ko: '것이다' },
  'can': { bn: 'পারে', hi: 'सकता', ar: 'يستطيع', es: 'puede', fr: 'peut', ur: 'سکتا', tr: 'yapabilir', de: 'kann', pt: 'pode', ja: 'できる', ko: '할 수 있다' },
  'should': { bn: 'উচিত', hi: 'चाहिए', ar: 'يجب', es: 'debe', fr: 'doit', ur: 'چاہیے', tr: 'malı', de: 'sollte', pt: 'deve', ja: 'べき', ko: '해야 한다' },
  'would': { bn: 'হতো', hi: 'होता', ar: 'سوف', es: 'iría', fr: 'irait', ur: 'گا', tr: 'ardı', de: 'würde', pt: 'iria', ja: 'だろう', ko: '것이다' },
  'could': { bn: 'পারতো', hi: 'सकता', ar: 'يمكن', es: 'podría', fr: 'pourrait', ur: 'سکتا', tr: 'yapabilirdi', de: 'könnte', pt: 'poderia', ja: 'できた', ko: '할 수 있었다' },
  'must': { bn: 'অবশ্যই', hi: 'जरूर', ar: 'يجب', es: 'debe', fr: 'doit', ur: 'ضرور', tr: 'malı', de: 'muss', pt: 'deve', ja: 'しなければ', ko: '반드시' },
  'not': { bn: 'না', hi: 'नहीं', ar: 'لا', es: 'no', fr: 'pas', ur: 'نہیں', tr: 'değil', de: 'nicht', pt: 'não', ja: 'ない', ko: '아니다' },
  'no': { bn: 'না', hi: 'नहीं', ar: 'لا', es: 'no', fr: 'non', ur: 'نہیں', tr: 'hayır', de: 'nein', pt: 'não', ja: 'いいえ', ko: '아니요' },
  'yes': { bn: 'হ্যাঁ', hi: 'हाँ', ar: 'نعم', es: 'sí', fr: 'oui', ur: 'ہاں', tr: 'evet', de: 'ja', pt: 'sim', ja: 'はい', ko: '네' },
  // Prepositions
  'in': { bn: 'মধ্যে', hi: 'में', ar: 'في', es: 'en', fr: 'dans', ur: 'میں', tr: 'de', de: 'in', pt: 'em', ja: 'の中に', ko: '안에' },
  'on': { bn: 'উপর', hi: 'पर', ar: 'على', es: 'en', fr: 'sur', ur: 'پر', tr: 'üzerinde', de: 'auf', pt: 'em', ja: 'の上に', ko: '위에' },
  'at': { bn: 'এ', hi: 'पर', ar: 'عند', es: 'en', fr: 'à', ur: 'پر', tr: 'de', de: 'an', pt: 'em', ja: 'で', ko: '에서' },
  'to': { bn: 'কে', hi: 'को', ar: 'إلى', es: 'a', fr: 'à', ur: 'کو', tr: 'e', de: 'zu', pt: 'para', ja: 'に', ko: '에게' },
  'for': { bn: 'জন্য', hi: 'के लिए', ar: 'ل', es: 'para', fr: 'pour', ur: 'کے لیے', tr: 'için', de: 'für', pt: 'para', ja: 'のために', ko: '위해' },
  'from': { bn: 'থেকে', hi: 'से', ar: 'من', es: 'de', fr: 'de', ur: 'سے', tr: 'dan', de: 'von', pt: 'de', ja: 'から', ko: '에서' },
  'with': { bn: 'সাথে', hi: 'साथ', ar: 'مع', es: 'con', fr: 'avec', ur: 'کے ساتھ', tr: 'ile', de: 'mit', pt: 'com', ja: 'と一緒に', ko: '와 함께' },
  'by': { bn: 'দ্বারা', hi: 'द्वारा', ar: 'بواسطة', es: 'por', fr: 'par', ur: 'کی طرف سے', tr: 'tarafından', de: 'von', pt: 'por', ja: 'によって', ko: '에 의해' },
  'of': { bn: 'এর', hi: 'का', ar: 'من', es: 'de', fr: 'de', ur: 'کا', tr: 'ın', de: 'von', pt: 'de', ja: 'の', ko: '의' },
  'about': { bn: 'সম্পর্কে', hi: 'के बारे', ar: 'عن', es: 'sobre', fr: 'sur', ur: 'کے بارے', tr: 'hakkında', de: 'über', pt: 'sobre', ja: 'について', ko: '에 대해' },
  // Conjunctions
  'and': { bn: 'এবং', hi: 'और', ar: 'و', es: 'y', fr: 'et', ur: 'اور', tr: 've', de: 'und', pt: 'e', ja: 'と', ko: '그리고' },
  'but': { bn: 'কিন্তু', hi: 'लेकिन', ar: 'لكن', es: 'pero', fr: 'mais', ur: 'لیکن', tr: 'ama', de: 'aber', pt: 'mas', ja: 'しかし', ko: '하지만' },
  'or': { bn: 'অথবা', hi: 'या', ar: 'أو', es: 'o', fr: 'ou', ur: 'یا', tr: 'veya', de: 'oder', pt: 'ou', ja: 'または', ko: '또는' },
  'so': { bn: 'তাই', hi: 'इसलिए', ar: 'لذلك', es: 'así', fr: 'donc', ur: 'اس لیے', tr: 'böylece', de: 'so', pt: 'então', ja: 'だから', ko: '그래서' },
  'if': { bn: 'যদি', hi: 'अगर', ar: 'إذا', es: 'si', fr: 'si', ur: 'اگر', tr: 'eğer', de: 'wenn', pt: 'se', ja: 'もし', ko: '만약' },
  'because': { bn: 'কারণ', hi: 'क्योंकि', ar: 'لأن', es: 'porque', fr: 'parce que', ur: 'کیونکہ', tr: 'çünkü', de: 'weil', pt: 'porque', ja: 'なぜなら', ko: '왜냐하면' },
  'when': { bn: 'যখন', hi: 'जब', ar: 'عندما', es: 'cuando', fr: 'quand', ur: 'جب', tr: 'ne zaman', de: 'wenn', pt: 'quando', ja: 'いつ', ko: '언제' },
  'that': { bn: 'যে', hi: 'वह', ar: 'ذلك', es: 'eso', fr: 'que', ur: 'وہ', tr: 'o', de: 'das', pt: 'que', ja: 'その', ko: '그' },
  'this': { bn: 'এই', hi: 'यह', ar: 'هذا', es: 'este', fr: 'ce', ur: 'یہ', tr: 'bu', de: 'dies', pt: 'este', ja: 'この', ko: '이' },
  'what': { bn: 'কী', hi: 'क्या', ar: 'ما', es: 'qué', fr: 'quoi', ur: 'کیا', tr: 'ne', de: 'was', pt: 'o que', ja: '何', ko: '무엇' },
  'how': { bn: 'কীভাবে', hi: 'कैसे', ar: 'كيف', es: 'cómo', fr: 'comment', ur: 'کیسے', tr: 'nasıl', de: 'wie', pt: 'como', ja: 'どのように', ko: '어떻게' },
  'where': { bn: 'কোথায়', hi: 'कहाँ', ar: 'أين', es: 'dónde', fr: 'où', ur: 'کہاں', tr: 'nerede', de: 'wo', pt: 'onde', ja: 'どこ', ko: '어디' },
  'why': { bn: 'কেন', hi: 'क्यों', ar: 'لماذا', es: 'por qué', fr: 'pourquoi', ur: 'کیوں', tr: 'neden', de: 'warum', pt: 'por que', ja: 'なぜ', ko: '왜' },
  'who': { bn: 'কে', hi: 'कौन', ar: 'من', es: 'quién', fr: 'qui', ur: 'کون', tr: 'kim', de: 'wer', pt: 'quem', ja: '誰', ko: '누구' },
  // Adverbs
  'very': { bn: 'খুব', hi: 'बहुत', ar: 'جدا', es: 'muy', fr: 'très', ur: 'بہت', tr: 'çok', de: 'sehr', pt: 'muito', ja: 'とても', ko: '매우' },
  'also': { bn: 'এছাড়া', hi: 'भी', ar: 'أيضا', es: 'también', fr: 'aussi', ur: 'بھی', tr: 'ayrıca', de: 'auch', pt: 'também', ja: 'も', ko: '또한' },
  'just': { bn: 'শুধু', hi: 'बस', ar: 'فقط', es: 'solo', fr: 'juste', ur: 'صرف', tr: 'sadece', de: 'nur', pt: 'só', ja: 'ただ', ko: '그냥' },
  'here': { bn: 'এখানে', hi: 'यहाँ', ar: 'هنا', es: 'aquí', fr: 'ici', ur: 'یہاں', tr: 'burada', de: 'hier', pt: 'aqui', ja: 'ここに', ko: '여기에' },
  'there': { bn: 'সেখানে', hi: 'वहाँ', ar: 'هناك', es: 'allí', fr: 'là', ur: 'وہاں', tr: 'orada', de: 'dort', pt: 'ali', ja: 'そこに', ko: '거기에' },
  'now': { bn: 'এখন', hi: 'अब', ar: 'الآن', es: 'ahora', fr: 'maintenant', ur: 'اب', tr: 'şimdi', de: 'jetzt', pt: 'agora', ja: '今', ko: '지금' },
  'then': { bn: 'তারপর', hi: 'तब', ar: 'ثم', es: 'entonces', fr: 'alors', ur: 'پھر', tr: 'sonra', de: 'dann', pt: 'então', ja: 'その後', ko: '그때' },
  'always': { bn: 'সবসময়', hi: 'हमेशा', ar: 'دائما', es: 'siempre', fr: 'toujours', ur: 'ہمیشہ', tr: 'her zaman', de: 'immer', pt: 'sempre', ja: 'いつも', ko: '항상' },
  'never': { bn: 'কখনোই না', hi: 'कभी नहीं', ar: 'أبدا', es: 'nunca', fr: 'jamais', ur: 'کبھی نہیں', tr: 'asla', de: 'nie', pt: 'nunca', ja: '決して', ko: '결코' },
  'today': { bn: 'আজ', hi: 'आज', ar: 'اليوم', es: 'hoy', fr: "aujourd'hui", ur: 'آج', tr: 'bugün', de: 'heute', pt: 'hoje', ja: '今日', ko: '오늘' },
  'tomorrow': { bn: 'আগামীকাল', hi: 'कल', ar: 'غدا', es: 'mañana', fr: 'demain', ur: 'کل', tr: 'yarın', de: 'morgen', pt: 'amanhã', ja: '明日', ko: '내일' },
  'yesterday': { bn: 'গতকাল', hi: 'कल', ar: 'أمس', es: 'ayer', fr: 'hier', ur: 'کل', tr: 'dün', de: 'gestern', pt: 'ontem', ja: '昨日', ko: '어제' },
  // More common words
  'all': { bn: 'সব', hi: 'सभी', ar: 'كل', es: 'todo', fr: 'tout', ur: 'سب', tr: 'tüm', de: 'alle', pt: 'todo', ja: 'すべて', ko: '모든' },
  'many': { bn: 'অনেক', hi: 'कई', ar: 'كثير', es: 'muchos', fr: 'beaucoup', ur: 'بہت سے', tr: 'çok', de: 'viele', pt: 'muitos', ja: '多くの', ko: '많은' },
  'some': { bn: 'কিছু', hi: 'कुछ', ar: 'بعض', es: 'algunos', fr: 'quelques', ur: 'کچھ', tr: 'bazı', de: 'einige', pt: 'alguns', ja: 'いくつかの', ko: '몇몇' },
  'more': { bn: 'আরও', hi: 'और', ar: 'أكثر', es: 'más', fr: 'plus', ur: 'اور', tr: 'daha', de: 'mehr', pt: 'mais', ja: 'もっと', ko: '더' },
  'much': { bn: 'অনেক', hi: 'बहुत', ar: 'كثير', es: 'mucho', fr: 'beaucoup', ur: 'بہت', tr: 'çok', de: 'viel', pt: 'muito', ja: '多く', ko: '많이' },
  'go': { bn: 'যাওয়া', hi: 'जाना', ar: 'يذهب', es: 'ir', fr: 'aller', ur: 'جانا', tr: 'gitmek', de: 'gehen', pt: 'ir', ja: '行く', ko: '가다' },
  'come': { bn: 'আসা', hi: 'आना', ar: 'يأتي', es: 'venir', fr: 'venir', ur: 'آنا', tr: 'gelmek', de: 'kommen', pt: 'vir', ja: '来る', ko: '오다' },
  'want': { bn: 'চাই', hi: 'चाहना', ar: 'يريد', es: 'querer', fr: 'vouloir', ur: 'چاہنا', tr: 'istemek', de: 'wollen', pt: 'querer', ja: '欲しい', ko: '원하다' },
  'need': { bn: 'প্রয়োজন', hi: 'जरूरत', ar: 'يحتاج', es: 'necesitar', fr: 'avoir besoin', ur: 'ضرورت', tr: 'ihtiyaç', de: 'brauchen', pt: 'precisar', ja: '必要', ko: '필요' },
  'like': { bn: 'পছন্দ', hi: 'पसंद', ar: 'يحب', es: 'gustar', fr: 'aimer', ur: 'پسند', tr: 'sevmek', de: 'mögen', pt: 'gostar', ja: '好き', ko: '좋아하다' },
  'know': { bn: 'জানা', hi: 'जानना', ar: 'يعرف', es: 'saber', fr: 'savoir', ur: 'جاننا', tr: 'bilmek', de: 'wissen', pt: 'saber', ja: '知る', ko: '알다' },
  'think': { bn: 'ভাবা', hi: 'सोचना', ar: 'يفكر', es: 'pensar', fr: 'penser', ur: 'سوچنا', tr: 'düşünmek', de: 'denken', pt: 'pensar', ja: '思う', ko: '생각하다' },
  'see': { bn: 'দেখা', hi: 'देखना', ar: 'يرى', es: 'ver', fr: 'voir', ur: 'دیکھنا', tr: 'görmek', de: 'sehen', pt: 'ver', ja: '見る', ko: '보다' },
  'make': { bn: 'তৈরি', hi: 'बनाना', ar: 'يصنع', es: 'hacer', fr: 'faire', ur: 'بنانا', tr: 'yapmak', de: 'machen', pt: 'fazer', ja: '作る', ko: '만들다' },
  'take': { bn: 'নেওয়া', hi: 'लेना', ar: 'يأخذ', es: 'tomar', fr: 'prendre', ur: 'لینا', tr: 'almak', de: 'nehmen', pt: 'tomar', ja: '取る', ko: '가져가다' },
  'give': { bn: 'দেওয়া', hi: 'देना', ar: 'يعطي', es: 'dar', fr: 'donner', ur: 'دینا', tr: 'vermek', de: 'geben', pt: 'dar', ja: 'あげる', ko: '주다' },
  'say': { bn: 'বলা', hi: 'कहना', ar: 'يقول', es: 'decir', fr: 'dire', ur: 'کہنا', tr: 'söylemek', de: 'sagen', pt: 'dizer', ja: '言う', ko: '말하다' },
  'tell': { bn: 'বলা', hi: 'बताना', ar: 'يخبر', es: 'decir', fr: 'dire', ur: 'بتانا', tr: 'anlatmak', de: 'sagen', pt: 'dizer', ja: '伝える', ko: '말하다' },
  'eat': { bn: 'খাওয়া', hi: 'खाना', ar: 'يأكل', es: 'comer', fr: 'manger', ur: 'کھانا', tr: 'yemek', de: 'essen', pt: 'comer', ja: '食べる', ko: '먹다' },
  'drink': { bn: 'পান করা', hi: 'पीना', ar: 'يشرب', es: 'beber', fr: 'boire', ur: 'پینا', tr: 'içmek', de: 'trinken', pt: 'beber', ja: '飲む', ko: '마시다' },
  'read': { bn: 'পড়া', hi: 'पढ़ना', ar: 'يقرأ', es: 'leer', fr: 'lire', ur: 'پڑھنا', tr: 'okumak', de: 'lesen', pt: 'ler', ja: '読む', ko: '읽다' },
  'write': { bn: 'লেখা', hi: 'लिखना', ar: 'يكتب', es: 'escribir', fr: 'écrire', ur: 'لکھنا', tr: 'yazmak', de: 'schreiben', pt: 'escrever', ja: '書く', ko: '쓰다' },
  'learn': { bn: 'শেখা', hi: 'सीखना', ar: 'يتعلم', es: 'aprender', fr: 'apprendre', ur: 'سیکھنا', tr: 'öğrenmek', de: 'lernen', pt: 'aprender', ja: '学ぶ', ko: '배우다' },
  'speak': { bn: 'বলা', hi: 'बोलना', ar: 'يتكلم', es: 'hablar', fr: 'parler', ur: 'بولنا', tr: 'konuşmak', de: 'sprechen', pt: 'falar', ja: '話す', ko: '말하다' },
  'walk': { bn: 'হাঁটা', hi: 'चलना', ar: 'يمشي', es: 'caminar', fr: 'marcher', ur: 'چلنا', tr: 'yürümek', de: 'gehen', pt: 'caminhar', ja: '歩く', ko: '걷다' },
  'run': { bn: 'দৌড়ানো', hi: 'दौड़ना', ar: 'يركض', es: 'correr', fr: 'courir', ur: 'دوڑنا', tr: 'koşmak', de: 'laufen', pt: 'correr', ja: '走る', ko: '달리다' },
  'big': { bn: 'বড়', hi: 'बड़ा', ar: 'كبير', es: 'grande', fr: 'grand', ur: 'بڑا', tr: 'büyük', de: 'groß', pt: 'grande', ja: '大きい', ko: '큰' },
  'small': { bn: 'ছোট', hi: 'छोटा', ar: 'صغير', es: 'pequeño', fr: 'petit', ur: 'چھوٹا', tr: 'küçük', de: 'klein', pt: 'pequeno', ja: '小さい', ko: '작은' },
  'new': { bn: 'নতুন', hi: 'नया', ar: 'جديد', es: 'nuevo', fr: 'nouveau', ur: 'نیا', tr: 'yeni', de: 'neu', pt: 'novo', ja: '新しい', ko: '새로운' },
  'old': { bn: 'পুরনো', hi: 'पुराना', ar: 'قديم', es: 'viejo', fr: 'vieux', ur: 'پرانا', tr: 'eski', de: 'alt', pt: 'velho', ja: '古い', ko: '오래된' },
  'long': { bn: 'লম্বা', hi: 'लंबा', ar: 'طويل', es: 'largo', fr: 'long', ur: 'لمبا', tr: 'uzun', de: 'lang', pt: 'longo', ja: '長い', ko: '긴' },
  'great': { bn: 'মহান', hi: 'महान', ar: 'عظيم', es: 'gran', fr: 'grand', ur: 'عظیم', tr: 'büyük', de: 'großartig', pt: 'ótimo', ja: '素晴らしい', ko: '훌륭한' },
  'every': { bn: 'প্রতিটি', hi: 'हर', ar: 'كل', es: 'cada', fr: 'chaque', ur: 'ہر', tr: 'her', de: 'jede', pt: 'cada', ja: '毎', ko: '모든' },
  'own': { bn: 'নিজের', hi: 'अपना', ar: 'خاص', es: 'propio', fr: 'propre', ur: 'اپنا', tr: 'kendi', de: 'eigen', pt: 'próprio', ja: '自分の', ko: '자신의' },
};

function translateSentenceWordByWord(
  text: string,
  fromLang: string,
  toLang: string
): TranslationResult {
  const wordsIn = text.split(/\s+/);
  const translatedWords: string[] = [];
  const isFromEnglish = fromLang === 'en' || fromLang === 'en-US';
  const isToEnglish = toLang === 'en' || toLang === 'en-US';

  for (const w of wordsIn) {
    // Extract punctuation
    const clean = w.replace(/[.,!?;:'"()\-!?]/g, '');
    const punct = w.slice(clean.length) || '';
    const lower = clean.toLowerCase();

    let translated = '';

    // 1. Try dictionary words first
    if (isFromEnglish) {
      const candidates = getEnglishCandidates(lower);
      for (const candidate of candidates) {
        const found = words.find(entry => entry.word.toLowerCase() === candidate);
        if (found) {
          if (isToEnglish) {
            translated = found.word;
          } else if (found.translations[toLang]) {
            translated = found.translations[toLang];
          }
          break;
        }
      }
    } else {
      const idx = getReverseIndex();
      const entry = idx.get(lower);
      if (entry) {
        if (isToEnglish) {
          translated = entry.word.word;
        } else {
          translated = entry.word.translations[toLang] || '';
        }
      }
    }

    // 2. Try common function words
    if (!translated && isFromEnglish && COMMON_WORDS[lower]) {
      if (isToEnglish) {
        translated = lower;
      } else {
        translated = COMMON_WORDS[lower][toLang] || '';
      }
    }

    // 3. Keep original if no translation found
    if (!translated) {
      translated = clean;
    }

    translatedWords.push(translated + (punct ? ' ' + punct.trim() : ''));
  }

  return {
    translated: translatedWords.join(' ').replace(/\s+/g, ' ').trim(),
    sourceLanguage: fromLang,
    targetLanguage: toLang,
    isWord: false,
  };
}

// ═══════════════════════════════════════════════════════════
// WORD DETAIL - Full word information
// ═══════════════════════════════════════════════════════════

export interface WordDetail {
  word: WordEntry;
  detectedLanguage: string;
  allTranslations: { language: Language; translation: string }[];
}

export function getWordDetail(query: string): WordDetail | null {
  const word = findWord(query);
  if (!word) return null;

  const detectedLanguage = detectLanguage(query);
  const allTranslations = languages
    .filter(l => l.code !== 'en' && l.code !== 'en-US')
    .map(l => ({
      language: l,
      translation: word.translations[l.code] || '—',
    }));

  return {
    word,
    detectedLanguage,
    allTranslations,
  };
}

// ═══════════════════════════════════════════════════════════
// STORAGE - Favorites & History (localStorage)
// ═══════════════════════════════════════════════════════════

const FAVORITES_KEY = 'dictionary_favorites';
const HISTORY_KEY = 'dictionary_history';

export function getFavorites(): string[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addFavorite(word: string): string[] {
  const favorites = getFavorites();
  if (!favorites.includes(word)) {
    favorites.unshift(word);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
  return favorites;
}

export function removeFavorite(word: string): string[] {
  let favorites = getFavorites();
  favorites = favorites.filter(f => f !== word);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
}

export function isFavorite(word: string): boolean {
  return getFavorites().includes(word);
}

export function getHistory(): string[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToHistory(word: string): string[] {
  let history = getHistory();
  // Remove if already exists, add to front
  history = history.filter(h => h !== word);
  history.unshift(word);
  // Keep only last 50 entries
  history = history.slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history;
}

export function clearHistory(): string[] {
  localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  return [];
}

// ═══════════════════════════════════════════════════════════
// TEXT-TO-SPEECH - Web Speech API (Fixed for Chrome/Edge)
// ═══════════════════════════════════════════════════════════

// Keep reference to prevent garbage collection (Chrome bug)
let activeUtterance: SpeechSynthesisUtterance | null = null;

// Pre-load voices (required for Chrome)
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}

export function speak(text: string, langCode: string): void {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }
  if (!text.trim()) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Small delay to ensure cancel completes (Chrome workaround)
  setTimeout(() => {
    if (!('speechSynthesis' in window)) return;

    activeUtterance = new SpeechSynthesisUtterance(text);

    const langMap: Record<string, string> = {
      en: 'en-GB', 'en-US': 'en-US', bn: 'bn-BD', hi: 'hi-IN', ar: 'ar-SA',
      es: 'es-ES', fr: 'fr-FR', ur: 'ur-PK', tr: 'tr-TR',
      de: 'de-DE', pt: 'pt-BR', ja: 'ja-JP', ko: 'ko-KR',
    };

    const bcp47 = langMap[langCode] || 'en-US';
    activeUtterance.lang = bcp47;
    activeUtterance.rate = 0.85;
    activeUtterance.pitch = 1;
    activeUtterance.volume = 1;

    // Try to find a matching voice
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang === bcp47) ||
      voices.find(v => v.lang.startsWith(bcp47.split('-')[0]));
    if (match) {
      activeUtterance.voice = match;
    }

    activeUtterance.onend = () => { activeUtterance = null; };
    activeUtterance.onerror = () => { activeUtterance = null; };

    window.speechSynthesis.speak(activeUtterance);

    // Chrome bug: speech pauses after ~15s. Keep alive with resume.
    const keepAlive = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.resume();
      } else {
        clearInterval(keepAlive);
      }
    }, 10000);

    activeUtterance.onend = () => { activeUtterance = null; clearInterval(keepAlive); };
    activeUtterance.onerror = () => { activeUtterance = null; clearInterval(keepAlive); };
  }, 50);
}

// ═══════════════════════════════════════════════════════════
// RANDOM WORD - For discovery / learning
// ═══════════════════════════════════════════════════════════

export function getRandomWord(): WordEntry {
  return words[Math.floor(Math.random() * words.length)];
}

export function getWordOfTheDay(): WordEntry {
  // Use date as seed for consistent word per day
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return words[seed % words.length];
}

// Export words array for direct access
export { words as dictionaryWords, phrases as dictionaryPhrases };
