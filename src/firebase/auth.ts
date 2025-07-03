import { auth } from "./firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";

export const login = (userId: string, password: string) => {
    const email = `${userId}@eisei-goukaku.com`;
    return signInWithEmailAndPassword(auth, email, password);
}
/**
 * ログアウト処理
 */
export const logout = () => {
    return signOut(auth);
};

/**
 * ログイン状態の監視
 */
export const observeAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};