import * as React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"
import Layout from "@/components/layout/Layout"
import * as styles from "@/styles/page/stats.module.scss"
import DailyAnswersChart from "@/components/charts/DailyAnswersChart"
import SubjectCoverageGraph from "@/components/charts/SubjectCoverageGraph"

const StatsPage = () => {

  return (
    <Layout>
      <main className={styles.statsPage}>
        <h2>学習履歴</h2>
        <div>
          <h3>日別回答数</h3>
          <DailyAnswersChart />
          <h3>分野別網羅度</h3>
          <SubjectCoverageGraph />
        </div>
      </main>
    </Layout>
  )
}

export default StatsPage