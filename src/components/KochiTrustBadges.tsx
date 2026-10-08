'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Coins, 
  MapPin, 
  MessageCircle, 
  HeartHandshake
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function KochiTrustBadges() {
  const { language } = useLanguage();
  const t = translations[language].trust;

  const icons = [Clock, ShieldCheck, Coins, MessageCircle];
  const colors = [
    'bg-emerald-50 text-emerald-700 border-emerald-200',
    'bg-blue-50 text-blue-700 border-blue-200',
    'bg-amber-50 text-amber-700 border-amber-200',
    'bg-teal-50 text-teal-700 border-teal-200',
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className={`text-3xl font-extrabold text-stone-900 tracking-tight ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
            {t.heading}
          </h2>
          <p className="text-sm text-stone-500 mt-2">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.badges.map((feat, idx) => {
            const Icon = icons[idx] || ShieldCheck;
            const colorClass = colors[idx] || colors[0];
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-50/70 border border-stone-200/80 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all duration-200 hover:shadow-sm"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClass} border`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold text-stone-900 mb-2 ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
                  {feat.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Hyperlocal coverage ticker */}
        <div className="mt-12 p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="font-semibold text-emerald-100 text-sm">
              {language === 'ml' ? 'ആദ്യഘട്ട ലോഞ്ച് പ്രദേശങ്ങൾ (Phase 1 Coverage):' : 'Phase 1 Kochi Launch Neighborhoods:'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-emerald-200 font-mono text-[11px]">
            {['Kakkanad', 'Edappally', 'Vyttila', 'Aluva', 'Palarivattom', 'Fort Kochi', 'Kaloor', 'Tripunithura'].map((spot, i) => (
              <span key={i} className="bg-emerald-800/80 px-2.5 py-1 rounded-md border border-emerald-700">
                {spot}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
