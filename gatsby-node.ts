import path from "path";
import { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};
export const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql<{
    allQuestionJson: {
      edges: {
        node: {
          uid: string,
          questionText: string,
          index: string,
          period: number,
          year: number,
          month: number,
          subject: string,
          correctChoice: number,
          choice1: string,
          explanation1: string,
          choice2: string,
          explanation2: string,
          choice3: string,
          explanation3: string,
          choice4: string,
          explanation4: string,
          choice5: string,
          explanation5: string,
          totalExplanation: string,
          isFirstOnly: number
        }
      }[]
    }
  }>(`
    {
      allQuestionJson(sort: { uid: ASC }) {
        edges {
          node {
            uid
            index
            period
            year
            month
            questionText
            subject
            correctChoice
            choice1
            explanation1
            choice2
            explanation2
            choice3
            explanation3
            choice4
            explanation4
            choice5
            explanation5
            totalExplanation
            isFirstOnly
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  if (!result.data || !result.data.allQuestionJson) {
    throw new Error("allQuestionJsonが取得できませんでした。データや設定を確認してください。");
  }
  const questions = result.data.allQuestionJson.edges
  questions.forEach((question, index) => {

    const prevUid = index > 0 ? questions[index - 1].node.uid : null;
    const nextUid = index < questions.length - 1 ? questions[index + 1].node.uid : null;

    createPage({
      path: `./question/${question.node.uid}`,
      component: path.resolve(`./src/templates/question/questionTemplate.tsx`),
      context: {
        question: question.node,
        prevUid: prevUid,
        nextUid: nextUid
      }
    });
  });
};
