import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { observeAuthState, login, logout } from "../firebase/auth";

// Contextの型
interface AuthContextType {
    user: User | null;
    login: (userId: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Providerコンポーネント
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Firebaseのログイン状態を監視
        const unsubscribe = observeAuthState(setUser);
        return () => unsubscribe();
    }, []);


    const handleLogin = async (userId: string, password: string) => {
        await login(userId, password);
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hookで使えるように
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
