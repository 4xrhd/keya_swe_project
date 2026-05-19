// ═══════════════════════════════════════════════════════════
// All In One Dictionary - Main Application
// ═══════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Globe, Search, Volume2, Star, History, ArrowLeftRight, X,
  BookOpen, Heart, Trash2, Copy, Check, Clock, BookmarkPlus,
  BookmarkMinus, Sparkles, ChevronDown, Languages, Lightbulb,
  ArrowRight, Quote, Tag, Mic, MicOff
} from 'lucide-react';
import {
  searchAutocomplete, translate, translateAsync, getWordDetail, getFavorites,
  addFavorite, removeFavorite, getHistory, addToHistory,
  clearHistory, speak, getRandomWord, detectLanguage,
  getAllLanguages, findWord,
  type WordDetail, type SearchResult,
} from './utils/engine';
import type { Language } from './data/dictionary';

// ═══════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════

type TabType = 'dictionary' | 'favorites' | 'history';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dictionary');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('bn');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [wordDetail, setWordDetail] = useState<WordDetail | null>(null);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(getFavorites());
  const [history, setHistoryList] = useState<string[]>(getHistory());
  const [copied, setCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [fromAPI, setFromAPI] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const allLangs = getAllLanguages();

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    };
  }, []);

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autocomplete on input change
  const handleInputChange = useCallback((value: string) => {
    setInputText(value);
    if (value.trim().length > 0) {
      const results = searchAutocomplete(value, 8);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setOutputText('');
      setWordDetail(null);
    }
  }, []);

  // Main translate function (uses async API fallback)
  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    setFromAPI(false);

    // Instant offline result first
    const offlineResult = translate(inputText, sourceLang, targetLang);
    setOutputText(offlineResult.translated);

    const detail = getWordDetail(inputText);
    setWordDetail(detail);

    // If offline result looks like it didn't translate, try API
    if (offlineResult.translated.toLowerCase() === inputText.trim().toLowerCase()) {
      const apiResult = await translateAsync(inputText, sourceLang, targetLang);
      setOutputText(apiResult.translated);
      if ((apiResult as any).fromAPI) setFromAPI(true);
    }

    setIsTranslating(false);

    const newHistory = addToHistory(inputText);
    setHistoryList(newHistory);
    setShowSuggestions(false);
  }, [inputText, sourceLang, targetLang]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback(async (suggestion: SearchResult) => {
    setInputText(suggestion.word);
    setShowSuggestions(false);
    setFromAPI(false);

    const detectedLang = suggestion.language || 'en';
    const result = translate(suggestion.word, detectedLang, targetLang);
    setOutputText(result.translated);

    if (result.translated.toLowerCase() === suggestion.word.toLowerCase()) {
      setIsTranslating(true);
      const apiResult = await translateAsync(suggestion.word, detectedLang, targetLang);
      setOutputText(apiResult.translated);
      if ((apiResult as any).fromAPI) setFromAPI(true);
      setIsTranslating(false);
    }

    const detail = getWordDetail(suggestion.word);
    setWordDetail(detail);

    const newHistory = addToHistory(suggestion.word);
    setHistoryList(newHistory);
  }, [targetLang]);

  // ── FIXED: Swap languages (works even with Auto-detect) ──
  const handleSwapLanguages = useCallback(() => {
    if (!inputText.trim() && !outputText.trim()) return;

    // Figure out the actual source language
    const detectedSource = sourceLang === 'auto'
      ? detectLanguage(inputText)
      : sourceLang;

    const newSource = targetLang;           // e.g. 'bn'
    const newTarget = detectedSource;       // e.g. 'en'
    const newInput  = outputText;           // the Bangla translation
    const newOutput = inputText;            // the original English

    setSourceLang(newSource);
    setTargetLang(newTarget);
    setInputText(newInput);
    setOutputText(newOutput);

    // Re-derive word detail for the swapped input
    if (newInput.trim()) {
      const detail = getWordDetail(newInput);
      setWordDetail(detail);
    } else {
      setWordDetail(null);
    }
  }, [sourceLang, targetLang, inputText, outputText]);

  // Toggle favorite
  const handleToggleFavorite = useCallback((word: string) => {
    if (favorites.includes(word)) {
      setFavorites(removeFavorite(word));
    } else {
      setFavorites(addFavorite(word));
    }
  }, [favorites]);

  // Copy to clipboard
  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Random word
  const handleRandomWord = useCallback(() => {
    const word = getRandomWord();
    setInputText(word.word);
    const result = translate(word.word, 'en', targetLang);
    setOutputText(result.translated);
    setWordDetail(getWordDetail(word.word));
    setHistoryList(addToHistory(word.word));
  }, [targetLang]);

  // ── NEW: Voice Input via Web Speech API ──
  const handleVoiceInput = useCallback(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition ||
                                  (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    // If already listening, stop
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const bcp47Map: Record<string, string> = {
      auto: '', en: 'en-GB', 'en-US': 'en-US', bn: 'bn-BD', hi: 'hi-IN', ar: 'ar-SA',
      es: 'es-ES', fr: 'fr-FR', ur: 'ur-PK', tr: 'tr-TR',
      de: 'de-DE', pt: 'pt-BR', ja: 'ja-JP', ko: 'ko-KR',
    };
    recognition.lang = bcp47Map[sourceLang] || '';

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);

      // Auto-translate the voice input
      setTimeout(async () => {
        setFromAPI(false);
        const result = translate(transcript, sourceLang, targetLang);
        setOutputText(result.translated);
        setWordDetail(getWordDetail(transcript));
        setHistoryList(addToHistory(transcript));

        if (result.translated.toLowerCase() === transcript.toLowerCase()) {
          setIsTranslating(true);
          const apiResult = await translateAsync(transcript, sourceLang, targetLang);
          setOutputText(apiResult.translated);
          if ((apiResult as any).fromAPI) setFromAPI(true);
          setIsTranslating(false);
        }
      }, 100);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend   = () => setIsListening(false);

    recognition.start();
  }, [isListening, sourceLang, targetLang]);

  // Handle Enter key
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTranslate();
    }
  }, [handleTranslate]);

  // Handle favorite click
  const handleFavoriteWordClick = useCallback(async (word: string) => {
    setInputText(word);
    setActiveTab('dictionary');
    setFromAPI(false);
    const result = translate(word, 'en', targetLang);
    setOutputText(result.translated);
    setWordDetail(getWordDetail(word));

    if (result.translated.toLowerCase() === word.toLowerCase()) {
      setIsTranslating(true);
      const apiResult = await translateAsync(word, 'en', targetLang);
      setOutputText(apiResult.translated);
      if ((apiResult as any).fromAPI) setFromAPI(true);
      setIsTranslating(false);
    }
  }, [targetLang]);

  // Handle history click
  const handleHistoryWordClick = useCallback(async (word: string) => {
    setInputText(word);
    setActiveTab('dictionary');
    setFromAPI(false);
    const detected = detectLanguage(word);
    const result = translate(word, detected, targetLang);
    setOutputText(result.translated);
    setWordDetail(getWordDetail(word));
    setHistoryList(addToHistory(word));

    if (result.translated.toLowerCase() === word.toLowerCase()) {
      setIsTranslating(true);
      const apiResult = await translateAsync(word, detected, targetLang);
      setOutputText(apiResult.translated);
      if ((apiResult as any).fromAPI) setFromAPI(true);
      setIsTranslating(false);
    }
  }, [targetLang]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">All In One Dictionary</h1>
              <p className="text-blue-100 text-sm mt-0.5">Offline Multilingual Smart Dictionary & Translator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1">
            {([
              { id: 'dictionary' as TabType, label: 'Dictionary', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'favorites' as TabType, label: 'Favorites', icon: <Heart className="w-4 h-4" />, count: favorites.length },
              { id: 'history' as TabType, label: 'History', icon: <Clock className="w-4 h-4" />, count: history.length },
            ]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-4 pb-8">
        {activeTab === 'dictionary' && (
          <div className="space-y-4">
            <LanguageBar
              sourceLang={sourceLang} targetLang={targetLang}
              onSourceChange={setSourceLang} onTargetChange={setTargetLang}
              onSwap={handleSwapLanguages} allLangs={allLangs}
              hasContent={!!inputText.trim() || !!outputText.trim()}
            />

            <TranslationArea
              inputText={inputText}
              outputText={outputText}
              onInputChange={handleInputChange}
              onTranslate={handleTranslate}
              onKeyDown={handleKeyDown}
              sourceLang={sourceLang === 'auto' ? detectLanguage(inputText || 'hello') : sourceLang}
              targetLang={targetLang}
              onCopy={handleCopy}
              copied={copied}
              onSpeak={speak}
              onRandomWord={handleRandomWord}
              inputRef={inputRef}
              onVoiceInput={handleVoiceInput}
              isListening={isListening}
            />

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div ref={suggestionsRef} className="relative -mt-2">
                <div className="absolute w-full z-30 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
                  {suggestions.map((s, i) => (
                    <button
                      key={`${s.word}-${i}`}
                      className="w-full px-4 py-3 text-left hover:bg-indigo-50 flex items-center gap-3 transition-colors border-b border-slate-100 last:border-b-0"
                      onClick={() => handleSuggestionClick(s)}
                    >
                      <Search className="w-4 h-4 text-slate-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-800">{s.word}</span>
                          {s.type === 'phrase' && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">phrase</span>
                          )}
                          {s.language && s.language !== 'en' && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              {allLangs.find(l => l.code === s.language)?.name}
                            </span>
                          )}
                        </div>
                        {s.preview && (
                          <p className="text-sm text-slate-500 truncate">{s.preview}</p>
                        )}
                      </div>
                      <ArrowRight className="w-3 h-3 text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {wordDetail && (
              <WordDetailPanel
                detail={wordDetail}
                targetLang={targetLang}
                isFavorite={favorites.includes(wordDetail.word.word)}
                onToggleFavorite={() => handleToggleFavorite(wordDetail.word.word)}
                onSpeak={speak}
              />
            )}

            {!wordDetail && !inputText && (
              <QuickActions onRandomWord={handleRandomWord} history={history} onHistoryClick={handleHistoryWordClick} />
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <FavoritesPanel
            favorites={favorites}
            onWordClick={handleFavoriteWordClick}
            onRemove={handleToggleFavorite}
            onSpeak={speak}
            allLangs={allLangs}
            targetLang={targetLang}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPanel
            history={history}
            onWordClick={handleHistoryWordClick}
            onClear={() => { const h = clearHistory(); setHistoryList(h); }}
            onSpeak={speak}
            allLangs={allLangs}
          />
        )}
      </main>

      <footer className="text-center py-4 text-sm text-slate-400 border-t border-slate-200 bg-white/50">
        <p>🌍 All In One Dictionary — Offline Multilingual Smart Dictionary</p>
        <p className="mt-1">45+ words · 30+ phrases · 12 languages · Voice input · 100% offline</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LANGUAGE BAR
// ═══════════════════════════════════════════════════════════

function LanguageBar({ sourceLang, targetLang, onSourceChange, onTargetChange, onSwap, allLangs, hasContent }: {
  sourceLang: string; targetLang: string;
  onSourceChange: (lang: string) => void;
  onTargetChange: (lang: string) => void;
  onSwap: () => void;
  allLangs: Language[];
  hasContent: boolean;
}) {
  const sourceOptions = [
    { code: 'auto', name: 'Auto Detect', nativeName: 'Auto', flag: '🔍' },
    ...allLangs,
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <select
            value={sourceLang}
            onChange={e => onSourceChange(e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
          >
            {sourceOptions.map(l => (
              <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Swap — always enabled when there is content */}
        <button
          onClick={onSwap}
          disabled={!hasContent}
          className={`p-2.5 rounded-full border border-slate-200 transition-all ${
            !hasContent
              ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
              : 'bg-white hover:bg-indigo-50 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 shadow-sm'
          }`}
          title="Swap languages"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>

        <div className="flex-1 relative">
          <select
            value={targetLang}
            onChange={e => onTargetChange(e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
          >
            {allLangs.map(l => (
              <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TRANSLATION AREA (with Voice Input)
// ═══════════════════════════════════════════════════════════

function TranslationArea({ inputText, outputText, onInputChange, onTranslate, onKeyDown, sourceLang, targetLang, onCopy, copied, onSpeak, onRandomWord, inputRef, onVoiceInput, isListening }: {
  inputText: string; outputText: string;
  onInputChange: (v: string) => void;
  onTranslate: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  sourceLang: string; targetLang: string;
  onCopy: (text: string) => void;
  copied: boolean;
  onSpeak: (text: string, lang: string) => void;
  onRandomWord: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  onVoiceInput: () => void;
  isListening: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Input */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Input</span>
          <div className="flex gap-1">
            <button
              onClick={onRandomWord}
              className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              title="Random word"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            {/* Voice Input Button */}
            <button
              onClick={onVoiceInput}
              className={`p-1.5 rounded-md transition-colors ${
                isListening
                  ? 'text-red-500 bg-red-50 animate-pulse'
                  : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
              title={isListening ? 'Stop listening...' : 'Voice input'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            {inputText && (
              <button
                onClick={() => onSpeak(inputText, sourceLang)}
                className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                title="Listen to input"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <textarea
          ref={inputRef}
          value={inputText}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a word or sentence — or use 🎤 voice input..."
          className="w-full p-4 min-h-[140px] resize-none text-slate-800 text-base focus:outline-none placeholder-slate-300"
          rows={4}
        />
        {isListening && (
          <div className="px-4 py-1.5 bg-red-50 border-t border-red-100">
            <span className="text-xs text-red-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Listening… speak now
            </span>
          </div>
        )}
        <div className="px-4 py-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">{inputText.length} chars</span>
          <button
            onClick={onTranslate}
            disabled={!inputText.trim()}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              inputText.trim()
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Languages className="w-4 h-4" />
            Translate
          </button>
        </div>
      </div>

      {/* Output */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Translation</span>
          <div className="flex gap-1">
            {outputText && (
              <>
                <button
                  onClick={() => onSpeak(outputText, targetLang)}
                  className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  title="Listen to translation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onCopy(outputText)}
                  className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  title="Copy translation"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="p-4 min-h-[140px]">
          {outputText ? (
            <p className="text-slate-800 text-base leading-relaxed" dir={targetLang === 'ar' || targetLang === 'ur' ? 'rtl' : 'ltr'}>
              {outputText}
            </p>
          ) : (
            <p className="text-slate-300 text-base">Translation will appear here...</p>
          )}
        </div>
        <div className="px-4 py-2 border-t border-slate-100">
          <span className="text-xs text-slate-400">{outputText.length} chars</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// WORD DETAIL PANEL
// ═══════════════════════════════════════════════════════════

function WordDetailPanel({ detail, targetLang, isFavorite, onToggleFavorite, onSpeak }: {
  detail: WordDetail;
  targetLang: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSpeak: (text: string, lang: string) => void;
}) {
  const { word } = detail;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Word Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 border-b border-indigo-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-800 capitalize">{word.word}</h2>
              <button
                onClick={() => onSpeak(word.word, 'en')}
                className="p-2 rounded-full bg-white shadow-sm border border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                title="Listen to word"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-slate-500 text-sm font-mono">{word.phonetic}</span>
              <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2.5 py-1 rounded-full">
                {word.partOfSpeech}
              </span>
            </div>
          </div>
          <button
            onClick={onToggleFavorite}
            className={`p-2.5 rounded-xl border transition-all ${
              isFavorite
                ? 'bg-amber-50 border-amber-200 text-amber-500'
                : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-200'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <BookmarkMinus className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Definitions */}
        <section>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            Definitions
          </h3>
          <ul className="space-y-2">
            {word.definitions.map((def, i) => (
              <li key={i} className="flex gap-2 text-slate-600 leading-relaxed">
                <span className="text-indigo-400 font-bold mt-0.5 shrink-0">{i + 1}.</span>
                <span>{def}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Translations Grid */}
        <section>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
            <Languages className="w-4 h-4 text-indigo-500" />
            Translations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {detail.allTranslations.map(t => (
              <div
                key={t.language.code}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  t.language.code === targetLang
                    ? 'bg-indigo-50 border-indigo-200'
                    : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                }`}
                dir={t.language.direction === 'rtl' ? 'rtl' : 'ltr'}
              >
                <span className="text-lg shrink-0">{t.language.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-400 font-medium">{t.language.name}</div>
                  <div className="font-medium text-slate-800 truncate">{t.translation}</div>
                </div>
                <button
                  onClick={() => onSpeak(t.translation, t.language.code)}
                  className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-white transition-colors shrink-0"
                  title={`Listen in ${t.language.name}`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Example Sentences */}
        {word.examples.length > 0 && (
          <section>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
              <Quote className="w-4 h-4 text-indigo-500" />
              Example Sentences
            </h3>
            <div className="space-y-2">
              {word.examples.map((ex, i) => (
                <div key={i} className="flex gap-3 p-3 bg-amber-50/50 rounded-lg border border-amber-100/50">
                  <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-slate-700 leading-relaxed italic">{ex}</p>
                    <button
                      onClick={() => onSpeak(ex, 'en')}
                      className="mt-1 text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" /> Listen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Synonyms */}
        {word.synonyms.length > 0 && (
          <section>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
              <Tag className="w-4 h-4 text-indigo-500" />
              Synonyms
            </h3>
            <div className="flex flex-wrap gap-2">
              {word.synonyms.map(syn => (
                <span key={syn} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-200 font-medium">
                  {syn}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Antonyms */}
        {word.antonyms.length > 0 && (
          <section>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
              <Tag className="w-4 h-4 text-rose-500" />
              Antonyms
            </h3>
            <div className="flex flex-wrap gap-2">
              {word.antonyms.map(ant => (
                <span key={ant} className="px-3 py-1.5 bg-rose-50 text-rose-700 text-sm rounded-full border border-rose-200 font-medium">
                  {ant}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// QUICK ACTIONS
// ═══════════════════════════════════════════════════════════

function QuickActions({ onRandomWord, history, onHistoryClick }: {
  onRandomWord: () => void;
  history: string[];
  onHistoryClick: (word: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-slate-700">Quick Start</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { emoji: '🎲', label: 'Random Word', action: onRandomWord },
            { emoji: '💡', label: 'Try: love', action: () => onHistoryClick('love') },
            { emoji: '🌊', label: 'Try: water', action: () => onHistoryClick('water') },
            { emoji: '☀️', label: 'Try: sun', action: () => onHistoryClick('sun') },
          ].map(item => (
            <button
              key={item.label}
              onClick={item.action}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{item.emoji}</span>
              <span className="text-xs font-medium text-slate-600 group-hover:text-indigo-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-slate-500" />
            <h3 className="font-semibold text-slate-700">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.slice(0, 10).map(word => (
              <button
                key={word}
                onClick={() => onHistoryClick(word)}
                className="px-3 py-1.5 bg-slate-50 text-slate-600 text-sm rounded-full border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 p-6 text-center">
        <Globe className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Welcome to All In One Dictionary</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Search any word or phrase to get instant translations in 12 languages,
          meanings, example sentences, synonyms, and more — all completely offline!
          <br />
          <span className="text-indigo-500 font-medium">🎙️ Try voice input — click the microphone button!</span>
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// FAVORITES PANEL
// ═══════════════════════════════════════════════════════════

function FavoritesPanel({ favorites, onWordClick, onRemove, onSpeak, allLangs, targetLang }: {
  favorites: string[];
  onWordClick: (word: string) => void;
  onRemove: (word: string) => void;
  onSpeak: (text: string, lang: string) => void;
  allLangs: Language[];
  targetLang: string;
}) {
  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10 text-center">
        <Star className="w-12 h-12 text-slate-200 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-400 mb-2">No Favorites Yet</h3>
        <p className="text-sm text-slate-400">Search for words and save them here for quick access.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-700 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" />
          Saved Words ({favorites.length})
        </h3>
      </div>
      <div className="divide-y divide-slate-100">
        {favorites.map(word => {
          const wordEntry = findWord(word);
          const translation = wordEntry?.translations[targetLang] || '';
          return (
            <div key={word} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group">
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onWordClick(word)}>
                <div className="font-medium text-slate-800 capitalize">{word}</div>
                {wordEntry && (
                  <div className="text-sm text-slate-500 truncate">{wordEntry.definitions[0]?.substring(0, 60)}...</div>
                )}
                {translation && (
                  <div className="text-sm text-indigo-600 mt-0.5">
                    → {allLangs.find(l => l.code === targetLang)?.flag} {translation}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => onSpeak(word, 'en')} className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
                <button onClick={() => onRemove(word)} className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" title="Remove">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// HISTORY PANEL
// ═══════════════════════════════════════════════════════════

function HistoryPanel({ history, onWordClick, onClear, onSpeak, allLangs }: {
  history: string[];
  onWordClick: (word: string) => void;
  onClear: () => void;
  onSpeak: (text: string, lang: string) => void;
  allLangs: Language[];
}) {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10 text-center">
        <Clock className="w-12 h-12 text-slate-200 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-400 mb-2">No Search History</h3>
        <p className="text-sm text-slate-400">Your search history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-700 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          Search History ({history.length})
        </h3>
        <button onClick={onClear} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors">
          <Trash2 className="w-3 h-3" /> Clear All
        </button>
      </div>
      <div className="divide-y divide-slate-100">
        {history.map((word, i) => {
          const detectedLang = detectLanguage(word);
          const langInfo = allLangs.find(l => l.code === detectedLang);
          return (
            <div key={`${word}-${i}`} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group">
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onWordClick(word)}>
                <div className="font-medium text-slate-800">{word}</div>
                <span className="text-xs text-slate-400">{langInfo?.flag} {langInfo?.name}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => onSpeak(word, detectedLang)} className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
                <button onClick={() => onWordClick(word)} className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" title="Search again">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
