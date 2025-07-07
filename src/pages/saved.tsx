import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getSavedQuestions, removeQuestionSaved } from "@/firestore/saveLater";
import { Link, navigate } from "gatsby";
import Layout from "@/components/layout/Layout";
import * as styles from "@/styles/page/saved.module.scss";
import parse from 'html-react-parser'
import sanitizeHtml from 'sanitize-html'
import trashRed from "@/images/saved/trash-red.svg"
import { toast } from "react-hot-toast";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function formatQuestionId(questionId: string | number): string {
    const id = String(questionId);
    if (!/^\d{8}$/.test(id)) return questionId + "";
    const year = id.slice(0, 4);
    const month = id.slice(4, 6);
    const num = id.slice(6, 8).replace(/^0/, "");
    const monthStr = month === "04" ? "4月" : month + "月";
    return `${year}年度${monthStr} 第${num}問`;
}

const SavedQuestionsPage = () => {
    const { user } = useAuth();
    const [savedQuestions, setSavedQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        (async () => {
            setLoading(true);
            const data = await getSavedQuestions(user.uid);
            setSavedQuestions(data);
            setLoading(false);
        })();
    }, [user]);

    const handleClick = async (questionId: string) => {
        const delFlg = window.confirm("この問題をあとで見る一覧から削除しますか？");
        if (delFlg) {
            if (!user) {
                toast.error("ログインしてください");
                return;
            }
            try {
                await removeQuestionSaved(user.uid, questionId);
                // ここで画面上からも削除
                setSavedQuestions(prev =>
                    prev.filter(item => item.questionId !== questionId)
                );
                toast.success("あとで見る一覧から削除しました");
            } catch (err) {
                console.error("Error removing question from saved list:", err);
                toast.error("エラーが発生しました");
            }
        }
    }

    return (
        <Layout>
            <main className={styles.saved}>
                <h1 className={styles.saved__title}>あとで見る一覧</h1>
                <section className={styles.saved__section}>
                    {loading ? (
                        <div className={styles.saved__loadingWrapper}>
                            <DotLottieReact
                                src="/lottie/loading-lottie.json"
                                autoplay
                                loop
                            />
                        </div>
                    ) : (
                        <ul className={styles.saved__list}>
                            {savedQuestions.map((item) => (
                                <li key={item.id} className={styles.saved__item}>
                                    <div className={styles.saved__questionBlock}>
                                        <Link to={`/question/${item.questionId}`} className={styles.saved__questionLink}>
                                            <span className={styles.saved__questionId}>{formatQuestionId(item.questionId)}</span>
                                            <span className={styles.saved__questionText}>
                                                {parse(
                                                    sanitizeHtml(item.questionText, {
                                                        allowedTags: ['ul', 'li', 'strong', 'br']
                                                    })
                                                )}
                                            </span>
                                        </Link>
                                        <button className={styles.saved__trashButton} type="button" aria-label="削除" onClick={() => handleClick(item.questionId)}>
                                            <img src={trashRed} alt="" className={styles.saved__trashIcon} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </Layout>
    );
};

export default SavedQuestionsPage;