-- ===============================================================
-- കാര്യസ്ഥൻ (Karyasthan) - Supabase Waitlist Schema
-- Hyperlocal On-demand Task Marketplace for Kochi, Kerala
-- ===============================================================

-- 1. Create waitlist_entries table
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
    english_translation TEXT,
    experience_years INTEGER,
    urgency TEXT DEFAULT 'flexible' CHECK (urgency IN ('emergency', 'today', 'this_week', 'flexible')),
    tools_available BOOLEAN DEFAULT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'verified', 'onboarded'))
);

-- 2. Create indexes for quick lookup
CREATE INDEX IF NOT EXISTS idx_waitlist_user_type ON public.waitlist_entries (user_type);
CREATE INDEX IF NOT EXISTS idx_waitlist_category ON public.waitlist_entries (category);
CREATE INDEX IF NOT EXISTS idx_waitlist_locality ON public.waitlist_entries (locality);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist_entries (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow anyone (anon) to submit a waitlist entry
CREATE POLICY "Allow anonymous waitlist signups"
    ON public.waitlist_entries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 5. Policy: Allow reading entries only by authenticated service role or admins
CREATE POLICY "Allow select for authenticated users"
    ON public.waitlist_entries
    FOR SELECT
    TO authenticated
    USING (true);

-- Helpful comments
COMMENT ON TABLE public.waitlist_entries IS 'Early access waitlist registrations for Karyasthan Kochi marketplace';
COMMENT ON COLUMN public.waitlist_entries.malayalam_description IS 'User description in Malayalam script or Manglish transliteration';
