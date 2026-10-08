'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  User, 
  Wrench, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Share2, 
  Hammer, 
  Zap,
  Clock,
  Briefcase,
  ChevronDown
} from 'lucide-react';
import MalayalamInputBox from './MalayalamInputBox';
import { submitWaitlistEntry, isSupabaseConfigured, WaitlistEntry } from '@/lib/supabase';

// Popular Kochi localities
export const KOCHI_LOCALITIES = [
  { id: 'kakkanad', nameEn: 'Kakkanad / Infopark', nameMl: 'കാക്കനാട് / ഇൻഫോപാർക്ക്' },
  { id: 'edappally', nameEn: 'Edappally', nameMl: 'ഇടപ്പള്ളി' },
  { id: 'vyttila', nameEn: 'Vyttila Hub', nameMl: 'വൈറ്റില' },
  { id: 'aluva', nameEn: 'Aluva', nameMl: 'ആലുവ' },
  { id: 'fort_kochi', nameEn: 'Fort Kochi / Mattancherry', nameMl: 'ഫോർട്ട് കൊച്ചി / മട്ടാഞ്ചേരി' },
  { id: 'palarivattom', nameEn: 'Palarivattom', nameMl: 'പാലാരിവട്ടം' },
  { id: 'kaloor', nameEn: 'Kaloor', nameMl: 'കലൂർ' },
  { id: 'panampilly_nagar', nameEn: 'Panampilly Nagar', nameMl: 'പനമ്പിള്ളി നഗർ' },
  { id: 'kadavanthra', nameEn: 'Kadavanthra', nameMl: 'കടവന്ത്ര' },
  { id: 'thrikkakara', nameEn: 'Thrikkakara', nameMl: 'തൃക്കാക്കര' },
  { id: 'kalamassery', nameEn: 'Kalamassery', nameMl: 'കളമശ്ശേരി' },
  { id: 'tripunithura', nameEn: 'Tripunithura', nameMl: 'തൃപ്പൂണിത്തുറ' },
  { id: 'marine_drive', nameEn: 'Marine Drive / High Court', nameMl: 'മറൈൻ ഡ്രൈവ്' },
  { id: 'thevara', nameEn: 'Thevara', nameMl: 'തേവര' },
  { id: 'ravipuram', nameEn: 'Ravipuram / MG Road', nameMl: 'രവിപുരം / എം.ജി റോഡ്' },
  { id: 'other', nameEn: 'Other Kochi Locality', nameMl: 'മറ്റു കൊച്ചി പ്രദേശങ്ങൾ' },
];

interface WaitlistFormProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  activeRole: 'customer' | 'technician';
  onRoleChange: (role: 'customer' | 'technician') => void;
  onOpenSetupModal?: () => void;
}

