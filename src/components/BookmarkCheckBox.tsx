import React, { useState, useEffect, useCallback } from "react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import * as styles from "@/styles/components/BookmarkCheckBox.module.scss";
import { Question } from "@/types/question";
import { User } from '@/types/auth';

interface Props {
    questionId: Question["questionId"];
}

export const BookmarkCheckBox: React.FC<Props> = ({ questionId }) => {
    const { user } = useAuthContext();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    const { existBookmark, addBookmark, deleteBookmark } = useBookmarks(user as User);

    // ブックマーク状態を取得
    const fetchBookmarkStatus = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const bookmarked = await existBookmark(questionId);
            setIsBookmarked(bookmarked);
        } catch (err) {
            toast.error("状態取得に失敗しました");
        } finally {
            setLoading(false);
        }
    }, [user, questionId]);

    useEffect(() => {
        fetchBookmarkStatus();
    }, [fetchBookmarkStatus]);

    // チェックボックスの切り替え
    const handleToggle = useCallback(async () => {
        if (!user) {
            toast.error("ログインしてください");
            return;
        }
        setLoading(true);
        try {
            if (isBookmarked) {
                await deleteBookmark(questionId);
                setIsBookmarked(false);
                toast.success("保存を取り消しました");
            } else {
                await addBookmark(questionId);
                setIsBookmarked(true);
                toast.success("保存しました");
            }
        } catch (err) {
            toast.error("保存に失敗しました");
        } finally {
            setLoading(false);
        }
    }, [user, questionId]);

    return (
        <div className={styles.bookmarkCheckBox}>
            <input
                type="checkbox"
                id={`keep-${questionId}`}
                checked={isBookmarked}
                onChange={handleToggle}
                disabled={loading}
            />
            <label htmlFor={`keep-${questionId}`}>あとで見返す</label>
        </div>
    );
};
