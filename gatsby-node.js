require("dotenv").config();
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.GATSBY_SUPABASE_URL;
const supabaseKey = process.env.GATSBY_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  // ESMパッケージは動的import
  const camelcaseKeys = (await import("camelcase-keys")).default;

  const { data, error } = await supabase
    .from("questions")
    .select(`*,subjects:subject (id,subject)`);

  if (error) throw error;
  if (!data) throw new Error("questionsが取得できませんでした。");

  const questions = camelcaseKeys(data, { deep: true });

  // year+monthごとにグループ化
  const grouped = {};
  questions.forEach((q) => {
    const key = `${q.year}${String(q.month).padStart(2, "0")}`; // 例: 202504
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(q);
  });

  // 例えば各グループでページ生成
  Object.entries(grouped).forEach(([key, questions]) => {
    createPage({
      path: `/questions/${key}`,
      component: path.resolve(`./src/templates/questionsTemplate.tsx`),
      context: {
        questions,
        year: questions[0].year,
        month: questions[0].month,
      },
    });
  });

  questions.forEach((question, index) => {
    const prevUid = index > 0 ? questions[index - 1].questionId : null;
    const nextUid =
      index < questions.length - 1 ? questions[index + 1].questionId : null;

    createPage({
      path: `/question/${question.questionId}`,
      component: path.resolve(`./src/templates/questionTemplate.tsx`),
      context: {
        question,
        prevUid,
        nextUid,
      },
    });
  });
};
