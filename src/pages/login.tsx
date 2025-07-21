import React, { useState } from "react";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import Layout from "@/components/layout/Layout";
import * as styles from "@/styles/page/login.module.scss";
import { toast } from "react-hot-toast";
import { signIn } from '@/lib/auth';
import { useAuthContext } from "@/contexts/AuthContext";

const LoginPage = () => {

    const { user } = useAuthContext(); 
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    //型定義を拡張する
    interface LocationState {
        from?: string;
    }
    const location = useLocation() as { state: LocationState };
    const from = location.state?.from || "/";
    if (user) {
        // 既にログインしている場合は、リダイレクト
        navigate(from);
        return;
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const { data, error: authError } = await signIn(userId, password)
        if (authError) {
            setError("ログインに失敗しました");
        } else {
            toast.success("ログインしました");
            navigate(from);
        }

    };

    return (
        <Layout>
            <main className={styles.login}>
                <div className={styles.login__container}>
                    {/* ログインフォーム（左カラム） */}
                    <section className={styles.login__formSection}>
                        <h1 className={styles.login__title}>ログイン</h1>
                        <form className={styles.login__form} onSubmit={handleSubmit}>
                            <div className={styles.login__field}>
                                <label className={styles.login__label} htmlFor="userId">
                                    ユーザーID:
                                </label>
                                <input
                                    className={styles.login__input}
                                    type="text"
                                    id="userId"
                                    name="userId"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    autoComplete="username"
                                />
                            </div>
                            <div className={styles.login__field}>
                                <label className={styles.login__label} htmlFor="password">
                                    パスワード:
                                </label>
                                <input
                                    className={styles.login__input}
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>
                            {error && <div className={styles.login__error}>{error}</div>}
                            <button className={styles.login__button} type="submit">
                                ログイン
                            </button>
                        </form>
                    </section>

                    {/* 新規会員登録案内（右カラム） */}
                    <section className={styles.login__registerSection}>
                        <h1 className={styles.login__registerTitle}>初めての方</h1>
                        <h3 className={styles.login__registerSubtitle}>会員登録すると</h3>
                        <ul className={styles.login__registerList}>
                            <li className={styles.login__registerItem}>学習スケジュールをAIがサポート</li>
                            <li className={styles.login__registerItem}>回答履歴を全て保存。苦手問題の数値化</li>
                        </ul>
                        <button className={styles.login__registerButton} type="button">
                            新規会員登録
                        </button>
                    </section>
                </div>
            </main>
        </Layout>
    );
};

export default LoginPage;