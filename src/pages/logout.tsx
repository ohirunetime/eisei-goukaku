import React from "react";
import { useRef, useEffect } from "react";
import { navigate } from "gatsby";
import { toast } from "react-hot-toast";
import { signOut } from '@/lib/auth';

export default function LogoutPage() {
    const hasLoggedOut = useRef(false);

    useEffect(() => {

        // 副作用の多重実行防止
        if (hasLoggedOut.current) return;
        hasLoggedOut.current = true;

        const doLogout = async () => {
            const { error: authError } = await signOut();
            if (authError) {
                toast.error("ログアウトに失敗しました");
                return;
            }
            toast.success("ログアウトしました");
            navigate("/login");
        };

        doLogout();
    }, []);

    return <p>ログアウト中...</p>;
}