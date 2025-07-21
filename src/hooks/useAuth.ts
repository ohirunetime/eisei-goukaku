import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User, AuthState } from "@/types/auth";

export const useAuth = (): AuthState => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        // 初期化時にユーザー情報を取得
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        }
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        })

        return () =>
            subscription.unsubscribe();
    }, [])

    return { user, loading }




};