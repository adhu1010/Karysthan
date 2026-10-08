'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Wrench, 
  Zap, 
  Hammer, 
  Users 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface HeroProps {
  onSelectCategory: (category: string) => void;
  onSetRole: (role: 'customer' | 'technician') => void;
}

export default function Hero({ onSelectCategory, onSetRole }: HeroProps) {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const categoryPills = [
    { name: t.plumbing, id: 'Plumbing', icon: Wrench, color: 'hover:border-blue-300 hover:bg-blue-50/50' },
    { name: t.electrical, id: 'Electrical', icon: Zap, color: 'hover:border-amber-300 hover:bg-amber-50/50' },
    { name: t.carpentry, id: 'Carpentry', icon: Hammer, color: 'hover:border-orange-300 hover:bg-orange-50/50' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Kochi badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-medium mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold">{t.badge}</span>
            <span className="text-emerald-500">•</span>
            <span className="text-emerald-700">{t.badgeSub}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.2] mb-6">
            {t.titleLine1}{' '}
            <span className="bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700 bg-clip-text text-transparent underline decoration-amber-400 decoration-wavy decoration-2">
              {t.titleStress}
            </span>
            <br />
            <span className={`text-stone-800 text-3xl sm:text-4xl lg:text-5xl block mt-2 font-bold ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
              {t.titleLine2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            {t.desc}
          </p>

          {/* Dual Action CTAs for Customers and Technicians */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="#waitlist"
              onClick={() => onSetRole('customer')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-base shadow-lg shadow-emerald-900/25 hover:shadow-xl transition-all duration-200 group"
            >
              <span>{t.ctaCustomer}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#waitlist"
              onClick={() => onSetRole('technician')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-300 font-semibold text-base transition-all duration-200 shadow-sm"
            >
              <Users className="w-4 h-4 text-amber-700" />
              <span>{t.ctaTech}</span>
            </a>
          </div>

          {/* Quick category pills */}
          <div className="pt-2 pb-6 border-t border-stone-200/60 max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              {t.categoryPrompt}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {categoryPills.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectCategory(item.id);
                    const el = document.getElementById('category-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 text-xs font-medium shadow-2xs transition-all ${item.color}`}
                >
                  <item.icon className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Micro trust highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-4xl mx-auto mt-4">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-emerald-100 shadow-2xs">
              <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-stone-900">{language === 'ml' ? '30-45 മിനിറ്റ്' : '30-45 Mins'}</p>
                <p className="text-[11px] text-stone-500">{language === 'ml' ? 'വേഗത്തിലുള്ള സേവനം' : 'Express Response'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-emerald-100 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-stone-900">{language === 'ml' ? '100% വെരിഫൈഡ്' : '100% Verified'}</p>
                <p className="text-[11px] text-stone-500">{language === 'ml' ? 'പോലീസ് & ID പരിശോധന' : 'Police & ID Checked'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-emerald-100 shadow-2xs">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-stone-900">{language === 'ml' ? 'ന്യായമായ കൂലി' : 'Fair Rates'}</p>
                <p className="text-[11px] text-stone-500">{language === 'ml' ? 'മറച്ചുവെച്ച നിരക്കുകളില്ല' : 'No Hidden Charges'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-emerald-100 shadow-2xs">
              <MapPin className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-stone-900">{language === 'ml' ? 'നാട്ടിലെ ആൾക്കാർ' : 'Local Craftsmen'}</p>
                <p className="text-[11px] text-stone-500">{language === 'ml' ? 'വിശ്വസ്തരായ തൊഴിലാളികൾ' : 'Trusted Kochi Handymen'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
