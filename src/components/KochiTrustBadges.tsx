'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Coins, 
  MapPin, 
  MessageCircle, 
  HeartHandshake, 
  ThumbsUp, 
  TrainTrack 
} from 'lucide-react';

export default function KochiTrustBadges() {
  const features = [
    {
      icon: Clock,
      titleMl: '30-45 മിനിറ്റിൽ എത്തും',
      titleEn: 'Kochi Express Response',
      desc: 'കൊച്ചി മെട്രോ റൂട്ടിലും (ആലുവ മുതൽ തൃപ്പൂണിത്തുറ വരെ) കാക്കനാട് ഇൻഫോപാർക്ക് മേഖലയിലും അതിവേഗ സേവനം.',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      icon: ShieldCheck,
      titleMl: '100% പോലീസ് വെരിഫൈഡ്',
      titleEn: 'Verified Background Checks',
      desc: 'ഓരോ തൊഴിലാളിയുടെയും തിരിച്ചറിയൽ കാർഡുകളും പോലീസ് ക്ലിയറൻസും പരിശോധിച്ച ശേഷം മാത്രം പ്രവേശനം.',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      icon: Coins,
      titleMl: 'സുതാര്യമായ നിരക്കുകൾ',
      titleEn: 'No Hidden Charges',
      desc: 'പണി തുടങ്ങുന്നതിന് മുൻപ് തന്നെ കൃത്യമായ കൂലി എസ്റ്റിമേറ്റ്. അനാവശ്യ ചിലവുകളോ പറ്റിക്കലോ ഇല്ല.',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      icon: MessageCircle,
      titleMl: 'നമ്മുടെ നാട്ടിലെ ചേട്ടന്മാർ',
      titleEn: 'Malayalam Speaking Techs',
      desc: 'നിങ്ങളുടെ ഭാഷ മനസ്സിലാക്കുന്ന, കൊച്ചിയുടെ സംസ്കാരം അറിയുന്ന വിശ്വസ്തരായ നാട്ടുകാരായ തൊഴിലാളികൾ.',
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
            <span>എന്തുകൊണ്ട് കാര്യസ്ഥൻ? (Why Karyasthan?)</span>
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight font-malayalam">
            കൊച്ചിക്കാർ കാര്യസ്ഥനെ വിശ്വസിക്കുന്ന കാരണങ്ങൾ
          </h2>
          <p className="text-sm text-stone-500 mt-2">
            Built from the ground up for Ernakulam & Kochi neighborhoods with trust at the core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-50/70 border border-stone-200/80 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all duration-200 hover:shadow-sm"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.color} border`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 font-malayalam mb-1">
                  {feat.titleMl}
                </h3>
                <p className="text-xs font-semibold text-stone-500 font-sans uppercase tracking-wider mb-2">
                  {feat.titleEn}
                </p>
                <p className="text-xs text-stone-600 font-malayalam leading-relaxed">
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
            <span className="font-semibold text-emerald-100 font-malayalam text-sm">
              ആദ്യഘട്ട ലോഞ്ച് പ്രദേശങ്ങൾ (Phase 1 Coverage):
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
