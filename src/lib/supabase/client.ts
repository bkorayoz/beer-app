import { createClient } from '@supabase/supabase-js';

// This client is for CLIENT-SIDE use.
// It uses the Anon Key which is safe to expose.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables for client client.');
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
