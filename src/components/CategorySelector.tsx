'use client';

import React from 'react';
import { 
  Wrench, 
  Zap, 
  Hammer, 
  Paintbrush, 
  Tv, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface CategoryInfo {
  id: string;
  nameMalayalam: string;
  nameEnglish: string;
  tagline: string;
  icon: any;
  color: string;
  badgeColor: string;
  borderColor: string;
  activeBorder: string;
  activeBg: string;
  startingPrice: string;
  popularTasks: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Plumbing',
    nameMalayalam: 'പ്ലംബിംഗ്',
    nameEnglish: 'Plumbing',
    tagline: 'പൈപ്പ് ലീക്ക്, ടാപ്പ് ഫിറ്റിംഗ്സ് & പമ്പ് ജോലികൾ',
    icon: Wrench,
    color: 'text-blue-600',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    borderColor: 'border-blue-100',
    activeBorder: 'border-blue-600 ring-2 ring-blue-500/20',
    activeBg: 'bg-blue-50/40',
    startingPrice: '₹249',
    popularTasks: [
      'പൈപ്പ് ലീക്ക് പരിഹരിക്കൽ (Pipe leak repair)',
      'ടാപ്പ് & ഷവർ ഫിക്സിംഗ് (Tap / shower replacement)',
      'ഡ്രെയിനേജ് ബ്ലോക്ക് ക്ലിയറിങ് (Clogged drain removal)',
      'വാട്ടർ മോട്ടോർ & ടാങ്ക് ചെക്കിംഗ് (Pump inspection)',
      'ബാത്ത്റൂം ഫിറ്റിംഗ്സ് (Bathroom accessories installation)',
    ],
  },
  {
    id: 'Electrical',
    nameMalayalam: 'ഇലക്ട്രിക്കൽ',
    nameEnglish: 'Electrical',
    tagline: 'സ്വിച്ച് ബോർഡ്, വയറിംഗ്, ഫാൻ & ലൈറ്റ് ഫിറ്റിംഗ്',
    icon: Zap,
    color: 'text-amber-600',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    borderColor: 'border-amber-100',
    activeBorder: 'border-amber-600 ring-2 ring-amber-500/20',
    activeBg: 'bg-amber-50/40',
    startingPrice: '₹249',
    popularTasks: [
      'സ്വിച്ച് ബോർഡ് & സോക്കറ്റ് റിപ്പയർ (Switchboard fix)',
      'സീലിംഗ് ഫാൻ & ലൈറ്റ് ഇൻസ്റ്റാളേഷൻ (Fan & lights)',
      'MCB ട്രിപ്പിംഗ് & ഷോർട്ട് സർക്യൂട്ട് (Fuse / MCB tripping)',
      'ഇൻവെർട്ടർ വയറിംഗ് & ബാറ്ററി സർവീസ് (Inverter check)',
      'എസി പവർ പോയിന്റ് കണക്ഷൻ (AC power point fix)',
    ],
  },
  {
    id: 'Carpentry',
    nameMalayalam: 'ആശാരിപ്പണി / കാർപെന്ററി',
    nameEnglish: 'Carpentry',
    tagline: 'വാതിൽ ലോക്കുകൾ, കിച്ചൻ ഹിഞ്ചുകൾ & ഫർണിച്ചർ',
    icon: Hammer,
    color: 'text-orange-600',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    borderColor: 'border-orange-100',
    activeBorder: 'border-orange-600 ring-2 ring-orange-500/20',
    activeBg: 'bg-orange-50/40',
    startingPrice: '₹299',
    popularTasks: [
      'വാതിൽ കൊളുത്തുകൾ & ലോക്ക് മാറ്റൽ (Lock & latch repair)',
      'മോഡുലാർ കിച്ചൻ ഡ്രോയർ & ഹിഞ്ചുകൾ (Cabinet hinges)',
      'ഫർണിച്ചർ റിപ്പയറിങ് & പോളിഷിംഗ് (Furniture repair)',
      'കർട്ടൻ റോഡ് & ഡ്രില്ലിംഗ് ഫിറ്റിംഗ് (Curtain rod fixing)',
      'കസ്റ്റം ഷെൽഫ് & തടിപ്പണികൾ (Custom woodwork)',
    ],
  },
  {
    id: 'Painting',
    nameMalayalam: 'പെയിന്റിംഗ് & വാട്ടർപ്രൂഫിംഗ്',
    nameEnglish: 'Painting & Waterproofing',
    tagline: 'കൊച്ചി മഴക്കാല നനവ് & വാൾ പെയിന്റിംഗ്',
    icon: Paintbrush,
    color: 'text-emerald-600',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderColor: 'border-emerald-100',
    activeBorder: 'border-emerald-600 ring-2 ring-emerald-500/20',
    activeBg: 'bg-emerald-50/40',
    startingPrice: '₹499',
    popularTasks: [
      'മഴക്കാല നനവ് വാട്ടർപ്രൂഫിംഗ് (Dampness waterproofing)',
      'റൂം പെയിന്റിംഗ് (Interior touchup / single room)',
      'വാൾ ക്രാക്ക് ഫില്ലിംഗ് (Wall crack repair)',
      'ഫംഗസ് & പൂപ്പൽ നീക്കം ചെയ്യൽ (Mould & fungus cleaning)',
    ],
  },
  {
    id: 'Appliance',
    nameMalayalam: 'ഉപകരണ റിപ്പയർ',
    nameEnglish: 'Appliance Repair',
    tagline: 'എസി, വാഷിംഗ് മെഷീൻ, ഫ്രിഡ്ജ് സർവീസ്',
    icon: Tv,
    color: 'text-cyan-600',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    borderColor: 'border-cyan-100',
    activeBorder: 'border-cyan-600 ring-2 ring-cyan-500/20',
    activeBg: 'bg-cyan-50/40',
    startingPrice: '₹349',
    popularTasks: [
      'എസി ഫിൽട്ടർ ക്ലീനിംഗ് & ഗ്യാസ് ചെക്ക് (AC servicing)',
      'വാഷിംഗ് മെഷീൻ ഡ്രെയിൻ പ്രോബ്ലം (Washing machine)',
      'റഫ്രിജറേറ്റർ കൂളിംഗ് പ്രോബ്ലം (Refrigerator fix)',
      'വാട്ടർ പ്യൂരിഫയർ ഫിൽട്ടർ മാറ്റൽ (Water purifier service)',
    ],
  },
  {
    id: 'General',
    nameMalayalam: 'മറ്റു ചെറിയ വീട്ടുസഹായങ്ങൾ',
    nameEnglish: 'General Handyman',
    tagline: 'ഡ്രില്ലിംഗ്, ടിവി മൗണ്ടിംഗ്, ചെറിയ ഫിക്സിംഗ് ജോലികൾ',
    icon: HelpCircle,
    color: 'text-purple-600',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    borderColor: 'border-purple-100',
    activeBorder: 'border-purple-600 ring-2 ring-purple-500/20',
    activeBg: 'bg-purple-50/40',
    startingPrice: '₹199',
    popularTasks: [
      'ടിവി വാൾ മൗണ്ടിംഗ് (TV wall mounting)',
      'ഫ്രെയിമുകൾ & കണ്ണാടി തൂക്കൽ (Drilling & hanging)',
      'സീലിംഗ് ക്ലോത്ത്സ് ഡ്രയർ ഫിക്സിംഗ് (Cloth drying rack)',
      'ചെറിയ ഷിഫ്റ്റിംഗ് സഹായം (Light furniture shifting)',
    ],
  },
];

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategorySelector({
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  return (
    <section id="category-section" className="py-12 bg-stone-50/60 border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>നിങ്ങൾക്ക് ആവശ്യമായ സർവീസ് തിരഞ്ഞെടുക്കുക</span>
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-3">
            പ്രധാന സർവീസ് വിഭാഗങ്ങൾ
            <span className="block text-lg font-medium text-stone-500 mt-1 font-sans">
              Choose your service category
            </span>
          </h2>
          <p className="text-sm text-stone-600">
            നിങ്ങളുടെ ആവശ്യമുള്ള വിഭാഗം ക്ലിക്ക് ചെയ്യുക. താഴെയുള്ള ഫോമിലേക്ക് ഈ വിഭാഗം തനിയെ ചേർക്കപ്പെടുന്നതാണ്.
          </p>
        </div>

        {/* Primary 3 Categories Grid (Plumbing, Electrical, Carpentry) highlighted, plus secondary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {CATEGORIES.slice(0, 3).map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => onSelectCategory(cat.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCategory(cat.id);
                  }
                }}
                className={`relative rounded-2xl p-6 transition-all duration-200 cursor-pointer text-left bg-white border-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                  isSelected
                    ? `${cat.activeBorder} ${cat.activeBg} scale-[1.02]`
                    : `border-stone-200/80 hover:border-stone-300`
                }`}
              >
                {/* Selection indicator pill */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-emerald-800 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm animate-fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>തിരഞ്ഞെടുത്തു</span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.badgeColor} border`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 font-malayalam flex items-baseline gap-2">
                      {cat.nameMalayalam}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans">
                      {cat.nameEnglish}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mb-4 line-clamp-2">
                  {cat.tagline}
                </p>

                {/* Popular tasks checklist */}
                <div className="space-y-1.5 pt-3 border-t border-stone-100">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    സാധാരണ ആവശ്യങ്ങൾ:
                  </p>
                  {cat.popularTasks.slice(0, 3).map((task, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-stone-700">
                      <span className="text-emerald-600 font-bold mt-0.5">•</span>
                      <span className="line-clamp-1">{task}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom footer bar with pricing */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">
                    പരിശോധനാ ഫീസ്: <strong className="text-stone-800">{cat.startingPrice}</strong> മുതൽ
                  </span>
                  <span
                    className={`font-semibold inline-flex items-center gap-1 ${
                      isSelected ? 'text-emerald-700' : 'text-stone-400'
                    }`}
                  >
                    <span>{isSelected ? 'തിരഞ്ഞെടുത്തു' : 'Select'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Categories (More services in Kochi) */}
        <div className="mt-6">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider text-center mb-4">
            കൂടുതൽ സർവീസുകൾ (Additional Services):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CATEGORIES.slice(3).map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const Icon = cat.icon;

              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl text-left bg-white border transition-all ${
                    isSelected
                      ? `${cat.activeBorder} ${cat.activeBg} shadow-sm`
                      : 'border-stone-200/70 hover:border-stone-300'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cat.badgeColor} border`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-stone-900 truncate font-malayalam">
                      {cat.nameMalayalam}
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">{cat.nameEnglish}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
