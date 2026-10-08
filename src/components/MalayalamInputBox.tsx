'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Mic, 
  MicOff, 
  Sparkles, 
  Check, 
  RotateCcw, 
  HelpCircle,
  Volume2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface MalayalamInputBoxProps {
  value: string;
  onChange: (val: string) => void;
  selectedCategory?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export default function MalayalamInputBox({
  value,
  onChange,
  selectedCategory = 'Plumbing',
  placeholder,
  label,
  required = false,
}: MalayalamInputBoxProps) {
  const { language } = useLanguage();
  const t = translations[language].inputBox;

  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setTimedNotice = (text: string, durationMs: number = 3000) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSpeechNotice(text);
    timeoutRef.current = setTimeout(() => {
      setSpeechNotice(null);
    }, durationMs);
  };

  // Check speech recognition capability & clean up on unmount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleVoiceInput = () => {
    // If currently listening, stop it gracefully
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
      setTimedNotice(language === 'ml' ? 'വോയ്സ് ടൈപ്പിംഗ് നിർത്തി' : 'Voice input stopped', 2000);
      return;
    }

    if (!speechSupported) {
      setTimedNotice(t.speechNotSupported, 4000);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'ml' ? 'ml-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognitionRef.current = recognition;

      recognition.onstart = () => {
        setIsListening(true);
        setTimedNotice(t.listening, 6000);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          const newVal = value ? `${value} ${transcript}` : transcript;
          onChange(newVal);
          setTimedNotice(`${language === 'ml' ? 'ചേർത്തു' : 'Added'}: "${transcript}"`, 3000);
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
        setTimedNotice(language === 'ml' ? 'ശബ്ദം വ്യക്തമായില്ല, ദയവായി വീണ്ടും ശ്രമിക്കുക.' : 'Could not hear clearly, please try again.', 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleInsertPhrase = (phrase: string) => {
    if (!value) {
      onChange(phrase);
    } else if (value.includes(phrase)) {
      return;
    } else {
      onChange(`${value.trim()}, ${phrase}`);
    }
  };

  const activeCategoryPhrases =
    (t.phrases as any)[selectedCategory] || t.phrases.Plumbing;

  const displayLabel = label || t.label;
  const displayPlaceholder = placeholder || t.placeholder;

  return (
    <div className="w-full space-y-2">
      {/* Label and Voice typing toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label 
          htmlFor="malayalam-description-input" 
          className="text-sm font-semibold text-stone-800 flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-emerald-700" />
          <span>{displayLabel}</span>
          {required && <span className="text-red-500">*</span>}
        </label>

        <div className="flex items-center gap-2">
          {/* Voice to text button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
            title={t.clickToSpeak}
          >
            {isListening ? (
              <>
                <MicOff className="w-3.5 h-3.5" />
                <span>{language === 'ml' ? 'കേൾക്കുന്നു... (Stop)' : 'Listening... (Stop)'}</span>
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'ml' ? 'വോയ്സ് ടൈപ്പിംഗ് (Speak)' : 'Voice Input (Speak)'}</span>
              </>
            )}
          </button>

          {/* Help toggle */}
          <button
            type="button"
            onClick={() => setShowHelper(!showHelper)}
            className="text-stone-400 hover:text-stone-600 p-1"
            title="Typing tips"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Voice feedback message */}
      {speechNotice && (
        <div className="text-xs px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 animate-fade-in flex items-center gap-2">
          <Volume2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>{speechNotice}</span>
        </div>
      )}

      {/* Collapsible Helper info */}
      {showHelper && (
        <div className="p-3 bg-stone-100/90 rounded-xl text-xs text-stone-600 space-y-1.5 border border-stone-200 animate-fade-in">
          <p className="font-semibold text-stone-800">
            💡 {language === 'ml' ? 'ടൈപ്പിംഗ് ടിപ്പുകൾ:' : 'Input Suggestions:'}
          </p>
          <p>
            {language === 'ml'
              ? '• മൊബൈലിൽ ഗൂഗിൾ ഇൻഡിക് കീബോർഡ് (Gboard) ഉപയോഗിച്ച് മലയാളത്തിൽ നേരിട്ട് ടൈപ്പ് ചെയ്യാം.'
              : '• Type in English, Malayalam, or Manglish (e.g., "Pipe leak aanu, need plumber today").'}
          </p>
          <p>
            {language === 'ml'
              ? '• ഇംഗ്ലീഷ് അക്ഷരങ്ങളിൽ "Manglish" ആയും എഴുതാവുന്നതാണ്.'
              : '• You can also click the quick suggestions below to insert common task descriptions.'}
          </p>
        </div>
      )}

      {/* Textarea container */}
      <div className="relative rounded-xl border border-stone-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 bg-white transition-all shadow-2xs">
        <textarea
          id="malayalam-description-input"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={displayPlaceholder}
          className="w-full p-3.5 text-sm sm:text-base text-stone-800 placeholder-stone-400 bg-transparent rounded-xl focus:outline-none resize-y leading-relaxed"
          dir="auto"
        />

        {/* Textarea bottom bar with character counter & clear action */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-stone-100 bg-stone-50/70 rounded-b-xl text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{language === 'ml' ? 'മലയാളം & English സപ്പോർട്ട്' : 'Supports English, Malayalam & Manglish'}</span>
          </div>

          <div className="flex items-center gap-3">
            <span>{value.length} {language === 'ml' ? 'അക്ഷരങ്ങൾ' : 'chars'}</span>
            {value.length > 0 && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-stone-400 hover:text-red-500 inline-flex items-center gap-0.5 transition-colors"
                title="Clear"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{language === 'ml' ? 'മായ്ക്കുക' : 'Clear'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Clickable Task Snippet Chips */}
      <div className="pt-1">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 font-sans">
            {t.quickPhrasesLabel}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {activeCategoryPhrases.map((phrase: string, idx: number) => {
            const isAdded = value.includes(phrase);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleInsertPhrase(phrase)}
                className={`text-xs px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
                  isAdded
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-medium'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs hover:border-emerald-300'
                }`}
              >
                {isAdded ? (
                  <Check className="w-3 h-3 text-emerald-700" />
                ) : (
                  <span className="text-emerald-600 font-bold">+</span>
                )}
                <span>{phrase}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
