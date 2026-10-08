'use client';

import React from 'react';
import { 
  Wrench, 
  Wallet, 
  MapPin, 
  CheckCircle2, 
  CalendarCheck, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';

interface TechnicianPerksProps {
  onJoinAsTech: () => void;
}

export default function TechnicianPerks({ onJoinAsTech }: TechnicianPerksProps) {
  const perks = [
    {
      icon: Wallet,
      titleMl: 'സീറോ കമ്മീഷൻ തുടക്കത്തിൽ',
      desc: 'വലിയ കമ്പനികൾ ചെയ്യുന്നതുപോലെ ഉയർന്ന കമ്മീഷൻ തട്ടിയെടുക്കലുകളില്ല. അധ്വാനിക്കുന്ന കാശ് പൂർണ്ണമായും നിങ്ങൾക്ക്.',
    },
    {
      icon: MapPin,
      titleMl: 'വീടിനടുത്തുള്ള പണികൾ മാത്രം',
      desc: 'എറണാകുളത്തെ മുഴുവൻ ട്രാഫിക്കിലും ഓടേണ്ടതില്ല. കാക്കനാട്, ആലുവ, ഇടപ്പള്ളി തുടങ്ങി നിങ്ങൾക്കിഷ്ടമുള്ള 5-8 കി.മീ പരിധിയിൽ മാത്രം ജോലി.',
    },
    {
      icon: CalendarCheck,
      titleMl: 'നിങ്ങളുടെ സൗകര്യത്തിനനുസരിച്ച് സമയം',
      desc: 'ഫുൾ ടൈം ആയോ പാർട്ട് ടൈം ആയോ ജോലി ചെയ്യാം. എപ്പോൾ വേണമെങ്കിലും ആപ്പ് ഓൺ/ഓഫ് ചെയ്യാനുള്ള സ്വാതന്ത്ര്യം.',
    },
    {
      icon: ShieldCheck,
      titleMl: 'നേരിട്ട് അക്കൗണ്ടിലേക്ക് പണം',
      desc: 'പണി തീർന്ന ഉടൻ തന്നെ ഉപഭോക്താവിൽ നിന്നോ UPI വഴിയോ നേരിട്ട് തുക അക്കൗണ്ടിൽ ലഭ്യമാകും.',
    },
  ];

  return (
    <section id="technicians" className="py-16 bg-gradient-to-b from-stone-900 to-emerald-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>പ്ലംബർ, ഇലക്ട്രീഷ്യൻ, കാർപെന്റർ ചേട്ടന്മാർക്കായി</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-malayalam leading-tight">
              നിങ്ങളുടെ കൈത്തൊഴിലിന് അർഹമായ വിലയും കൂടുതൽ വരുമാനവും!
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-malayalam leading-relaxed">
              കൊച്ചിയിലെ ആയിരക്കണക്കിന് വീടുകളിലേക്കും ഫ്ലാറ്റുകളിലേക്കും നിങ്ങളെ നേരിട്ട് ബന്ധിപ്പിക്കുന്നു. നിങ്ങളുടെ തൊഴിൽ വൈദഗ്ദ്ധ്യം കാര്യസ്ഥനിലൂടെ കൂടുതൽ ആളുകളിലേക്ക് എത്തിക്കാം.
            </p>

            <div className="pt-2">
              <button
                onClick={onJoinAsTech}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all font-malayalam"
              >
                <span>തൊഴിലാളിയായി രജിസ്റ്റർ ചെയ്യാം</span>
                <ArrowRight className="w-4 h-4 text-emerald-950" />
              </button>
            </div>
          </div>

          {/* Right Perks Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {perks.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white font-malayalam mb-1.5">
                    {p.titleMl}
                  </h4>
                  <p className="text-xs text-stone-300 font-malayalam leading-relaxed">
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
