'use client';

import React from 'react';
import { 
  ClipboardCheck, 
  UserCheck, 
  CreditCard, 
  Sparkles, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      titleMl: 'ആവശ്യം തിരഞ്ഞെടുക്കുക',
      titleEn: 'Choose Task & Describe',
      desc: 'പ്ലംബിംഗ്, ഇലക്ട്രിക്കൽ, അല്ലെങ്കിൽ ആശാരിപ്പണി തിരഞ്ഞെടുത്ത് നിങ്ങളുടെ പ്രശ്നം മലയാളത്തിലോ ഇംഗ്ലീഷിലോ എഴുതുക.',
      badge: '1 മിനിറ്റ് പ്രക്രിയ',
    },
    {
      step: '02',
      titleMl: 'വിദഗ്ദ്ധ തൊഴിലാളി എത്തുന്നു',
      titleEn: 'Verified Tech Arrives',
      desc: 'നിങ്ങളുടെ കൊച്ചി ലൊക്കേഷനിലുള്ള അടുത്തുള്ള പരിശോധിച്ചുറപ്പിച്ച കാര്യസ്ഥൻ ചേട്ടൻ 30-45 മിനിറ്റിനുള്ളിൽ വീട്ടിലെത്തും.',
      badge: 'തത്സമയ ട്രാക്കിംഗ്',
    },
    {
      step: '03',
      titleMl: 'പണി പൂർത്തിയാക്കി പണം നൽകുക',
      titleEn: 'Fair Inspection & UPI Pay',
      desc: 'കൃത്യമായ വില ഉറപ്പുവരുത്തി പണി തീർത്ത ശേഷം മാത്രം നേരിട്ടോ GPay/PhonePe വഴിയോ പണം കൈമാറുക.',
      badge: 'സുരക്ഷിത പേയ്‌മെന്റ്',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ലളിതമായ 3 ഘട്ടങ്ങൾ</span>
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight font-malayalam">
            കാര്യസ്ഥൻ എങ്ങനെ പ്രവർത്തിക്കുന്നു?
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            How Karyasthan connects Kochi households with local craftsmen in 3 effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all"
            >
              <div className="text-5xl font-black text-stone-100 absolute top-4 right-4 pointer-events-none group-hover:text-emerald-50 transition-colors">
                {s.step}
              </div>

              <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/60 mb-4">
                {s.badge}
              </div>

              <h3 className="text-xl font-bold text-stone-900 font-malayalam mb-1">
                {s.titleMl}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3 font-sans">
                {s.titleEn}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 font-malayalam leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
