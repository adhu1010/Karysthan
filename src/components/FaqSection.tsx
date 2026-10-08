'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function FaqSection() {
  const { language } = useLanguage();
  const t = translations[language].faq;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 bg-white border-b border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-stone-600" />
            <span>{t.badge}</span>
          </div>
          <h2 className={`text-3xl font-extrabold text-stone-900 tracking-tight ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
            {t.heading}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {t.subheading}
          </p>
        </div>

        <div className="space-y-3">
          {t.items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200/90 overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-stone-50/60 transition-colors"
                >
                  <span className={`text-base font-bold text-stone-900 ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
                    {faq.q}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 text-stone-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 animate-fade-in leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
