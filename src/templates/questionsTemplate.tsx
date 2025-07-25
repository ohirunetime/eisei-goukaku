import React, { useEffect, useState } from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import Layout from "@/components/layout/Layout"
import * as styles from "./questions.module.scss";
import parse from 'html-react-parser'
import sanitizeHtml from 'sanitize-html'

import { useAuthContext } from "@/contexts/AuthContext";
import { User } from '@/types/auth';
import { AnswerHistory } from "@/types/answerHistory";
import { useAnswerHistoryByYearMonth } from '@/hooks/useAnswerHistoryByYearMonth'

import { QuestionWithSubject } from "@/types/question";

interface QuestionsPageContext {
    questions: QuestionWithSubject[];
}

const QuestionsTemplate: React.FC<PageProps<unknown, QuestionsPageContext>> = ({ pageContext }) => {
    const questions = pageContext.questions;

    const { user } = useAuthContext();
    const [answerHistoryies, setAnswerHistoryies] = useState<AnswerHistory[]>([]);
    const { fetchAnswerHistoryByYearMonth } = useAnswerHistoryByYearMonth(user as User);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAnswerHistoryByYearMonth(questions[0].year, questions[0].month);
            setAnswerHistoryies(data);
        };
        fetchData();
    }, [user]);

    return (
        <Layout>
            <main className={styles.questions}>
                <header>
                    <h1>問題一覧</h1>
                    <p>全ての問題を一覧表示しています。各問題の詳細ページへ移動できます。</p>
                </header>
                <nav aria-label="問題リスト">
                    <ol className={styles.questions__list}>
                        {questions.map((question, i) => {
                            // 該当問題の回答履歴を抽出
                            const histories = answerHistoryies.filter(
                                (h) => h.questionId === question.questionId
                            );
                            return (
                                <li key={question.questionId} className={styles.questions__questionWrapper}>
                                    <Link
                                        to={`/question/${question.questionId}`}
                                        className={styles.questions__link}
                                        aria-label={`問題${question.index}: ${question.summary}`}
                                    >
                                        {/* カテゴリー（科目名）を左上に */}
                                        {question.subjects?.subject && (
                                            <span
                                                className={
                                                    `${styles.questions__subject} ${styles[
                                                        "questions__subject_" + question.subjects.id
                                                    ]}`
                                                }
                                            >
                                                {question.subjects.subject}
                                            </span>
                                        )}
                                        <span className={styles.questions__index}>問{question.index}.</span>{" "}
                                        <span className={styles.questions__summary}>
                                            {parse(sanitizeHtml(question.summary ?? ""))}
                                        </span>
                                        {/* 回答履歴表示 */}
                                        {histories.length > 0 && (
                                            <span className={styles.questions__answerHistory}>
                                                {histories.map((h, idx) =>
                                                    h.isCorrect ? (
                                                        <span key={idx} className={styles.questions__answerCorrect}></span>
                                                    ) : (
                                                        <span key={idx} className={styles.questions__answerIncorrect}></span>
                                                    )
                                                )}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </main>
        </Layout>
    );
}
export default QuestionsTemplate;

export const Head: HeadFC = () => (
    <>
        <title>問題一覧 | Eisei Goukaku</title>
        <meta name="description" content="全ての問題を一覧表示しています。各問題の詳細ページへ移動できます。" />
    </>
);