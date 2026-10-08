'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Copy, 
  Check, 
  Terminal, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  Trash2
} from 'lucide-react';
import { isSupabaseConfigured, WaitlistEntry } from '@/lib/supabase';

interface SupabaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SQL_SNIPPET = `-- Run this in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.waitlist_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_type TEXT NOT NULL CHECK (user_type IN ('customer', 'technician')),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    locality TEXT NOT NULL,
    category TEXT NOT NULL,
    malayalam_description TEXT,
    experience_years INTEGER,
    urgency TEXT DEFAULT 'flexible',
    tools_available BOOLEAN DEFAULT NULL,
    status TEXT DEFAULT 'pending'
);

ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon signups"
    ON public.waitlist_entries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read"
    ON public.waitlist_entries
    FOR SELECT
    TO authenticated
    USING (true);`;

export default function SupabaseSetupModal({ isOpen, onClose }: SupabaseSetupModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'sql' | 'env' | 'demoEntries'>('sql');
  const [demoEntries, setDemoEntries] = useState<WaitlistEntry[]>([]);

  const isConfigured = isSupabaseConfigured();

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('karyasthan_waitlist_demo') || '[]');
        setDemoEntries(stored);
      } catch (e) {
        setDemoEntries([]);
      }
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearDemoEntries = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('karyasthan_waitlist_demo');
      setDemoEntries([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
              <Database className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Supabase Configuration & Schema
              </h3>
              <p className="text-xs text-stone-500">
                കാര്യസ്ഥൻ (Karyasthan) backend setup guide
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status banner */}
        <div className="px-6 py-3 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="font-semibold text-stone-700">
              Current Status: {isConfigured ? 'Connected to live Supabase' : 'Running in Local Demo/Mock Mode'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('sql')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'sql' ? 'bg-white shadow-2xs text-emerald-800' : 'text-stone-500'
              }`}
            >
              SQL Schema
            </button>
            <button
              onClick={() => setActiveTab('env')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'env' ? 'bg-white shadow-2xs text-emerald-800' : 'text-stone-500'
              }`}
            >
              .env Setup
            </button>
            <button
              onClick={() => setActiveTab('demoEntries')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'demoEntries' ? 'bg-white shadow-2xs text-emerald-800' : 'text-stone-500'
              }`}
            >
              Saved Entries ({demoEntries.length})
            </button>
          </div>
        </div>

        {/* Body content based on tab */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-stone-600 font-medium">
                  Copy and run this in your{' '}
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 font-semibold underline inline-flex items-center gap-1"
                  >
                    Supabase SQL Editor <ExternalLink className="w-3 h-3" />
                  </a>
                  :
                </span>
                <button
                  onClick={() => handleCopy(SQL_SNIPPET)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 text-white font-medium hover:bg-emerald-900 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
                </button>
              </div>

              <pre className="p-4 bg-stone-900 text-emerald-300 rounded-xl overflow-x-auto text-[11px] font-mono leading-relaxed border border-stone-800">
                {SQL_SNIPPET}
              </pre>
            </div>
          )}

          {activeTab === 'env' && (
            <div className="space-y-4">
              <p className="text-stone-600">
                To connect to your live Supabase project, create or edit <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800 font-bold">.env.local</code> in the project root with:
              </p>

              <div className="p-4 bg-stone-900 text-emerald-300 rounded-xl font-mono text-xs space-y-1">
                <div>NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co</div>
                <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here</div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  After adding these keys, restart your Next.js development server (<code className="font-mono">npm run dev</code>).
                </span>
              </div>
            </div>
          )}

          {activeTab === 'demoEntries' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-stone-600 font-medium">
                  Entries captured locally in browser demo mode:
                </span>
                {demoEntries.length > 0 && (
                  <button
                    onClick={handleClearDemoEntries}
                    className="text-red-600 hover:text-red-700 inline-flex items-center gap-1 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Demo Storage</span>
                  </button>
                )}
              </div>

              {demoEntries.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-stone-400">
                  ഇതുവരെ എൻട്രികൾ ഒന്നുമില്ല (No entries yet). Try submitting the form on the landing page!
                </div>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {demoEntries.map((entry, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 text-stone-700 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900">
                          {entry.name} ({entry.user_type === 'customer' ? 'Customer' : 'Technician'})
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">
                          +91 {entry.phone}
                        </span>
                      </div>
                      <div className="flex gap-2 text-[11px] text-stone-500">
                        <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                          {entry.category}
                        </span>
                        <span className="bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded uppercase">
                          {entry.locality}
                        </span>
                      </div>
                      {entry.malayalam_description && (
                        <p className="text-xs text-stone-600 italic font-malayalam pt-1">
                          &quot;{entry.malayalam_description}&quot;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors"
          >
            ശരി, മനസ്സിലായി (Got It)
          </button>
        </div>
      </div>
    </div>
  );
}
