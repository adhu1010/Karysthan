'use client';

import React from 'react';
import { 
  Wallet, 
  MapPin, 
  CalendarCheck, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface TechnicianPerksProps {
  onJoinAsTech: () => void;
}

export default function TechnicianPerks({ onJoinAsTech }: TechnicianPerksProps) {
  const { language } = useLanguage();
  const t = translations[language].techPerks;

  const icons = [Wallet, MapPin, CalendarCheck, ShieldCheck];

  return (
    <section id="technicians" className="py-16 bg-gradient-to-b from-stone-900 to-emerald-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>{t.badge}</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
              {t.heading}
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {t.desc}
            </p>

            <div className="pt-2">
              <button
                onClick={onJoinAsTech}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-4 h-4 text-emerald-950" />
              </button>
            </div>
          </div>

          {/* Right Perks Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.perks.map((p, idx) => {
              const Icon = icons[idx] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 hover:bg-white/10 transition-all backdrop-blur-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-bold text-white mb-1.5 ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
