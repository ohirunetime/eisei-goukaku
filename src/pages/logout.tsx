import React from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { navigate } from "gatsby";

export default function LoginPage() {
    const { logout } = useAuth();

    useEffect(() => {
        logout().then(() => navigate("/login"));
    }, [logout]);

    return <p>ログアウト中...</p>;
}