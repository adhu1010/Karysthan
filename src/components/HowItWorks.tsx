'use client';

import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function HowItWorks() {
  const { language } = useLanguage();
  const t = translations[language].howItWorks;

  return (
    <section id="how-it-works" className="py-16 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.badge}</span>
          </div>
          <h2 className={`text-3xl font-extrabold text-stone-900 tracking-tight ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
            {t.heading}
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {t.steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all"
            >
              <div className="text-5xl font-black text-stone-100 absolute top-4 right-4 pointer-events-none group-hover:text-emerald-50 transition-colors">
                {s.num}
              </div>

              <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/60 mb-4">
                {s.badge}
              </div>

              <h3 className={`text-xl font-bold text-stone-900 mb-2 ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
