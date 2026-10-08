'use client';

import React from 'react';
import { Wrench, MapPin, Phone, Mail, Heart } from 'lucide-react';

interface FooterProps {
  onOpenSetupModal?: () => void;
}

export default function Footer({ onOpenSetupModal }: FooterProps) {
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
                <span className="text-2xl font-black text-white font-malayalam">
                  കാര്യസ്ഥൻ
                </span>
                <span className="text-xs uppercase font-bold text-emerald-400 block tracking-wider font-sans">
                  Karyasthan Kochi
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 font-malayalam leading-relaxed max-w-sm">
              കൊച്ചിയിലെ വീടുകൾക്കും സ്ഥാപനങ്ങൾക്കുമായി വിശ്വസ്തരായ പ്ലംബർ, ഇലക്ട്രീഷ്യൻ, ആശാരി ചേട്ടന്മാരെ അതിവേഗം ലഭ്യമാക്കുന്ന ഓൺ-ഡിമാൻഡ് പ്ലാറ്റ്ഫോം.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Headquartered in Infopark Kochi, Kerala</span>
            </div>
          </div>

          {/* Service Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              സേവനങ്ങൾ (Services)
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-malayalam">
              <li>
                <a href="#category-section" className="hover:text-emerald-400 transition-colors">
                  പ്ലംബിംഗ് സർവീസ് (Plumbing)
                </a>
              </li>
              <li>
                <a href="#category-section" className="hover:text-emerald-400 transition-colors">
                  ഇലക്ട്രിക്കൽ വർക്കുകൾ (Electrical)
                </a>
              </li>
              <li>
                <a href="#category-section" className="hover:text-emerald-400 transition-colors">
                  ആശാരിപ്പണി (Carpentry)
                </a>
              </li>
              <li>
                <a href="#category-section" className="hover:text-emerald-400 transition-colors">
                  വാട്ടർപ്രൂഫിംഗ് & പെയിന്റിംഗ്
                </a>
              </li>
              <li>
                <a href="#category-section" className="hover:text-emerald-400 transition-colors">
                  ഹോം അപ്ലയൻസസ് റിപ്പയർ
                </a>
              </li>
            </ul>
          </div>

          {/* Localities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              പ്രദേശങ്ങൾ (Kochi Hubs)
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>കാക്കനാട് (Kakkanad)</li>
              <li>ഇടപ്പള്ളി (Edappally)</li>
              <li>വൈറ്റില (Vyttila)</li>
              <li>ആലുവ (Aluva)</li>
              <li>പാലാരിവട്ടം (Palarivattom)</li>
              <li>ഫോർട്ട് കൊച്ചി (Fort Kochi)</li>
            </ul>
          </div>

          {/* Contact & Developer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              ബന്ധപ്പെടുക (Help & Dev)
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
          <p className="font-malayalam">
            © {new Date().getFullYear()} കാര്യസ്ഥൻ (Karyasthan). All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Kochi, Kerala</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
