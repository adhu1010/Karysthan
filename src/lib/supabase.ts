import { createClient } from '@supabase/supabase-js';

export interface WaitlistEntry {
  id?: string;
  created_at?: string;
  user_type: 'customer' | 'technician';
  name: string;
  phone: string;
  email?: string;
  locality: string;
  category: string;
  malayalam_description: string;
  experience_years?: number;
  urgency?: 'emergency' | 'today' | 'this_week' | 'flexible';
  tools_available?: boolean;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project-id')
  );
};

// Create client only if configuration is valid
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

export interface SubmissionResult {
  success: boolean;
  message: string;
  isMock: boolean;
  data?: any;
  error?: string;
}

export async function submitWaitlistEntry(entry: Omit<WaitlistEntry, 'id' | 'created_at'>): Promise<SubmissionResult> {
  // If Supabase is connected
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('waitlist_entries')
        .insert([
          {
            ...entry,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        console.error('Supabase error inserting waitlist entry:', error);
        return {
          success: false,
          message: error.message || 'ഡാറ്റാബേസിൽ വിവരങ്ങൾ സമർപ്പിക്കാൻ സാധിച്ചില്ല.',
          isMock: false,
          error: error.message,
        };
      }

      return {
        success: true,
        message: 'വിജയകരമായി രജിസ്റ്റർ ചെയ്തു! ഞങ്ങളുടെ ടീം ഉടൻ വിളിക്കും.',
        isMock: false,
        data,
      };
    } catch (err: any) {
      console.error('Unexpected error inserting waitlist entry:', err);
      return {
        success: false,
        message: err.message || 'ഒരു തകരാർ സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.',
        isMock: false,
        error: err.message,
      };
    }
  }

  // Graceful fallback for local development & demonstration preview
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    if (typeof window !== 'undefined') {
      const mockItem: WaitlistEntry = {
        ...entry,
        id: 'mock-' + Math.random().toString(36).substring(2, 9),
        created_at: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem('karyasthan_waitlist_demo') || '[]');
      existing.unshift(mockItem);
      localStorage.setItem('karyasthan_waitlist_demo', JSON.stringify(existing.slice(0, 50)));
    }
  } catch (e) {
    console.warn('LocalStorage not available for demo persistence', e);
  }

  return {
    success: true,
    message: 'വിജയകരമായി രജിസ്റ്റർ ചെയ്തു! (ഡെമോ മോഡ്: ലോക്കൽ സ്റ്റോറേജിൽ രേഖപ്പെടുത്തി)',
    isMock: true,
  };
}
