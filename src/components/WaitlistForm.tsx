'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  User, 
  Wrench, 
  MapPin, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  Briefcase,
  ChevronDown
} from 'lucide-react';
import MalayalamInputBox from './MalayalamInputBox';
import { submitWaitlistEntry, isSupabaseConfigured, WaitlistEntry } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

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
  const { language } = useLanguage();
  const t = translations[language].waitlist;

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
      // ignore
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let clean = e.target.value.replace(/\D/g, '');
    if (clean.length > 10) {
      clean = clean.slice(-10);
    }
    setPhone(clean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage(language === 'ml' ? 'ദയവായി നിങ്ങളുടെ പേര് നൽകുക.' : 'Please enter your name.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage(language === 'ml' ? 'ദയവായി സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const entry: WaitlistEntry = {
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        locality,
        user_type: activeRole,
        category: selectedCategory || 'Plumbing',
        malayalam_description: malayalamDescription.trim() || undefined,
        urgency: activeRole === 'customer' ? urgency : undefined,
        experience_years: activeRole === 'technician' ? experienceYears : undefined,
        tools_available: activeRole === 'technician' ? toolsAvailable : undefined,
      };

      const result = await submitWaitlistEntry(entry);

      if (result.success) {
        setSubmittedData(result.data);
        setIsMockResult(!!result.isMock);
        triggerConfetti();
      } else {
        setErrorMessage(result.error || (language === 'ml' ? 'സബ്മിഷൻ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.' : 'Submission failed. Please try again.'));
      }
    } catch (err: any) {
      setErrorMessage(err.message || (language === 'ml' ? 'ഒരു അപ്രതീക്ഷിത പിശക് സംഭവിച്ചു.' : 'An unexpected error occurred.'));
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
                  <span>{t.tag}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {activeRole === 'customer' ? t.headingCustomer : t.headingTech}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-md">
                  {activeRole === 'customer' ? t.subCustomer : t.subTech}
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
                  <span>{t.roleCustomerTab}</span>
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
                  <span>{t.roleTechTab}</span>
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
                  <h4 className="text-2xl font-bold text-stone-900">
                    {t.successTitle} {submittedData.name}!
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {submittedData.user_type === 'customer' ? t.successCustomerDesc : t.successTechDesc}
                  </p>
                </div>

                {/* Registration summary card */}
                <div className="max-w-md mx-auto bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">{language === 'ml' ? 'റോൾ:' : 'Role:'}</span>
                    <span className="font-semibold text-stone-800">
                      {submittedData.user_type === 'customer' ? 'Customer' : 'Craftsman / Technician'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">{language === 'ml' ? 'സ്ഥലം:' : 'Kochi Locality:'}</span>
                    <span className="font-semibold text-stone-800 uppercase">
                      {KOCHI_LOCALITIES.find((l) => l.id === submittedData.locality)?.[language === 'ml' ? 'nameMl' : 'nameEn'] || submittedData.locality}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">{language === 'ml' ? 'വിഭാഗം:' : 'Category:'}</span>
                    <span className="font-semibold text-emerald-800">{submittedData.category}</span>
                  </div>
                  {submittedData.malayalam_description && (
                    <div className="py-1">
                      <span className="text-stone-500 block mb-1">{language === 'ml' ? 'വിവരണം:' : 'Description:'}</span>
                      <span className="font-sans text-stone-800 italic block">
                        &quot;{submittedData.malayalam_description}&quot;
                      </span>
                    </div>
                  )}
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
                      language === 'ml'
                        ? "ഞാൻ കൊച്ചിയുടെ പുതിയ ടാസ്ക് പ്ലാറ്റ്ഫോമായ 'കാര്യസ്ഥൻ (Karyasthan)' വെയ്റ്റ്‌ലിസ്റ്റിൽ ജോയിൻ ചെയ്തു! പ്ലംബിംഗ്, ഇലക്ട്രിക്കൽ ജോലികൾ ഇനി എളുപ്പത്തിൽ. നിങ്ങളും നോക്കൂ:"
                        : "I joined the waitlist for Karyasthan - Kochi's fastest on-demand home tasks app! Check it out:"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-all shadow-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{language === 'ml' ? 'വാട്സ്ആപ്പിൽ ഷെയർ ചെയ്യുക' : 'Share on WhatsApp'}</span>
                  </a>

                  <button
                    onClick={handleResetForm}
                    className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition-all"
                  >
                    {t.resetBtn}
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
                        <p className="font-semibold">
                          {language === 'ml' ? 'ഉപഭോക്താക്കൾക്കുള്ള ആനുകൂല്യം (Customer Benefits):' : 'Customer Early Access Benefits:'}
                        </p>
                        <p className="text-emerald-800/90 text-xs mt-0.5">
                          {language === 'ml'
                            ? 'ആദ്യ സർവീസിന് ₹100 ഡിസ്കൗണ്ടും, മുൻഗണനാ അടിസ്ഥാനത്തിലുള്ള 30 മിനിറ്റ് എക്സ്പ്രസ്സ് വിസിറ്റും ലഭ്യമാകും.'
                            : 'First 500 members get ₹100 discount coupon and 30-minute express priority visits.'}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">
                          {language === 'ml' ? 'തൊഴിലാളി ചേട്ടന്മാർക്കുള്ള ആനുകൂല്യം (Technician Benefits):' : 'Craftsman Partner Benefits:'}
                        </p>
                        <p className="text-amber-800/90 text-xs mt-0.5">
                          {language === 'ml'
                            ? 'സീറോ കമ്മീഷൻ, ആദ്യ 3 മാസം 100% സൗജന്യ രജിസ്ട്രേഷൻ, നിങ്ങളുടെ വീടിനടുത്തുള്ള Kakkanad, Edappally ജോലികൾ മാത്രം.'
                            : 'Zero commission launch period, direct UPI payments, and jobs strictly within your 5-8km home radius.'}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Row 1: Name and WhatsApp Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      {t.nameLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={activeRole === 'customer' ? t.namePlaceholderCustomer : t.namePlaceholderTech}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      {t.phoneLabel} <span className="text-red-500">*</span>
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
                        placeholder={t.phonePlaceholder}
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
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      {t.localityLabel} <span className="text-red-500">*</span>
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
                            {language === 'ml' ? `${loc.nameMl} (${loc.nameEn})` : `${loc.nameEn} (${loc.nameMl})`}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Category Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      {t.categoryLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Wrench className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => onSelectCategory(e.target.value)}
                        className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 bg-white appearance-none cursor-pointer font-medium"
                      >
                        <option value="Plumbing">{language === 'ml' ? 'പ്ലംബിംഗ് (Plumbing)' : 'Plumbing'}</option>
                        <option value="Electrical">{language === 'ml' ? 'ഇലക്ട്രിക്കൽ (Electrical)' : 'Electrical'}</option>
                        <option value="Carpentry">{language === 'ml' ? 'ആശാരിപ്പണി (Carpentry)' : 'Carpentry'}</option>
                        <option value="Painting">{language === 'ml' ? 'പെയിന്റിംഗ് & വാട്ടർപ്രൂഫിംഗ്' : 'Painting & Waterproofing'}</option>
                        <option value="Appliance">{language === 'ml' ? 'ഉപകരണ റിപ്പയർ (Appliance Repair)' : 'Appliance Repair'}</option>
                        <option value="General">{language === 'ml' ? 'മറ്റു സഹായങ്ങൾ (General Handyman)' : 'General Handyman'}</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Conditional Fields based on Role */}
                {activeRole === 'customer' ? (
                  // Customer Urgency Selector
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      {t.urgencyLabel}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'emergency', label: t.urgencies.emergency, short: '30-45m' },
                        { id: 'today', label: t.urgencies.today, short: 'Today' },
                        { id: 'this_week', label: t.urgencies.this_week, short: 'Week' },
                        { id: 'flexible', label: t.urgencies.flexible, short: 'Flexible' },
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
                          <div className="font-bold truncate">{item.label}</div>
                          <div className="text-[10px] text-stone-400">{item.short}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Technician Specific Fields
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                        {t.expLabel}
                      </label>
                      <select
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-800 text-xs bg-white"
                      >
                        <option value={2}>1 - 2 {language === 'ml' ? 'വർഷം' : 'Years'} (Beginner)</option>
                        <option value={5}>3 - 5 {language === 'ml' ? 'വർഷം' : 'Years'} (Skilled)</option>
                        <option value={8}>6 - 10 {language === 'ml' ? 'വർഷം' : 'Years'} (Experienced)</option>
                        <option value={15}>10+ {language === 'ml' ? 'വർഷം' : 'Years'} (Master Craftsman)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                        {language === 'ml' ? 'സ്വന്തമായി ടൂളുകൾ ഉണ്ടോ?' : 'Own tools & equipment?'}
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
                          <span>{language === 'ml' ? 'ഉണ്ട് (Yes)' : 'Yes, I have full tools'}</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
                          <input
                            type="radio"
                            name="tools"
                            checked={toolsAvailable === false}
                            onChange={() => setToolsAvailable(false)}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>{language === 'ml' ? 'ഇല്ല (Basic)' : 'Basic tools only'}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Malayalam / English Text Description Box Component */}
                <div className="pt-2">
                  <MalayalamInputBox
                    value={malayalamDescription}
                    onChange={setMalayalamDescription}
                    selectedCategory={selectedCategory}
                    label={
                      activeRole === 'customer'
                        ? (language === 'ml' ? 'നിങ്ങളുടെ ആവശ്യത്തിന്റെ വിവരണം' : 'Describe your requirement')
                        : (language === 'ml' ? 'നിങ്ങൾ ചെയ്യുന്ന പ്രധാന പണികളെക്കുറിച്ച് എഴുതുക' : 'Your craftsman trade profile & experience')
                    }
                    placeholder={
                      activeRole === 'customer'
                        ? (language === 'ml'
                            ? 'ഉദാ: സിങ്കിലെ പൈപ്പിൽ ലീക്കുണ്ട്, പുതിയ ടാപ്പ് മാറ്റണം. വൈകിട്ട് 5 മണിക്ക് മുമ്പ് വരാൻ പറ്റുമോ?'
                            : 'e.g., Pipe leak under sink, need tap replacement. Can technician arrive before 5 PM?')
                        : (language === 'ml'
                            ? 'ഉദാ: 8 വർഷമായി എറണാകുളം, ഇടപ്പള്ളി ഭാഗങ്ങളിൽ പ്ലംബിംഗ് ചെയ്യുന്നു. പുതിയ ഫിറ്റിംഗ്സും റിപ്പയറുകളും ചെയ്യും.'
                            : 'e.g., Working for 8 years across Kakkanad and Edappally doing sanitary plumbing & leak fixing.')
                    }
                  />
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1 font-sans">
                    {t.emailLabel}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
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
                        <span>{t.submitting}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-amber-300" />
                        <span>
                          {activeRole === 'customer' ? t.submitCustomer : t.submitTech}
                        </span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between mt-3 text-[11px] text-stone-500 px-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'ml' ? 'നിങ്ങളുടെ വിവരങ്ങൾ 100% സുരക്ഷിതമായിരിക്കും' : 'Your data is 100% private & secure'}</span>
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
                          Supabase Instructions
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
