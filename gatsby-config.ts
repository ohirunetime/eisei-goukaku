import { error } from "console";
import { graphql, type GatsbyConfig, type GatsbyNode } from "gatsby"
import path from "path";
const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
    lang: `ja`,
    title: `衛生管理合格ナビ`,
    description: `衛生管理合格ナビは、衛生管理試験のための学習支援サイトです。過去問を中心に、試験対策に役立つ情報を提供します。`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/question.json`,
      },
    },
  ],
}
export default config
