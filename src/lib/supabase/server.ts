import { createClient } from '@supabase/supabase-js';

// This client is for SERVER-SIDE use only.
// It uses the Service Role Key which has admin privileges.
// NEVER import this in a Client Component.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    // We don't throw here to allow build time execution where envs might be missing
    // but we warn.
    console.warn('Missing Supabase environment variables for server client (SUPABASE_SERVICE_ROLE_KEY).');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || '');
