import * as React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"
import Layout from "@/components/layout/Layout"
import * as styles from "@/styles/page/index.module.scss";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <main className={styles.index}>
        <h2>過去問一覧</h2>
        <div>

          <div>
            <Link to={`/questions/202504`}>
              2025年後期
            </Link>
          </div>
          <div>
            <Link to={`/questions/202504`}>
              2025年前期
            </Link>
          </div>

        </div>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
