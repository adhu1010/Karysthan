'use client';

import React from 'react';
import { Wrench, MapPin, Phone, Mail, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import LanguageToggle from './LanguageToggle';

interface FooterProps {
  onOpenSetupModal?: () => void;
}

export default function Footer({ onOpenSetupModal }: FooterProps) {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className={`text-2xl font-black text-white ${language === 'ml' ? 'font-malayalam' : 'font-sans'}`}>
                  {language === 'ml' ? 'കാര്യസ്ഥൻ' : 'Karyasthan'}
                </span>
                <span className="text-xs uppercase font-bold text-emerald-400 block tracking-wider font-sans">
                  Karyasthan Kochi
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              {t.desc}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{t.location}</span>
            </div>

            <div className="pt-2">
              <LanguageToggle className="bg-stone-900 border-stone-800 text-stone-300" />
            </div>
          </div>

          {/* Service Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              {t.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#category-section" className="hover:text-emerald-400 transition-colors">
                  {language === 'ml' ? 'പ്ലംബിംഗ് സർവീസ്' : 'Plumbing Services'}
                </a>
              </li>
              <li>
                <a href="#category-section" className="hover:text-emerald-400 transition-colors">
                  {language === 'ml' ? 'ഇലക്ട്രിക്കൽ വർക്കുകൾ' : 'Electrical Repair'}
                </a>
              </li>
              <li>
                <a href="#category-section" className="hover:text-emerald-400 transition-colors">
                  {language === 'ml' ? 'ആശാരിപ്പണി' : 'Carpentry & Furniture'}
                </a>
              </li>
              <li>
                <a href="#category-section" className="hover:text-emerald-400 transition-colors">
                  {language === 'ml' ? 'വാട്ടർപ്രൂഫിംഗ് & പെയിന്റിംഗ്' : 'Waterproofing & Painting'}
                </a>
              </li>
              <li>
                <a href="#category-section" className="hover:text-emerald-400 transition-colors">
                  {language === 'ml' ? 'ഹോം അപ്ലയൻസസ് റിപ്പയർ' : 'Appliance Repair'}
                </a>
              </li>
            </ul>
          </div>

          {/* Localities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              {t.localitiesTitle}
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>{language === 'ml' ? 'കാക്കനാട് (Kakkanad)' : 'Kakkanad / Infopark'}</li>
              <li>{language === 'ml' ? 'ഇടപ്പള്ളി (Edappally)' : 'Edappally Toll'}</li>
              <li>{language === 'ml' ? 'വൈറ്റില (Vyttila)' : 'Vyttila Mobility Hub'}</li>
              <li>{language === 'ml' ? 'ആലുവ (Aluva)' : 'Aluva Metro Corridor'}</li>
              <li>{language === 'ml' ? 'പാലാരിവട്ടം (Palarivattom)' : 'Palarivattom'}</li>
              <li>{language === 'ml' ? 'ഫോർട്ട് കൊച്ചി (Fort Kochi)' : 'Fort Kochi & Mattancherry'}</li>
            </ul>
          </div>

          {/* Contact & Settings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              {t.companyTitle}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 94000 00000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@karyasthan.in</span>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onOpenSetupModal}
                  className="text-stone-400 hover:text-amber-400 underline block"
                >
                  Supabase Schema & Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            {t.copyright}
          </p>
          <div className="flex items-center gap-1">
            <span>{t.tagline}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
