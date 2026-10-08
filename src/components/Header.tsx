'use client';

import React, { useState } from 'react';
import { Wrench, MapPin, Database, CheckCircle2, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

interface HeaderProps {
  onOpenSetupModal?: () => void;
}

export default function Header({ onOpenSetupModal }: HeaderProps) {
  const isConfigured = isSupabaseConfigured();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-900/10 transition-all">
      {/* Hyperlocal top announcement bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-emerald-200">കൊച്ചിയിൽ ഉടൻ ആരംഭിക്കുന്നു!</span>
            <span className="hidden sm:inline text-emerald-300/70">|</span>
            <span className="hidden sm:inline text-emerald-300/90 text-[11px]">
              Kakkanad • Edappally • Aluva • Vyttila • Fort Kochi • Palarivattom
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[11px]">
            {isConfigured ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Supabase Connected
              </span>
            ) : (
              <button
                onClick={onOpenSetupModal}
                className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 px-2 py-0.5 rounded border border-amber-500/30 transition-colors"
                title="Click to view Supabase setup instructions"
              >
                <Database className="w-3 h-3 text-amber-400" />
                Demo Mode (Click to connect Supabase)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 ring-2 ring-emerald-500/20">
            <Wrench className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-tight text-emerald-950 font-malayalam">
                കാര്യസ്ഥൻ
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-emerald-700 font-sans hidden sm:inline">
                Karyasthan
              </span>
            </div>
            <p className="text-[11px] font-medium text-stone-500 tracking-wide font-malayalam">
              കൊച്ചിയുടെ സ്വന്തം ഓൺ-ഡിമാൻഡ് സഹായം
            </p>
          </div>
        </div>

        {/* Center navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#categories" className="hover:text-emerald-700 transition-colors">
            സേവനങ്ങൾ <span className="text-xs text-stone-400">(Services)</span>
          </a>
          <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">
            പ്രവർത്തനം <span className="text-xs text-stone-400">(How it works)</span>
          </a>
          <a href="#technicians" className="hover:text-emerald-700 transition-colors">
            തൊഴിലാളികൾക്കായി <span className="text-xs text-stone-400">(For Technicians)</span>
          </a>
          <a href="#faq" className="hover:text-emerald-700 transition-colors">
            സംശയങ്ങൾ <span className="text-xs text-stone-400">(FAQ)</span>
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-medium text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-md shadow-emerald-900/20 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <span>വെയ്റ്റ്‌ലിസ്റ്റിൽ ചേരൂ</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
