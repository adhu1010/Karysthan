'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-stone-100 border border-stone-200/90 shadow-2xs ${className}`}
      role="group"
      aria-label="Language Selector"
    >
      <Globe className="w-3.5 h-3.5 text-stone-500 ml-1.5 mr-1 shrink-0" />
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
          language === 'en'
            ? 'bg-emerald-800 text-white shadow-xs scale-100 font-bold'
            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
        }`}
        aria-pressed={language === 'en'}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ml')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-lg font-malayalam transition-all duration-200 ${
          language === 'ml'
            ? 'bg-emerald-800 text-white shadow-xs scale-100 font-bold'
            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
        }`}
        aria-pressed={language === 'ml'}
      >
        മലയാളം
      </button>
    </div>
  );
}
