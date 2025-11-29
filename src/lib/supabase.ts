import { supabaseClient } from './supabase/client';

// Re-export for backward compatibility, but prefer importing from @/lib/supabase/client
export const supabase = supabaseClient;
