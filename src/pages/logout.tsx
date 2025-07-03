import React from "react";
import { useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { navigate } from "gatsby";
import { toast } from "react-hot-toast";

export default function LogoutPage() {
    const { logout } = useAuth();
    const hasLoggedOut = useRef(false);

    useEffect(() => {
        if (hasLoggedOut.current) return;
        hasLoggedOut.current = true;

        logout().then(() => {
            toast.success("ログアウトしました");
            navigate("/login")
        })
    }, [logout]);

    return <p>ログアウト中...</p>;
}