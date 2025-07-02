import React from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { navigate } from "gatsby";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const { logout } = useAuth();

    useEffect(() => {
        logout().then(() => {
            toast.success("ログアウトしました");
            navigate("/login")
        })
    }, [logout]);

    return <p>ログアウト中...</p>;
}