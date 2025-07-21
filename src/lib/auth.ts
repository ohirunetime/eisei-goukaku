import {supabase} from '@/lib/supabase';

const DOMAIN = process.env.GATSBY_PROJECT_DOMAIN || 'eisei-goukaku.com';

export const signIn = async (userId: string, password: string) => {
   const email = `${userId}@${DOMAIN}`;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    
    return { data, error }
}
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}
