import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import * as styles from "@/styles/components/Breadcrumbs.module.scss";

// ページ名マップ
const breadcrumbNameMap: Record<string, string> = {
  "questions": "問題一覧",
  "bookmark": "保存済み",
  "login": "ログイン",
  "subject": "ジャンル",
  "question": "問題",
  "stats": "学習履歴"
  // 必要に応じて追加
};

const subjectMapNameMap: Record<string, string> = {
  "1": "関係法令(有害)",
  "2": "関係法令(有害以外)",
  "3": "労働衛生(有害)",
  "4": "労働衛生(有害以外)",
  "5": "労働生理"
};


const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // /question/1020250402 の場合
  if (
    pathnames[0] === "question" &&
    pathnames[1] &&
    pathnames[1].length === 10
  ) {
    const parentId = pathnames[1].slice(0, 8);
    const year = parentId.slice(2, 6);
    const month = parentId.slice(6, 8);
    const questionNumber = pathnames[1].slice(8, 10);
    return (
      <nav aria-label="パンくずリスト" className={styles.breadcrumbs}>
        <ol className={styles.breadcrumbs__list}>
          <li>
            <Link to="/">TOP</Link>
          </li>
          <li className={styles.breadcrumbs__item}>
            <span className={styles.breadcrumbs__separator}></span>
            <Link to={`/questions/${parentId}`}>{year}年{month}月 過去問題</Link>
          </li>
          <li className={styles.breadcrumbs__item}>
            <span className={styles.breadcrumbs__separator}></span>
            <span className={styles.breadcrumbs__current}>第{Number(questionNumber)}問</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /questions/10202504 の場合
  if (
    pathnames[0] === "questions" &&
    pathnames[1] &&
    pathnames[1].length === 8
  ) {
    console.log(pathnames)
    const parentId = pathnames[1];
    const year = parentId.slice(2, 6);
    const month = parentId.slice(6, 8);

    return (
      <nav aria-label="パンくずリスト" className={styles.breadcrumbs}>
        <ol className={styles.breadcrumbs__list}>
          <li>
            <Link to="/">TOP</Link>
          </li>
          <li className={styles.breadcrumbs__item}>
            <span className={styles.breadcrumbs__separator}></span>
            <span className={styles.breadcrumbs__current}>{year}年{month}月 過去問題</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /subject/1 の場合
  if (
    pathnames[0] === "subject" &&
    pathnames[1]
  ) {
    const subjectId = pathnames[1];
    const subject = subjectMapNameMap[subjectId];
    return (
      <nav aria-label="パンくずリスト" className={styles.breadcrumbs}>
        <ol className={styles.breadcrumbs__list}>
          <li>
            <Link to="/">TOP</Link>
          </li>
          <li className={styles.breadcrumbs__item}>
            <span className={styles.breadcrumbs__separator}></span>
            <span className={styles.breadcrumbs__current}>
              {subject ? `${subject} 過去問題` : "カテゴリー 過去問題"}
            </span>
          </li>
        </ol>
      </nav>
    );
  }

  // それ以外は「ホーム ＞ 現在地」
  const current = pathnames[pathnames.length - 1];
  const label = breadcrumbNameMap[current] || current;

  return (
    <nav aria-label="パンくずリスト" className={styles.breadcrumbs}>
      <ol className={styles.breadcrumbs__list}>
        <li>
          <Link to="/">TOP</Link>
        </li>
        {current && (
          <li className={styles.breadcrumbs__item}>
            <span className={styles.breadcrumbs__separator}></span>
            <span className={styles.breadcrumbs__current}>{label}</span>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;