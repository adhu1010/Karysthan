# കാര്യസ്ഥൻ (Karyasthan) - Hyperlocal Task Marketplace

> **കൊച്ചിയുടെ സ്വന്തം ഓൺ-ഡിമാൻഡ് സഹായം**
> On-demand task marketplace for Kochi, Kerala connecting households with verified local plumbers, electricians, and carpenters.

Built with **Next.js 14 App Router**, **Tailwind CSS**, and **Supabase**.

---

## 🌴 Key Features

1. **Category Selector (സേവന വിഭാഗങ്ങൾ)**
   - Interactive selection for **Plumbing (പ്ലംബിംഗ്)**, **Electrical (ഇലക്ട്രിക്കൽ)**, **Carpentry (ആശാരിപ്പണി)**, Painting, Appliance Repair, and General Handyman tasks.
   - Shows transparent inspection starting fees and typical Kochi household tasks.
   - Automatically synchronizes with the waitlist submission form.

2. **Malayalam Text Description Box (മലയാളം വിവരണം)**
   - Custom Malayalam text input with native font rendering (`font-malayalam`).
   - Clickable pre-filled Malayalam task chips (e.g., *"പൈപ്പിൽ നിന്നും വെള്ളം ലീക്കാവുന്നുണ്ട്"*, *"മെയിൻ MCB വീണ്ടും വീണ്ടും ട്രിപ്പാകുന്നു"*, *"മുറിയുടെ വാതിൽ ശരിയായി പൂട്ടാൻ പറ്റുന്നില്ല"*).
   - Voice-to-text input supporting Malayalam (`ml-IN`) via the Web Speech API.
   - Manglish typing tips and character counter.

3. **Supabase Waitlist Form (കസ്റ്റമർ & തൊഴിലാളി വെയ്റ്റ്‌ലിസ്റ്റ്)**
   - Dual-role switch:
     - 🏠 **Customer (ഉപഭോക്താവ്)**: Urgency level, address/landmark, Kochi locality.
     - 🛠️ **Local Technician (വിദഗ്ദ്ധ തൊഴിലാളി)**: Experience years, tools checklist, local service radius.
   - Kochi locality selector (Kakkanad, Edappally, Fort Kochi, Vyttila, Aluva, Palarivattom, Marine Drive, etc.).
   - Persists entries to Supabase table `waitlist_entries`.
   - **Zero-config Local Demo Mode**: If Supabase credentials are not set, it gracefully saves submissions to `localStorage`, triggers celebratory confetti, and allows full demonstration without breaking!

4. **Kochi Hyperlocal Trust System**
   - 30-45 minute response along the Kochi Metro corridor and Kakkanad Infopark IT belt.
   - 100% background and ID verification.
   - Fair upfront pricing with no surprise charges.
   - Zero initial commission for local technicians to protect craftsmanship.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase (Optional for Live DB)
Copy the example environment file:
```bash
cp .env.example .env.local
```
Add your Supabase project URL and public anon key:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Run Supabase Database Migration
Execute the SQL found in [`supabase/schema.sql`](file:///home/adhu/Karysthan/supabase/schema.sql) in your [Supabase SQL Editor](https://supabase.com/dashboard):
```sql
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
    tools_available BOOLEAN DEFAULT true,
    status TEXT DEFAULT 'pending'
);

ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon signups"
    ON public.waitlist_entries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css         # Theme styles, Malayalam webfonts & Kasavu gradients
│   │   ├── layout.tsx          # Root layout & SEO metadata for Kochi, Kerala
│   │   └── page.tsx            # Main landing page composition
│   ├── components/
│   │   ├── Header.tsx              # Navigation & Supabase connection badge
│   │   ├── Hero.tsx                # Malayalam/English headline & quick CTAs
│   │   ├── CategorySelector.tsx    # Plumbing, Electrical, Carpentry cards
│   │   ├── MalayalamInputBox.tsx   # Dedicated Malayalam text input & voice typing
│   │   ├── WaitlistForm.tsx        # Customer vs Technician waitlist submission form
│   │   ├── KochiTrustBadges.tsx    # Hyperlocal verification badges
│   │   ├── HowItWorks.tsx          # 3-step customer and technician guide
│   │   ├── TechnicianPerks.tsx     # Worker proposition (0% commission, local jobs)
│   │   ├── FaqSection.tsx          # Bilingual FAQ accordion
│   │   ├── Footer.tsx              # Kochi hubs & contact details
│   │   └── SupabaseSetupModal.tsx  # In-app SQL copy & demo entries viewer
│   └── lib/
│       └── supabase.ts         # Supabase client & fallback demo storage handler
├── supabase/
│   └── schema.sql              # Supabase table schema and RLS policies
├── .env.example
├── next.config.mjs
└── tailwind.config.js
```
