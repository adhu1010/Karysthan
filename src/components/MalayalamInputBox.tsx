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

interface MalayalamInputBoxProps {
  value: string;
  onChange: (val: string) => void;
  selectedCategory?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

// Quick pre-filled phrases categorized by task
const COMMON_PHRASES: Record<string, string[]> = {
  Plumbing: [
    'പൈപ്പിൽ നിന്നും വെള്ളം ലീക്കാവുന്നുണ്ട്',
    'ബാത്ത്റൂമിലെ ടാപ്പ് മാറ്റി പുതിയത് ഫിറ്റ് ചെയ്യണം',
    'സിങ്കിലെ വെള്ളം പോകുന്നില്ല, ബ്ലോക്ക് മാറ്റണം',
    'വാട്ടർ മോട്ടോർ ഓണാകുന്നില്ല',
  ],
  Electrical: [
    'സ്വിച്ച് ബോർഡ് കേടായി, സ്പാർക്ക് വരുന്നുണ്ട്',
    'സീലിംഗ് ഫാൻ വളരെ പതുക്കെയാണ് കറങ്ങുന്നത്',
    'മെയിൻ MCB വീണ്ടും വീണ്ടും ട്രിപ്പാകുന്നു',
    'പുതിയ രണ്ട് എൽഇഡി ലൈറ്റുകൾ ഫിറ്റ് ചെയ്യണം',
  ],
  Carpentry: [
    'മുറിയുടെ വാതിൽ ശരിയായി പൂട്ടാൻ പറ്റുന്നില്ല',
    'കിച്ചൻ കബോർഡിന്റെ ഹിഞ്ചുകൾ ലൂസായി',
    'കട്ടിലിന്റെ പലക ഇളകിയിട്ടുണ്ട്, ശരിയാക്കണം',
    'കർട്ടൻ റോഡ് ഡ്രിൽ ചെയ്ത് ഉറപ്പിക്കണം',
  ],
  General: [
    'അടിയന്തിരമായി ഇന്നുതന്നെ ഒരാളെ വേണം',
    'വീട്ടുസാധനങ്ങൾ അറ്റകുറ്റപ്പണി ചെയ്യാൻ സഹായം വേണം',
    'വളരെ അത്യാവശ്യമായ ഒരു പണിയാണ്',
  ],
};

export default function MalayalamInputBox({
  value,
  onChange,
  selectedCategory = 'Plumbing',
  placeholder = 'നിങ്ങളുടെ ആവശ്യം മലയാളത്തിൽ ഇവിടെ കുറിക്കുക (ഉദാ: ബാത്ത്റൂമിലെ പൈപ്പിൽ ലീക്കുണ്ട്, പുതിയ ടാപ്പ് മാറ്റണം)...',
  label = 'നിങ്ങളുടെ ആവശ്യത്തിന്റെ വിവരണം (Malayalam Description)',
  required = false,
}: MalayalamInputBoxProps) {
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
      setTimedNotice('വോയ്സ് ടൈപ്പിംഗ് നിർത്തി (Stopped)', 2000);
      return;
    }

    if (!speechSupported) {
      setTimedNotice('നിങ്ങളുടെ ബ്രൗസറിൽ മൈക്രോഫോൺ സ്പീച്ച് സപ്പോർട്ടില്ല. ദയവായി നേരിട്ട് ടൈപ്പ് ചെയ്യുക.', 4000);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ml-IN'; // Malayalam India
      recognition.continuous = false;
      recognition.interimResults = false;
      recognitionRef.current = recognition;

      recognition.onstart = () => {
        setIsListening(true);
        setTimedNotice('മലയാളത്തിൽ സംസാരിക്കൂ... (Listening in Malayalam)', 6000);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          const newVal = value ? `${value} ${transcript}` : transcript;
          onChange(newVal);
          setTimedNotice(`ചേർത്തു: "${transcript}"`, 3000);
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
        setTimedNotice('ശബ്ദം വ്യക്തമായില്ല, ദയവായി വീണ്ടും ശ്രമിക്കുക.', 3000);
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
      // already exists, don't duplicate
      return;
    } else {
      onChange(`${value.trim()}, ${phrase}`);
    }
  };

  const activeCategoryPhrases =
    COMMON_PHRASES[selectedCategory] || COMMON_PHRASES.Plumbing;

  return (
    <div className="w-full space-y-2">
      {/* Label and Voice typing toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label 
          htmlFor="malayalam-description-input" 
          className="text-sm font-semibold text-stone-800 flex items-center gap-2 font-malayalam"
        >
          <MessageSquare className="w-4 h-4 text-emerald-700" />
          <span>{label}</span>
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
            title="മലയാളത്തിൽ സംസാരിച്ച് ടൈപ്പ് ചെയ്യുക"
          >
            {isListening ? (
              <>
                <MicOff className="w-3.5 h-3.5" />
                <span>കേൾക്കുന്നു... (Stop)</span>
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5 text-emerald-600" />
                <span>വോയ്സ് ടൈപ്പിംഗ് (Speak)</span>
              </>
            )}
          </button>

          {/* Help toggle */}
          <button
            type="button"
            onClick={() => setShowHelper(!showHelper)}
            className="text-stone-400 hover:text-stone-600 p-1"
            title="Manglish / മലയാളം ടൈപ്പിംഗ് ടിപ്പുകൾ"
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
            💡 മലയാളം ടൈപ്പിംഗ് ടിപ്പുകൾ (Typing Tips):
          </p>
          <p>
            • മൊബൈലിൽ ഗൂഗിൾ ഇൻഡിക് കീബോർഡ് (Google Indic Keyboard / Gboard) ഉപയോഗിച്ച് മലയാളത്തിൽ നേരിട്ട് ടൈപ്പ് ചെയ്യാം.
          </p>
          <p>
            • ഇംഗ്ലീഷ് അക്ഷരങ്ങളിൽ &quot;Manglish&quot; ആയും എഴുതാവുന്നതാണ് (ഉദാ: <em>Pipe leak aanu, switch trip aavunnu</em>).
          </p>
          <p>
            • താഴെയുള്ള റെഡിമെയ്ഡ് വാചകങ്ങളിൽ ക്ലിക്ക് ചെയ്താലും മതിയാകും.
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
          placeholder={placeholder}
          className="w-full p-3.5 text-sm sm:text-base text-stone-800 placeholder-stone-400 bg-transparent rounded-xl focus:outline-none resize-y font-malayalam leading-relaxed"
          dir="auto"
        />

        {/* Textarea bottom bar with character counter & clear action */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-stone-100 bg-stone-50/70 rounded-b-xl text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-malayalam">മലയാളം അല്ലെങ്കിൽ Manglish പിന്തുണയ്ക്കുന്നു</span>
          </div>

          <div className="flex items-center gap-3">
            <span>{value.length} അക്ഷരങ്ങൾ</span>
            {value.length > 0 && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-stone-400 hover:text-red-500 inline-flex items-center gap-0.5 transition-colors"
                title="ക്ലിയർ ചെയ്യുക"
              >
                <RotateCcw className="w-3 h-3" />
                <span>മായ്ക്കുക</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Clickable Malayalam Task Snippet Chips */}
      <div className="pt-1">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 font-sans">
            പെട്ടെന്ന് തിരഞ്ഞെടുക്കാവുന്ന വാചകങ്ങൾ (Quick Suggestions):
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {activeCategoryPhrases.map((phrase, idx) => {
            const isAdded = value.includes(phrase);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleInsertPhrase(phrase)}
                className={`text-xs px-2.5 py-1 rounded-full transition-all flex items-center gap-1 font-malayalam ${
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
