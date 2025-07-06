import React from "react";
import { useState, useEffect } from "react";

import { saveQuestionForLater, isQuestionSaved, removeQuestionSaved } from "@/firestore/saveLater";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import * as styles from "@/styles/components/SaveLaterCheckBox.module.scss";
interface Props {
    questionId: string;
    questionText: string
}

export const SaveLaterCheckBox: React.FC<Props> = ({ questionId, questionText }) => {
    const { user } = useAuth();
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            return
        }
        (async () => {
            setLoading(true);
            const saved = await isQuestionSaved(user.uid, questionId);
            setIsSaved(saved);
            setLoading(false);
        })();
    }, [user, questionId]);


    const handleToggle = async () => {
        if (!user) {
            toast.error("ログインしてください");
            return
        }
        try {
            if (isSaved) {
                await removeQuestionSaved(user.uid, questionId);
                setIsSaved(false);
                toast.success("保存を取り消しました");

            } else {
                await saveQuestionForLater(user.uid, questionId, questionText);
                setIsSaved(true);
                toast.success("保存しました");

            }
        } catch (err) {
            console.log(err)
            toast.error("保存に失敗しました")
        }
    }


    return (
        <div className={styles.saveLaterCheckBox}>
            <input type="checkbox" id="keep" checked={isSaved} onChange={handleToggle} />
            <label htmlFor="keep">あとで見返す</label>
        </div>
    )
}
