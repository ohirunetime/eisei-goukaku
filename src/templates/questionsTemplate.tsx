import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import Layout from "@/components/layout/Layout"
import * as styles from "./questions.module.scss";

import parse from 'html-react-parser'
import sanitizeHtml from 'sanitize-html'

import { QuestionWithSubject } from "@/types/question";

interface QuestionsPageContext {
    questions: QuestionWithSubject[];
}

const QuestionsTemplate: React.FC<PageProps<unknown, QuestionsPageContext>> = ({ pageContext }) => {
    const questions = pageContext.questions;
    return (
        <Layout>
            <main className={styles.questions}>
                <header>
                    <h1>問題一覧</h1>
                    <p>全ての問題を一覧表示しています。各問題の詳細ページへ移動できます。</p>
                </header>
                <nav aria-label="問題リスト">
                    <ol className={styles.questions__list}>
                        {questions.map((question, i) => (
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
                                              "questions__subject_" +
                                              question.subjects.id
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
                                </Link>
                            </li>
                        ))}
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