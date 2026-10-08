'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqSection() {
  const faqs = [
    {
      qMl: 'കാര്യസ്ഥൻ എപ്പോഴാണ് കൊച്ചിയിൽ സർവീസ് ആരംഭിക്കുന്നത്?',
      qEn: 'When will Karyasthan launch operations in Kochi?',
      a: 'വെയ്റ്റ്‌ലിസ്റ്റ് രജിസ്ട്രേഷൻ പൂർത്തിയായ ഉടൻ കാക്കനാട്, ഇടപ്പള്ളി, ആലുവ, ഫോർട്ട് കൊച്ചി മേഖലകളിൽ ആദ്യഘട്ട ലോഞ്ച് ആരംഭിക്കും. വെയ്റ്റ്‌ലിസ്റ്റിൽ ഉള്ളവർക്ക് ആദ്യ ആഴ്ചകളിൽ മുൻഗണനയും പ്രത്യേക ഡിസ്കൗണ്ടുകളും ലഭിക്കും.',
    },
    {
      qMl: 'പ്ലംബിംഗ്, ഇലക്ട്രിക്കൽ ജോലികളുടെ നിരക്ക് എങ്ങനെയാണ് കണക്കാക്കുന്നത്?',
      qEn: 'How are the service charges calculated?',
      a: 'സാധാരണ പരിശോധനകൾക്ക് ₹249 മുതൽ ആരംഭിക്കുന്ന നിശ്ചിത പരിശോധനാ നിരക്കാണുള്ളത്. കൂടുതൽ അറ്റകുറ്റപ്പണികൾക്ക് പണി തുടങ്ങുന്നതിന് മുൻപ് തന്നെ തൊഴിലാളി കൃത്യമായ എസ്റ്റിമേറ്റ് പറയും. ഉപഭോക്താവിന്റെ സമ്മതത്തോടെ മാത്രമേ പണി ആരംഭിക്കൂ.',
    },
    {
      qMl: 'മലയാളത്തിൽ മാത്രം സംസാരിക്കുന്നവർക്ക് കാര്യസ്ഥൻ ഉപയോഗിക്കാൻ പറ്റുമോ?',
      qEn: 'Can I use Karyasthan entirely in Malayalam?',
      a: 'തീർച്ചയായും! കാര്യസ്ഥൻ പൂർണ്ണമായും മലയാളികൾക്കായി രൂപകൽപ്പന ചെയ്തതാണ്. ഞങ്ങളുടെ ആപ്പും ടെക്നീഷ്യൻമാരും പൂർണ്ണമായും മലയാളത്തിൽ സംസാരിക്കുകയും കാര്യങ്ങൾ മനസ്സിലാക്കുകയും ചെയ്യുന്നവരാണ്.',
    },
    {
      qMl: 'തൊഴിലാളികൾക്ക് ജോയിൻ ചെയ്യാൻ രജിസ്ട്രേഷൻ ഫീസോ മുൻകൂർ പണമോ ആവശ്യമുണ്ടോ?',
      qEn: 'Is there any joining fee or deposit for technicians?',
      a: 'ഇല്ല. ആദ്യഘട്ടത്തിൽ ചേരുന്ന തൊഴിലാളി ചേട്ടന്മാർക്ക് രജിസ്ട്രേഷൻ തികച്ചും സൗജന്യമാണ്. ആധാർ കാർഡും തൊഴിൽ പരിചയ പരിശോധനയും മാത്രമാണ് ഇതിനായി ആവശ്യമുള്ളത്.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 bg-white border-b border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-stone-600" />
            <span>സംശയങ്ങളും ഉത്തരങ്ങളും</span>
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight font-malayalam">
            പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Frequently Asked Questions for Kochi Residents & Service Providers
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
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
                  <div>
                    <h4 className="text-base font-bold text-stone-900 font-malayalam">
                      {faq.qMl}
                    </h4>
                    <p className="text-xs text-stone-400 font-sans mt-0.5">{faq.qEn}</p>
                  </div>
                  <div className="text-stone-400 shrink-0 mt-1">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-700" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 font-malayalam leading-relaxed border-t border-stone-100 bg-emerald-50/20">
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
