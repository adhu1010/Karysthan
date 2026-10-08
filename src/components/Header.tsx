'use client';

import React from 'react';
import { Wrench, Database, CheckCircle2, ChevronRight } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  onOpenSetupModal?: () => void;
}

export default function Header({ onOpenSetupModal }: HeaderProps) {
  const isConfigured = isSupabaseConfigured();
  const { language } = useLanguage();
  const t = translations[language].header;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 transition-all">
      {/* Hyperlocal top announcement bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-emerald-200">{t.announcement}</span>
            <span className="hidden sm:inline text-emerald-300/70">|</span>
            <span className="hidden sm:inline text-emerald-300/90 text-[11px]">
              {t.hubs}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[11px]">
            {isConfigured ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {t.supabaseConnected}
              </span>
            ) : (
              <button
                onClick={onOpenSetupModal}
                className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 px-2 py-0.5 rounded border border-amber-500/30 transition-colors"
                title="Click to view Supabase setup instructions"
              >
                <Database className="w-3 h-3 text-amber-400" />
                {t.demoMode}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 ring-2 ring-emerald-500/20">
            <Wrench className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-black tracking-tight text-emerald-950 ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
                {language === 'ml' ? 'കാര്യസ്ഥൻ' : 'Karyasthan'}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-sans hidden sm:inline">
                {language === 'ml' ? 'Karyasthan' : 'കാര്യസ്ഥൻ'}
              </span>
            </div>
            <p className={`text-[11px] font-medium text-stone-500 tracking-wide ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Center navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a href="#category-section" className="hover:text-emerald-700 transition-colors">
            {t.navServices}
          </a>
          <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">
            {t.navHowItWorks}
          </a>
          <a href="#technicians" className="hover:text-emerald-700 transition-colors">
            {t.navForTechs}
          </a>
          <a href="#faq" className="hover:text-emerald-700 transition-colors">
            {t.navFaq}
          </a>
        </nav>

        {/* Actions & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Prominent Language Switcher */}
          <LanguageToggle />

          <a
            href="#waitlist"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-medium text-xs sm:text-sm px-3.5 sm:px-5 py-2.5 rounded-xl shadow-md shadow-emerald-900/20 hover:shadow-lg transition-all active:scale-[0.98] shrink-0"
          >
            <span>{t.joinWaitlist}</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
