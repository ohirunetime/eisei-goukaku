import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { Link, navigate } from "gatsby";
import Layout from "@/components/layout/Layout";
import * as styles from "@/styles/page/bookmark.module.scss";
import parse from 'html-react-parser'
import sanitizeHtml from 'sanitize-html'
import trashRed from "@/images/saved/trash-red.svg"
import { toast } from "react-hot-toast";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useBookmarks } from "@/hooks/useBookmarks";
import { BookmarkWithQuestion } from '@/types/bookmark';
import { User } from '@/types/auth';

function formatQuestionId(questionId: string | number): string {
    const id = String(questionId);
    // 先頭2文字を無視
    const trimmed = id.length > 8 ? id.slice(2) : id;
    if (!/^\d{8}$/.test(trimmed)) return questionId + "";
    const year = trimmed.slice(0, 4);
    const month = trimmed.slice(4, 6);
    const num = trimmed.slice(6, 8).replace(/^0/, "");
    const monthStr = month === "04" ? "4月" : month + "月";
    return `${year}年度${monthStr} 第${num}問`;
}

const BookmarkPage = () => {
    const { user, loading: authLoading } = useAuthContext();
    const [bookmarks, setBookmarks] = useState<BookmarkWithQuestion[]>([]);
    const [loading, setLoading] = useState(true);


    const { fetchBookmarks, deleteBookmark } = useBookmarks(user as User);


    useEffect(() => {
        if (authLoading) return; // 認証状態取得中は何もしない

        if (!user) {
            navigate("/login");
            return;
        }
        if (bookmarks.length > 0) {
            return;
        }
        (async () => {
            setLoading(true);
            const data = await fetchBookmarks();
            setBookmarks(data);
            setLoading(false);
        })();
    }, [user, authLoading]);

    const handleClick = async (bookmarkId: number) => {
        const delFlg = window.confirm("この問題をあとで見る一覧から削除しますか？");
        if (delFlg) {
            if (!user) {
                toast.error("ログインしてください");
                return;
            }
            const isSuccess = await deleteBookmark(bookmarkId);
            if (!isSuccess) {
                toast.error("削除に失敗しました");
                return;
            }
            setBookmarks(prev =>
                prev.filter(item => item.id !== bookmarkId)
            );
            toast.success("あとで見る一覧から削除しました");
        }
    }

    return (
        <Layout>
            <main className={styles.bookmark}>
                <h1 className={styles.bookmark__title}>あとで見る一覧</h1>
                <section className={styles.bookmark__section}>
                    {loading ? (
                        <div className={styles.bookmark__loadingWrapper}>
                            <DotLottieReact
                                src="/lottie/loading-lottie.json"
                                autoplay
                                loop
                            />
                        </div>
                    ) : (
                        <ul className={styles.bookmark__list}>
                            {bookmarks.map((item) => (
                                <li key={item.id} className={styles.bookmark__item}>
                                    <div className={styles.bookmark__questionBlock}>
                                        <Link to={`/question/${item.questionId}`} className={styles.bookmark__questionLink}>
                                            <span className={styles.bookmark__questionId}>{formatQuestionId(item.questionId)}</span>
                                            <span className={styles.bookmark__questionText}>
                                                {parse(
                                                    sanitizeHtml(item.questions.questionText, {
                                                        allowedTags: ['ul', 'li', 'strong', 'br']
                                                    })
                                                )}
                                            </span>
                                        </Link>
                                        <button className={styles.bookmark__trashButton} type="button" aria-label="削除" onClick={() => handleClick(item.id)}>
                                            <img src={trashRed} alt="" className={styles.bookmark__trashIcon} />
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

export default BookmarkPage;