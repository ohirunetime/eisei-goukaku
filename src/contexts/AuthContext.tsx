import React, { createContext, useContext, useEffect, useState } from "react";
import type { AuthState } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";

const AuthContext = createContext<AuthState | undefined>(undefined);

// Providerコンポーネント
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuth() // 先ほどのフック
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
};

// Hookで使えるように
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