export default function WaitlistForm({
  selectedCategory,
  onSelectCategory,
  activeRole,
  onRoleChange,
  onOpenSetupModal,
}: WaitlistFormProps) {
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [locality, setLocality] = useState('kakkanad');
  const [malayalamDescription, setMalayalamDescription] = useState('');
  const [urgency, setUrgency] = useState<'emergency' | 'today' | 'this_week' | 'flexible'>('today');
  const [experienceYears, setExperienceYears] = useState<number>(5);
  const [toolsAvailable, setToolsAvailable] = useState<boolean>(true);

  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMockResult, setIsMockResult] = useState(false);

  const isConfigured = isSupabaseConfigured();

  // Reset category default if not set
  useEffect(() => {
    if (!selectedCategory) {
      onSelectCategory('Plumbing');
    }
  }, [selectedCategory, onSelectCategory]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#044728', '#10b981', '#f59e0b', '#fbbf24', '#0284c7'],
      });
    } catch (e) {
      // ignore in non-browser
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.startsWith('91') && raw.length > 10) {
      raw = raw.slice(2);
    } else if (raw.startsWith('0') && raw.length > 10) {
      raw = raw.slice(1);
    }
    setPhone(raw.slice(0, 10));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validation
    if (!name.trim()) {
      setErrorMessage('ദയവായി നിങ്ങളുടെ പേര് നൽകുക (Please enter your name)');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMessage('ദയവായി സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക (Please enter a valid 10-digit Indian mobile number)');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      user_type: activeRole,
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim() || undefined,
      locality,
      category: selectedCategory,
      malayalam_description: malayalamDescription.trim() || 'വിവരണം നൽകിയിട്ടില്ല',
      experience_years: activeRole === 'technician' ? experienceYears : undefined,
      urgency: activeRole === 'customer' ? urgency : undefined,
      tools_available: activeRole === 'technician' ? toolsAvailable : null,
    };

    try {
      const result = await submitWaitlistEntry(payload);

      if (result.success) {
        setIsMockResult(result.isMock);
        setSubmittedData(payload);
        triggerConfetti();
      } else {
        setErrorMessage(result.message || 'രജിസ്ട്രേഷൻ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'ഒരു അപ്രതീക്ഷിത പിശക് സംഭവിച്ചു.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setMalayalamDescription('');
    setPhone('');
    setName('');
    setEmail('');
    setErrorMessage(null);
  };

  return (
    <section id="waitlist" className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Card Shell */}
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-950/5 border border-stone-200/90 overflow-hidden">
          {/* Card Top Banner with Role Toggle */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-emerald-200 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Early Access Waitlist</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-malayalam tracking-tight text-white">
                  കാര്യസ്ഥൻ വെയ്റ്റ്‌ലിസ്റ്റ് രജിസ്ട്രേഷൻ
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-md">
                  കൊച്ചിയിലെ ആദ്യ 500 ഉപഭോക്താക്കൾക്കും വിദഗ്ദ്ധ തൊഴിലാളികൾക്കും പ്രത്യേക ആനുകൂല്യങ്ങൾ!
                </p>
              </div>

              {/* Role Toggle Switcher */}
              <div className="bg-emerald-950/70 p-1.5 rounded-2xl border border-emerald-700/60 flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => onRoleChange('customer')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeRole === 'customer'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-emerald-300 hover:text-white'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>ഉപഭോക്താവ് (Customer)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onRoleChange('technician')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeRole === 'technician'
                      ? 'bg-amber-500 text-emerald-950 shadow-md font-bold'
                      : 'text-emerald-300 hover:text-white'
                  }`}
                >
                  <Wrench className="w-4 h-4" />
                  <span>തൊഴിലാളി (Technician)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form Body or Success Confirmation */}
          <div className="p-6 sm:p-10">
            {submittedData ? (
              // Success Screen
              <div className="text-center py-6 sm:py-8 space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <h4 className="text-2xl font-bold text-stone-900 font-malayalam">
                    അഭിനന്ദനങ്ങൾ, {submittedData.name}!
                  </h4>
                  <p className="text-sm text-stone-600 font-malayalam leading-relaxed">
                    നിങ്ങൾ കാര്യസ്ഥൻ കൊച്ചി വെയ്റ്റ്‌ലിസ്റ്റിൽ വിജയകരമായി ഇടം നേടിയിരിക്കുന്നു. ഞങ്ങളുടെ ടീം നിങ്ങളുടെ WhatsApp നമ്പറിലേക്ക് (+91 {submittedData.phone}) ഉടൻ വിവരങ്ങൾ അയക്കും.
                  </p>
                </div>

                {/* Registration summary card */}
                <div className="max-w-md mx-auto bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">റോൾ:</span>
                    <span className="font-semibold text-stone-800">
                      {submittedData.user_type === 'customer' ? 'Customer (ഉപഭോക്താവ്)' : 'Technician (തൊഴിലാളി)'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">സ്ഥലം (Kochi):</span>
                    <span className="font-semibold text-stone-800 uppercase">
                      {KOCHI_LOCALITIES.find((l) => l.id === submittedData.locality)?.nameEn || submittedData.locality}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">വിഭാഗം:</span>
                    <span className="font-semibold text-emerald-800">{submittedData.category}</span>
                  </div>
                  <div className="py-1">
                    <span className="text-stone-500 block mb-1">വിവരണം:</span>
                    <span className="font-sans text-stone-800 italic block font-malayalam">
                      &quot;{submittedData.malayalam_description}&quot;
                    </span>
                  </div>
                  {isMockResult && (
                    <div className="mt-2 pt-2 border-t border-amber-200 text-amber-800 text-[11px] font-sans flex items-center justify-between">
                      <span>⚡ Local Demo Mode (Browser Storage)</span>
                      <button
                        onClick={onOpenSetupModal}
                        className="underline text-amber-900 font-semibold"
                      >
                        Connect live Supabase
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `ഞാൻ കൊച്ചിയുടെ പുതിയ ടാസ്ക് പ്ലാറ്റ്ഫോമായ 'കാര്യസ്ഥൻ (Karyasthan)' വെയ്റ്റ്‌ലിസ്റ്റിൽ ജോയിൻ ചെയ്തു! പ്ലംബിംഗ്, ഇലക്ട്രിക്കൽ ജോലികൾ ഇനി എളുപ്പത്തിൽ. നിങ്ങളും നോക്കൂ:`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-all shadow-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>വാട്സ്ആപ്പിൽ ഷെയർ ചെയ്യുക</span>
                  </a>

                  <button
                    onClick={handleResetForm}
                    className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition-all"
                  >
                    മറ്റൊരു എൻട്രി നൽകുക (New Entry)
                  </button>
                </div>
              </div>
            ) : (
              // Active Submission Form
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Role contextual notification */}
                <div className={`p-4 rounded-2xl text-xs sm:text-sm flex items-start gap-3 border ${
                  activeRole === 'customer'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50/70 border-amber-200 text-amber-900'
                }`}>
                  {activeRole === 'customer' ? (
                    <>
                      <User className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold font-malayalam">
                          ഉപഭോക്താക്കൾക്കുള്ള ആനുകൂല്യം (Customer Benefits):
                        </p>
                        <p className="text-emerald-800/90 font-malayalam text-xs mt-0.5">
                          ആദ്യ സർവീസിന് ₹100 ഡിസ്കൗണ്ടും, മുൻഗണനാ അടിസ്ഥാനത്തിലുള്ള 30 മിനിറ്റ് എക്സ്പ്രസ്സ് വിസിറ്റും ലഭ്യമാകും.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold font-malayalam">
                          തൊഴിലാളി ചേട്ടന്മാർക്കുള്ള ആനുകൂല്യം (Technician Benefits):
                        </p>
                        <p className="text-amber-800/90 font-malayalam text-xs mt-0.5">
                          സീറോ കമ്മീഷൻ, ആദ്യ 3 മാസം 100% സൗജന്യ രജിസ്ട്രേഷൻ, നിങ്ങളുടെ വീടിനടുത്തുള്ള Kakkanad, Edappally ജോലികൾ മാത്രം.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Row 1: Name and WhatsApp Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 font-malayalam">
                      പേര് (Full Name) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={activeRole === 'customer' ? 'ഉദാ: അരുൺ കുമാർ' : 'ഉദാ: ജോസഫ് ചേട്ടൻ'}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 font-malayalam">
                      വാട്സ്ആപ്പ് / ഫോൺ നമ്പർ (+91) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-2.5 flex items-center gap-1 text-stone-500 text-sm font-medium border-r border-stone-200 pr-2">
                        <span>+91</span>
                      </div>
                      <input
                        id="phone-input"
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="98470 12345"
                        autoComplete="tel-national"
                        className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-stone-300 text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Kochi Locality & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Locality Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 font-malayalam">
                      കൊച്ചിയിലെ സ്ഥലം (Kochi Locality) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <select
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 bg-white appearance-none cursor-pointer"
                      >
                        {KOCHI_LOCALITIES.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.nameEn} ({loc.nameMl})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Category Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 font-malayalam">
                      {activeRole === 'customer' ? 'ആവശ്യമായ വിഭാഗം' : 'നിങ്ങളുടെ സ്പെഷ്യലൈസേഷൻ'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Wrench className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => onSelectCategory(e.target.value)}
                        className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 bg-white appearance-none cursor-pointer font-medium"
                      >
                        <option value="Plumbing">പ്ലംബിംഗ് (Plumbing)</option>
                        <option value="Electrical">ഇലക്ട്രിക്കൽ (Electrical)</option>
                        <option value="Carpentry">ആശാരിപ്പണി / കാർപെന്ററി (Carpentry)</option>
                        <option value="Painting">പെയിന്റിംഗ് & വാട്ടർപ്രൂഫിംഗ് (Painting)</option>
                        <option value="Appliance">ഉപകരണ റിപ്പയർ (Appliance Repair)</option>
                        <option value="General">മറ്റു സഹായങ്ങൾ (General Handyman)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Conditional Fields based on Role */}
                {activeRole === 'customer' ? (
                  // Customer Urgency Selector
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 font-malayalam">
                      എത്ര വേഗത്തിൽ സർവീസ് വേണം? (Urgency Level)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'emergency', label: 'അടിയന്തിരം (1 Hr)', desc: 'Emergency' },
                        { id: 'today', label: 'ഇന്നുതന്നെ', desc: 'Today' },
                        { id: 'this_week', label: 'ഈ ആഴ്ച', desc: 'This Week' },
                        { id: 'flexible', label: 'സൗകര്യംപോലെ', desc: 'Flexible' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setUrgency(item.id as any)}
                          className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                            urgency === item.id
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold ring-1 ring-emerald-600'
                              : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          <div className="font-malayalam font-bold">{item.label}</div>
                          <div className="text-[10px] text-stone-400">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Technician Specific Fields
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1 font-malayalam">
                        പ്രവർത്തിപരിചയം (Experience)
                      </label>
                      <select
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-800 text-xs bg-white"
                      >
                        <option value={2}>1 - 2 വർഷം (Beginner)</option>
                        <option value={5}>3 - 5 വർഷം (Skilled)</option>
                        <option value={8}>6 - 10 വർഷം (Experienced)</option>
                        <option value={15}>10+ വർഷം (Master Craftsman)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1 font-malayalam">
                        സ്വന്തമായി ടൂളുകൾ ഉണ്ടോ? (Tools Available?)
                      </label>
                      <div className="flex gap-4 pt-1.5">
                        <label className="inline-flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                          <input
                            type="radio"
                            name="tools"
                            checked={toolsAvailable === true}
                            onChange={() => setToolsAvailable(true)}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>ഉണ്ട് (Yes, I have tools)</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                          <input
                            type="radio"
                            name="tools"
                            checked={toolsAvailable === false}
                            onChange={() => setToolsAvailable(false)}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>ഇല്ല (Basic only)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Malayalam Text Description Box Component (As specified in prompt!) */}
                <div className="pt-2">
                  <MalayalamInputBox
                    value={malayalamDescription}
                    onChange={setMalayalamDescription}
                    selectedCategory={selectedCategory}
                    label={
                      activeRole === 'customer'
                        ? 'നിങ്ങളുടെ ആവശ്യത്തിന്റെ വിവരണം (Malayalam Description)'
                        : 'നിങ്ങൾ ചെയ്യുന്ന പ്രധാന പണികളെക്കുറിച്ച് എഴുതുക (Technician Work Profile)'
                    }
                    placeholder={
                      activeRole === 'customer'
                        ? 'ഉദാ: സിങ്കിലെ പൈപ്പിൽ ലീക്കുണ്ട്, പുതിയ ടാപ്പ് മാറ്റണം. വൈകിട്ട് 5 മണിക്ക് മുമ്പ് വരാൻ പറ്റുമോ?'
                        : 'ഉദാ: 8 വർഷമായി എറണാകുളം, ഇടപ്പള്ളി ഭാഗങ്ങളിൽ പ്ലംബിംഗ് ചെയ്യുന്നു. പുതിയ ഫിറ്റിംഗ്സും റിപ്പയറുകളും ചെയ്യും.'
                    }
                  />
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1 font-sans">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-stone-800 placeholder-stone-400 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold text-base shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        <span className="font-malayalam">വിവരങ്ങൾ രേഖപ്പെടുത്തുന്നു...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-amber-300" />
                        <span className="font-malayalam">
                          {activeRole === 'customer'
                            ? 'വെയ്റ്റ്‌ലിസ്റ്റിൽ സൗജന്യമായി രജിസ്റ്റർ ചെയ്യാം'
                            : 'വിദഗ്ദ്ധ തൊഴിലാളിയായി രജിസ്റ്റർ ചെയ്യാം'}
                        </span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between mt-3 text-[11px] text-stone-500 px-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>നിങ്ങളുടെ ഫോൺ നമ്പർ സുരക്ഷിതമായിരിക്കും</span>
                    </span>
                    <span>
                      {isConfigured ? (
                        <span className="text-emerald-700 font-medium">✓ Supabase Database Active</span>
                      ) : (
                        <button
                          type="button"
                          onClick={onOpenSetupModal}
                          className="text-stone-400 hover:text-amber-700 underline"
                        >
                          Supabase schema & instructions
                        </button>
                      )}
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
