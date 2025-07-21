import { createClient } from "@supabase/supabase-js"
import { Database } from '@/types/supabase'  // ← ここで使用

const supabaseUrl = process.env.GATSBY_SUPABASE_URL;
const supabaseAnonKey = process.env.GATSBY_SUPABASE_API_KEY
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be set in environment variables.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
