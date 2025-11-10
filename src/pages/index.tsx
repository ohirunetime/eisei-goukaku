import * as React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"
import Layout from "@/components/layout/Layout"
import * as styles from "@/styles/page/index.module.scss"

const subjects = [
  { id: 1, name: "関係法令(有害)" },
  { id: 2, name: "関係法令(有害以外)" },
  { id: 3, name: "労働衛生(有害)" },
  { id: 4, name: "労働衛生(有害以外)" },
  { id: 5, name: "労働生理" },
]

const years = [
  // { key: "10202504", label: "2025年後期" },
  { key: "10202504", label: "2025年前期" },
  { key: "10202410", label: "2024年後期" },
  // { key: "10202504", label: "2024年前期" },
]

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <main className={styles.index}>
        <h2>過去問一覧</h2>
        <section>
          <h3>年度・回から選ぶ</h3>
          <div className={styles.index__list}>
            {years.map((y) => (
              <div key={y.key}>
                <Link to={`/questions/${y.key}`}>{y.label}</Link>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3>ジャンルから選ぶ</h3>
          <div className={styles.index__subjects}>
            {subjects.map((s) => (
              <Link key={s.id} to={`/subject/${s.id}`} className={styles.index__subjectBtn}>
                {s.name}
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h3>キーワード検索</h3>
          <form className={styles.index__searchForm} onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="キーワードで検索" />
            <button type="submit">検索</button>
          </form>
        </section>
        <section>
          <h3>このサイトの使い方</h3>
          <ul>
            <li>年度やジャンルから過去問を探せます。</li>
            <li>問題をクリックすると詳細ページに移動します。</li>
            <li>検索機能もご利用ください。</li>
          </ul>
        </section>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
