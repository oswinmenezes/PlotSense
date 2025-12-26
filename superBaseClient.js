import { createClient } from '@supabase/supabase-js';

export const supabase = createClient("supabase_url","supabase_key");
