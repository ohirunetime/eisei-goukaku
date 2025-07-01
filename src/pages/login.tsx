import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { navigate } from "gatsby";
import Layout from "@/components/layout/Layout";
import * as styles from "@/styles/page/login.module.scss";

const LoginPage: React.FC = () => {
    const { login, user } = useAuth();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    if (user) {
        if (typeof window !== "undefined") navigate("/");
        return <p>ログイン済みです。リダイレクト中...</p>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await login(userId, password);
            navigate("/");
        } catch (err) {
            setError("ログインに失敗しました");
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